import { assets } from '@/assets/assets';
import Image from 'next/image';
const Header = () => {
  return (
    <div
      className="w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center
     gap-2"
    >
      <div>
        <Image
          src={assets.dharma_profile}
          alt=""
          className="rounded-full w-32"
        />
      </div>
      <h2 className="flex items-end-gap-2 text-xl md:text-2xl mb-3 font-Ovo">
        Hi I'm Dharma Bandaru{' '}
        <Image src={assets.hand_icon} alt="" className="w-6" />{' '}
      </h2>
      <h3 className="flex items-end gap-2 text-xl md:text-2xl mb-3 font-Ovo">
        Why I Built This Website?
      </h3>
      <ul className="max-w-2xl mx-auto font-Ovo list-disc list-inside mb-3">
        <li>Share curated summaries of my favorite books.</li>
        <li>
          Reflect on my professional journey,experiences and lessons learnt
        </li>
        <li>And a mix of everything</li>
      </ul>

      <div className="flex flex-col sm:flex-row  items-center gap-4 mt-4">
        <a
          href="#contact"
          className="px-10 py-3 border-white rounded-full bg-black text-white flex items-center gap-2 dark:bg-transparent"
        >
          contact me{' '}
          <Image src={assets.right_arrow_white} alt="" className="w-4" />
        </a>
        <a
          href="/sample-resume.pdf"
          download
          className="px-10 py-3 border rounded-full border-gray-500 flex items-ceneter gap-2 dark:text-black bg-white"
        >
          My resume <Image src={assets.download_icon} alt="" className="w-4" />
        </a>
      </div>
    </div>
  );
};

export default Header;
