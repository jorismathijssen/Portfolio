import { useTranslations } from "next-intl";
import { NewsletterForm } from "./newsletter-form";
import { Github, Linkedin } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="border-border bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid items-start gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">{t("newsletter_title")}</h3>
            <p className="text-muted-foreground max-w-sm">
              {t("newsletter_desc")}
            </p>
            <NewsletterForm />
          </div>

          <div className="space-y-6 md:text-right">
            <h3 className="text-lg font-semibold">{t("social_title")}</h3>
            <div className="flex gap-4 md:justify-end">
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-background border-border hover:border-primary/50 hover:text-primary rounded-full border p-2 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-background border-border hover:border-primary/50 hover:text-primary rounded-full border p-2 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} {siteConfig.name}. {t("rights")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
