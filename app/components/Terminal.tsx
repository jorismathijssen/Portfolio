'use client';
import React, { useState, useRef, useEffect } from 'react';

const COMMANDS = {
  help: 'Available commands: help, about, skills, clear, sl, joke, ascii, hack, rick, matrix, cat, invert, shake, rainbow, dark, light, party',
  about: 'Joris Mathijssen - C# Developer at 9292. Passionate about APIs and public transport tech.',
  skills: 'C#, .NET, TypeScript, React, Next.js, Azure, REST APIs',
  clear: '',
  sl: '🚂🚃🚃🚃\n    Choo Choo! (Type "clear" to reset)',
  joke: 'Why do programmers prefer dark mode? Because light attracts bugs!',
  ascii: '¯\\_(ツ)_/¯\n(\"._.\")',
  hack: 'Accessing mainframe...\nPassword: ********\nAccess granted!\nWelcome, Agent 47.',
  rick: 'Never gonna give you up, never gonna let you down... 🎶',
  matrix: 'Matrix effect activated! Type "clear" to stop.',
  cat: 'Meow! 🐱 Here is a virtual cat for you.',
  invert: 'Inverting colors! Type "invert" again to undo.',
  shake: 'Shaking the page! Type "shake" again to stop.',
  rainbow: 'Rainbow mode activated! Type "rainbow" again to turn off.',
  dark: 'Dark mode enabled!',
  light: 'Light mode enabled!',
  party: 'Confetti party! Type "clear" to clean up.',
};

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
      canvas.style.zIndex = '10'; // Lower z-index so terminal stays above
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

function startMatrix(canvas) {
  const ctx = canvas.getContext('2d');
  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  const letters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン'.split('');
  const fontSize = 16;
  const columns = Math.floor(width / fontSize);
  const drops = Array(columns).fill(1);
  let animationFrame;
  function draw() {
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';
    for (let i = 0; i < drops.length; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
    animationFrame = requestAnimationFrame(draw);
  }
  draw();
  window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  });
  canvas._matrixCleanup = () => cancelAnimationFrame(animationFrame);
}

function startConfetti(canvas) {
  const ctx = canvas.getContext('2d');
  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  const confetti = Array.from({ length: 150 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 150,
    color: `hsl(${Math.random() * 360},100%,50%)`,
    tilt: Math.random() * 10 - 10,
    tiltAngle: 0,
  }));
  let angle = 0;
  let animationFrame;
  function draw() {
    ctx.clearRect(0, 0, width, height);
    angle += 0.01;
    for (let i = 0; i < confetti.length; i++) {
      const c = confetti[i];
      c.tiltAngle += 0.1;
      c.y += Math.cos(angle + c.d) + 1 + c.r / 2;
      c.x += Math.sin(angle);
      c.tilt = Math.sin(c.tiltAngle - (i / 3)) * 15;
      if (c.y > height) {
        c.x = Math.random() * width;
        c.y = -10;
      }
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      ctx.fillStyle = c.color;
      ctx.fill();
    }
    animationFrame = requestAnimationFrame(draw);
  }
  draw();
  window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  });
  canvas._confettiCleanup = () => cancelAnimationFrame(animationFrame);
}

function Toaster({ onClick }: { onClick: () => void }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const visits = parseInt(localStorage.getItem('terminalToasterVisits') || '0', 10);
    if (visits < 10) {
      setVisible(true);
      localStorage.setItem('terminalToasterVisits', String(visits + 1));
      const timer = setTimeout(() => setVisible(false), 120000); // 2 minutes
      return () => clearTimeout(timer);
    }
  }, []);
  if (!visible) return null;
  return (
    React.createElement('div', {
      className: 'terminal-toaster',
      onClick: () => { setVisible(false); onClick(); },
      style: {
        position: 'fixed',
        bottom: '1.5rem',
        right: '6.0rem',
        zIndex: 100,
        background: 'rgba(34,34,34,0.85)',
        color: '#39ff14',
        borderRadius: '0.35rem',
        border: '1px solid #2e2e2e',
        boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
        padding: '0.25rem 0.7rem 0.25rem 0.5rem',
        fontSize: '0.92rem',
        cursor: 'pointer',
        width: '200px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.35rem',
        opacity: 0.92,
        pointerEvents: 'auto',
        transition: 'opacity 0.2s',
      }
    },
      React.createElement('span', { role: 'img', 'aria-label': 'terminal', style: { fontSize: '1.05rem', marginRight: '0.2rem' } }, '💻'),
      React.createElement('span', { style: { flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }, 'Try the terminal!'),
      React.createElement('span', { style: { fontWeight: 'bold', fontSize: '0.95rem', marginLeft: '0.1rem' } }, '→')
    )
  );
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
    const cmd = input.trim().toLowerCase();
    if (cmd === 'clear') {
      setOutput([]);
      triggerEffect(cmd);
      setInput('');
      return;
    }
    setOutput((prev) => [...prev, `> ${input}`, COMMANDS[cmd] || `Command not found: ${input}`]);
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
