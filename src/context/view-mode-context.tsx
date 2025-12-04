"use client"

import { createContext, useContext, useState } from "react"

type ViewModeContextType = {
  isApiMode: boolean
  toggleApiMode: () => void
}

const ViewModeContext = createContext<ViewModeContextType | undefined>(undefined)

export function ViewModeProvider({ children }: { children: React.ReactNode }) {
  const [isApiMode, setIsApiMode] = useState(false)

  return (
    <ViewModeContext.Provider value={{ isApiMode, toggleApiMode: () => setIsApiMode(!isApiMode) }}>
      {children}
    </ViewModeContext.Provider>
  )
}

export function useViewMode() {
  const context = useContext(ViewModeContext)
  if (context === undefined) {
    throw new Error("useViewMode must be used within a ViewModeProvider")
  }
  return context
}
