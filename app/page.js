'use client';

import { useEffect, useState } from 'react';
import Head from 'next/head';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Work from './components/Work';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false); // Start with false to prevent flash
  const [mounted, setMounted] = useState(false);

  // Handle initial theme setup
  useEffect(() => {
    setMounted(true);
    const darkModePreference =
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    setIsDarkMode(darkModePreference);
  }, []);

  // Handle theme changes
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

  // Handle system theme changes
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

  return (
    <>
      <Head>
        <title>Dharma Bandaru - Backend Engineer & AI Developer</title>
        <meta
          name="description"
          content="Personal website of Dharma Bandaru, featuring book summaries, professional journey, and projects. Experienced in backend development, Gen-AI, and AWS."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={isDarkMode ? '#1a1a1a' : '#ffffff'} />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Dharma Bandaru - Backend Engineer & AI Developer"
        />
        <meta
          property="og:description"
          content="Personal website of Dharma Bandaru, featuring book summaries, professional journey, and projects."
        />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content="Dharma Bandaru - Backend Engineer & AI Developer"
        />
        <meta
          name="twitter:description"
          content="Personal website of Dharma Bandaru, featuring book summaries, professional journey, and projects."
        />
      </Head>

      <div className="min-h-screen">
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-black"
        >
          Skip to main content
        </a>

        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

        <main id="main-content">
          <Header isDarkMode={isDarkMode} />
          <Work isDarkMode={isDarkMode} />
          <About isDarkMode={isDarkMode} />
          <Contact isDarkMode={isDarkMode} />
        </main>

        <Footer isDarkMode={isDarkMode} />
      </div>
    </>
  );
}
