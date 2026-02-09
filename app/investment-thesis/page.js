'use client';

import Head from 'next/head';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import InvestmentThesis from '../components/InvestmentThesis';
import Navbar from '../components/Navbar';

export default function InvestmentThesisPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
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

  // Intersection Observer for fade-in animations
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

  return (
    <>
      <Head>
        <title>Investment Thesis - Dharma Bandaru</title>
        <meta
          name="description"
          content="Explore Dharma Bandaru's investment philosophy and journey. Learn about options trading, ETF investing, and building wealth through consistency."
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
          <InvestmentThesis isDarkMode={isDarkMode} />
        </main>

        <Footer isDarkMode={isDarkMode} />
      </div>
    </>
  );
}
