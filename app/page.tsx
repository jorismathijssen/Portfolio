import Image from "next/image";
// import ProjectCard from "./components/ProjectCard";
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
            <a href="https://github.com/jorismathijssen" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub className="text-2xl text-gray-600 dark:text-gray-400" />
            </a>
            <a href="https://www.linkedin.com/in/jorismathijssen/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin className="text-2xl text-gray-600 dark:text-gray-400" />
            </a>
          </div>
        </header>

        <section className="mb-12" aria-labelledby="about-heading">
          <h2 id="about-heading" className="text-2xl font-semibold mb-4">About Me</h2>
          <p className="text-lg">
            Experienced C# Developer with 8 years in building scalable APIs.
            <br />
            Employed by <a href="https://ict.eu" target="_blank" rel="noopener noreferrer">ICT Group</a> and seconded to <a href="https://9292.nl" target="_blank" rel="noopener noreferrer">9292</a>, enhancing the Netherlands&apos; leading transport platforms.
          </p>
        </section>
      </main>
    </div>
  );
}
