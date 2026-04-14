'use client';

import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5491112345678';

  const quickMessages = [
    { label: 'Ver stock disponible', msg: '¡Hola! Quiero ver el stock disponible.' },
    { label: 'Consultar financiación', msg: '¡Hola! Me interesa saber sobre las opciones de financiación.' },
    { label: 'Hablar con un asesor', msg: '¡Hola! Quiero hablar con un asesor.' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Bubble popup */}
      {open && (
        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-4 shadow-2xl w-72 animate-fade-up">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-white font-bold text-sm">Ruz Automotores</div>
                <div className="text-green-400 text-xs">● En línea ahora</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-zinc-500 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-zinc-400 text-xs mb-3">¡Hola! ¿En qué podemos ayudarte?</p>

          <div className="flex flex-col gap-2">
            {quickMessages.map((qm) => (
              <a
                key={qm.label}
                href={`https://wa.me/${phone}?text=${encodeURIComponent(qm.msg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-left px-3 py-2 bg-zinc-800 hover:bg-green-500/10 border border-zinc-700 hover:border-green-500/50 rounded-xl text-white text-xs font-medium transition-all"
                onClick={() => setOpen(false)}
              >
                {qm.label} →
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Main button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative w-16 h-16 bg-green-500 hover:bg-green-400 rounded-full shadow-2xl shadow-green-500/30 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
      >
        {open ? (
          <X className="w-7 h-7 text-white" />
        ) : (
          <MessageCircle className="w-7 h-7 text-white fill-white" />
        )}
        {/* Ping animation */}
        {!open && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-[#E87800] rounded-full border-2 border-zinc-950 flex items-center justify-center">
            <span className="text-white text-[8px] font-black">!</span>
          </span>
        )}
      </button>
    </div>
  );
}
