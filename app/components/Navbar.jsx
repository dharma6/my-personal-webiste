import { assets } from '@/assets/assets';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  const [isScroll, setIsScroll] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sideMenuRef = useRef();

  const openMenu = () => {
    sideMenuRef.current.style.transform = 'translateX(-16rem)';
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    sideMenuRef.current.style.transform = 'translateX(16rem)';
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div
        className="fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%] dark:hidden"
        aria-hidden="true"
      >
        <Image
          src={assets.header_bg_color}
          alt=""
          className="w-full"
          width={1200}
          height={300}
          priority
        />
      </div>
      <nav
        className={`w-full fixed top-0 left-0 px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50
          ${
            isScroll
              ? 'bg-white bg-opacity-50 backdrop-blur-lg shadow-sm dark:bg-darkTheme dark:shadow-white/20'
              : ''
          }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <Link href="/" aria-label="Go to homepage">
          <Image
            src={isDarkMode ? assets.dharma_logo : assets.dharma_logo}
            alt="Dharma Bandaru Logo"
            className="w-28 mr-14 cursor-pointer"
            width={112}
            height={40}
            priority
          />
        </Link>

        <ul
          className={`hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3
            ${
              isScroll
                ? ''
                : 'bg-white shadow-sm bg-opacity-50 dark:border dark:border-white/50 dark:bg-transparent'
            }`}
          role="list"
        >
          <li>
            <a className="font-Ovo hover:underline" href="#top">
              Home
            </a>
          </li>
          <li>
            <a className="font-Ovo hover:underline" href="#work">
              Book Summaries
            </a>
          </li>
          <li>
            <a className="font-Ovo hover:underline" href="#about">
              Professional Profile
            </a>
          </li>
          <li>
            <a className="font-Ovo hover:underline" href="#contact">
              Contact me
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsDarkMode((prev) => !prev)}
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            className="p-2"
          >
            <Image
              src={isDarkMode ? assets.sun_icon : assets.moon_icon}
              alt=""
              className="w-6"
              width={24}
              height={24}
              aria-hidden="true"
            />
          </button>

          <a
            href="#contact"
            className="hidden lg:flex items-center gap-3 px-10 py-2.5 border
                border-gray-500 rounded-full ml-4 font-Ovo dark:border-white/50 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Contact me"
          >
            Contact
            <Image
              src={isDarkMode ? assets.arrow_icon_dark : assets.arrow_icon}
              alt=""
              className="w-3"
              width={12}
              height={12}
              aria-hidden="true"
            />
          </a>

          <button
            className="block md:hidden ml-3 p-2"
            onClick={openMenu}
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <Image
              src={isDarkMode ? assets.menu_white : assets.menu_black}
              alt=""
              className="w-6"
              width={24}
              height={24}
              aria-hidden="true"
            />
          </button>
        </div>

        <ul
          id="mobile-menu"
          ref={sideMenuRef}
          className="flex md:hidden flex-col gap-4 py-20
            px-10 fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen bg-rose-50
            transition duration-500 dark:bg-darkHover dark:text-white"
          role="menu"
          aria-label="Mobile navigation menu"
        >
          <button
            className="absolute right-6 top-6"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <Image
              src={isDarkMode ? assets.close_white : assets.close_black}
              alt=""
              className="w-5 cursor-pointer"
              width={20}
              height={20}
              aria-hidden="true"
            />
          </button>
          <li role="none">
            <a
              className="font-Ovo block w-full py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={closeMenu}
              href="#top"
              role="menuitem"
            >
              Home
            </a>
          </li>
          <li role="none">
            <a
              className="font-Ovo block w-full py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={closeMenu}
              href="#about"
              role="menuitem"
            >
              Professional Profile
            </a>
          </li>
          <li role="none">
            <a
              className="font-Ovo block w-full py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={closeMenu}
              href="#work"
              role="menuitem"
            >
              Book Summaries
            </a>
          </li>
          <li role="none">
            <a
              className="font-Ovo block w-full py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={closeMenu}
              href="#contact"
              role="menuitem"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
