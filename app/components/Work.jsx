import { assets, workData } from '@/assets/assets';
import { currentlyReading, enjoyedBooks } from '@/lib/books';
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
              onKeyDown={(e) => {
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

        {/* Divider */}
        <div className="flex items-center gap-4 my-16 fade-in-section">
          <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
          <span className="text-xs font-Ovo text-gray-400 dark:text-white/30 tracking-widest uppercase">
            More on the shelf
          </span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
        </div>

        {/* Currently Reading */}
        <div className="mb-14 fade-in-section">
          <div className="flex items-center gap-2 mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            <h3 className="text-sm font-semibold font-Ovo tracking-widest uppercase text-gray-500 dark:text-white/40">
              Currently Reading
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {currentlyReading.map((book, i) => (
              <div
                key={i}
                className="group relative rounded-xl border border-green-200 dark:border-green-900/40 bg-green-50/50 dark:bg-green-900/10 p-5 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full bg-green-100/60 dark:bg-green-900/20 -mr-6 -mt-6" />
                <p className="text-[10px] font-mono font-semibold text-green-600 dark:text-green-500 tracking-widest uppercase mb-2">
                  In Progress
                </p>
                <h4 className="text-lg font-semibold font-Ovo text-gray-800 dark:text-white mb-0.5">
                  {book.title}
                </h4>
                <p className="text-sm font-Ovo text-gray-500 dark:text-white/40 mb-3">
                  {book.author}
                </p>
                <p className="text-xs font-Ovo text-gray-500 dark:text-white/50 leading-relaxed">
                  {book.note}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Books I Enjoyed */}
        <div className="fade-in-section">
          <div className="flex items-baseline justify-between mb-8">
            <h3 className="text-2xl font-Ovo text-gray-800 dark:text-white">
              Books I&rsquo;ve Enjoyed
            </h3>
            <span className="text-xs font-Ovo text-gray-400 dark:text-white/30">
              No summaries — just worth reading
            </span>
          </div>
          <div className="space-y-0 divide-y divide-gray-100 dark:divide-white/5">
            {enjoyedBooks.map((book) => (
              <div
                key={book.title}
                className="group flex items-center gap-5 py-4 hover:bg-gray-50 dark:hover:bg-white/[0.02] -mx-4 px-4 transition-colors rounded-lg cursor-default"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold font-Ovo text-gray-800 dark:text-white text-sm sm:text-base leading-snug">
                    {book.title}
                  </p>
                  <p className={`text-xs font-Ovo mt-0.5 ${book.note ? 'italic text-gray-400 dark:text-white/30' : 'text-gray-400 dark:text-white/40'}`}>
                    {book.author}
                  </p>
                </div>
                <span className="shrink-0 text-xs font-Ovo text-gray-400 dark:text-white/30 bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded-full hidden sm:inline-block">
                  {book.tag}
                </span>
              </div>
            ))}
          </div>
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
