'use client';
import React, { useState, useRef, useEffect } from 'react';
import Toaster from './Terminal/Toaster';
import { startMatrix, startConfetti } from './Terminal/effects';
import { COMMANDS, TerminalCommand } from './Terminal/commands';

function triggerEffect(cmd: string) {
  if (cmd === 'invert') {
    document.body.classList.toggle('invert');
  }
  if (cmd === 'shake') {
    document.body.classList.toggle('shake');
  }
  if (cmd === 'rainbow') {
    document.body.classList.toggle('rainbow');
  }
  if (cmd === 'dark') {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  }
  if (cmd === 'light') {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
  }
  if (cmd === 'matrix') {
    if (!document.getElementById('matrix-effect')) {
      const canvas = document.createElement('canvas');
      canvas.id = 'matrix-effect';
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '10';
      document.body.appendChild(canvas);
      startMatrix(canvas);
    }
  }
  if (cmd === 'party') {
    if (!document.getElementById('confetti-canvas')) {
      const canvas = document.createElement('canvas');
      canvas.id = 'confetti-canvas';
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '9999';
      document.body.appendChild(canvas);
      startConfetti(canvas);
    }
  }
  if (cmd === 'clear') {
    const matrix = document.getElementById('matrix-effect');
    if (matrix) matrix.remove();
    const confetti = document.getElementById('confetti-canvas');
    if (confetti) confetti.remove();
  }
}

export default function Terminal() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [showToaster, setShowToaster] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cmd = input.trim().toLowerCase() as TerminalCommand;
    if (cmd === 'clear') {
      setOutput([]);
      triggerEffect(cmd);
      setInput('');
      return;
    }
    setOutput((prev) => [
      ...prev,
      `> ${input}`,
      COMMANDS[cmd] || `Command not found: ${input}`
    ]);
    triggerEffect(cmd);
    setInput('');
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  }

  useEffect(() => {
    const terminal = terminalRef.current;
    if (terminal) {
      terminal.scrollTop = terminal.scrollHeight;
    }
  }, [output]);

  // Detect dark mode
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkDark();
    window.addEventListener('classChange', checkDark);
    return () => window.removeEventListener('classChange', checkDark);
  }, []);

  // Hide toaster when terminal is opened
  useEffect(() => {
    if (open) setShowToaster(false);
  }, [open]);

  return (
    <>
      {showToaster && <Toaster onClick={() => { setOpen(true); setShowToaster(false); }} />}
      <div className={`terminal ${open ? 'open' : 'minimized'}`}
        style={{
          position: 'fixed',
          bottom: '1rem',
          right: '1rem',
          width: open ? '420px' : '56px',
          height: open ? '320px' : '56px',
          maxWidth: '90vw',
          maxHeight: '60vh',
          backgroundColor: open ? '#111' : (isDark ? '#1f2937' : '#111'),
          color: open ? '#39ff14' : (isDark ? '#facc15' : '#39ff14'),
          border: open ? 'none' : (isDark ? '1.5px solid #e5e7eb' : 'none'),
          borderRadius: '0.75rem',
          boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
          overflow: 'hidden',
          transition: 'all 0.3s',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: open ? 'flex-start' : 'center',
          cursor: open ? 'default' : 'pointer',
        }}>
        <div className="terminal-header" onClick={() => setOpen((prev) => !prev)}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: open ? '0.75rem 1rem' : '0',
            backgroundColor: open ? '#222' : 'transparent',
            cursor: 'pointer',
            borderBottom: open ? '2px solid #39ff14' : 'none',
            borderRadius: open ? '0.75rem 0.75rem 0 0' : '0.75rem',
            width: '100%',
            height: open ? 'auto' : '100%',
          }}>
          <div className="terminal-title" style={{ fontWeight: 'bold', margin: '0 auto', fontSize: open ? '1rem' : '1.5rem', color: open ? '#39ff14' : (isDark ? '#facc15' : '#39ff14') }}>{open ? 'Terminal' : '💻'}</div>
          {open && (
            <div className="terminal-controls" style={{ display: 'flex', gap: '0.5rem' }}>
              <div className="control-button close" style={{ width: '10px', height: '10px', backgroundColor: '#ff605c', borderRadius: '50%', cursor: 'pointer' }} />
              <div className="control-button minimize" style={{ width: '10px', height: '10px', backgroundColor: isDark ? 'rgb(31 41 55)' : '#ffbd44', borderRadius: '50%', cursor: 'pointer' }} />
              <div className="control-button maximize" style={{ width: '10px', height: '10px', backgroundColor: '#00ca4e', borderRadius: '50%', cursor: 'pointer' }} />
            </div>
          )}
        </div>
        {open && (
          <div className="terminal-body" ref={scrollRef}
            style={{
              padding: '1rem',
              height: 'calc(100% - 48px)',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              justifyContent: 'flex-end',
            }}>
            <div>
              {output.length === 0 && 'Welcome to the terminal emulator! Type "help" for commands.'}
              {output.map((line, index) => <div key={index} className="terminal-line" style={{ marginBottom: '0.5rem' }}>{line}</div>)}
            </div>
            <div className="terminal-input" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderTop: '1px solid #39ff14', paddingTop: '0.5rem', background: '#111', position: 'sticky', bottom: 0 }}>
              <span style={{ fontWeight: 'bold' }}>{'>'}</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                style={{ flex: 1, padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #39ff14', backgroundColor: '#222', color: '#39ff14', fontSize: '1rem' }}
                placeholder="Enter command..."
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
