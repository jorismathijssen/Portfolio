"use client"

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Cpu, Code2, Network, BookOpen, Gamepad2 } from 'lucide-react'

export function About() {
  const t = useTranslations('About')

  const hobbies = [
    { icon: Network, label: t('hobbies.0') },
    { icon: Gamepad2, label: t('hobbies.1') },
    { icon: Code2, label: t('hobbies.2') },
    { icon: BookOpen, label: t('hobbies.3') },
    { icon: Cpu, label: t('hobbies.4') },
  ]

  const strengths = [
    t('strengths.0'),
    t('strengths.1'),
    t('strengths.2'),
    t('strengths.3'),
    t('strengths.4'),
  ]

  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-start"
        >
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t('title')}</h2>
            <div className="prose dark:prose-invert text-muted-foreground">
              <p className="text-lg leading-relaxed">{t('description')}</p>
              <p className="leading-relaxed">{t('description2')}</p>
            </div>
            
            <div className="pt-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-primary" />
                {t('strengths_title')}
              </h3>
              <ul className="grid gap-3">
                {strengths.map((strength, i) => (
                  <li key={i} className="flex items-start gap-2 text-muted-foreground">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-muted/30 rounded-3xl p-8 border border-border/50">
            <h3 className="text-xl font-semibold mb-6">{t('hobbies_title')}</h3>
            <div className="grid gap-4">
              {hobbies.map((hobby, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border/50 hover:border-primary/50 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <hobby.icon className="w-5 h-5" />
                  </div>
                  <span className="font-medium">{hobby.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
