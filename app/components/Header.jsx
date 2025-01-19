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
    </div>
  );
};

export default Header;
