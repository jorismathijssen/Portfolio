"use client"

import { useViewMode } from '@/context/view-mode-context'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

export function PageContent({ children }: { children: React.ReactNode }) {
  const { isApiMode } = useViewMode()
  const t = useTranslations()
  
  const data = {
    status: 200,
    headers: {
      "content-type": "application/json",
      "server": "nginx/1.25.3",
      "x-powered-by": ".NET 8 (Simulated)"
    },
    data: {
      name: "Joris Mathijssen",
      role: t('HomePage.role'),
      company: "9292",
      about: {
        summary: t('About.description'),
        details: t('About.description2'),
        hobbies: [
          t('About.hobbies.0'),
          t('About.hobbies.1'),
          t('About.hobbies.2'),
          t('About.hobbies.3'),
          t('About.hobbies.4')
        ],
        strengths: [
          t('About.strengths.0'),
          t('About.strengths.1'),
          t('About.strengths.2'),
          t('About.strengths.3'),
          t('About.strengths.4')
        ]
      },
      work: {
        current: {
          role: t('Work.role_9292'),
          description: t('Work.desc_9292')
        }
      }
    }
  }

  if (isApiMode) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto p-4 pt-20 font-mono text-sm overflow-auto max-w-4xl"
      >
        <div className="bg-zinc-950 text-green-400 p-6 rounded-lg shadow-2xl border border-zinc-800">
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </motion.div>
    )
  }

  return <>{children}</>
}
