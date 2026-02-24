'use client';

import Head from 'next/head';
import Link from 'next/link';
import { isValidElement, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import { engineeringPosts } from '@/assets/assets';

// Helper: extract raw text from a React element tree
function extractText(node) {
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (isValidElement(node) && node.props?.children) return extractText(node.props.children);
  return '';
}

const markdownComponents = {
  h1: ({ children }) => <h1 className="confluence-heading" style={{ fontSize: '1.75rem' }}>{children}</h1>,
  h2: ({ children }) => <h2 className="confluence-heading">{children}</h2>,
  h3: ({ children }) => (
    <h3 className="confluence-heading" style={{ fontSize: '1.25rem' }}>
      {children}
    </h3>
  ),
  p: ({ children }) => <p className="confluence-paragraph">{children}</p>,
  blockquote: ({ children }) => (
    <div className="confluence-info-panel">
      <div className="confluence-info-icon">i</div>
      <div>{children}</div>
    </div>
  ),
  // Handle ALL fenced code blocks here — extract language & content from the child <code> element
  pre: ({ children }) => {
    const codeElement = isValidElement(children) ? children : null;
    const className = codeElement?.props?.className || '';
    const match = /language-(\w+)/.exec(className);
    const codeContent = extractText(children);

    return (
      <div className="confluence-code-block">
        {match && <div className="confluence-code-lang">{match[1]}</div>}
        <pre>
          <code>{codeContent}</code>
        </pre>
      </div>
    );
  },
  // Only handles inline `code` — block code is fully handled by pre above
  code: ({ children }) => (
    <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-white/10 text-sm font-mono">
      {children}
    </code>
  ),
  // Tables — Confluence-style
  table: ({ children }) => (
    <div className="confluence-table-wrap">
      <table className="confluence-table">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="confluence-thead">{children}</thead>,
  th: ({ children }) => <th className="confluence-th">{children}</th>,
  td: ({ children }) => <td className="confluence-td">{children}</td>,
  // Lists
  ul: ({ children }) => (
    <ul className="list-disc pl-6 mb-4 space-y-1 confluence-paragraph">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-6 mb-4 space-y-1 confluence-paragraph">
      {children}
    </ol>
  ),
  // Task list items (- [ ] / - [x])
  li: ({ children, node }) => {
    const checkbox = node?.children?.[0];
    if (checkbox?.type === 'element' && checkbox?.tagName === 'input' && checkbox?.properties?.type === 'checkbox') {
      const checked = checkbox.properties.checked;
      return (
        <li className="list-none -ml-6 flex items-start gap-2">
          <span className={`mt-1 w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center text-xs ${checked ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-400 dark:border-white/30'}`}>
            {checked ? '✓' : ''}
          </span>
          <span>{children}</span>
        </li>
      );
    }
    return <li>{children}</li>;
  },
  hr: () => (
    <hr className="my-8 border-gray-200 dark:border-white/10" />
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-blue-600 dark:text-blue-400 hover:underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic">{children}</em>
  ),
};

export default function ArticleContent({ slug }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  const post = engineeringPosts.find((p) => p.slug === slug);

  useEffect(() => {
    setMounted(true);
    let storedTheme = null;
    try {
      storedTheme = localStorage.theme || null;
    } catch {
      storedTheme = null;
    }

    const prefersDark =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    const darkModePreference =
      storedTheme === 'dark' || (!storedTheme && prefersDark);

    setIsDarkMode(darkModePreference);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      document.body.classList.add('dark');
      try {
        localStorage.theme = 'dark';
      } catch {
        // ignore storage errors (private mode / restricted)
      }
      root.style.setProperty('color-scheme', 'dark');
    } else {
      root.classList.remove('dark');
      document.body.classList.remove('dark');
      try {
        localStorage.theme = 'light';
      } catch {
        // ignore storage errors (private mode / restricted)
      }
      root.style.setProperty('color-scheme', 'light');
    }
  }, [isDarkMode, mounted]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e) => {
      let hasTheme = false;
      try {
        hasTheme = 'theme' in localStorage;
      } catch {
        hasTheme = false;
      }

      if (!hasTheme) {
        setIsDarkMode(e.matches);
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    // Fallback for older browsers (e.g., older Firefox/Safari)
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);


  if (!post) {
    return (
      <div className="min-h-screen">
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <main className="pt-20 flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-3xl font-Ovo mb-4">Article not found</h1>
          <Link
            href="/software-engineering"
            className="text-blue-600 dark:text-blue-400 font-Ovo hover:underline"
          >
            &larr; Back to articles
          </Link>
        </main>
        <Footer isDarkMode={isDarkMode} />
      </div>
    );
  }

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <Head>
        <title>{post.title} - Dharma Bandaru</title>
        <meta name="description" content={post.excerpt} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="theme-color"
          content={isDarkMode ? '#1a1a1a' : '#ffffff'}
        />
      </Head>

      <div className="min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-black"
        >
          Skip to main content
        </a>

        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

        <main id="main-content" className="pt-20">
          <article
            className="w-full px-4 sm:px-10 lg:px-[12%] py-10 scroll-mt-20"
            aria-label={post.title}
          >
            {/* Breadcrumb */}
            <nav
              className="mb-8 confluence-breadcrumb"
              aria-label="Breadcrumb"
            >
              <ol className="flex items-center gap-2 text-sm font-Ovo">
                <li>
                  <Link
                    href="/software-engineering"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Software Engineering
                  </Link>
                </li>
                <li className="text-gray-400 dark:text-white/30">/</li>
                <li className="text-gray-600 dark:text-white/60">
                  {post.title}
                </li>
              </ol>
            </nav>

            {/* Header */}
            <header className="mb-10 max-w-3xl mx-auto">
              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-Ovo mb-4 text-gray-900 dark:text-white leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 mb-6">
                <time
                  dateTime={post.date}
                  className="text-sm text-gray-500 dark:text-white/50 font-Ovo"
                >
                  {formatDate(post.date)}
                </time>
                <span className="text-gray-300 dark:text-white/20">
                  &middot;
                </span>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full
                        bg-blue-50 dark:bg-blue-900/30
                        text-blue-700 dark:text-blue-300 font-Ovo"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <hr className="border-gray-200 dark:border-white/10" />
            </header>

            {/* Confluence-style Markdown content */}
            <div className="confluence-content max-w-3xl mx-auto">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Back link */}
            <div className="max-w-3xl mx-auto mt-16 pt-8 border-t border-gray-200 dark:border-white/10">
              <Link
                href="/software-engineering"
                className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline font-Ovo"
              >
                &larr; Back to all articles
              </Link>
            </div>
          </article>
        </main>

        <Footer isDarkMode={isDarkMode} />
      </div>
    </>
  );
}
