"use client"

import * as React from "react"
import { Command, Search, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from '@/i18n/routing'
import { useViewMode } from "@/context/view-mode-context"
import { useTheme } from "next-themes"
import { useCommandPalette } from "@/context/command-palette-context"

export function CommandPalette() {
  const { isOpen, setIsOpen } = useCommandPalette()
  const router = useRouter()
  const { toggleApiMode } = useViewMode()
  const { setTheme } = useTheme()

  const commands = [
    { icon: Search, label: "Go to About", action: () => router.push("#about") },
    { icon: Search, label: "Go to Work", action: () => router.push("#work") },
    { icon: Command, label: "Toggle API View", action: toggleApiMode },
    { icon: Command, label: "Toggle Dark Mode", action: () => setTheme("dark") },
    { icon: Command, label: "Toggle Light Mode", action: () => setTheme("light") },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-lg bg-popover text-popover-foreground rounded-xl shadow-2xl border border-border overflow-hidden"
          >
            <div className="flex items-center border-b border-border px-4 py-3">
              <Search className="w-5 h-5 text-muted-foreground mr-3" />
              <input 
                autoFocus
                placeholder="Type a command..."
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
              />
              <div className="flex items-center gap-2">
                <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                  <span className="text-xs">ESC</span>
                </kbd>
                <button onClick={() => setIsOpen(false)}>
                  <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                </button>
              </div>
            </div>
            <div className="p-2">
              <div className="text-xs font-medium text-muted-foreground px-2 py-1.5 mb-1">Suggestions</div>
              {commands.map((cmd, i) => (
                <button
                  key={i}
                  onClick={() => {
                    cmd.action()
                    setIsOpen(false)
                  }}
                  className="w-full flex items-center gap-3 px-2 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-left"
                >
                  <cmd.icon className="w-4 h-4 text-muted-foreground" />
                  {cmd.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
