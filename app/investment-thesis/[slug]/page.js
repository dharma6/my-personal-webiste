'use client';

import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Footer from '../../components/Footer';
import InvestmentThesis from '../../components/InvestmentThesis';
import Navbar from '../../components/Navbar';
import { assets, blogPosts } from '@/assets/assets';
import Image from 'next/image';

export default function ArticlePage() {
  const { slug } = useParams();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  const post = blogPosts.find((p) => p.slug === slug);

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

  if (!post) {
    return (
      <div className="min-h-screen">
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <main className="pt-20 flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-3xl font-Ovo mb-4">Article not found</h1>
          <Link
            href="/investment-thesis"
            className="text-green-600 dark:text-green-400 font-Ovo hover:underline"
          >
            &larr; Back to articles
          </Link>
        </main>
        <Footer isDarkMode={isDarkMode} />
      </div>
    );
  }

  // Render the full Investment Thesis component for that specific article
  if (slug === 'investment-thesis') {
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
            <div className="w-full px-4 sm:px-10 lg:px-[12%] pt-6">
              <Link
                href="/investment-thesis"
                className="inline-flex items-center text-sm text-gray-500 dark:text-white/50 hover:text-green-600 dark:hover:text-green-400 font-Ovo transition-colors"
              >
                &larr; Back to articles
              </Link>
            </div>
            <InvestmentThesis isDarkMode={isDarkMode} />
          </main>

          <Footer isDarkMode={isDarkMode} />
        </div>
      </>
    );
  }

  // Article content by slug
  const articleImages = {
    'my-2025-holdings': assets.holdings_2025,
  };

  const articleImage = articleImages[slug];

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
          <section
            className="w-full px-4 sm:px-10 lg:px-[12%] py-10 scroll-mt-20"
            aria-label={post.title}
          >
            <div className="mb-6 fade-in-section">
              <Link
                href="/investment-thesis"
                className="inline-flex items-center text-sm text-gray-500 dark:text-white/50 hover:text-green-600 dark:hover:text-green-400 font-Ovo transition-colors"
              >
                &larr; Back to articles
              </Link>
            </div>

            <header className="mb-12 fade-in-section">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-Ovo mb-3 text-gray-800 dark:text-white">
                {post.title}
              </h1>
              {post.subtitle && (
                <p className="text-lg text-gray-500 dark:text-white/50 font-Ovo mb-4">
                  {post.subtitle}
                </p>
              )}
              <div className="flex items-center gap-3">
                <time
                  dateTime={post.date}
                  className="text-sm text-gray-500 dark:text-white/50 font-Ovo"
                >
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
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
            </header>

            {articleImage ? (
              <div className="fade-in-section">
                <Image
                  src={articleImage}
                  alt={post.title}
                  className="w-full rounded-xl border border-gray-200 dark:border-white/10"
                  width={1200}
                  height={600}
                  priority
                />
              </div>
            ) : (
              <div className="max-w-3xl fade-in-section">
                <div className="border border-gray-200 dark:border-white/10 rounded-xl p-8 sm:p-12 text-center">
                  <p className="text-2xl font-Ovo text-gray-400 dark:text-white/30 mb-4">
                    Coming Soon
                  </p>
                  <p className="text-gray-500 dark:text-white/50 font-Ovo">
                    This article is currently being written. Check back soon!
                  </p>
                </div>
              </div>
            )}
          </section>
        </main>

        <Footer isDarkMode={isDarkMode} />
      </div>
    </>
  );
}
