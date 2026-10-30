'use client';

// BUILD_CACHE_BUST: 2026-10-29-DECOUPLED-BASE64-CANVAS
import React, { useState, useEffect, useRef } from 'react';
import AudioRecorder from '@/components/AudioRecorder';

export const THEMES = [
  { key: 'gold-confetti', name: 'Aura Gold', text: 'text-[#d4af37]', badgeBg: 'bg-[#d4af37]/20', badgeBorder: 'border-[#d4af37]/60', buttonBg: 'bg-gradient-to-r from-[#d4af37] to-[#f4e6b0] !text-black' },
  { key: 'executive-light', name: 'Corporate Lumina', text: 'text-[#e5e4e2]', badgeBg: 'bg-[#e5e4e2]/20', badgeBorder: 'border-[#e5e4e2]/60', buttonBg: 'bg-gradient-to-r from-[#e5e4e2] to-[#ffffff] !text-black' },
  { key: 'wealth-glamour', name: 'Wealth & Glamour', text: 'text-[#b9f2ff]', badgeBg: 'bg-[#b9f2ff]/20', badgeBorder: 'border-[#b9f2ff]/60', buttonBg: 'bg-gradient-to-r from-[#b9f2ff] to-[#ffffff] !text-black' },
  { key: 'ruby-petal', name: 'Crimson Romance', text: 'text-[#ff69b4]', badgeBg: 'bg-[#dc143c]/30', badgeBorder: 'border-[#dc143c]/60', buttonBg: 'bg-gradient-to-r from-[#dc143c] to-[#ff1493] !text-white' },
  { key: 'birthday', name: 'Happy Birthday', text: 'text-[#ffb6c1]', badgeBg: 'bg-[#ffb6c1]/20', badgeBorder: 'border-[#ffb6c1]/60', buttonBg: 'bg-gradient-to-r from-[#ffb6c1] to-[#ff69b4] !text-black' },
  { key: 'christmas', name: 'Winter & Christmas', text: 'text-[#2e8b57]', badgeBg: 'bg-[#2e8b57]/20', badgeBorder: 'border-[#2e8b57]/60', buttonBg: 'bg-gradient-to-r from-[#2e8b57] to-[#ffffff] !text-black' },
  { key: 'halloween', name: 'Halloween', text: 'text-[#ff8c00]', badgeBg: 'bg-[#ff8c00]/20', badgeBorder: 'border-[#ff8c00]/60', buttonBg: 'bg-gradient-to-r from-[#ff8c00] to-[#000000] !text-white' },
  { key: 'valentine', name: "Valentine's Day", text: 'text-[#ff69b4]', badgeBg: 'bg-[#ff69b4]/20', badgeBorder: 'border-[#ff69b4]/60', buttonBg: 'bg-gradient-to-r from-[#ff69b4] to-[#ffffff] !text-black' },
  { key: 'april-fools', name: 'April Fools & Humor', text: 'text-[#ffd700]', badgeBg: 'bg-[#ffd700]/20', badgeBorder: 'border-[#ffd700]/60', buttonBg: 'bg-gradient-to-r from-[#ffd700] to-[#ffffff] !text-black' },
  { key: 'new-years', name: "New Year's Eve", text: 'text-[#e5e4e2]', badgeBg: 'bg-[#e5e4e2]/20', badgeBorder: 'border-[#e5e4e2]/60', buttonBg: 'bg-gradient-to-r from-[#e5e4e2] to-[#ffffff] !text-black' },
  { key: 'christianity', name: 'Christianity', text: 'text-[#dda0dd]', badgeBg: 'bg-[#dda0dd]/20', badgeBorder: 'border-[#dda0dd]/60', buttonBg: 'bg-gradient-to-r from-[#dda0dd] to-[#ffffff] !text-black' },
  { key: 'islam', name: 'Islam', text: 'text-[#98fb98]', badgeBg: 'bg-[#98fb98]/20', badgeBorder: 'border-[#98fb98]/60', buttonBg: 'bg-gradient-to-r from-[#98fb98] to-[#ffffff] !text-black' },
  { key: 'judaism', name: 'Judaism', text: 'text-[#87ceeb]', badgeBg: 'bg-[#87ceeb]/20', badgeBorder: 'border-[#87ceeb]/60', buttonBg: 'bg-gradient-to-r from-[#87ceeb] to-[#ffffff] !text-black' },
  { key: 'hinduism', name: 'Hinduism (Diwali)', text: 'text-[#ffa500]', badgeBg: 'bg-[#ffa500]/20', badgeBorder: 'border-[#ffa500]/60', buttonBg: 'bg-gradient-to-r from-[#ffa500] to-[#ffffff] !text-black' },
  { key: 'buddhism', name: 'Buddhism', text: 'text-[#deb887]', badgeBg: 'bg-[#deb887]/20', badgeBorder: 'border-[#deb887]/60', buttonBg: 'bg-gradient-to-r from-[#deb887] to-[#ffffff] !text-black' },
  { key: 'mothers-day', name: "Mother's Day", text: 'text-[#ffb6c1]', badgeBg: 'bg-[#ffb6c1]/20', badgeBorder: 'border-[#ffb6c1]/60', buttonBg: 'bg-gradient-to-r from-[#ffb6c1] to-[#ffffff] !text-black' },
  { key: 'fathers-day', name: "Father's Day", text: 'text-[#4682b4]', badgeBg: 'bg-[#4682b4]/20', badgeBorder: 'border-[#4682b4]/60', buttonBg: 'bg-gradient-to-r from-[#4682b4] to-[#ffffff] !text-black' },
  { key: 'gender-reveal', name: 'New Arrival', text: 'text-[#87ceeb]', badgeBg: 'bg-[#87ceeb]/20', badgeBorder: 'border-[#87ceeb]/60', buttonBg: 'bg-gradient-to-r from-[#87ceeb] to-[#ffffff] !text-black' },
  { key: 'graduation', name: 'Graduation', text: 'text-[#daa520]', badgeBg: 'bg-[#daa520]/20', badgeBorder: 'border-[#daa520]/60', buttonBg: 'bg-gradient-to-r from-[#daa520] to-[#ffffff] !text-black' },
  { key: 'engagement', name: 'Engagement', text: 'text-[#e0ffff]', badgeBg: 'bg-[#e0ffff]/20', badgeBorder: 'border-[#e0ffff]/60', buttonBg: 'bg-gradient-to-r from-[#e0ffff] to-[#ffffff] !text-black' },
  { key: 'retirement', name: 'Retirement & Farewell', text: 'text-[#f4a460]', badgeBg: 'bg-[#f4a460]/20', badgeBorder: 'border-[#f4a460]/60', buttonBg: 'bg-gradient-to-r from-[#f4a460] to-[#ffffff] !text-black' },
  { key: 'day-of-the-dead', name: 'Day of the Dead', text: 'text-[#ba55d3]', badgeBg: 'bg-[#ba55d3]/20', badgeBorder: 'border-[#ba55d3]/60', buttonBg: 'bg-gradient-to-r from-[#ba55d3] to-[#ffffff] !text-black' },
  { key: 'eternal-dove', name: 'Eternal Remembrance', text: 'text-[#f0f8ff]', badgeBg: 'bg-white/20', badgeBorder: 'border-white/50', buttonBg: 'bg-gradient-to-r from-[#ffffff] to-[#dcdcdc] !text-black' },
  { key: 'veteran', name: 'Veteran Appreciation', text: 'text-[#b22222]', badgeBg: 'bg-[#b22222]/20', badgeBorder: 'border-[#b22222]/60', buttonBg: 'bg-gradient-to-r from-[#b22222] to-[#ffffff] !text-black' },
  { key: 'get-well', name: 'Get Well Soon', text: 'text-[#adff2f]', badgeBg: 'bg-[#adff2f]/20', badgeBorder: 'border-[#adff2f]/60', buttonBg: 'bg-gradient-to-r from-[#adff2f] to-[#ffffff] !text-black' },
  { key: 'thank-you', name: 'Thank You / Just Because', text: 'text-[#ffd700]', badgeBg: 'bg-[#ffd700]/20', badgeBorder: 'border-[#ffd700]/60', buttonBg: 'bg-gradient-to-r from-[#ffd700] to-[#ffffff] !text-black' },
  { key: 'bff', name: "BFF's (Best Friends)", text: 'text-[#ff69b4]', badgeBg: 'bg-[#ff69b4]/20', badgeBorder: 'border-[#ff69b4]/60', buttonBg: 'bg-gradient-to-r from-[#ff69b4] to-[#ffffff] !text-black' },
];

