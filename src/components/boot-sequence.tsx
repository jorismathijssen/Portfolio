
"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const sequence = [
  { text: "> initializing kernel...", delay: 200 },
  { text: "> loading modules: .NET 8, Distributed Systems, Azure...", delay: 600 },
  { text: "> verifying integrity...", delay: 400 },
  { text: "> mounting volumes...", delay: 500 },
  { text: "> establishing secure connection...", delay: 400 },
  { text: "> loading user profile: Joris Mathijssen...", delay: 800 },
  { text: "> access granted.", delay: 1000 },
  { text: "> starting shell...", delay: 1200 },
]

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([])
  
  useEffect(() => {
    let totalDelay = 0
    sequence.forEach((item, index) => {
      totalDelay += item.delay
      setTimeout(() => {
        setLines(prev => [...prev, item.text])
        if (index === sequence.length - 1) {
          setTimeout(onComplete, 1200)
        }
      }, totalDelay)
    })
  }, [onComplete]) // sequence is constant, so okay to omit or move inside


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
            className="text-sm md:text-base"
          >
            {line}
          </motion.div>
        ))}
        <motion.div 
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="w-2 h-4 md:w-3 md:h-5 bg-green-500 inline-block ml-1 align-middle"
        />
      </div>
    </motion.div>
  )
}
