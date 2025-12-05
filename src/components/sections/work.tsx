"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Building2, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function Work() {
  const t = useTranslations("Work");

  return (
    <section id="work" className="bg-muted/30 px-4 py-24">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-12 text-3xl font-bold tracking-tight md:text-4xl">
            {t("title")}
          </h2>

          <Link
            href="/work/9292"
            className="group bg-background border-border/50 hover:border-primary/50 relative block overflow-hidden rounded-3xl border transition-all duration-300"
          >
            <div className="p-8 md:p-12">
              <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
                <div className="space-y-4">
                  <div className="text-primary flex items-center gap-3 font-mono text-sm">
                    <span className="bg-primary/10 rounded-full px-3 py-1">
                      20XX - Present
                    </span>
                    <span className="flex items-center gap-1">
                      <Building2 className="h-4 w-4" /> 9292
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold md:text-3xl">
                    {t("role_9292")}
                  </h3>
                  <p className="text-muted-foreground max-w-2xl text-lg">
                    {t("desc_9292")}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-4">
                    {[
                      ".NET 8",
                      "Distributed Systems",
                      "Azure",
                      "API Design",
                      "Team Leadership",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="bg-muted border-border rounded-md border px-3 py-1 text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground inline-flex h-12 w-12 items-center justify-center rounded-full transition-all group-hover:scale-110">
                  <ArrowUpRight className="h-6 w-6" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
