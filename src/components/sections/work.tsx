"use client"

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Building2, ArrowUpRight } from 'lucide-react'

export function Work() {
  const t = useTranslations('Work')

  return (
    <section id="work" className="py-24 px-4 bg-muted/30">
      <div className="container max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">{t('title')}</h2>
          
          <div className="group relative overflow-hidden rounded-3xl bg-background border border-border/50 hover:border-primary/50 transition-all duration-300">
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 md:items-start justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-primary font-mono text-sm">
                    <span className="px-3 py-1 rounded-full bg-primary/10">20XX - Present</span>
                    <span className="flex items-center gap-1">
                      <Building2 className="w-4 h-4" /> 9292
                    </span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold">{t('role_9292')}</h3>
                  <p className="text-lg text-muted-foreground max-w-2xl">
                    {t('desc_9292')}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-4">
                    {['.NET 8', 'Distributed Systems', 'Azure', 'API Design', 'Team Leadership'].map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-md bg-muted text-xs font-medium border border-border">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <a 
                  href="https://9292.nl" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all group-hover:scale-110"
                >
                  <ArrowUpRight className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
