import { assets } from '@/assets/assets';
import Image from 'next/image';

// Metadata configuration (move this to your page.js or layout.js)
export const metadata = {
  title: 'Dharma Teja Bandaru - Backend Engineer & AI Developer',
  description:
    "Welcome to Dharma Bandaru's personal website featuring book summaries, professional journey, and projects. Explore curated content about technology and personal development.",
  openGraph: {
    title: 'Dharma Teja Bandaru - Backend Engineer & AI Developer',
    description:
      "Welcome to Dharma Bandaru's personal website featuring book summaries, professional journey, and projects.",
    type: 'website',
    images: [
      {
        url: '/og-home-image.jpg', // Add this image to your public folder
        width: 1200,
        height: 630,
        alt: 'Dharma Teja Bandaru - Backend Engineer & AI Developer',
      },
    ],
  },
};

const Header = () => {
  return (
    <header className="w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-2">
      <div className="mb-6">
        <Image
          src={assets.dharma_profile}
          alt="Dharma Teja Bandaru - Backend Engineer & AI Developer"
          className="rounded-full w-32"
          priority
          width={128}
          height={128}
        />
      </div>

      {/* Main H1 heading for the entire page */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-Ovo mb-6">
        Hi, I'm Dharma Bandaru{' '}
        <span className="inline-flex items-center">
          <Image
            src={assets.hand_icon}
            alt=""
            className="w-6 ml-2"
            width={24}
            height={24}
            aria-hidden="true"
          />
        </span>
      </h1>

      {/* Changed from h2 to div to maintain semantic structure */}
      <div className="text-xl md:text-2xl mb-3 font-Ovo text-gray-700 dark:text-gray-300">
        Why I Built This Website
      </div>

      <ul
        className="max-w-2xl mx-auto font-Ovo list-disc list-inside mb-3 text-lg md:text-xl space-y-2"
        role="list"
      >
        <li className="text-gray-800 dark:text-gray-200">
          Share curated summaries of my favorite books
        </li>
        <li className="text-gray-800 dark:text-gray-200">
          Reflect my professional journey, projects, and the tools I use
        </li>
        <li className="text-gray-800 dark:text-gray-200">
          And a mix of everything
        </li>
      </ul>
    </header>
  );
};

export default Header;
