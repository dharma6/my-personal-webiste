import { assets, infoList, toolsData } from '@/assets/assets';
import Image from 'next/image';

const About = (isDarkMode) => {
  return (
    <div
      id="about"
      className="w-full px-4 sm:px-10 lg:px-[12%] py-10 scroll-mt-20"
    >
      <h4 className="text-center mb-2 text-lg font-Ovo">Introduction</h4>
      <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-Ovo">
        About me
      </h2>

      <div className="flex w-full flex-col lg:flex-row items-center gap-12 lg:gap-20 my-20">
        <div className="w-48 sm:w-64 lg:w-80 rounded-3xl max-w-none">
          <Image
            src={assets.user_image}
            alt="user"
            className="w-full rounded-3xl"
            width={300}
            height={300}
          />
        </div>
        <div className="flex-1">
          <ul className="mb-10 max-w-2xl font-Ovo list-disc pl-5">
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

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-2xl">
            {infoList.map(({ icon, iconDark, title, description }, index) => (
              <li
                className="border-[0.5px] border-gray-400 rounded-xl p-6 cursor-pointer hover:bg-lightHover
                    hover:-translate-y-1 duration-300 hover:shadow-black dark:border-white dark:hover:shadow-white dark:hover:bg-darkHover/50"
                key={index}
              >
                <Image src={icon} alt={title} className="w-7 mt-3" />
                <h3 className="my-4 font-sembold text-gray-700 dark:text-white">
                  {title}
                </h3>
                <p className="text-gray-600 text-sm dark:text-white/80">
                  {description}
                </p>
              </li>
            ))}
          </ul>

          <h4 className="my-6 text-gray-700 font-Ovo dark:text-white/80">
            Tools I use
          </h4>
          <ul className="flex flex-wrap gap-3 sm:gap-5">
            {toolsData.map((tool, index) => (
              <li
                className="flex items-center justify-center
                    w-12 sm:w-14 aspect-square border border-gray-400
                    rounded-lg cursor-pointer hover:-translate-y-1 duration-500"
                key={index}
              >
                <Image src={tool} alt="Tool" className="w-5 sm:w-7" />
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
        >
          LinkedIn <Image src={assets.linkedin} alt="Arrow" className="w-4" />
        </a>

        <a
          href="https://www.credly.com/users/dharmabandaru "
          target="_blank"
          rel="noopener noreferrer"
          className="px-10 py-3 border rounded-full border-gray-500 flex items-center gap-2 dark:text-black bg-white"
        >
          Credly <Image src={assets.credly} alt="Arrow" className="w-12" />
        </a>

        <a
          href="Dharma_Bandaru_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="px-10 py-3 border rounded-full border-gray-500 flex items-center gap-2 dark:text-black bg-white"
        >
          My resume <Image src={assets.download_icon} alt="" className="w-4" />
        </a>
      </div>
    </div>
  );
};

export default About;
