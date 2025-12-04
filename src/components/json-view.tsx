"use client"

import { motion } from 'framer-motion'
import { PortfolioData } from '@/types/portfolio'
import { Copy, Check } from 'lucide-react'
import { useState } from 'react'

export function JsonView({ data }: { data: PortfolioData }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto p-4 pt-20 h-[calc(100vh-80px)] flex flex-col"
    >
      <div className="w-full max-w-5xl mx-auto bg-[#1e1e1e] rounded-lg shadow-2xl border border-[#333] flex flex-col overflow-hidden h-full">
        {/* Window Title Bar */}
        <div className="h-10 bg-[#252526] flex items-center justify-between px-4 border-b border-[#333] shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <span className="ml-4 text-xs text-gray-400 font-mono">GET /api/joris/portfolio</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleCopy}
              className="text-gray-400 hover:text-white transition-colors"
              title="Copy JSON"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Status Bar */}
        <div className="h-8 bg-[#007acc] flex items-center px-4 text-xs text-white font-mono gap-6 shrink-0">
          <span>Status: {data.meta.status} OK</span>
          <span>Time: {data.meta.headers['x-runtime']}</span>
          <span>Region: {data.meta.headers['x-region']}</span>
          <span className="ml-auto">JSON</span>
          <span>UTF-8</span>
        </div>

        {/* Code Area */}
        <div className="flex-1 overflow-auto p-4 font-mono text-sm leading-relaxed custom-scrollbar bg-[#1e1e1e]">
          <SyntaxHighlight json={data} />
        </div>
      </div>
    </motion.div>
  )
}

function SyntaxHighlight({ json }: { json: unknown }) {
  const str = JSON.stringify(json, null, 2)
  
  // Simple syntax highlighting regex
  const highlighted = str.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    (match) => {
      let cls = 'text-[#ce9178]' // string
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'text-[#9cdcfe]' // key
        }
      } else if (/true|false/.test(match)) {
        cls = 'text-[#569cd6]' // boolean
      } else if (/null/.test(match)) {
        cls = 'text-[#569cd6]' // null
      } else {
        cls = 'text-[#b5cea8]' // number
      }
      return `<span class="${cls}">${match}</span>`
    }
  )

  return (
    <pre 
      className="text-[#d4d4d4]"
      dangerouslySetInnerHTML={{ __html: highlighted }} 
    />
  )
}
