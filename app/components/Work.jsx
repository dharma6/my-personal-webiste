import { assets, workData } from '@/assets/assets';
import Image from 'next/image';

// Metadata for the Work page
export const metadata = {
  title: 'Book Summaries by Dharma Bandaru | Curated Learning Resources',
  description:
    'Explore hand-picked summaries of influential books on leadership, habits, neuroscience, and culture. Carefully analyzed and distilled for maximum learning impact by Dharma Bandaru.',
  keywords: [
    'Book Summaries',
    'Dharma Bandaru',
    'Good To Great Summary',
    'Atomic Habits Summary',
    'Dopamine Nation Summary',
    'Culture PlayBook Summary',
    'Focus and Concentration',
    'Learning Resources',
    'Book Analysis',
    'Leadership Books',
    'Personal Development',
    'Professional Growth',
  ],
  openGraph: {
    title: 'Book Summaries by Dharma Bandaru | Curated Learning Resources',
    description:
      'Explore hand-picked summaries of influential books on leadership, habits, neuroscience, and culture.',
    type: 'article',
    article: {
      authors: ['Dharma Bandaru'],
      tags: [
        'Book Summaries',
        'Personal Development',
        'Leadership',
        'Professional Growth',
      ],
    },
    images: [
      {
        url: '/og-books-image.jpg', // Add this image to your public folder
        width: 1200,
        height: 630,
        alt: 'Curated Book Summaries by Dharma Bandaru',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book Summaries by Dharma Bandaru',
    description:
      'Curated summaries of impactful books on leadership, habits, and professional growth.',
    images: ['/og-books-image.jpg'],
  },
  // Add structured data for articles
  alternates: {
    canonical: 'https://dharmabandaru.com/work',
  },
};

const Work = () => {
  const handleCardClick = (pdfUrl) => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <main className="min-h-screen">
      <section
        id="work"
        className="w-full px-[12%] py-10 scroll-mt-20"
        aria-label="Book Summaries"
      >
        <header className="mb-12 fade-in-section">
          <h2 className="text-center mb-2 text-lg font-Ovo">
            A page for Books
          </h2>
          <h2 className="text-center text-5xl font-Ovo">
            Curated Book Summaries
          </h2>
          <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo">
            Out of 10 pick-and-choose books, 5 feel like a second read, 2 compel
            me to write summaries. Here are the summaries, with more to come.
          </p>
        </header>

        <div
          className="grid grid-cols-auto my-10 gap-5 dark:text-black fade-in-section"
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
    </main>
  );
};

// Add JSON-LD structured data
export const generateMetadata = async () => {
  return {
    structured: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      headline: 'Book Summaries by Dharma Bandaru',
      description:
        'Curated summaries of impactful books on leadership, habits, and professional growth.',
      author: {
        '@type': 'Person',
        name: 'Dharma Bandaru',
        url: 'https://dharmabandaru.com',
      },
      itemListElement: workData.map((book, index) => ({
        '@type': 'Article',
        position: index + 1,
        url: `https://dharmabandaru.com/work#${book.title
          .toLowerCase()
          .replace(/ /g, '-')}`,
        name: book.title,
        description: book.description,
      })),
    },
  };
};

export default Work;
