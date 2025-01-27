import { assets, workData } from '@/assets/assets';
import Image from 'next/image';
import Head from 'next/head';

const Work = () => {
  const title = 'Book Summaries by Dharma Bandaru';
  const description =
    'Explore curated summaries of impactful books, carefully selected and analyzed to share key insights and learning experiences.';

  const handleCardClick = (pdfUrl) => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>

      <section
        id="work"
        className="w-full px-[12%] py-10 scroll-mt-20"
        aria-label="Book Summaries"
      >
        <h2 className="text-center mb-2 text-lg font-Ovo">A page for Books</h2>
        <h1 className="text-center text-5xl font-Ovo">
          Curated Book Summaries
        </h1>
        <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo">
          Out of 10 pick-and-choose books, 5 feel like a second read, 2 compel
          me to write summaries. Here are the summaries, with more to come.
        </p>
        <div
          className="grid grid-cols-auto my-10 gap-5 dark:text-black"
          role="list"
          aria-label="Book summary cards"
        >
          {workData.map((project, index) => (
            <article
              key={`book-summary-${index}`}
              onClick={() => handleCardClick(project.pdfUrl)}
              className="aspect-square bg-no-repeat bg-cover bg-center rounded-md
                relative cursor-pointer group"
              style={{ backgroundImage: `url(${project.bgImage})` }}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleCardClick(project.pdfUrl);
                }
              }}
              aria-label={`Read summary of ${project.title}`}
            >
              <div
                className="bg-white w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3
                  px-5 flex items-center justify-between duration-500 group-hover:bottom-7"
              >
                <div>
                  <h3 className="font-semibold">{project.title}</h3>
                  <p className="text-sm text-gray-700">{project.description}</p>
                </div>
                <div
                  className="border rounded-full border-black w-9 aspect-square flex items-center justify-center shadow-black
                    group-hover:bg-lime-300 transition"
                  aria-hidden="true"
                >
                  <div className="w-5">
                    <Image
                      src={assets.send_icon}
                      alt=""
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default Work;
