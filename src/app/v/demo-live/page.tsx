'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import AudioRecorder from '@/components/AudioRecorder';

const THEMES = [
  { key: 'gold-confetti', name: 'Aura Gold', border: 'border-[#d4af37]', glow: 'shadow-[0_0_35px_rgba(212,175,55,0.2)]', text: 'text-[#d4af37]', badgeBg: 'bg-[#d4af37]/10', badgeBorder: 'border-[#d4af37]/40', buttonBg: 'bg-gradient-to-r from-[#d4af37] to-[#f4e6b0] !text-black' },
  { key: 'executive-light', name: 'Corporate Lumina', border: 'border-[#e5e4e2]', glow: 'shadow-[0_0_35px_rgba(229,228,226,0.2)]', text: 'text-[#e5e4e2]', badgeBg: 'bg-[#e5e4e2]/10', badgeBorder: 'border-[#e5e4e2]/40', buttonBg: 'bg-gradient-to-r from-[#e5e4e2] to-[#ffffff] !text-black' },
  { key: 'wealth-glamour', name: 'Wealth & Glamour', border: 'border-[#b9f2ff]', glow: 'shadow-[0_0_35px_rgba(185,242,255,0.25)]', text: 'text-[#b9f2ff]', badgeBg: 'bg-[#b9f2ff]/10', badgeBorder: 'border-[#b9f2ff]/40', buttonBg: 'bg-gradient-to-r from-[#b9f2ff] to-[#ffffff] !text-black' },
  { key: 'ruby-petal', name: 'Crimson Romance', border: 'border-[#dc143c]', glow: 'shadow-[0_0_35px_rgba(220,20,60,0.25)]', text: 'text-[#ff69b4]', badgeBg: 'bg-[#dc143c]/15', badgeBorder: 'border-[#dc143c]/40', buttonBg: 'bg-gradient-to-r from-[#dc143c] to-[#ff1493] !text-white' },
  { key: 'birthday', name: 'Happy Birthday', border: 'border-[#ffb6c1]', glow: 'shadow-[0_0_35px_rgba(255,182,193,0.25)]', text: 'text-[#ffb6c1]', badgeBg: 'bg-[#ffb6c1]/10', badgeBorder: 'border-[#ffb6c1]/40', buttonBg: 'bg-gradient-to-r from-[#ffb6c1] to-[#ff69b4] !text-black' },
  { key: 'christmas', name: 'Winter & Christmas', border: 'border-[#2e8b57]', glow: 'shadow-[0_0_35px_rgba(46,139,87,0.25)]', text: 'text-[#2e8b57]', badgeBg: 'bg-[#2e8b57]/10', badgeBorder: 'border-[#2e8b57]/40', buttonBg: 'bg-gradient-to-r from-[#2e8b57] to-[#ffffff] !text-black' },
  { key: 'halloween', name: 'Halloween', border: 'border-[#ff8c00]', glow: 'shadow-[0_0_35px_rgba(255,140,0,0.25)]', text: 'text-[#ff8c00]', badgeBg: 'bg-[#ff8c00]/10', badgeBorder: 'border-[#ff8c00]/40', buttonBg: 'bg-gradient-to-r from-[#ff8c00] to-[#000000] !text-white' },
  { key: 'valentine', name: "Valentine's Day", border: 'border-[#ff69b4]', glow: 'shadow-[0_0_35px_rgba(255,105,180,0.25)]', text: 'text-[#ff69b4]', badgeBg: 'bg-[#ff69b4]/10', badgeBorder: 'border-[#ff69b4]/40', buttonBg: 'bg-gradient-to-r from-[#ff69b4] to-[#ffffff] !text-black' },
  { key: 'april-fools', name: 'April Fools & Humor', border: 'border-[#ffd700]', glow: 'shadow-[0_0_35px_rgba(255,215,0,0.25)]', text: 'text-[#ffd700]', badgeBg: 'bg-[#ffd700]/10', badgeBorder: 'border-[#ffd700]/40', buttonBg: 'bg-gradient-to-r from-[#ffd700] to-[#ffffff] !text-black' },
  { key: 'new-years', name: "New Year's Eve", border: 'border-[#e5e4e2]', glow: 'shadow-[0_0_35px_rgba(229,228,226,0.25)]', text: 'text-[#e5e4e2]', badgeBg: 'bg-[#e5e4e2]/10', badgeBorder: 'border-[#e5e4e2]/40', buttonBg: 'bg-gradient-to-r from-[#e5e4e2] to-[#ffffff] !text-black' },
  { key: 'christianity', name: 'Christianity', border: 'border-[#dda0dd]', glow: 'shadow-[0_0_35px_rgba(221,160,221,0.25)]', text: 'text-[#dda0dd]', badgeBg: 'bg-[#dda0dd]/10', badgeBorder: 'border-[#dda0dd]/40', buttonBg: 'bg-gradient-to-r from-[#dda0dd] to-[#ffffff] !text-black' },
  { key: 'islam', name: 'Islam', border: 'border-[#98fb98]', glow: 'shadow-[0_0_35px_rgba(152,251,152,0.25)]', text: 'text-[#98fb98]', badgeBg: 'bg-[#98fb98]/10', badgeBorder: 'border-[#98fb98]/40', buttonBg: 'bg-gradient-to-r from-[#98fb98] to-[#ffffff] !text-black' },
  { key: 'judaism', name: 'Judaism', border: 'border-[#87ceeb]', glow: 'shadow-[0_0_35px_rgba(135,206,235,0.25)]', text: 'text-[#87ceeb]', badgeBg: 'bg-[#87ceeb]/10', badgeBorder: 'border-[#87ceeb]/40', buttonBg: 'bg-gradient-to-r from-[#87ceeb] to-[#ffffff] !text-black' },
  { key: 'hinduism', name: 'Hinduism (Diwali)', border: 'border-[#ffa500]', glow: 'shadow-[0_0_35px_rgba(255,165,0,0.25)]', text: 'text-[#ffa500]', badgeBg: 'bg-[#ffa500]/10', badgeBorder: 'border-[#ffa500]/40', buttonBg: 'bg-gradient-to-r from-[#ffa500] to-[#ffffff] !text-black' },
  { key: 'buddhism', name: 'Buddhism', border: 'border-[#deb887]', glow: 'shadow-[0_0_35px_rgba(222,184,135,0.25)]', text: 'text-[#deb887]', badgeBg: 'bg-[#deb887]/10', badgeBorder: 'border-[#deb887]/40', buttonBg: 'bg-gradient-to-r from-[#deb887] to-[#ffffff] !text-black' },
  { key: 'mothers-day', name: "Mother's Day", border: 'border-[#ffb6c1]', glow: 'shadow-[0_0_35px_rgba(255,182,193,0.25)]', text: 'text-[#ffb6c1]', badgeBg: 'bg-[#ffb6c1]/10', badgeBorder: 'border-[#ffb6c1]/40', buttonBg: 'bg-gradient-to-r from-[#ffb6c1] to-[#ffffff] !text-black' },
  { key: 'fathers-day', name: "Father's Day", border: 'border-[#4682b4]', glow: 'shadow-[0_0_35px_rgba(70,130,180,0.25)]', text: 'text-[#4682b4]', badgeBg: 'bg-[#4682b4]/10', badgeBorder: 'border-[#4682b4]/40', buttonBg: 'bg-gradient-to-r from-[#4682b4] to-[#ffffff] !text-black' },
  { key: 'gender-reveal', name: 'New Arrival', border: 'border-[#87ceeb]', glow: 'shadow-[0_0_35px_rgba(135,206,235,0.25)]', text: 'text-[#87ceeb]', badgeBg: 'bg-[#87ceeb]/10', badgeBorder: 'border-[#87ceeb]/40', buttonBg: 'bg-gradient-to-r from-[#87ceeb] to-[#ffffff] !text-black' },
  { key: 'graduation', name: 'Graduation', border: 'border-[#daa520]', glow: 'shadow-[0_0_35px_rgba(218,165,32,0.25)]', text: 'text-[#daa520]', badgeBg: 'bg-[#daa520]/10', badgeBorder: 'border-[#daa520]/40', buttonBg: 'bg-gradient-to-r from-[#daa520] to-[#ffffff] !text-black' },
  { key: 'engagement', name: 'Engagement', border: 'border-[#e0ffff]', glow: 'shadow-[0_0_35px_rgba(224,255,255,0.25)]', text: 'text-[#e0ffff]', badgeBg: 'bg-[#e0ffff]/10', badgeBorder: 'border-[#e0ffff]/40', buttonBg: 'bg-gradient-to-r from-[#e0ffff] to-[#ffffff] !text-black' },
  { key: 'retirement', name: 'Retirement & Farewell', border: 'border-[#f4a460]', glow: 'shadow-[0_0_35px_rgba(244,164,96,0.25)]', text: 'text-[#f4a460]', badgeBg: 'bg-[#f4a460]/10', badgeBorder: 'border-[#f4a460]/40', buttonBg: 'bg-gradient-to-r from-[#f4a460] to-[#ffffff] !text-black' },
  { key: 'day-of-the-dead', name: 'Day of the Dead', border: 'border-[#ba55d3]', glow: 'shadow-[0_0_35px_rgba(186,85,211,0.25)]', text: 'text-[#ba55d3]', badgeBg: 'bg-[#ba55d3]/10', badgeBorder: 'border-[#ba55d3]/40', buttonBg: 'bg-gradient-to-r from-[#ba55d3] to-[#ffffff] !text-black' },
  { key: 'eternal-dove', name: 'Eternal Remembrance', border: 'border-[#f0f8ff]', glow: 'shadow-[0_0_35px_rgba(240,248,255,0.15)]', text: 'text-[#f0f8ff]', badgeBg: 'bg-white/10', badgeBorder: 'border-white/30', buttonBg: 'bg-gradient-to-r from-[#ffffff] to-[#dcdcdc] !text-black' },
  { key: 'veteran', name: 'Veteran Appreciation', border: 'border-[#b22222]', glow: 'shadow-[0_0_35px_rgba(178,34,34,0.25)]', text: 'text-[#b22222]', badgeBg: 'bg-[#b22222]/10', badgeBorder: 'border-[#b22222]/40', buttonBg: 'bg-gradient-to-r from-[#b22222] to-[#ffffff] !text-black' },
  { key: 'get-well', name: 'Get Well Soon', border: 'border-[#adff2f]', glow: 'shadow-[0_0_35px_rgba(173,255,47,0.25)]', text: 'text-[#adff2f]', badgeBg: 'bg-[#adff2f]/10', badgeBorder: 'border-[#adff2f]/40', buttonBg: 'bg-gradient-to-r from-[#adff2f] to-[#ffffff] !text-black' },
  { key: 'thank-you', name: 'Thank You / Just Because', border: 'border-[#ffd700]', glow: 'shadow-[0_0_35px_rgba(255,215,0,0.25)]', text: 'text-[#ffd700]', badgeBg: 'bg-[#ffd700]/10', badgeBorder: 'border-[#ffd700]/40', buttonBg: 'bg-gradient-to-r from-[#ffd700] to-[#ffffff] !text-black' },
  { key: 'bff', name: "BFF's (Best Friends)", border: 'border-[#ff69b4]', glow: 'shadow-[0_0_35px_rgba(255,105,180,0.25)]', text: 'text-[#ff69b4]', badgeBg: 'bg-[#ff69b4]/10', badgeBorder: 'border-[#ff69b4]/40', buttonBg: 'bg-gradient-to-r from-[#ff69b4] to-[#ffffff] !text-black' },
];

