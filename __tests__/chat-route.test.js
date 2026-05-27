import { beforeEach, describe, expect, it, vi } from 'vitest';

// mockStream must be hoisted so it's available inside the vi.mock factory
const mockStream = vi.hoisted(() => vi.fn());

vi.mock('@anthropic-ai/sdk', () => ({
  default: vi.fn().mockImplementation(() => ({
    messages: { stream: mockStream },
  })),
}));

vi.mock('@/lib/sheets', () => ({
  logConversation: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('@/lib/books', () => ({
  enjoyedBooks: [{ title: 'Good to Great', author: 'Jim Collins', tag: 'Business' }],
  currentlyReading: [{ title: 'Great by Choice', author: 'Jim Collins', note: 'On resilience' }],
}));

vi.mock('@/lib/convictions', () => ({
  convictions: [
    {
      ticker: 'GTLB',
      name: 'GitLab',
      tag: 'DevSecOps',
      summary: 'End-to-end DevSecOps platform',
      bullets: ['sticky product', 'strong NRR'],
      risks: ['competition from GitHub'],
      allocation: '~5%',
    },
  ],
  otherConvictions: {
    broaderThesis: { body: 'AI is transforming traditional industries.' },
    consulting: [{ name: 'Accenture', ticker: 'ACN', bullets: ['consulting exposure'] }],
    hubspot: { bullets: ['SMB-focused CRM'] },
  },
}));

// Import after mocks are registered
const { POST } = await import('@/app/api/chat/route.js');

function makeRequest(body) {
  return new Request('http://localhost/api/chat', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

describe('POST /api/chat', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 500 JSON when Anthropic throws', async () => {
    mockStream.mockImplementation(() => {
      throw new Error('API key invalid');
    });

    const res = await POST(makeRequest({ messages: [{ role: 'user', content: 'hi' }] }));

    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body).toEqual({ error: 'Something went wrong' });
  });

  it('streams text chunks and returns correct headers on success', async () => {
    async function* fakeStream() {
      yield { type: 'content_block_delta', delta: { type: 'text_delta', text: 'Hello' } };
      yield { type: 'content_block_delta', delta: { type: 'text_delta', text: ' world' } };
      yield { type: 'message_stop' }; // non-text chunk — should be ignored
    }
    mockStream.mockReturnValue(fakeStream());

    const res = await POST(makeRequest({ messages: [{ role: 'user', content: 'hello' }] }));

    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toBe('text/plain; charset=utf-8');
    expect(res.headers.get('Cache-Control')).toBe('no-cache');

    const text = await res.text();
    expect(text).toBe('Hello world');
  });

  it('handles empty messages array without crashing', async () => {
    async function* fakeStream() {}
    mockStream.mockReturnValue(fakeStream());

    const res = await POST(makeRequest({ messages: [] }));
    expect(res.status).toBe(200);
  });
});
