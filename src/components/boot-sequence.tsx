"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";

const sequence = [
  { text: "> initializing kernel...", delay: 200 },
  {
    text: "> loading modules: .NET 8, Distributed Systems, Azure...",
    delay: 600,
  },
  { text: "> verifying integrity...", delay: 400 },
  { text: "> mounting volumes...", delay: 500 },
  { text: "> establishing secure connection...", delay: 400 },
  { text: `> loading user profile: ${siteConfig.name}...`, delay: 800 },
  { text: "> access granted.", delay: 1000 },
  { text: "> starting shell...", delay: 1200 },
];

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    let totalDelay = 0;
    sequence.forEach((item, index) => {
      totalDelay += item.delay;
      setTimeout(() => {
        setLines((prev) => [...prev, item.text]);
        if (index === sequence.length - 1) {
          setTimeout(onComplete, 1200);
        }
      }, totalDelay);
    });
  }, [onComplete]); // sequence is constant, so okay to omit or move inside

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col justify-end bg-black p-8 pb-20 font-mono text-green-500 md:justify-start md:pt-20"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="mx-auto w-full max-w-2xl space-y-2">
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
          className="ml-1 inline-block h-4 w-2 bg-green-500 align-middle md:h-5 md:w-3"
        />
      </div>
    </motion.div>
  );
}
