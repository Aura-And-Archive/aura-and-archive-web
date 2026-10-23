'use client';

import React, { useState, useEffect, useRef } from 'react';
import AudioRecorder from '@/components/AudioRecorder';

export const THEMES = [
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
  const [isPreviewingAsRecipient, setIsPreviewingAsRecipient] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Array<any>>([]);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const autoBurstIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement>(null);

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

      if (paramTo || paramMsg || paramPhoto || paramMedia || paramTheme) {
        if (isSandbox) setIsPreviewingAsRecipient(true);
      }
    }
  }, [isSandbox]);

  useEffect(() => {
    if (isPreviewingAsRecipient && mediaRef.current) {
      mediaRef.current.play().catch((err) => {
        console.log('Autoplay restricted:', err);
      });
    }
  }, [isPreviewingAsRecipient, mediaUrl]);

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoUrl(URL.createObjectURL(file));
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
      setIsPreviewingAsRecipient(true);
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

  const copyVaultLink = () => {
    if (isSandbox) {
      const origin = window.location.origin;
      const pathname = window.location.pathname;
      const params = new URLSearchParams();

      if (recipient) params.set('to', recipient);
      if (message) params.set('msg', message);
      if (photoUrl) params.set('photo', photoUrl);
      if (mediaUrl) params.set('media', mediaUrl);
      if (effectType) params.set('theme', effectType);

      navigator.clipboard.writeText(`${origin}${pathname}?${params.toString()}`);
      setToastMessage('Personalized demo link copied to clipboard ✨');
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
    if (isPreviewingAsRecipient || isSandbox) {
      autoBurstIntervalRef.current = setInterval(() => {
        triggerFireworksBurst();
      }, 1500);
    }
    return () => {
      if (autoBurstIntervalRef.current) clearInterval(autoBurstIntervalRef.current);
    };
  }, [isPreviewingAsRecipient, isSandbox, emojisActive, effectType]);

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
    <div 
      className="w-full max-w-[680px] p-4 md:p-6 mx-auto my-auto flex flex-col justify-center min-h-screen text-white relative bg-cover bg-center transition-all duration-700"
      style={photoUrl ? { backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${photoUrl})` } : {}}
    >
      <div className={`bg-[#101014]/60 border ${activeThemeObj.border} rounded-xl p-6 md:p-8 text-center ${activeThemeObj.glow} backdrop-blur-md flex flex-col gap-5 transition-all duration-500 shadow-2xl`}>
        
        {/* Uniform Header Bar matching mobile & webview identically */}
        {!isPreviewingAsRecipient && (
          <div className="flex flex-row items-center justify-between gap-2 w-full">
            <div className={`px-3 sm:px-4 py-1.5 border ${activeThemeObj.badgeBorder} rounded-[30px] text-[9px] sm:text-[10px] tracking-[1.5px] sm:tracking-[2.5px] uppercase ${activeThemeObj.text} ${activeThemeObj.badgeBg} truncate`}>
              ✦ AURA & ARCHIVE™ LIVE ACTIVATION ✦
            </div>

            <button
              type="button"
              onClick={() => setEmojisActive(!emojisActive)}
              className={`shrink-0 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold border transition-all ${emojisActive ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-400' : 'bg-zinc-900 border-zinc-700 text-zinc-400'}`}
            >
              Emojis: {emojisActive ? 'ON ✨' : 'OFF 🚫'}
            </button>
          </div>
        )}

        {isEditing && !isPreviewingAsRecipient ? (
          <div className="space-y-5 text-left">
            <h1 className={`font-serif text-[22px] uppercase ${activeThemeObj.text} tracking-[2px] text-center`}>
              {activeThemeObj.name} Portal
            </h1>
            <p className="text-[12px] text-[#b0aebf] text-center">Configure your recipient, background photo, multimedia audio/video note, and theme.</p>
            
            {/* Recipient Name */}
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

            {/* Personal Gift Message */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className={`block text-xs uppercase tracking-widest ${activeThemeObj.text} font-semibold`}>
                  Personal Gift Message
                </label>
                <span className={`text-[10px] ${message.length > 500 ? 'text-red-400' : 'text-zinc-400'}`}>
                  {message.length}/500
                </span>
              </div>
              <textarea
                rows={3}
                maxLength={500}
                value={message}
                placeholder="Type your personal note here..."
                onChange={(e) => setMessage(e.target.value)}
                className={`w-full bg-black/60 border ${activeThemeObj.badgeBorder} p-3 text-white rounded text-sm placeholder:text-zinc-600 focus:outline-none focus:border-white transition-all`}
              />
            </div>

            {/* MEDIA 1: Background Image Only (JPEG, PNG, WEBP) */}
            <div>
              <label className={`block text-xs uppercase tracking-widest ${activeThemeObj.text} mb-1 font-semibold`}>
                Media Attachment 1: Background Image (JPEG, PNG, WebP)
              </label>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/jpg"
                onChange={handlePhotoSelect}
                className={`w-full bg-black/60 border ${activeThemeObj.badgeBorder} p-2.5 text-xs text-[#f4e6b0] rounded cursor-pointer file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[#d4af37] file:text-black hover:file:brightness-110`}
              />
              {photoUrl && (
                <div className={`mt-2 flex items-center justify-between p-2 rounded bg-black/80 border ${activeThemeObj.badgeBorder}`}>
                  <span className={`text-[11px] ${activeThemeObj.text} font-medium truncate max-w-[240px]`}>
                    ✓ Background Image Attached
                  </span>
                  <button
                    type="button"
                    onClick={() => setPhotoUrl('')}
                    className="text-[10px] text-red-400 hover:text-red-300 uppercase tracking-wider font-bold px-2 py-0.5 bg-red-950/40 rounded border border-red-500/30 transition"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* MEDIA 2: Multimedia Audio/Video/Recorder/Link */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className={`block text-xs uppercase tracking-widest ${activeThemeObj.text} font-semibold`}>
                  Media Attachment 2: Auto-Playing Multimedia Note
                </label>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => setInputMode('upload')}
                    className={`text-[9px] px-2 py-1 rounded uppercase tracking-wider font-semibold transition ${inputMode === 'upload' ? `${activeThemeObj.buttonBg} font-bold` : 'bg-black/60 text-zinc-400'}`}
                  >
                    Upload File
                  </button>
                  <button
                    type="button"
                    onClick={() => setInputMode('record')}
                    className={`text-[9px] px-2 py-1 rounded uppercase tracking-wider font-semibold transition ${inputMode === 'record' ? `${activeThemeObj.buttonBg} font-bold` : 'bg-black/60 text-zinc-400'}`}
                  >
                    Record Voice
                  </button>
                  <button
                    type="button"
                    onClick={() => setInputMode('link')}
                    className={`text-[9px] px-2 py-1 rounded uppercase tracking-wider font-semibold transition ${inputMode === 'link' ? `${activeThemeObj.buttonBg} font-bold` : 'bg-black/60 text-zinc-400'}`}
                  >
                    Media Link
                  </button>
                </div>
              </div>

              {inputMode === 'upload' ? (
                <input
                  type="file"
                  accept="video/*,audio/*"
                  onChange={handleMediaUpload}
                  className={`w-full bg-black/60 border ${activeThemeObj.badgeBorder} p-2.5 text-xs text-[#f4e6b0] rounded cursor-pointer file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[#d4af37] file:text-black hover:file:brightness-110`}
                />
              ) : inputMode === 'record' ? (
                <div className="mt-1 flex flex-col items-center gap-2">
                  <AudioRecorder
                    themeBorder={activeThemeObj.border}
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
                    placeholder="Paste direct audio/video URL (.mp4, .mp3)"
                    value={externalLinkInput}
                    onChange={(e) => setExternalLinkInput(e.target.value)}
                    className={`flex-1 bg-black/60 border ${activeThemeObj.badgeBorder} p-2.5 text-xs text-white rounded placeholder:text-zinc-600 focus:outline-none`}
                  />
                  <button
                    type="button"
                    onClick={handleExternalLinkSave}
                    className={`px-3 py-2 text-xs uppercase font-bold rounded ${activeThemeObj.buttonBg}`}
                  >
                    Attach
                  </button>
                </div>
              )}

              {mediaUrl && (
                <div className={`mt-2 flex items-center justify-between p-2 rounded bg-black/80 border ${activeThemeObj.badgeBorder}`}>
                  <span className={`text-[11px] ${activeThemeObj.text} font-medium truncate max-w-[240px]`}>
                    ✓ Multimedia Note Attached
                  </span>
                  <button
                    type="button"
                    onClick={() => setMediaUrl('')}
                    className="text-[10px] text-red-400 hover:text-red-300 uppercase tracking-wider font-bold px-2 py-0.5 bg-red-950/40 rounded border border-red-500/30 transition"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Theme Selector (27 Themes) */}
            <div>
              <label className={`block text-xs uppercase tracking-widest ${activeThemeObj.text} mb-1 font-semibold`}>
                Gift Note Theme & Emoji Cascade (All 27 Themes)
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
              onClick={() => setIsPreviewingAsRecipient(true)}
              className={`w-full py-3.5 font-bold rounded text-[11px] uppercase tracking-[1.5px] cursor-pointer shadow-lg transition-all ${activeThemeObj.buttonBg}`}
            >
              Preview Live Card Experience ✦
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {!isPreviewingAsRecipient && (
              <div>
                <h1 className={`font-serif text-[24px] uppercase ${activeThemeObj.text} tracking-[2px]`}>{activeThemeObj.name} Experience</h1>
                <p className="text-[12px] text-[#b0aebf] tracking-[1px] mt-1">{isSandbox ? 'LIVE CARD PREVIEW' : 'AURA MEMORY VAULT'}</p>
              </div>
            )}

            <div className={`text-left bg-black/40 border ${activeThemeObj.badgeBorder} p-5 rounded-lg text-[#f4e6b0]`}>
              <p className={`text-xs uppercase tracking-widest ${activeThemeObj.text} font-semibold mb-2`}>To: {recipient || 'A Special Friend'}</p>
              <p className="text-base font-light leading-relaxed whitespace-pre-wrap">{message || 'Your personal gift message will appear here!'}</p>
            </div>

            {/* Auto-Playing Media 2 Container */}
            {mediaUrl && (
              <div className={`relative w-full rounded-lg overflow-hidden border ${activeThemeObj.badgeBorder} bg-black/70 p-4 flex flex-col items-center justify-center gap-3`}>
                <p className={`text-[10px] uppercase tracking-[2px] ${activeThemeObj.text} font-semibold`}>✦ Auto-Playing Media Note ✦</p>
                {mediaFileType === 'audio' ? (
                  <audio 
                    ref={mediaRef as React.RefObject<HTMLAudioElement>} 
                    src={mediaUrl} 
                    autoPlay 
                    controls 
                    className="w-full mt-1" 
                  />
                ) : (
                  <video 
                    ref={mediaRef as React.RefObject<HTMLVideoElement>} 
                    src={mediaUrl} 
                    autoPlay 
                    playsInline 
                    controls 
                    className="w-full h-full max-h-[300px] object-contain rounded block" 
                  />
                )}
              </div>
            )}

            {/* CLEAN IMMERSIVE RECIPIENT EXPERIENCE VIEW (Only shows Back to Editing button) */}
            {isPreviewingAsRecipient ? (
              <div className="pt-2">
                <button
                  onClick={() => setIsPreviewingAsRecipient(false)}
                  className={`w-full py-3.5 font-bold text-[11px] uppercase tracking-[1.5px] rounded border ${activeThemeObj.badgeBorder} ${activeThemeObj.text} bg-black/80 hover:bg-black transition-all shadow-lg`}
                >
                  ← Back to Editing
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {isSandbox && (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setIsPreviewingAsRecipient(true)}
                      className={`flex-1 py-3 text-[10px] bg-black/60 border ${activeThemeObj.badgeBorder} ${activeThemeObj.text} font-semibold rounded uppercase tracking-wider hover:bg-black/80 transition-all`}
                    >
                      Test Recipient View ✦
                    </button>
                    <button 
                      onClick={copyVaultLink}
                      className={`flex-1 py-3 text-[10px] bg-black/60 border ${activeThemeObj.badgeBorder} ${activeThemeObj.text} font-semibold rounded uppercase tracking-wider hover:bg-black/80 transition-all`}
                    >
                      Copy Link 📋
                    </button>
                  </div>
                )}

                {!isSandbox ? (
                  <button
                    onClick={handleSaveToDatabase}
                    disabled={isSaving}
                    className={`w-full py-3.5 font-extrabold text-[12px] uppercase tracking-[1.5px] rounded shadow-lg transition-all ${activeThemeObj.buttonBg}`}
                  >
                    {isSaving ? 'Saving Vault...' : 'LOCK & SAVE CARD CONFIGURATION ✦'}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsPreviewingAsRecipient(false);
                      setRecipient('');
                      setMessage('');
                      setPhotoUrl('');
                      setMediaUrl('');
                      setToastMessage('Demo reset! Create a new custom card ✨');
                    }}
                    className={`w-full py-3.5 font-bold text-[11px] uppercase tracking-[1.5px] rounded border ${activeThemeObj.badgeBorder} ${activeThemeObj.text} bg-black/60 hover:bg-black/80 transition-all`}
                  >
                    ✦ CREATE ANOTHER CUSTOM DEMO ✦
                  </button>
                )}

                <div className={`pt-4 border-t ${activeThemeObj.badgeBorder} text-center space-y-2`}>
                  <p className="text-xs text-[#b0aebf]">Love this interactive smart card? Lock it in permanently.</p>
                  <a
                    href="/"
                    target="_blank"
                    className={`block w-full py-3.5 font-extrabold text-[12px] uppercase tracking-[1.5px] rounded shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-all hover:brightness-110 ${activeThemeObj.buttonBg}`}
                  >
                    ORDER YOUR OWN PHYSICAL CARD NOW ✦
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Modal Toast Overlay */}
      {toastMessage && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className={`bg-[#101014] border ${activeThemeObj.border} rounded-xl p-6 text-center ${activeThemeObj.glow} max-w-sm w-full flex flex-col gap-4 shadow-2xl`}>
            <div className={`inline-block self-center px-3 py-1 border ${activeThemeObj.badgeBorder} rounded-full text-[9px] tracking-[2px] uppercase ${activeThemeObj.text} ${activeThemeObj.badgeBg}`}>
              ✦ AURA & ARCHIVE ✦
            </div>
            <p className="text-sm text-white font-light leading-relaxed">
              {toastMessage}
            </p>
            <button
              type="button"
              onClick={() => {
                if (toastMessage.includes('Entering Recipient Experience Preview')) {
                  setIsPreviewingAsRecipient(true);
                }
                setToastMessage(null);
              }}
              className={`w-full py-2.5 font-bold text-[11px] uppercase tracking-[1.5px] rounded transition-all cursor-pointer ${activeThemeObj.buttonBg}`}
            >
              CONTINUE ✦
            </button>
          </div>
        </div>
      )}
    </div>
  );
}