const EMOJI_MAP: Record<string, string> = {
  'gold-confetti': '✨',
  'executive-light': '💼',
  'wealth-glamour': '💎',
  'ruby-petal': '🌹',
  'birthday': '🎂',
  'christmas': '🎄',
  'halloween': '🎃',
  'valentine': '❤️',
  'april-fools': '🤣',
  'new-years': '🥂',
  'christianity': '✝️',
  'islam': '☪️',
  'judaism': '✡️',
  'hinduism': '🪔',
  'buddhism': '☸️',
  'mothers-day': '💐',
  'fathers-day': '👔',
  'gender-reveal': '🍼',
  'graduation': '🎓',
  'engagement': '💍',
  'retirement': '🌅',
  'day-of-the-dead': '💀',
  'eternal-dove': '🕊️',
  'veteran': '🎖️',
  'get-well': '🌻',
  'thank-you': '🙏',
  'bff': '👯‍♀️',
};

export default function DemoSandboxPage() {
  const router = useRouter();
  
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaFileType, setMediaFileType] = useState<'video' | 'audio' | 'image'>('video');
  const [effectType, setEffectType] = useState('gold-confetti');
  const [isEditing, setIsEditing] = useState(true);
  const [inputMode, setInputMode] = useState<'upload' | 'record'>('upload');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Array<any>>([]);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const lastClickTimeRef = useRef<number>(0);
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement>(null);

  const handleLocalFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type.startsWith('image/')) {
      setMediaFileType('image');
    } else if (file.type.startsWith('audio/')) {
      setMediaFileType('audio');
    } else {
      setMediaFileType('video');
    }

    const localUrl = URL.createObjectURL(file);
    setMediaUrl(localUrl);
  };

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
        
        if (p.themeKey === 'executive-light') {
          ctx.shadowColor = 'rgba(229, 228, 226, 0.9)';
          ctx.shadowBlur = 12;
          ctx.fillStyle = '#e5e4e2';
          ctx.fillRect(-p.size * 0.25, -p.size * 1.8, p.size * 0.5, p.size * 3.6);
        } else {
          ctx.font = `${Math.max(22, p.size * 2.8)}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(EMOJI_MAP[p.themeKey] || '✨', 0, 0);
        }
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

  useEffect(() => {
    if (!isEditing) {
      const timer = setTimeout(() => {
        triggerEffect();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isEditing]);

  const activeThemeObj = THEMES.find((t) => t.key === effectType) || THEMES[0];

  return (
    <div className="w-full max-w-[680px] p-4 md:p-6 mx-auto my-auto flex flex-col justify-center min-h-screen text-white">
      <div className={`bg-[#101014]/95 border ${activeThemeObj.border} rounded-xl p-6 md:p-8 text-center ${activeThemeObj.glow} backdrop-blur-md flex flex-col gap-5 transition-all duration-500`}>
        
        <div className={`inline-block self-center px-4 py-1.5 border ${activeThemeObj.badgeBorder} rounded-[30px] text-[10px] tracking-[2.5px] uppercase ${activeThemeObj.text} ${activeThemeObj.badgeBg}`}>
          ✦ AURA & ARCHIVE™ LIVE ACTIVATION ✦
        </div>

        {isEditing ? (
          <div className="space-y-4 text-left">
            <h1 className={`font-serif text-[22px] uppercase ${activeThemeObj.text} tracking-[2px] text-center`}>
              {activeThemeObj.name} Portal
            </h1>
            <p className="text-[12px] text-[#b0aebf] text-center">Configure your custom message, media, and theme.</p>
            
            <div>
              <label className={`block text-xs uppercase tracking-widest ${activeThemeObj.text} mb-1 font-semibold`}>
                Recipient Name
              </label>
              <input
                type="text"
                value={recipient}
                placeholder="e.g. Sarah"
                onChange={(e) => setRecipient(e.target.value)}
                className={`w-full bg-black/60 border ${activeThemeObj.badgeBorder} p-3 text-white rounded text-sm placeholder:text-zinc-600 focus:outline-none focus:border-white transition-all`}
              />
            </div>

            <div>
              <label className={`block text-xs uppercase tracking-widest ${activeThemeObj.text} mb-1 font-semibold`}>
                Personal Gift Message
              </label>
              <textarea
                rows={3}
                value={message}
                placeholder="Type your personal note here..."
                onChange={(e) => setMessage(e.target.value)}
                className={`w-full bg-black/60 border ${activeThemeObj.badgeBorder} p-3 text-white rounded text-sm placeholder:text-zinc-600 focus:outline-none focus:border-white transition-all`}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className={`block text-xs uppercase tracking-widest ${activeThemeObj.text} font-semibold`}>
                  Media Attachment
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setInputMode('upload')}
                    className={`text-[10px] px-2.5 py-1 rounded uppercase tracking-wider font-semibold transition ${inputMode === 'upload' ? 'bg-[#d4af37] text-black' : 'bg-black/60 text-zinc-400'}`}
                  >
                    Upload File
                  </button>
                  <button
                    type="button"
                    onClick={() => setInputMode('record')}
                    className={`text-[10px] px-2.5 py-1 rounded uppercase tracking-wider font-semibold transition ${inputMode === 'record' ? 'bg-[#d4af37] text-black' : 'bg-black/60 text-zinc-400'}`}
                  >
                    Record Audio
                  </button>
                </div>
              </div>

              {inputMode === 'upload' ? (
                <input
                  type="file"
                  accept="video/*,audio/*,image/*"
                  onChange={handleLocalFileSelect}
                  className={`w-full bg-black/60 border ${activeThemeObj.badgeBorder} p-2.5 text-xs text-[#f4e6b0] rounded cursor-pointer file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[#d4af37] file:text-black hover:file:brightness-110`}
                />
              ) : (
                <div className="mt-2 flex justify-center">
                  <AudioRecorder
                    onUploadComplete={(publicUrl) => {
                      setMediaUrl(publicUrl);
                      setMediaFileType('audio');
                    }}
                  />
                </div>
              )}
            </div>

            <div>
              <label className={`block text-xs uppercase tracking-widest ${activeThemeObj.text} mb-1 font-semibold`}>
                Gift Note Theme & Effect (All 27 Themes)
              </label>
              <select
                value={effectType}
                onChange={(e) => setEffectType(e.target.value)}
                className={`w-full bg-black/60 border ${activeThemeObj.badgeBorder} p-3 text-white rounded text-sm focus:outline-none focus:border-white cursor-pointer transition-all`}
              >
                {THEMES.map((t) => (
                  <option key={t.key} value={t.key} className="bg-[#101014] text-white">{t.name}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setIsEditing(false)}
              className={`w-full py-3.5 font-bold rounded text-[11px] uppercase tracking-[1.5px] cursor-pointer shadow-lg transition-all ${activeThemeObj.buttonBg}`}
            >
              Preview Live Card Experience ✦
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h1 className={`font-serif text-[24px] uppercase ${activeThemeObj.text} tracking-[2px]`}>{activeThemeObj.name} Experience</h1>
              <p className="text-[12px] text-[#b0aebf] tracking-[1px] mt-1">LIVE CARD PREVIEW</p>
            </div>

            <div className={`text-left bg-black/40 border ${activeThemeObj.badgeBorder} p-5 rounded-lg text-[#f4e6b0]`}>
              <p className={`text-xs uppercase tracking-widest ${activeThemeObj.text} font-semibold mb-2`}>To: {recipient || 'A Special Friend'}</p>
              <p className="text-base font-light leading-relaxed whitespace-pre-wrap">{message || 'Your personal gift message will appear here!'}</p>
            </div>

            {mediaUrl && (
              <div className={`relative w-full rounded-lg overflow-hidden border ${activeThemeObj.badgeBorder} bg-black/60 p-4 flex flex-col items-center justify-center gap-4`}>
                {mediaFileType === 'image' ? (
                  <div className="w-full flex flex-col items-center justify-center">
                    <img src={mediaUrl} alt="Uploaded Media" className="max-h-[350px] w-auto object-contain rounded-lg shadow-md" />
                  </div>
                ) : mediaFileType === 'audio' ? (
                  <div className="w-full flex flex-col items-center gap-3 py-2">
                    <div className={`relative w-24 h-24 rounded-full overflow-hidden border-2 ${activeThemeObj.border} ${activeThemeObj.glow} bg-black flex items-center justify-center p-2 shadow-xl animate-pulse`}>
                      <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                    </div>
                    <p className={`text-xs uppercase tracking-[2px] ${activeThemeObj.text} font-semibold`}>✦ Exclusive Media Note ✦</p>
                    <audio ref={mediaRef as React.RefObject<HTMLAudioElement>} src={mediaUrl} controls className="w-full mt-2" />
                  </div>
                ) : (
                  <div className={`relative w-full rounded-lg overflow-hidden border ${activeThemeObj.badgeBorder} bg-black aspect-video`}>
                    <video ref={mediaRef as React.RefObject<HTMLVideoElement>} src={mediaUrl} controls playsInline className="w-full h-full object-contain block" />
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-col gap-3">
              <button 
                className={`w-full py-3.5 text-[11px] font-bold uppercase tracking-[1.5px] rounded cursor-pointer shadow-md ${activeThemeObj.buttonBg}`} 
                onClick={triggerEffect}
              >
                ✦ Burst Gift Note Animation ✦
              </button>

              <button 
                onClick={() => setIsEditing(true)}
                className="w-full py-3 text-[11px] bg-black/60 border border-[#d4af37]/60 text-[#f4e6b0] font-semibold rounded uppercase tracking-[1.5px] cursor-pointer hover:bg-black/80 transition-all"
              >
                ✦ Edit Sample Message & Theme ✦
              </button>

              <div className="pt-4 border-t border-[#d4af37]/20 text-center space-y-2">
                <p className="text-xs text-[#b0aebf]">Love this interactive smart card? Lock it in permanently.</p>
                <a
                  href="/"
                  target="_blank"
                  className="block w-full py-3.5 bg-gradient-to-r from-[#d4af37] to-[#f4e6b0] !text-black font-extrabold text-[12px] uppercase tracking-[1.5px] rounded shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-all hover:brightness-110"
                >
                  ORDER YOUR OWN PHYSICAL CARD NOW ✦
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}