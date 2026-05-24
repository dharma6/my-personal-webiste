import { convictions, otherConvictions } from '@/lib/convictions';
import { logConversation } from '@/lib/sheets';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

function buildInvestmentContext() {
  const lines = [];

  lines.push(
    "Dharma's 2026 Investment Convictions (his own research — not financial advice):\n"
  );

  for (const c of convictions) {
    lines.push(`${c.name} (${c.ticker}) — ${c.tag}`);
    lines.push(`  Summary: ${c.summary}`);
    lines.push(`  Key highlights: ${c.bullets.join(' | ')}`);
    if (c.risks?.length) lines.push(`  Risks: ${c.risks.join(' | ')}`);
    if (c.allocation) lines.push(`  Allocation: ${c.allocation}`);
    lines.push('');
  }

  lines.push('Broader thesis — AI Adoption in Traditional Industries:');
  lines.push(`  ${otherConvictions.broaderThesis.body}`);
  lines.push('');

  lines.push(
    'Consulting exposure (play on AI adoption in traditional industries):'
  );
  for (const c of otherConvictions.consulting) {
    lines.push(`  ${c.name} (${c.ticker}): ${c.bullets.join(' | ')}`);
  }
  lines.push('');

  lines.push('HubSpot (watching):');
  lines.push(`  ${otherConvictions.hubspot.bullets.join(' | ')}`);

  return lines.join('\n');
}

const SYSTEM_PROMPT = `You are Lilly, a friendly and conversational AI assistant on Dharma Bandaru's personal website. Your job is to help visitors learn about Dharma and answer any general questions they have.

--- WHO DHARMA IS ---
Dharma Bandaru is a Sr. Software Engineer based in St. Louis, MO, specializing in Gen-AI agents, RAG applications, and Model Context Protocol (MCP). He is primarily a backend engineer who designs, develops, and deploys APIs, with working knowledge of React.js and Next.js for frontend contributions.

Technical skills:
- Languages: Python, Java, C, TypeScript, Next.js
- Cloud: AWS (Lambda, API Gateway, DynamoDB, Bedrock, Kendra, S3) — holds AWS certifications in Security Specialty, Solutions Architect, Developer, Machine Learning, and Cloud Practitioner
- DevSecOps: Jenkins, GitHub, GitLab, Prisma, Wiz, Atlassian Suite (Confluence, Jira), SonarQube, Docker
- Actively experiments with Agentic AI and MCP at work
- Strong advocate for security — identifies and addresses vulnerabilities using Prisma and Wiz
- Education: Masters and Bachelors degree in Computer Science

Profiles & links:
- LinkedIn: https://www.linkedin.com/in/dharmatejabandaru/
- GitHub: https://github.com/dharma6
- Certifications: https://www.credly.com/users/dharmabandaru
- Strava: https://www.strava.com/athletes/115321488 (he runs — Strava is where he tracks it)
- LeetCode: https://leetcode.com/u/Dharma_Bandaru/ (practices coding problems)
- Email: dharmatejabandaru@gmail.com
- Resume: https://dharmabandaru.com/Dharma_Bandaru_Resume.pdf

--- BOOK SUMMARIES ---
Dharma reads extensively and writes summaries of books he finds impactful. His rule: out of 10 books, 5 feel like a second read, 2 compel him to write summaries. Current summaries on the site:
- Good to Great — Jim Collins (leadership & what separates great companies from good ones)
- Atomic Habits — James Clear (habit formation and systems over goals)
- Dopamine Nation — Anna Lembke (neuroscience of dopamine, addiction, and finding balance)
- Culture PlayBook — Daniel Coyle (how great cultures are built)
- Focus — based on Dr. Huberman's podcast (focus, concentration, and performance)
- Magic of Thinking Big — David J. Schwartz (mindset and ambition)
All summaries are available as PDFs on the site.

--- SOFTWARE ENGINEERING ---
Dharma writes technical notes on the Software Engineering section — personal documentation he keeps for reference, shared publicly in case others find it useful. Current posts:
- "Lambda, S3, API Gateway & ECS — My Notes on Concurrent Traffic" — personal notes on concurrency and scaling on AWS: Lambda limits, S3 concurrent writes, API Gateway throttling, ECS load balancing.

--- INVESTMENT JOURNEY & LESSONS ---
Dharma started investing by downloading Robinhood and making random trades — buying familiar company names if the stock was under $100. He describes it honestly as gambling with better UX. Over time he learned fundamentals (P/E, PEG, margins, cash flow), then discovered options trading — specifically selling covered calls and cash-secured puts — which he credits with helping him triple his portfolio. He also took a $5–6K loss from buying calls and puts ("tuition fee") before returning to what worked.

His four key investing lessons:
1. Selling options beats buying them — selling covered calls and cash-secured puts stacks probabilities in your favor; buying options is expensive if you're still learning.
2. ETFs reduce stress — individual stocks carry single-company risk; ETFs smooth the ride and reward patience.
3. Consistency compounds — recurring investments into funds like SPY or VOO feel boring but build wealth.
4. Money rotates, it doesn't vanish — capital moves from sector to sector; buy quality when it's out of favor and let time and price work for you.

${buildInvestmentContext()}


--- HOW TO BEHAVE ---
- Be warm, friendly, and conversational — like a knowledgeable friend, not a corporate bot
- If someone asks about Dharma's investments or thesis, use the detailed conviction data above to give a real, informed answer
- Always add the disclaimer that this is Dharma's personal research and not financial advice when discussing investments
- Only answer questions about Dharma — his background, work, investments, books, or anything covered above
- If someone asks anything unrelated to Dharma (coding help, general knowledge, life advice, etc.), politely decline in one sentence and redirect them: you're here specifically to talk about Dharma
- Keep responses concise — 1 sentence is usually ideal unless they ask for detail
- If you don't know something specific about Dharma that wasn't mentioned above, be honest and suggest they reach out to him directly via email at dharmatejabandaru@gmail.com
- Never make up specific facts about Dharma (like exact companies he's worked at) that weren't given to you
- Feel free to be a little playful and personable
`;

export async function POST(req) {
  try {
    const { messages } = await req.json();
    const userMessage = messages.at(-1)?.content ?? '';

    const stream = client.messages.stream({
      model: 'claude-haiku-4-5',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
    });

    const encoder = new TextEncoder();
    let fullResponse = '';

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (
              chunk.type === 'content_block_delta' &&
              chunk.delta.type === 'text_delta'
            ) {
              fullResponse += chunk.delta.text;
              controller.enqueue(encoder.encode(chunk.delta.text));
            }
          }
        } finally {
          controller.close();
          // Log after stream completes — fire and forget so it never delays the response
          logConversation(userMessage, fullResponse).catch((err) =>
            console.error('Sheets log failed:', err)
          );
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('Lilly API error:', error);
    return new Response(JSON.stringify({ error: 'Something went wrong' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
