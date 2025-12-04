"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([])
  
  const sequence = [
    "> initializing system...",
    "> loading modules: .NET 8, Distributed Systems, API Design...",
    "> verifying integrity...",
    "> status: ONLINE",
    "> welcome, user."
  ]

  useEffect(() => {
    let delay = 0
    sequence.forEach((line, index) => {
      delay += 800 // ms per line
      setTimeout(() => {
        setLines(prev => [...prev, line])
        if (index === sequence.length - 1) {
          setTimeout(onComplete, 1000)
        }
      }, delay)
    })
  }, [])

  return (
    <motion.div 
      className="fixed inset-0 z-[100] bg-black text-green-500 font-mono p-8 flex flex-col justify-end pb-20 md:justify-start md:pt-20"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="max-w-2xl mx-auto w-full space-y-2">
        {lines.map((line, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {line}
          </motion.div>
        ))}
        <motion.div 
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="w-3 h-5 bg-green-500 inline-block ml-1"
        />
      </div>
    </motion.div>
  )
}
