import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Terminal from "./components/Terminal";

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-10 focus:p-4 focus:bg-white focus:text-black"
      >
        Skip to main content
      </a>
      <main id="main-content" className="max-w-3xl mx-auto" tabIndex={-1}>
        <header className="mb-12 text-center" role="banner">
          <Image
            src="/4.webp"
            alt="Headshot of Joris Mathijssen, a C# Software Developer"
            width={150}
            height={150}
            className="rounded-full mx-auto mb-4"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <h1 className="text-4xl font-bold mb-2">Joris Mathijssen</h1>
          <p className="text-2xl text-gray-600 dark:text-gray-400">
            C# Software Developer
          </p>
          <div className="flex justify-center mt-4 space-x-4">
            <a
              href="https://github.com/jorismathijssen"
              data-id="githubLink" // Added data-id
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub className="text-2xl text-gray-600 dark:text-gray-400" />
            </a>
            <a
              href="https://www.linkedin.com/in/jorismathijssen/"
              data-id="linkedinLink" // Added data-id
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-2xl text-gray-600 dark:text-gray-400" />
            </a>
          </div>
        </header>

        <section className="mb-12" aria-labelledby="about-heading">
          <h2 id="about-heading" className="text-2xl font-semibold mb-4">
            About Me
          </h2>
          <p className="text-lg mb-4">
            I am a dedicated C# Software Developer with 9 years of experience
            specializing in building robust and scalable APIs.
          </p>
          <p className="text-lg mb-4">
            At{" "}
            <a
              href="https://9292.nl"
              target="_blank"
              rel="noopener noreferrer"
            >
              9292
            </a>
            , the Netherlands’ leading public transport platform, I design and
            maintain backend systems that enable millions of travelers to plan
            their journeys and access real-time travel information every day.
          </p>
          <p className="text-lg">
            My passion lies in creating reliable digital solutions that make public
            transport more accessible and efficient for everyone. I thrive in
            collaborative environments and enjoy solving complex challenges that
            have a real impact on daily life in the Netherlands.
          </p>
        </section>
      </main>
      <Terminal />
    </div>
  );
}
