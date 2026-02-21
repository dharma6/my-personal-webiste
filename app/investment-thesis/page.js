'use client';

import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { blogPosts } from '@/assets/assets';

export default function InvestmentThesisPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const darkModePreference =
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    setIsDarkMode(darkModePreference);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    if (isDarkMode) {
      document.body.classList.add('dark');
      localStorage.theme = 'dark';
      root.style.setProperty('color-scheme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.theme = 'light';
      root.style.setProperty('color-scheme', 'light');
    }
  }, [isDarkMode, mounted]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e) => {
      if (!('theme' in localStorage)) {
        setIsDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('.fade-in-section');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [mounted]);

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
        <title>Investment Thesis - Dharma Bandaru</title>
        <meta
          name="description"
          content="Articles on investing, portfolio holdings, and lessons learned from the market."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={isDarkMode ? '#1a1a1a' : '#ffffff'} />
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
          <section
            className="w-full px-4 sm:px-10 lg:px-[12%] py-10 scroll-mt-20"
            aria-label="Investment Articles"
          >
            <header className="mb-16 fade-in-section">
              <h1 className="text-center mb-2 text-lg font-Ovo">
                Lessons & Holdings
              </h1>
              <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-Ovo">
                Investment Thesis
              </h2>
            </header>

            <div className="max-w-3xl mx-auto space-y-0">
              {blogPosts.map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/investment-thesis/${post.slug}`}
                  className="block fade-in-section"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <article
                    className="py-8 border-b border-gray-200 dark:border-white/10
                      hover:bg-gray-50 dark:hover:bg-gray-800/30
                      transition-colors duration-200 px-4 -mx-4 rounded-lg"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <time
                        dateTime={post.date}
                        className="text-sm text-gray-500 dark:text-white/50 font-Ovo"
                      >
                        {formatDate(post.date)}
                      </time>
                      <span className="text-gray-300 dark:text-white/20">
                        &middot;
                      </span>
                      <div className="flex gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-0.5 rounded-full
                              bg-gray-100 dark:bg-white/10
                              text-gray-600 dark:text-white/60 font-Ovo"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white mb-1 font-Ovo">
                      {post.title}
                    </h3>

                    {post.subtitle && (
                      <p className="text-sm text-gray-500 dark:text-white/50 mb-3 font-Ovo">
                        {post.subtitle}
                      </p>
                    )}

                    <p className="text-gray-600 dark:text-white/70 leading-relaxed font-Ovo">
                      {post.excerpt}
                    </p>

                    <span className="inline-block mt-4 text-sm font-medium text-green-600 dark:text-green-400 font-Ovo">
                      Read more &rarr;
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        </main>

        <Footer isDarkMode={isDarkMode} />
      </div>
    </>
  );
}
