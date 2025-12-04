"use client"

import { useState } from 'react'
import { BootSequence } from './boot-sequence'
import { motion, AnimatePresence } from 'framer-motion'

export function LandingWrapper({ children }: { children: React.ReactNode }) {
  const [booted, setBooted] = useState(false)

  return (
    <>
      <AnimatePresence>
        {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      </AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: booted ? 1 : 0, filter: booted ? "blur(0px)" : "blur(10px)" }}
        transition={{ duration: 1, delay: 0.2 }}
        className={!booted ? "h-screen overflow-hidden" : ""}
      >
        {children}
      </motion.div>
    </>
  )
}
