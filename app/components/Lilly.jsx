'use client';

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const WELCOME_MESSAGE = {
  role: 'assistant',
  content:
    "Hi! I'm Lilly 👋 Ask me anything about Dharma \n\n*I'm an experiment, so I do make mistakes.*",
};

export default function Lilly() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || isStreaming) return;

    const userMessage = { role: 'user', content: text };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput('');
    setIsStreaming(true);

    // Add empty assistant message that we'll stream into
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

    try {
      // Build the messages array for the API (exclude welcome message from history)
      const apiMessages = nextMessages
        .filter((m) => !(m === WELCOME_MESSAGE))
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!res.ok) throw new Error('API error');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: 'assistant',
            content: updated[updated.length - 1].content + chunk,
          };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: 'assistant',
          content: 'Sorry, something went wrong. Please try again!',
        };
        return updated;
      });
    } finally {
      setIsStreaming(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      {/* Chat panel */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-4 sm:right-6 lg:right-8 z-50
            w-[calc(100vw-2rem)] max-w-sm
            bg-white dark:bg-[#1a0a2e] border border-gray-200 dark:border-purple-900
            rounded-2xl shadow-2xl flex flex-col overflow-hidden
            h-[min(480px,calc(100dvh-8rem))]"
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
              L
            </div>
            <div>
              <p className="font-semibold text-sm leading-none">Lilly</p>
              <p className="text-xs text-purple-200 mt-0.5">
                {isStreaming ? 'Typing...' : "Dharma's AI assistant"}
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="ml-auto text-white/70 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-3 space-y-3 [-webkit-overflow-scrolling:touch]">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-purple-600 text-white rounded-br-sm'
                      : 'bg-gray-100 dark:bg-purple-900/40 text-gray-800 dark:text-gray-100 rounded-bl-sm'
                  }`}
                >
                  {msg.content ? (
                    msg.role === 'assistant' ? (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ children }) => (
                            <p className="mb-1 last:mb-0">{children}</p>
                          ),
                          ul: ({ children }) => (
                            <ul className="list-disc pl-4 mb-1 space-y-0.5">
                              {children}
                            </ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="list-decimal pl-4 mb-1 space-y-0.5">
                              {children}
                            </ol>
                          ),
                          li: ({ children }) => <li>{children}</li>,
                          strong: ({ children }) => (
                            <strong className="font-semibold">
                              {children}
                            </strong>
                          ),
                          a: ({ href, children }) => (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline opacity-80 hover:opacity-100"
                            >
                              {children}
                            </a>
                          ),
                          code: ({ children }) => (
                            <code className="bg-black/10 dark:bg-white/10 px-1 rounded text-xs font-mono">
                              {children}
                            </code>
                          ),
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    ) : (
                      msg.content
                    )
                  ) : (
                    <span className="inline-flex gap-1">
                      <span
                        className="animate-bounce"
                        style={{ animationDelay: '0ms' }}
                      >
                        ·
                      </span>
                      <span
                        className="animate-bounce"
                        style={{ animationDelay: '150ms' }}
                      >
                        ·
                      </span>
                      <span
                        className="animate-bounce"
                        style={{ animationDelay: '300ms' }}
                      >
                        ·
                      </span>
                    </span>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t border-gray-100 dark:border-purple-900/50 flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              disabled={isStreaming}
              className="flex-1 text-base sm:text-sm px-3 py-2 rounded-xl border border-gray-200 dark:border-purple-800
                bg-gray-50 dark:bg-purple-900/20 text-gray-800 dark:text-gray-100
                placeholder-gray-400 dark:placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-purple-400
                disabled:opacity-50"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isStreaming}
              className="w-11 h-11 sm:w-9 sm:h-9 rounded-xl bg-purple-600 hover:bg-purple-700
                disabled:opacity-40 disabled:cursor-not-allowed
                flex items-center justify-center transition-colors flex-shrink-0"
              aria-label="Send message"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
              >
                <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-6 right-4 sm:right-6 lg:right-8 z-50 w-14 h-14 rounded-full
          bg-gradient-to-br from-purple-600 to-purple-800
          shadow-lg hover:shadow-purple-500/30 hover:scale-105
          transition-all duration-200 flex items-center justify-center
          mb-[env(safe-area-inset-bottom)]"
        aria-label={isOpen ? 'Close Lilly chat' : 'Open Lilly chat'}
      >
        {isOpen ? (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </>
  );
}
