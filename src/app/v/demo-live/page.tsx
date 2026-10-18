'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const THEMES: Record<string, { border: string; glow: string; text: string; badgeBg: string; badgeBorder: string; buttonBg: string; name: string }> = {
  'gold-confetti': { name: 'Aura Gold', border: 'border-[#d4af37]', glow: 'shadow-[0_0_35px_rgba(212,175,55,0.2)]', text: 'text-[#d4af37]', badgeBg: 'bg-[#d4af37]/10', badgeBorder: 'border-[#d4af37]/40', buttonBg: 'bg-gradient-to-r from-[#d4af37] to-[#f4e6b0] text-black' },
  'wealth-glamour': { name: 'Wealth & Glamour', border: 'border-[#b9f2ff]', glow: 'shadow-[0_0_35px_rgba(185,242,255,0.25)]', text: 'text-[#b9f2ff]', badgeBg: 'bg-[#b9f2ff]/10', badgeBorder: 'border-[#b9f2ff]/40', buttonBg: 'bg-gradient-to-r from-[#b9f2ff] to-[#ffffff] text-black' },
  'ruby-petal': { name: 'Crimson Romance', border: 'border-[#dc143c]', glow: 'shadow-[0_0_35px_rgba(220,20,60,0.25)]', text: 'text-[#ff69b4]', badgeBg: 'bg-[#dc143c]/15', badgeBorder: 'border-[#dc143c]/40', buttonBg: 'bg-gradient-to-r from-[#dc143c] to-[#ff1493] text-white' },
  'birthday': { name: 'Happy Birthday', border: 'border-[#ffb6c1]', glow: 'shadow-[0_0_35px_rgba(255,182,193,0.25)]', text: 'text-[#ffb6c1]', badgeBg: 'bg-[#ffb6c1]/10', badgeBorder: 'border-[#ffb6c1]/40', buttonBg: 'bg-gradient-to-r from-[#ffb6c1] to-[#ff69b4] text-black' },
  'valentine': { name: "Valentine's Day", border: 'border-[#ff69b4]', glow: 'shadow-[0_0_35px_rgba(255,105,180,0.25)]', text: 'text-[#ff69b4]', badgeBg: 'bg-[#ff69b4]/10', badgeBorder: 'border-[#ff69b4]/40', buttonBg: 'bg-gradient-to-r from-[#ff69b4] to-[#ffffff] text-black' },
};

