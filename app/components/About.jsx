import { assets, infoList, toolsData } from '@/assets/assets';
import Image from 'next/image';
import Head from 'next/head';

const About = ({ isDarkMode }) => {
  const title = 'About Dharma Bandaru - Backend Engineer & AI Developer';
  const description =
    'Learn about Dharma Bandaru, a backend engineer based in Austin, TX, specializing in Gen-AI agents, RAG applications, and AWS services. Explore my technical expertise and tools.';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="profile" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>

      <section
        id="about"
        className="w-full px-4 sm:px-10 lg:px-[12%] py-10 scroll-mt-20"
        aria-label="About Dharma Bandaru"
      >
        <h2 className="text-center mb-2 text-lg font-Ovo">Introduction</h2>
        <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl font-Ovo">
          About me
        </h1>

        <div className="flex w-full flex-col lg:flex-row items-center gap-12 lg:gap-20 my-20">
          <div className="w-48 sm:w-64 lg:w-80 rounded-3xl max-w-none">
            <Image
              src={assets.user_image}
              alt="Dharma Bandaru profile photograph"
              className="w-full rounded-3xl"
              width={300}
              height={300}
              priority
            />
          </div>
          <div className="flex-1">
            <ul className="mb-10 max-w-2xl font-Ovo list-disc pl-5" role="list">
              <li>
                Based in Austin, TX, and currently building and enhancing Gen-AI
                agents in a Retrieval-Augmented Generation (RAG) Application.
              </li>
              <li>
                Primarily a backend engineer with expertise in designing,
                developing, and deploying APIs.
              </li>
              <li>
                Experienced in unit testing to deliver reliable and maintainable
                solutions.
              </li>
              <li>
                Proficient with AWS services such as Lambda, API Gateway,
                DynamoDB, Bedrock, Kendra, and S3.
              </li>
              <li>
                Familiar with React.js and Next.js, contributing to UI bug fixes
                and straightforward feature implementations.
              </li>
              <li>
                Passionate about automating processes with pipelines and CI/CD
                workflows using tools like Jenkins and GitHub.
              </li>
              <li>
                A strong advocate for security, identifying and addressing
                vulnerabilities using tools like Prisma and Wiz.
              </li>
            </ul>

            <ul
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-2xl"
              role="list"
            >
              {infoList.map(({ icon, iconDark, title, description }, index) => (
                <li
                  className="border-[0.5px] border-gray-400 rounded-xl p-6 cursor-pointer hover:bg-lightHover
                    hover:-translate-y-1 duration-300 hover:shadow-black dark:border-white dark:hover:shadow-white dark:hover:bg-darkHover/50"
                  key={`info-${index}`}
                >
                  <Image
                    src={icon}
                    alt={`${title} icon`}
                    className="w-7 mt-3"
                    width={28}
                    height={28}
                  />
                  <h3 className="my-4 font-sembold text-gray-700 dark:text-white">
                    {title}
                  </h3>
                  <p className="text-gray-600 text-sm dark:text-white/80">
                    {description}
                  </p>
                </li>
              ))}
            </ul>

            <h3 className="my-6 text-gray-700 font-Ovo dark:text-white/80">
              Tools I use
            </h3>
            <ul className="flex flex-wrap gap-3 sm:gap-5" role="list">
              {toolsData.map((tool, index) => (
                <li
                  className="flex items-center justify-center
                    w-12 sm:w-14 aspect-square border border-gray-400
                    rounded-lg cursor-pointer hover:-translate-y-1 duration-500"
                  key={`tool-${index}`}
                >
                  <Image
                    src={tool}
                    alt={`Development tool ${index + 1}`}
                    className="w-5 sm:w-7"
                    width={28}
                    height={28}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex justify-center items-center flex-wrap gap-4 mt-4">
          <a
            href="https://www.linkedin.com/in/dharmatejabandaru/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-3 border rounded-full border-gray-500 flex items-center gap-2 dark:text-black bg-white"
            aria-label="Visit Dharma Bandaru's LinkedIn profile"
          >
            LinkedIn{' '}
            <Image
              src={assets.linkedin}
              alt="LinkedIn icon"
              className="w-4"
              width={16}
              height={16}
            />
          </a>

          <a
            href="https://www.credly.com/users/dharmabandaru"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-3 border rounded-full border-gray-500 flex items-center gap-2 dark:text-black bg-white"
            aria-label="View Dharma Bandaru's certifications on Credly"
          >
            Credly{' '}
            <Image
              src={assets.credly}
              alt="Credly icon"
              className="w-12"
              width={48}
              height={48}
            />
          </a>

          <a
            href="Dharma_Bandaru_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-3 border rounded-full border-gray-500 flex items-center gap-2 dark:text-black bg-white"
            aria-label="Download Dharma Bandaru's resume"
          >
            My resume{' '}
            <Image
              src={assets.download_icon}
              alt="Download icon"
              className="w-4"
              width={16}
              height={16}
            />
          </a>
        </div>
      </section>
    </>
  );
};

export default About;
