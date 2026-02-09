import { assets, investmentJourney, investmentLessons } from '@/assets/assets';
import Head from 'next/head';
import Image from 'next/image';

const InvestmentThesis = ({ isDarkMode }) => {
  const title =
    'Investment Thesis - Dharma Bandaru | Investing Journey & Philosophy';
  const description =
    "Explore Dharma Bandaru's investment philosophy and journey. Learn about options trading, ETF investing, and building wealth through consistency and patience.";

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
        id="investment-thesis"
        className="w-full px-4 sm:px-10 lg:px-[12%] py-10 scroll-mt-20"
        aria-label="Investment Thesis and Journey"
      >
        <header className="mb-12 fade-in-section">
          <h2 className="text-center mb-2 text-lg font-Ovo">
            Lessons from the Market
          </h2>
          <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-Ovo">
            Investment Thesis
          </h2>
        </header>

        <div className="flex w-full flex-col lg:flex-row items-start gap-12 lg:gap-20 my-20 fade-in-section">
          {/* Visual Element */}
          <div className="w-full lg:w-80 flex justify-center lg:justify-start">
            <div className="w-64 sm:w-80 lg:w-full max-w-sm hover:scale-105 transition-transform duration-300">
              <Image
                src={assets.investment_icon}
                alt=""
                className="w-full"
                width={300}
                height={300}
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            {/* Four Lessons I Trust */}
            <article className="mb-12" aria-label="Four Key Investment Lessons">
              <h3 className="text-2xl sm:text-3xl font-Ovo mb-4 text-gray-800 dark:text-white">
                Four Lessons I Trust
              </h3>
              <p className="text-gray-600 dark:text-white/80 mb-8 font-Ovo">
                If you don't read anything else, read this. If you find these
                interesting, the story behind them is in the next section.
              </p>

              <ol className="space-y-6" role="list">
                {investmentLessons.map((lesson, index) => (
                  <li
                    key={`lesson-${index}`}
                    className="border border-gray-300 dark:border-white/20 rounded-xl p-6
                      hover:bg-gray-50 dark:hover:bg-gray-800/50
                      hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-white/10
                      transition-all duration-300 fade-in-section"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex gap-4">
                      <span className="text-3xl font-bold text-green-600 dark:text-green-400 flex-shrink-0">
                        {lesson.number}.
                      </span>
                      <div>
                        <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                          {lesson.title}
                          {lesson.subtitle && (
                            <span className="text-base font-normal text-gray-600 dark:text-white/70">
                              {' '}
                              {lesson.subtitle}
                            </span>
                          )}
                        </h4>
                        <p className="text-gray-600 dark:text-white/80 leading-relaxed">
                          {lesson.description}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </article>

            {/* Investment Journey Story */}
            <article
              className="mt-16 fade-in-section"
              aria-label="Investment Journey Story"
            >
              <h3 className="text-2xl sm:text-3xl font-Ovo mb-6 text-gray-800 dark:text-white">
                My Journey Into Investing
              </h3>

              <div className="space-y-6 text-gray-600 dark:text-white/80 leading-relaxed">
                {investmentJourney.intro
                  .split('\n\n')
                  .map((paragraph, index) => (
                    <p key={`intro-${index}`} className="font-Ovo">
                      {paragraph}
                    </p>
                  ))}

                {investmentJourney.sections.map((section, index) => (
                  <div key={`section-${index}`} className="mt-8">
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                      {section.title}
                    </h4>
                    {section.content.split('\n\n').map((paragraph, pIndex) => (
                      <p
                        key={`section-${index}-p-${pIndex}`}
                        className="mb-4 font-Ovo"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
};

export default InvestmentThesis;
