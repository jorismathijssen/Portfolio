import { PortfolioData } from "@/types/portfolio";

export function getPortfolioData(t: (key: string) => string): PortfolioData {
  return {
    meta: {
      status: 200,
      headers: {
        "content-type": "application/json",
        server: "nginx/1.25.3",
        "x-powered-by": ".NET 8 (Simulated)",
        "x-region": "eu-west-1",
        "x-runtime": "24ms",
      },
    },
    data: {
      name: t("HomePage.title"),
      role: t("HomePage.role"),
      company: "9292",
      about: {
        title: t("About.title"),
        summary: t("About.description"),
        details: t("About.description2"),
        hobbies: {
          title: t("About.hobbies_title"),
          items: [
            t("About.hobbies.0"),
            t("About.hobbies.1"),
            t("About.hobbies.2"),
            t("About.hobbies.3"),
            t("About.hobbies.4"),
          ],
        },
        strengths: {
          title: t("About.strengths_title"),
          items: [
            t("About.strengths.0"),
            t("About.strengths.1"),
            t("About.strengths.2"),
            t("About.strengths.3"),
            t("About.strengths.4"),
          ],
        },
      },
      work: {
        title: t("Work.title"),
        items: [
          {
            company: "9292",
            role: t("Work.role_9292"),
            period: "20XX - Present",
            description: t("Work.desc_9292"),
            tags: [
              ".NET 8",
              "Distributed Systems",
              "Azure",
              "API Design",
              "Team Leadership",
            ],
            url: "https://9292.nl",
          },
        ],
      },
      contact: {
        email: "me@jorismathijssen.nl",
        github: "https://github.com/jorismathijssen",
        linkedin: "https://linkedin.com/in/jorismathijssen",
      },
    },
  };
}
