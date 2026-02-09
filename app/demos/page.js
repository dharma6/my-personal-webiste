'use client';

import Head from 'next/head';
import { useEffect, useState } from 'react';
import DemoVideo from '../components/DemoVideo';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Demos() {
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

  return (
    <>
      <Head>
        <title>Technical Demos - Dharma Bandaru</title>
        <meta
          name="description"
          content="Technical demonstrations and project showcases by Dharma Bandaru"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={isDarkMode ? '#1a1a1a' : '#ffffff'} />
        <script src="https://player.vimeo.com/api/player.js" async />
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
          <div className="w-full px-[12%] py-16">
            <div className="max-w-6xl mx-auto">
              <header className="text-center mb-16">
                <h1 className="text-6xl font-Ovo mb-4">Technical Demos</h1>
              </header>

              <DemoVideo />
            </div>
          </div>
        </main>

        <Footer isDarkMode={isDarkMode} />
      </div>
    </>
  );
}
