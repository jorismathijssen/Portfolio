"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function Hero() {
  const t = useTranslations("HomePage");

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16"
    >
      <div className="bg-grid-white/[0.02] absolute inset-0 bg-[size:50px_50px]" />
      <div className="bg-background absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <div className="relative z-10 container mx-auto px-4">
        <div className="mx-auto max-w-3xl space-y-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              {t("title")}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-muted-foreground text-xl md:text-2xl">
              {t("role")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="#about"
              className="bg-primary text-primary-foreground rounded-full px-6 py-3 transition-opacity hover:opacity-90"
            >
              {t("about")}
            </a>
            <a
              href="#work"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-full px-6 py-3 transition-colors"
            >
              {t("work")}
            </a>
            <a
              href="mailto:contact@joris.com"
              className="border-border hover:bg-muted rounded-full border px-6 py-3 transition-colors"
            >
              {t("contact")}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