export const EMOJI_MAP: Record<string, string> = {
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

interface CardExperienceProps {
  cardId?: string;
  initialRecipient?: string;
  initialMessage?: string;
  initialPhotoUrl?: string;
  initialMediaUrl?: string;
  initialTheme?: string;
  isSandbox?: boolean;
}

export default function CardExperience({
  cardId = '',
  initialRecipient = '',
  initialMessage = '',
  initialPhotoUrl = '',
  initialMediaUrl = '',
  initialTheme = 'gold-confetti',
  isSandbox = false,
}: CardExperienceProps) {
  const [recipient, setRecipient] = useState(initialRecipient);
  const [message, setMessage] = useState(initialMessage);
  const [photoUrl, setPhotoUrl] = useState(initialPhotoUrl);
  const [mediaUrl, setMediaUrl] = useState(initialMediaUrl);
  const [mediaFileType, setMediaFileType] = useState<'video' | 'audio'>('video');
  const [inputMode, setInputMode] = useState<'upload' | 'record' | 'link'>('upload');
  const [externalLinkInput, setExternalLinkInput] = useState('');

  const [effectType, setEffectType] = useState(initialTheme);
  const [emojisActive, setEmojisActive] = useState(true);
  const [isEditing, setIsEditing] = useState(isSandbox);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Array<any>>([]);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const autoBurstIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const query = new URLSearchParams(window.location.search);
      const paramTo = query.get('to');
      const paramMsg = query.get('msg');
      const paramPhoto = query.get('photo');
      const paramMedia = query.get('media');
      const paramTheme = query.get('theme');

      if (paramTo) setRecipient(paramTo);
      if (paramMsg) setMessage(paramMsg);
      if (paramPhoto) setPhotoUrl(paramPhoto);
      if (paramMedia) setMediaUrl(paramMedia);
      if (paramTheme) setEffectType(paramTheme);
    }
  }, []);

  // UPDATED: Base64 FileReader implementation for indestructible mobile image caching
  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setPhotoUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type.startsWith('audio/')) {
      setMediaFileType('audio');
    } else {
      setMediaFileType('video');
    }
    setMediaUrl(URL.createObjectURL(file));
  };

  const handleExternalLinkSave = () => {
    if (!externalLinkInput) return;
    setMediaUrl(externalLinkInput);
    setMediaFileType('video');
    setToastMessage('External media link attached successfully ✨');
  };

  const handleSaveToDatabase = async () => {
    if (isSandbox) {
      launchDecoupledViewer();
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch('/api/cards/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cardId, recipient, message, photoUrl, mediaUrl, theme: effectType }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save card configuration.');
      
      setToastMessage('Card successfully saved & locked in your memory vault ✨');
      setIsEditing(false);
    } catch (err: any) {
      setToastMessage(err.message || 'Error saving card.');
    } finally {
      setIsSaving(false);
    }
  };

  // UPDATED: Launches the decoupled standalone viewer route
  const launchDecoupledViewer = () => {
    const params = new URLSearchParams();
    if (recipient) params.set('to', recipient);
    if (message) params.set('msg', message);
    if (photoUrl) params.set('photo', photoUrl);
    if (mediaUrl) params.set('media', mediaUrl);
    if (effectType) params.set('theme', effectType);

    const targetId = cardId || 'demo';
    window.open(`/c/${targetId}?${params.toString()}`, '_blank');
  };

  const copyVaultLink = () => {
    if (isSandbox) {
      const origin = window.location.origin;
      const params = new URLSearchParams();

      if (recipient) params.set('to', recipient);
      if (message) params.set('msg', message);
      if (photoUrl) params.set('photo', photoUrl);
      if (mediaUrl) params.set('media', mediaUrl);
      if (effectType) params.set('theme', effectType);

      navigator.clipboard.writeText(`${origin}/c/demo?${params.toString()}`);
      setToastMessage('Decoupled viewer link copied to clipboard ✨');
    } else {
      navigator.clipboard.writeText(window.location.href);
      setToastMessage('Vault link copied to clipboard ✨');
    }
  };

  const triggerFireworksBurst = () => {
    if (!emojisActive) return;

    const scale = Math.max(window.innerWidth, window.innerHeight) / 800;
    const isDesktop = window.innerWidth > 768;
    const count = isDesktop ? 20 : 28;
    const startX = isDesktop ? Math.random() * window.innerWidth : window.innerWidth / 2;
    const startY = isDesktop ? -20 : window.innerHeight / 2 - 30;

    for (let i = 0; i < count; i++) {
      const angle = isDesktop ? (Math.random() * Math.PI) + Math.PI * 0.25 : Math.random() * Math.PI * 2;
      const speed = isDesktop ? (Math.random() * 8 + 3) : (Math.random() * 14 + 5) * Math.min(scale, 1.4);

      particlesRef.current.push({
        x: startX + (isDesktop ? (Math.random() - 0.5) * window.innerWidth * 0.8 : (Math.random() - 0.5) * 80),
        y: startY + (isDesktop ? 0 : (Math.random() - 0.5) * 40),
        vx: Math.cos(angle) * speed,
        vy: isDesktop ? Math.random() * 5 + 2 : Math.sin(angle) * speed - 4,
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
    if (isSandbox) {
      autoBurstIntervalRef.current = setInterval(() => {
        triggerFireworksBurst();
      }, 1500);
    }
    return () => {
      if (autoBurstIntervalRef.current) clearInterval(autoBurstIntervalRef.current);
    };
  }, [isSandbox, emojisActive, effectType]);

  useEffect(() => {
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

      if (emojisActive) {
        particlesRef.current.forEach((p) => {
          p.x += (p.vx + Math.sin(p.age * 0.004 + p.sway) * 0.6) * dtFactor;
          p.y += p.vy * dtFactor;
          if (p.themeKey !== 'executive-light') {
            p.vy += (isDesktop ? 0.65 : 0.15) * dtFactor;
            p.vx *= Math.pow(isDesktop ? 0.96 : 0.98, dtFactor);
          }
          p.rotation += p.rotSpeed * dtFactor;
          p.age += deltaTime;

          if (p.age > 2200) {
            p.opacity -= 0.03 * dtFactor;
          }
        });

        particlesRef.current = particlesRef.current.filter((p) => p.opacity > 0);
        if (particlesRef.current.length > 200) {
          particlesRef.current = particlesRef.current.slice(particlesRef.current.length - 200);
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
      }

      animFrameRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (canvasRef.current) canvasRef.current.remove();
    };
  }, [emojisActive]);

  const activeThemeObj = THEMES.find((t) => t.key === effectType) || THEMES[0];

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-black text-white select-none flex flex-col justify-between p-4 md:p-8">
      
      {/* Top Navigation / Controls Bar */}
      <header className="w-full max-w-xl mx-auto flex items-center justify-between gap-2 pt-2 z-20">
        <div className={`px-3 py-1 rounded-full text-[9px] tracking-[2px] uppercase ${activeThemeObj.text} ${activeThemeObj.badgeBg} border ${activeThemeObj.badgeBorder} font-bold backdrop-blur-md`}>
          ✦ UNDISCARDABLE™ STUDIO ✦
        </div>

        <button
          type="button"
          onClick={() => setEmojisActive(!emojisActive)}
          className={`px-3 py-1 rounded-full text-[9px] uppercase tracking-wider font-bold border transition-all backdrop-blur-md ${emojisActive ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-400' : 'bg-black/60 border-zinc-700 text-zinc-400'}`}
        >
          Effects: {emojisActive ? 'ON ✨' : 'OFF 🚫'}
        </button>
      </header>

      {/* Main Studio Editor Workspace (Pure Form Interface) */}
      <main className="w-full max-w-lg mx-auto my-auto py-2 z-20 overflow-y-auto max-h-[80vh]">
        <div className="w-full space-y-4 text-left p-6 rounded-3xl backdrop-blur-xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.9)] bg-black/70">
          <div className="text-center space-y-1">
            <h1 className={`font-serif text-[22px] uppercase ${activeThemeObj.text} tracking-[2px]`}>
              Custom Card Studio
            </h1>
            <p className="text-[11px] text-zinc-300">Design your background photo & message exactly as you pictured it.</p>
          </div>
          
          {/* Recipient Name */}
          <div>
            <label className={`block text-[10px] uppercase tracking-widest ${activeThemeObj.text} mb-1 font-bold`}>
              Recipient Name
            </label>
            <input
              type="text"
              value={recipient}
              placeholder="e.g. Sarah"
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full bg-black/70 border border-white/20 p-2.5 text-white rounded-xl text-xs placeholder:text-zinc-500 focus:outline-none focus:border-white transition-all"
            />
          </div>

          {/* Personal Gift Message */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className={`block text-[10px] uppercase tracking-widest ${activeThemeObj.text} font-bold`}>
                Personal Gift Message
              </label>
              <span className={`text-[9px] ${message.length > 500 ? 'text-red-400' : 'text-zinc-400'}`}>
                {message.length}/500
              </span>
            </div>
            <textarea
              rows={2}
              maxLength={500}
              value={message}
              placeholder="Type your personal note here..."
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-black/70 border border-white/20 p-2.5 text-white rounded-xl text-xs placeholder:text-zinc-500 focus:outline-none focus:border-white transition-all"
            />
          </div>

          {/* HERO BACKGROUND PHOTO UPLOAD */}
          <div className="p-3 rounded-xl border border-amber-500/40 bg-amber-500/10 backdrop-blur-md">
            <label className={`block text-[10px] uppercase tracking-widest ${activeThemeObj.text} mb-1 font-bold flex items-center gap-1.5`}>
              <span>⭐ Custom Background Photo (Core Selling Point)</span>
            </label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/jpg"
              onChange={handlePhotoSelect}
              className="w-full bg-black/70 border border-white/20 p-2 text-[11px] text-[#f4e6b0] rounded-xl cursor-pointer file:mr-3 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-[#d4af37] file:text-black"
            />
            {photoUrl && (
              <div className="mt-2 flex items-center justify-between p-1.5 rounded-lg bg-black/90 border border-emerald-500/50">
                <span className="text-[10px] text-emerald-400 font-semibold truncate max-w-[200px]">
                  ✓ Background Photo Cached (Base64)
                </span>
                <button
                  type="button"
                  onClick={() => setPhotoUrl('')}
                  className="text-[9px] text-red-400 hover:text-red-300 uppercase font-bold px-2 py-0.5 bg-red-950/60 rounded border border-red-500/30 transition"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Multimedia Note */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className={`block text-[10px] uppercase tracking-widest ${activeThemeObj.text} font-bold`}>
                Audio/Video Note
              </label>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => setInputMode('upload')}
                  className={`text-[9px] px-2 py-0.5 rounded uppercase font-semibold transition ${inputMode === 'upload' ? `${activeThemeObj.buttonBg} font-bold` : 'bg-black/60 text-zinc-400'}`}
                >
                  Upload
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode('record')}
                  className={`text-[9px] px-2 py-0.5 rounded uppercase font-semibold transition ${inputMode === 'record' ? `${activeThemeObj.buttonBg} font-bold` : 'bg-black/60 text-zinc-400'}`}
                >
                  Record
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode('link')}
                  className={`text-[9px] px-2 py-0.5 rounded uppercase font-semibold transition ${inputMode === 'link' ? `${activeThemeObj.buttonBg} font-bold` : 'bg-black/60 text-zinc-400'}`}
                >
                  Link
                </button>
              </div>
            </div>

            {inputMode === 'upload' ? (
              <input
                type="file"
                accept="video/*,audio/*"
                onChange={handleMediaUpload}
                className="w-full bg-black/70 border border-white/20 p-2 text-[11px] text-[#f4e6b0] rounded-xl cursor-pointer file:mr-3 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[10px] file:font-semibold file:bg-[#d4af37] file:text-black"
              />
            ) : inputMode === 'record' ? (
              <div className="mt-1 flex flex-col items-center gap-1">
                <AudioRecorder
                  themeBorder={activeThemeObj.text}
                  themeText={activeThemeObj.text}
                  themeBadgeBorder={activeThemeObj.badgeBorder}
                  themeButtonBg={activeThemeObj.buttonBg}
                  onShowToast={(msg) => setToastMessage(msg)}
                  onUploadComplete={(publicUrl) => {
                    setMediaUrl(publicUrl);
                    setMediaFileType('audio');
                  }}
                />
              </div>
            ) : (
              <div className="flex gap-2 mt-1">
                <input
                  type="url"
                  placeholder="Direct URL (.mp4, .mp3)"
                  value={externalLinkInput}
                  onChange={(e) => setExternalLinkInput(e.target.value)}
                  className="flex-1 bg-black/70 border border-white/20 p-2 text-xs text-white rounded-xl placeholder:text-zinc-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleExternalLinkSave}
                  className={`px-3 py-1.5 text-[10px] uppercase font-bold rounded-xl ${activeThemeObj.buttonBg}`}
                >
                  Attach
                </button>
              </div>
            )}

            {mediaUrl && (
              <div className="mt-2 flex items-center justify-between p-1.5 rounded-lg bg-black/90 border border-emerald-500/50">
                <span className="text-[10px] text-emerald-400 font-semibold truncate max-w-[200px]">
                  ✓ Media Attached
                </span>
                <button
                  type="button"
                  onClick={() => setMediaUrl('')}
                  className="text-[9px] text-red-400 hover:text-red-300 uppercase font-bold px-2 py-0.5 bg-red-950/60 rounded border border-red-500/30 transition"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Theme Selector */}
          <div>
            <label className={`block text-[10px] uppercase tracking-widest ${activeThemeObj.text} mb-1 font-bold`}>
              Vibe Theme
            </label>
            <select
              value={effectType}
              onChange={(e) => setEffectType(e.target.value)}
              className="w-full bg-black/70 border border-white/20 p-2.5 text-white rounded-xl text-xs focus:outline-none cursor-pointer"
            >
              {THEMES.map((t) => (
                <option key={t.key} value={t.key} className="bg-[#101014] text-white">{t.name}</option>
              ))}
            </select>
          </div>

          {/* LAUNCH DECOUPLED VIEWER BUTTON */}
          <button
            onClick={launchDecoupledViewer}
            className={`w-full py-4 font-extrabold rounded-xl text-[12px] uppercase tracking-[2px] cursor-pointer shadow-xl transition-all hover:brightness-110 ${activeThemeObj.buttonBg}`}
          >
            Preview Immersive Canvas (Decoupled) ✦
          </button>
        </div>
      </main>

      {/* Bottom Actions Footer */}
      <footer className="w-full max-w-lg mx-auto pb-2 z-20">
        <div className="flex flex-col gap-2.5 p-3 rounded-2xl backdrop-blur-md border border-white/10 bg-black/40 shadow-2xl">
          {isSandbox && (
            <div className="flex gap-2">
              <button 
                onClick={launchDecoupledViewer}
                className={`flex-1 py-2.5 text-[10px] bg-black/60 border border-white/20 ${activeThemeObj.text} font-bold rounded-xl uppercase tracking-wider hover:bg-black/80 transition-all`}
              >
                Launch Viewer ✦
              </button>
              <button 
                onClick={copyVaultLink}
                className={`flex-1 py-2.5 text-[10px] bg-black/60 border border-white/20 ${activeThemeObj.text} font-bold rounded-xl uppercase tracking-wider hover:bg-black/80 transition-all`}
              >
                Copy Link 📋
              </button>
            </div>
          )}

          {!isSandbox ? (
            <button
              onClick={handleSaveToDatabase}
              disabled={isSaving}
              className={`w-full py-3.5 font-extrabold text-[11px] uppercase tracking-[2px] rounded-xl shadow-2xl transition-all hover:brightness-110 ${activeThemeObj.buttonBg}`}
            >
              {isSaving ? 'Saving Vault...' : 'LOCK & SAVE CUSTOM CARD ✦'}
            </button>
          ) : (
            <button
              onClick={() => {
                setRecipient('');
                setMessage('');
                setPhotoUrl('');
                setMediaUrl('');
                setToastMessage('Studio reset! Create your next custom background card ✨');
              }}
              className="w-full py-3 font-bold text-[10px] uppercase tracking-[1.5px] rounded-xl border border-white/20 text-white bg-black/60 hover:bg-black/80 transition-all"
            >
              ✦ RESET STUDIO ✦
            </button>
          )}

          <div className="pt-2 border-t border-white/10 text-center">
            <a
              href="/"
              target="_blank"
              className={`block w-full py-3 font-extrabold text-[11px] uppercase tracking-[1.5px] rounded-xl shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all hover:brightness-110 ${activeThemeObj.buttonBg}`}
            >
              ORDER YOUR OWN PHYSICAL SMART CARD NOW ✦
            </a>
          </div>
        </div>
      </footer>

      {/* Modal Toast Overlay */}
      {toastMessage && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className={`bg-[#101014] border ${activeThemeObj.text} rounded-2xl p-6 text-center max-w-sm w-full flex flex-col gap-4 shadow-2xl`}>
            <div className={`inline-block self-center px-3 py-1 border ${activeThemeObj.badgeBorder} rounded-full text-[9px] tracking-[2px] uppercase ${activeThemeObj.text} ${activeThemeObj.badgeBg} font-bold`}>
              ✦ AURA & ARCHIVE ✦
            </div>
            <p className="text-sm text-white font-light leading-relaxed">
              {toastMessage}
            </p>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className={`w-full py-3 font-bold text-[11px] uppercase tracking-[1.5px] rounded-xl transition-all cursor-pointer ${activeThemeObj.buttonBg}`}
            >
              CONTINUE ✦
            </button>
          </div>
        </div>
      )}
    </div>
  );
}