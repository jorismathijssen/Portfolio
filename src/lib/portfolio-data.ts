import { PortfolioData } from "@/types/portfolio";
import { siteConfig } from "@/config/site";

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
      name: siteConfig.name,
      role: siteConfig.role,
      company: siteConfig.company,
      about: {
        title: t("About.title"),
        summary: siteConfig.bio.short,
        details: siteConfig.bio.long,
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
        email: siteConfig.email,
        github: siteConfig.socials.github,
        linkedin: siteConfig.socials.linkedin,
      },
    },
  };
}
