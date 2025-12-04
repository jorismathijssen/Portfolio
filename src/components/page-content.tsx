"use client"

import { useViewMode } from '@/context/view-mode-context'
import { useTranslations } from 'next-intl'
import { getPortfolioData } from '@/lib/portfolio-data'
import { JsonView } from './json-view'

export function PageContent({ children }: { children: React.ReactNode }) {
  const { isApiMode } = useViewMode()
  const t = useTranslations()
  
  const data = getPortfolioData(t)

  if (isApiMode) {
    return <JsonView data={data} />
  }

  return <>{children}</>
}