export default function DemoSandboxPage() {
  const router = useRouter();
  
  // Local editable state for the live sandbox
  const [recipient, setRecipient] = useState('My Future Self / Friend');
  const [message, setMessage] = useState('You just scanned a live Aura & Archive flyer! Type your own secret message and pick a theme below to test the experience.');
  const [effectType, setEffectType] = useState('wealth-glamour');
  const [isEditing, setIsEditing] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Array<any>>([]);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const lastClickTimeRef = useRef<number>(0);

  // Canvas particle loop for spam-clickable animations
  useEffect(() => {
    if (isEditing) return;

    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '99999';
    document.body.appendChild(canvas);
    canvasRef.current = canvas;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    lastTimeRef.current = performance.now();

    const renderLoop = (currentTime: number) => {
      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;
      const dtFactor = Math.min(deltaTime / 16.66, 3.0);
      const isDesktop = window.innerWidth > 768;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p) => {
        p.x += (p.vx + Math.sin(p.age * 0.004 + p.sway) * 0.6) * dtFactor;
        p.y += p.vy * dtFactor;
        if (p.themeKey !== 'executive-light') {
          p.vy += (isDesktop ? 0.55 : 0.15) * dtFactor;
          p.vx *= Math.pow(isDesktop ? 0.96 : 0.98, dtFactor);
        }
        p.rotation += p.rotSpeed * dtFactor;
        p.age += deltaTime;

        if (p.age > 2200) {
          p.opacity -= 0.03 * dtFactor;
        }
      });

      particlesRef.current = particlesRef.current.filter((p) => p.opacity > 0);
      if (particlesRef.current.length > 180) {
        particlesRef.current = particlesRef.current.slice(particlesRef.current.length - 180);
      }

      particlesRef.current.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        
        ctx.font = '28px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const emojis: Record<string, string> = {
          'gold-confetti': '✨',
          'wealth-glamour': '💎',
          'ruby-petal': '🌹',
          'birthday': '🎂',
          'valentine': '❤️',
        };
        ctx.fillText(emojis[p.themeKey] || '✨', 0, 0);
        ctx.restore();
      });

      animFrameRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (canvasRef.current) canvasRef.current.remove();
    };
  }, [isEditing]);

  const triggerEffect = () => {
    const now = performance.now();
    if (now - lastClickTimeRef.current < 50) return;
    lastClickTimeRef.current = now;

    const scale = Math.max(window.innerWidth, window.innerHeight) / 800;
    const isDesktop = window.innerWidth > 768;
    const count = isDesktop ? 25 : 35;
    const startX = isDesktop ? Math.random() * window.innerWidth : window.innerWidth / 2;
    const startY = isDesktop ? -20 : window.innerHeight / 2 - 30;

    for (let i = 0; i < count; i++) {
      const angle = isDesktop ? (Math.random() * Math.PI) + Math.PI * 0.25 : Math.random() * Math.PI * 2;
      const speed = isDesktop ? (Math.random() * 10 + 4) : (Math.random() * 16 + 6) * Math.min(scale, 1.4);

      particlesRef.current.push({
        x: startX + (isDesktop ? (Math.random() - 0.5) * window.innerWidth * 0.8 : (Math.random() - 0.5) * 80),
        y: startY + (isDesktop ? 0 : (Math.random() - 0.5) * 40),
        vx: Math.cos(angle) * speed,
        vy: isDesktop ? Math.random() * 6 + 2 : Math.sin(angle) * speed - 5,
        size: (Math.random() * 8 + 10) * Math.min(scale, 1.3),
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.3,
        opacity: 1,
        sway: Math.random() * 3,
        age: 0,
        themeKey: effectType,
      });
    }
  };

  const theme = THEMES[effectType] || THEMES['wealth-glamour'];

  return (
    <div className="w-full max-w-[680px] p-4 md:p-6 mx-auto my-auto flex flex-col justify-center min-h-screen text-white">
      <div className={`bg-[#101014]/95 border ${theme.border} rounded-xl p-6 md:p-8 text-center ${theme.glow} backdrop-blur-md flex flex-col gap-5 transition-all duration-500`}>
        
        <div className={`inline-block self-center px-4 py-1.5 border ${theme.badgeBorder} rounded-[30px] text-[10px] tracking-[2.5px] uppercase ${theme.text} ${theme.badgeBg}`}>
          ✦ LIVE FLYER DEMO SANDBOX ✦
        </div>

        {isEditing ? (
          <div className="space-y-4 text-left">
            <h1 className="font-serif text-[22px] uppercase text-[#d4af37] tracking-[2px] text-center">Customize Your Sample Note</h1>
            <p className="text-[12px] text-[#b0aebf] text-center">Type whatever you want below and hit preview to test the live experience!</p>
            
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#d4af37] mb-1 font-semibold">Recipient Name</label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full bg-black/60 border border-[#d4af37]/40 p-3 text-white rounded text-sm focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-[#d4af37] mb-1 font-semibold">Secret Message</label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-black/60 border border-[#d4af37]/40 p-3 text-white rounded text-sm focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-[#d4af37] mb-1 font-semibold">Select Theme & Effect</label>
              <select
                value={effectType}
                onChange={(e) => setEffectType(e.target.value)}
                className="w-full bg-black/60 border border-[#d4af37]/40 p-3 text-white rounded text-sm focus:outline-none focus:border-[#d4af37] cursor-pointer"
              >
                {Object.entries(THEMES).map(([key, t]) => (
                  <option key={key} value={key} className="bg-[#101014] text-white">{t.name}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setIsEditing(false)}
              className={`w-full py-3.5 font-semibold rounded text-[11px] uppercase tracking-[1.5px] cursor-pointer ${theme.buttonBg}`}
            >
              Preview Live Experience ✦
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h1 className={`font-serif text-[24px] uppercase ${theme.text} tracking-[2px]`}>Interactive Sample Note</h1>
              <p className="text-[12px] text-[#b0aebf] tracking-[1px] mt-1">FLYER DEMO MODE</p>
            </div>

            <div className={`text-left bg-black/40 border ${theme.badgeBorder} p-5 rounded-lg text-[#f4e6b0]`}>
              <p className={`text-xs uppercase tracking-widest ${theme.text} font-semibold mb-2`}>To: {recipient}</p>
              <p className="text-base font-light leading-relaxed whitespace-pre-wrap">{message}</p>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                className={`w-full py-3.5 text-[11px] font-semibold uppercase tracking-[1.5px] rounded cursor-pointer ${theme.buttonBg}`} 
                onClick={triggerEffect}
              >
                ✦ Spam-Click to Burst Emojis! ✦
              </button>

              <button 
                onClick={() => setIsEditing(true)}
                className="w-full py-3 text-[11px] bg-black/60 border border-[#d4af37]/60 text-[#f4e6b0] font-semibold rounded uppercase tracking-[1.5px] cursor-pointer"
              >
                ✦ Edit Sample Message ✦
              </button>

              <div className="pt-4 border-t border-[#d4af37]/20 text-center space-y-2">
                <p className="text-xs text-[#b0aebf]">Love this interactive smart card? Lock it in permanently.</p>
                <a
                  href="/"
                  target="_blank"
                  className="block w-full py-3 bg-gradient-to-r from-[#d4af37] to-[#f4e6b0] text-black font-bold text-xs uppercase tracking-widest rounded shadow-md"
                >
                  Order Your Own Physical Card Now ✦
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}