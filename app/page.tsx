import Image from "next/image";
import ProjectCard from "./components/ProjectCard";

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
        </header>

        <section className="mb-12" aria-labelledby="about-heading">
          <h2 id="about-heading" className="text-2xl font-semibold mb-4">About Me</h2>
          <p className="text-lg">
            I'm a passionate C# Software Developer specializing in building
            robust and efficient APIs. Currently, I'm working at 9292, where I
            contribute to developing high-performance software solutions that
            enhance user experiences in the transportation sector.
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
          <h2 id="projects-heading" className="text-2xl font-semibold mb-4">Projects</h2>
          <ProjectCard
            title="Real-time Transit API"
            description="Developed a high-performance API for real-time transit data, serving millions of requests daily."
            technologies={["C#", "ASP.NET Core", "SQL Server", "Azure"]}
            link="https://github.com/yourusername/real-time-transit-api"
          />
          <ProjectCard
            title="Route Optimization Algorithm"
            description="Implemented an efficient algorithm to optimize bus routes, reducing travel times by 15%."
            technologies={["C#", ".NET", "Algorithms"]}
            link="https://github.com/yourusername/route-optimization"
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

        <section aria-labelledby="contact-heading">
          <h2 id="contact-heading" className="text-2xl font-semibold mb-4">Contact</h2>
          <p className="text-lg">
            Feel free to reach out to me at{" "}
            <a
              href="mailto:me@jorismathijssen.nl"
              className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Send an email to Joris Mathijssen"
            >
              me@jorismathijssen.nl
            </a>
          </p>
        </section>
      </main>
    </div>
  );
}