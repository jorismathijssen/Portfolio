import Image from "next/image";
import ProjectCard from "./components/ProjectCard";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-10 focus:p-4 focus:bg-white focus:text-black">
        Skip to main content
      </a>
      <main id="main-content" className="max-w-3xl mx-auto" tabIndex={-1}>
        <header className="mb-12 text-center" role="banner">
          <Image
            src="/4.png"
            alt="Headshot of Joris Mathijssen, a C# Software Developer"
            width={150}
            height={150}
            className="rounded-full mx-auto mb-4"
          />
          <h1 className="text-4xl font-bold mb-2">Joris Mathijssen</h1>
          <p className="text-2xl text-gray-600 dark:text-gray-400">
            C# Software Developer
          </p>
          <div className="flex justify-center mt-4 space-x-4">
            <a href="https://github.com/jorismathijssen" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub className="text-2xl text-gray-600 dark:text-gray-400 hover:text-blue-600" />
            </a>
            <a href="https://www.linkedin.com/in/jorismathijssen/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin className="text-2xl text-gray-600 dark:text-gray-400 hover:text-blue-600" />
            </a>
          </div>
        </header>

        <section className="mb-12" aria-labelledby="about-heading">
          <h2 id="about-heading" className="text-2xl font-semibold mb-4">About Me</h2>
          <p className="text-lg">
            I am a dedicated and innovative C# Software Developer with a strong focus on creating scalable and efficient APIs. Currently, I am contributing to the development of high-performance software solutions at 9292, enhancing user experiences in the transportation sector.
          </p>
        </section>

        <section className="mb-12" aria-labelledby="skills-heading">
          <h2 id="skills-heading" className="text-2xl font-semibold mb-4">Skills</h2>
          <ul className="list-disc list-inside text-lg">
            <li aria-label="C# and .NET Framework">C# and .NET Framework</li>
            <li aria-label="RESTful API Design and Development">RESTful API Design and Development</li>
            <li aria-label="ASP.NET Core">ASP.NET Core</li>
            <li aria-label="SQL Server and Entity Framework">SQL Server and Entity Framework</li>
            <li aria-label="Azure Cloud Services">Azure Cloud Services</li>
            <li aria-label="Agile Methodologies">Agile Methodologies</li>
          </ul>
        </section>

        <section className="mb-12" aria-labelledby="projects-heading">
          <h2 id="projects-heading" className="text-2xl font-semibold mb-4">Projects (Template)</h2>
          <ProjectCard
            title="Lorem Ipsum Project 1"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam."
            technologies={["Lorem", "Ipsum", "Dolor"]}
            link="#"
          />
          <ProjectCard
            title="Lorem Ipsum Project 2"
            description="Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris."
            technologies={["Lorem", "Ipsum", "Dolor"]}
            link="#"
          />
        </section>

        <section className="mb-12" aria-labelledby="experience-heading">
          <h2 id="experience-heading" className="text-2xl font-semibold mb-4">Experience</h2>
          <div className="mb-6">
            <h3 className="text-xl font-medium">
              C# Software Developer at 9292
            </h3>
            <p className="text-gray-600 dark:text-gray-400">2020 - Present</p>
            <ul className="list-disc list-inside mt-2">
              <li>
                Develop and maintain APIs for real-time transportation data
              </li>
              <li>Optimize backend services for high-traffic scenarios</li>
              <li>
                Collaborate with cross-functional teams to improve user
                experience
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
