import React, { useState, useEffect } from 'react';

/**
 * Props for the Toaster popup component.
 */
interface ToasterProps {
  /** Called when the toaster is clicked. */
  onClick: () => void;
}

/**
 * Toaster popup that invites users to try the terminal.
 * Disappears after 2 minutes or when clicked.
 */
const Toaster: React.FC<ToasterProps> = ({ onClick }) => {
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
    <div
      className="terminal-toaster"
      onClick={() => {
        setVisible(false);
        onClick();
      }}
      style={{
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
      }}
    >
      <span role="img" aria-label="terminal" style={{ fontSize: '1.05rem', marginRight: '0.2rem' }}>
        💻
      </span>
      <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        Try the terminal!
      </span>
      <span style={{ fontWeight: 'bold', fontSize: '0.95rem', marginLeft: '0.1rem' }}>→</span>
    </div>
  );
};

export default Toaster;
