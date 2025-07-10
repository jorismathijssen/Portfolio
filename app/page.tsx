"use client";

import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Terminal from "./components/Terminal";
import { useTranslation, Trans } from "react-i18next";
import React, { useState, useEffect } from "react";

/**
 * Main landing page for the portfolio app.
 * - Displays timeline, project cards, and the interactive terminal.
 */
export default function Home() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
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
          <h1 className="text-4xl font-bold mb-2">{t("header.title")}</h1>
          <p className="text-2xl text-gray-600 dark:text-gray-400">
            <Trans
              i18nKey="header.role"
              components={{
                1: (
                  <a
                    href="https://9292.nl"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="9292 mobiliteitsplatform"
                    className="underline text-blue-700 hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                ),
              }}
            />
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
            {t("about.heading")}
          </h2>
          <p className="text-lg mb-4">{t("about.intro")}</p>
          <p className="text-lg mb-4">{t("about.exp")}</p>
          <p className="text-lg mb-4">
            <Trans
              i18nKey="about.scrum"
              components={{
                1: (
                  <a
                    href="https://www.scrum.org/professional-scrum-certifications/professional-scrum-master-assessments"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Scrum Master certificering"
                    className="underline text-blue-700 hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                ),
              }}
            />
          </p>
          <ul className="list-disc pl-8 mb-4 space-y-1 text-base text-gray-800 dark:text-gray-200">
            {(t("about.skills", { returnObjects: true }) as string[]).map(
              (skill, idx) => (
                <li key={idx}>{skill}</li>
              )
            )}
          </ul>
        </section>
      </main>
      <Terminal />
    </div>
  );
}
