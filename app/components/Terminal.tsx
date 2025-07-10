'use client';
import React, { useState, useRef, useEffect } from 'react';

const COMMANDS = {
  help: 'Available commands: help, about, skills, clear, sl',
  about: 'Joris Mathijssen - C# Developer at 9292. Passionate about APIs and public transport tech.',
  skills: 'C#, .NET, TypeScript, React, Next.js, Azure, REST APIs',
  clear: '',
  sl: '🚂🚃🚃🚃\n    Choo Choo! (Type "clear" to reset)',
};

export default function Terminal() {
  const [lines, setLines] = useState<string[]>(['Type "help" to get started.']);
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open && inputRef.current) {
      inputRef.current.blur();
    }
  }, [open]);

  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines, open]);

  const handleCommand = (cmd: string) => {
    if (cmd === 'clear') {
      setLines([]);
      setOpen(false);
      return;
    }
    setLines((prev) => [...prev, `> ${cmd}`, COMMANDS[cmd as keyof typeof COMMANDS] || 'Unknown command']);
    setOpen(true);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50" style={{ width: open ? 420 : 420 }}>
      <div className={open ? "bg-black bg-opacity-90 text-green-400 rounded-lg shadow-lg w-100" : ""}>
        {open && (
          <div className="flex justify-between items-center border-b border-green-700 px-3 py-2">
            <span className="font-mono text-sm">Terminal</span>
            <button
              className="text-green-400 hover:text-green-200 text-lg"
              aria-label="Minimize Terminal"
              onClick={() => setOpen(false)}
            >
              –
            </button>
          </div>
        )}
        {open && (
          <div ref={scrollRef} className="p-3 font-mono text-sm h-60 overflow-y-auto custom-scrollbar" style={{ minHeight: 200 }}>
            {lines.map((line, i) => (
              <div key={i} style={{ whiteSpace: 'pre-wrap' }}>{line}</div>
            ))}
          </div>
        )}
        <form
          className={open ? "flex border-t border-green-700" : "flex items-center justify-center bg-black bg-opacity-80 rounded-lg shadow-lg w-full px-2 py-1"}
          onSubmit={e => {
            e.preventDefault();
            if (input.trim()) {
              handleCommand(input.trim());
              setInput('');
            }
          }}
        >
          <span className="px-2">&gt;</span>
          <input
            ref={inputRef}
            className={open ? "flex-1 bg-transparent outline-none text-green-400 p-2" : "flex-1 bg-transparent outline-none text-green-400 font-mono text-lg w-full"}
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={open ? "Type a command..." : "Type a command and press Enter..."}
            spellCheck={false}
            onFocus={() => setOpen(false)}
          />
        </form>
      </div>
    </div>
  );
}
