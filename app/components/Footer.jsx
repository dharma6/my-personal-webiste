import { assets } from '@/assets/assets';
import Image from 'next/image';

const Footer = ({ isDarkMode }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20" role="contentinfo" aria-label="Site footer">
      <div className="text-center">
        <Image
          src={isDarkMode ? assets.dharma_logo : assets.dharma_logo}
          alt="Dharma Bandaru Logo"
          className="w-36 mx-auto mb-2"
          width={144}
          height={48}
        />
        <div className="w-max flex items-center gap-2 mx-auto">
          <Image
            src={isDarkMode ? assets.mail_icon_dark : assets.mail_icon}
            alt="Email"
            className="w-6"
            width={24}
            height={24}
          />
          <a
            href="mailto:dharmatejabandaru@gmail.com"
            className="hover:underline"
            aria-label="Send email to dharmatejabandaru@gmail.com"
          >
            dharmatejabandaru@gmail.com
          </a>
        </div>
      </div>

      <div className="text-center sm:flex items-center justify-between border-t border-gray-400 mx-[10%] mt-12 py-6">
        <p>
          <small>© {currentYear} Dharma Bandaru. All rights reserved</small>
        </p>

        <nav aria-label="Social media links">
          <ul
            className="flex items-center gap-10 justify-center mt-4 sm:mt-0"
            role="list"
          >
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.strava.com/athletes/115321488"
                className="hover:underline"
                aria-label="Visit Dharma's Strava profile"
              >
                Strava
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://leetcode.com/u/Dharma_Bandaru/"
                className="hover:underline"
                aria-label="Visit Dharma's LeetCode profile"
              >
                LeetCode
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
