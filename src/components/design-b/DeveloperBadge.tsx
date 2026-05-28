'use client';

import { useState, useEffect } from 'react';

export default function DeveloperBadge() {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const closed = sessionStorage.getItem('dev-badge-closed');
    if (!closed) setVisible(true);
    setIsMobile(window.innerWidth < 640);
  }, []);

  const handleClose = () => {
    sessionStorage.setItem('dev-badge-closed', '1');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 animate-fade-up">
      <div className="flex items-center gap-1.5 bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/40 rounded-full px-3 py-1.5 opacity-50 hover:opacity-100 transition-opacity duration-300">
        <a
          href="https://devlloni.me"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-300 text-[11px] font-medium whitespace-nowrap leading-none"
        >
          ⚡ by Lautaro Delloni
        </a>
        {isMobile && (
          <button
            onClick={handleClose}
            className="text-zinc-500 hover:text-zinc-300 text-[10px] transition-colors leading-none ml-0.5"
            aria-label="Cerrar"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
