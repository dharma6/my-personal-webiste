import { assets } from '@/assets/assets';
import Image from 'next/image';
import Head from 'next/head';

const Header = () => {
  const title = 'Dharma Bandaru - Personal Website';
  const description =
    "Welcome to Dharma Bandaru's personal website featuring book summaries, professional journey, and projects. Explore curated content about technology and personal development.";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>

      <header className="w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-2">
        <div>
          <Image
            src={assets.dharma_profile}
            alt="Dharma Bandaru's profile picture"
            className="rounded-full w-32"
            priority
            width={128}
            height={128}
          />
        </div>
        <h1 className="flex items-end gap-2 text-xl md:text-2xl mb-3 font-Ovo">
          Hi I'm Dharma Bandaru{' '}
          <Image
            src={assets.hand_icon}
            alt="Waving hand emoji"
            className="w-6"
            width={24}
            height={24}
          />{' '}
        </h1>
        <h2 className="flex items-end gap-2 text-xl md:text-2xl mb-3 font-Ovo">
          Why I Built This Website?
        </h2>
        <ul
          className="max-w-2xl mx-auto font-Ovo list-disc list-inside mb-3 text-lg md:text-xl"
          role="list"
        >
          <li>Share curated summaries of my favorite books.</li>
          <li>
            Reflect my profesional journey, projects, and the tools I use.
          </li>
          <li>And a mix of everything</li>
        </ul>
      </header>
    </>
  );
};

export default Header;
