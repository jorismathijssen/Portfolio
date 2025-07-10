import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Terminal from "./components/Terminal";

/**
 * Main landing page for the portfolio app.
 * - Displays timeline, project cards, and the interactive terminal.
 */
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
            src="/profile_pic_300x300.webp"
            alt="Headshot of Joris Mathijssen, a C# Software Developer"
            width={150}
            height={150}
            className="rounded-full mx-auto mb-4"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <h1 className="text-4xl font-bold mb-2">Joris Mathijssen</h1>
          <p className="text-2xl text-gray-600 dark:text-gray-400">
            Senior .NET Developer bij{" "}
            <a
              href="https://9292.nl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="9292 mobiliteitsplatform"
            >
              9292
            </a>
          </p>
          <div className="flex justify-center mt-4 space-x-4">
            <a
              href="https://github.com/jorismathijssen"
              data-id="githubLink"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub className="text-2xl text-gray-600 dark:text-gray-400" />
            </a>
            <a
              href="https://www.linkedin.com/in/jorismathijssen/"
              data-id="linkedinLink"
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
            Over Mij
          </h2>
          <p className="text-lg mb-4">
            Senior .NET Developer gespecialiseerd in schaalbare API’s en moderne
            .NET 8 architectuur
          </p>
          <p className="text-lg mb-4">
            Ik ben een ervaren C# ontwikkelaar met focus op het bouwen van
            schaalbare en betrouwbare backends met moderne .NET-technologieën. Bij
            een toonaangevend mobiliteitsplatform in Nederland werk ik aan
            systemen die dagelijks miljoenen reizigers voorzien van actuele
            reisdata en adviezen.
          </p>
          <p className="text-lg mb-4">
            Mijn werk combineert technische diepgang met pragmatische samenwerking
            in multidisciplinaire Scrum-teams. Dankzij mijn{" "}
            <a
              href="https://www.scrum.org/professional-scrum-certifications/professional-scrum-master-assessments"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Scrum Master certificering"
              className="underline text-blue-700 hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Scrum Master-certificering
            </a>{" "}
            help ik teams gestructureerd waarde leveren met een sterke focus op
            kwaliteit, onderhoudbaarheid en performance.
          </p>
          <ul className="list-disc pl-8 mb-4 space-y-1 text-base text-gray-800 dark:text-gray-200">
            <li>
              <span className="font-medium text-gray-900 dark:text-white">
                .NET 8 / ASP.NET Core:
              </span>{" "}
              RESTful APIs, background services
            </li>
            <li>
              <span className="font-medium text-gray-900 dark:text-white">
                Clean Architecture, Domain-Driven Design:
              </span>{" "}
              testbare code
            </li>
            <li>
              <span className="font-medium text-gray-900 dark:text-white">
                DevOps:
              </span>{" "}
              GitHub Actions, Docker, structured logging &amp; observability
            </li>
            <li>
              <span className="font-medium text-gray-900 dark:text-white">
                Infrastructure-as-Code:
              </span>{" "}
              veilige en herhaalbare deployments
            </li>
            <li>
              <span className="font-medium text-gray-900 dark:text-white">
                Agile/Scrum:
              </span>{" "}
              technische begeleiding en sprintvoorbereiding
            </li>
          </ul>
        </section>
      </main>
      <Terminal />
    </div>
  );
}
