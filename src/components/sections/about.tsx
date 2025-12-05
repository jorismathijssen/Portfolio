"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Cpu, Code2, Network, BookOpen, Gamepad2 } from "lucide-react";

export function About() {
  const t = useTranslations("About");

  const hobbies = [
    { icon: Network, label: t("hobbies.0") },
    { icon: Gamepad2, label: t("hobbies.1") },
    { icon: Code2, label: t("hobbies.2") },
    { icon: BookOpen, label: t("hobbies.3") },
    { icon: Cpu, label: t("hobbies.4") },
  ];

  const strengths = [
    t("strengths.0"),
    t("strengths.1"),
    t("strengths.2"),
    t("strengths.3"),
    t("strengths.4"),
  ];

  return (
    <section id="about" className="px-4 py-24">
      <div className="container mx-auto max-w-4xl space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {t("title")}
          </h2>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t("description")}
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t("description2")}
            </p>
          </div>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold">{t("strengths_title")}</h3>
            <ul className="space-y-3">
              {strengths.map((strength, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="text-muted-foreground flex items-start gap-3"
                >
                  <span className="bg-primary mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
                  {strength}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold">{t("hobbies_title")}</h3>
            <div className="flex flex-wrap gap-2">
              {hobbies.map((hobby, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i }}
                  className="bg-muted text-muted-foreground flex items-center gap-2 rounded-full px-3 py-1 text-sm"
                >
                  <hobby.icon className="h-4 w-4" />
                  {hobby.label}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
