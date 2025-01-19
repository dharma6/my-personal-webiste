import { assets, workData } from '@/assets/assets';
import Image from 'next/image';

const Work = (isDarkMode) => {
  return (
    <div id="work" className="w-full px-[12%] py-10 scroll-mt-20">
      <h4 className="text-center mb-2 text-lg font-Ovo">A page for Books</h4>
      <h2 className="text-center text-5xl font-Ovo">Curated Book Summaries</h2>
      <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo">
        Out of 10 pick-and-choose books, 5 feel like a second read, 2 compel me
        to write summaries. Here are the summaries, with more to come.
      </p>

      <div className="grid grid-cols-auto my-10 gap-5 dark:text-black">
        {workData.map((project, index) => (
          <div
            key={index}
            className="aspect-square bg-no-repeat bg-cover bg-center rounded-md
                relative cursor-pointer group"
            style={{ backgroundImage: `url(${project.bgImage})` }}
          >
            <div
              className="bg-white w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3
                    px-5 flex items-center justify-between duration-500 group-hover:bottom-7"
            >
              <div>
                <h2 className="font-semibold">{project.title}</h2>
                <p className="text-sm text-gray-700">{project.description}</p>
              </div>
              <div
                className="border rounded-full border-black w-9 aspect-square flex items-center justify-center shadow-black
                        group-hover:bg-lime-300 transition"
              >
                {/* Wrap the arrow icon with a link to the PDF */}
                <a
                  href={project.pdfUrl} // Link to the PDF
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-5"
                >
                  <Image src={assets.send_icon} alt="send icon" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
