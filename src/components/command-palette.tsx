"use client";

import * as React from "react";
import { useEffect } from "react";
import { Command, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "@/i18n/routing";
import { useViewMode } from "@/context/view-mode-context";
import { useTheme } from "next-themes";
import { useCommandPalette } from "@/context/command-palette-context";

export function CommandPalette() {
  const { isOpen, setIsOpen } = useCommandPalette();
  const router = useRouter();
  const { toggleApiMode } = useViewMode();
  const { setTheme } = useTheme();

  const commands = [
    { icon: Search, label: "Go to About", action: () => router.push("#about") },
    { icon: Search, label: "Go to Work", action: () => router.push("#work") },
    { icon: Command, label: "Toggle API View", action: toggleApiMode },
    {
      icon: Command,
      label: "Toggle Dark Mode",
      action: () => setTheme("dark"),
    },
    {
      icon: Command,
      label: "Toggle Light Mode",
      action: () => setTheme("light"),
    },
  ];

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", down);
      return () => document.removeEventListener("keydown", down);
    }
  }, [isOpen, setIsOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[20vh]">
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
            className="bg-popover text-popover-foreground border-border relative w-full max-w-lg overflow-hidden rounded-xl border shadow-2xl"
          >
            <div className="border-border flex items-center border-b px-4 py-3">
              <Search className="text-muted-foreground mr-3 h-5 w-5" />
              <input
                autoFocus
                placeholder="Type a command..."
                className="placeholder:text-muted-foreground flex-1 bg-transparent text-sm outline-none"
              />
              <div className="flex items-center gap-2">
                <kbd className="bg-muted text-muted-foreground hidden h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none md:inline-flex">
                  <span className="text-xs">ESC</span>
                </kbd>
                <button onClick={() => setIsOpen(false)}>
                  <X className="text-muted-foreground hover:text-foreground h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="p-2">
              <div className="text-muted-foreground mb-1 px-2 py-1.5 text-xs font-medium">
                Suggestions
              </div>
              {commands.map((cmd, i) => (
                <button
                  key={i}
                  onClick={() => {
                    cmd.action();
                    setIsOpen(false);
                  }}
                  className="hover:bg-accent hover:text-accent-foreground flex w-full items-center gap-3 rounded-md px-2 py-2 text-left text-sm transition-colors"
                >
                  <cmd.icon className="text-muted-foreground h-4 w-4" />
                  {cmd.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
