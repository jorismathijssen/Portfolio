"use client";

import { motion } from "framer-motion";
import { PortfolioData } from "@/types/portfolio";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

export function JsonView({ data }: { data: PortfolioData }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto flex h-[calc(100vh-80px)] flex-col p-4 pt-20"
    >
      <div className="mx-auto flex h-full w-full max-w-5xl flex-col overflow-hidden rounded-lg border border-[#333] bg-[#1e1e1e] shadow-2xl">
        {/* Window Title Bar */}
        <div className="flex h-10 shrink-0 items-center justify-between border-b border-[#333] bg-[#252526] px-4">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
              <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
            </div>
            <span className="ml-4 font-mono text-xs text-gray-400">
              GET /api/portfolio
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleCopy}
              className="text-gray-400 transition-colors hover:text-white"
              title="Copy JSON"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Status Bar */}
        <div className="flex h-8 shrink-0 items-center gap-6 bg-[#007acc] px-4 font-mono text-xs text-white">
          <span>Status: {data.meta.status} OK</span>
          <span>Time: {data.meta.headers["x-runtime"]}</span>
          <span>Region: {data.meta.headers["x-region"]}</span>
          <span className="ml-auto">JSON</span>
          <span>UTF-8</span>
        </div>

        {/* Code Area */}
        <div className="custom-scrollbar flex-1 overflow-auto bg-[#1e1e1e] p-4 font-mono text-sm leading-relaxed">
          <SyntaxHighlight json={data} />
        </div>
      </div>
    </motion.div>
  );
}

function SyntaxHighlight({ json }: { json: unknown }) {
  const str = JSON.stringify(json, null, 2);

  // Simple syntax highlighting regex
  const highlighted = str.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    (match) => {
      let cls = "text-[#ce9178]"; // string
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "text-[#9cdcfe]"; // key
        }
      } else if (/true|false/.test(match)) {
        cls = "text-[#569cd6]"; // boolean
      } else if (/null/.test(match)) {
        cls = "text-[#569cd6]"; // null
      } else {
        cls = "text-[#b5cea8]"; // number
      }
      return `<span class="${cls}">${match}</span>`;
    }
  );

  return (
    <pre
      className="text-[#d4d4d4]"
      dangerouslySetInnerHTML={{ __html: highlighted }}
    />
  );
}
