'use client';

// BUILD_CACHE_BUST: 2026-10-30-CLEAN-URL-DIRECT-PREVIEW-FIXED
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
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Array<any>>([]);
  const ripplesRef = useRef<Array<any>>([]);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const autoBurstIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const query = new URLSearchParams(window.location.search);
      const toParam = query.get('to');
      const msgParam = query.get('msg');
      const themeParam = query.get('theme');

      if (toParam) setRecipient(toParam);
      if (msgParam) setMessage(msgParam);
      if (themeParam) setEffectType(themeParam);

      // Automatically launch directly into Immersive Preview Mode when opening a shared link!
      if (toParam || msgParam) {
        setIsPreviewMode(true);
      }
    }
  }, []);

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

  // ==========================================
  // SHARE DEMO HANDLER (Clean & Short URLs)
  // ==========================================
  const handleShareDemo = async () => {
    const baseUrl = window.location.origin + window.location.pathname;
    const params = new URLSearchParams();
    if (recipient) params.set('to', recipient);
    if (message) params.set('msg', message);
    if (effectType) params.set('theme', effectType);

    // Note: Base64 photo strings are intentionally omitted from share URLs to prevent link bloat and image pixelation.

    const shareUrl = `${baseUrl}?${params.toString()}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Aura & Archive Gift Note',
          text: `Check out this custom gift note for ${recipient || 'you'}!`,
          url: shareUrl,
        });
        return;
      } catch (err) {
        // User cancelled or share failed, fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setToastMessage('✦ Share link copied to clipboard! Paste it anywhere to share your demo. ✦');
    } catch (err) {
      setToastMessage('Unable to generate share link.');
    }
  };

  // ==========================================
  // FACEBOOK LIVE REACTION STREAM SIMULATION
  // ==========================================
  const triggerFacebookLiveReaction = () => {
    if (!emojisActive) return;

    const count = 2;
    const startX = window.innerWidth - 70;
    const startY = window.innerHeight + 20;

    for (let i = 0; i < count; i++) {
      particlesRef.current.push({
        x: startX + (Math.random() - 0.5) * 20,
        y: startY,
        vx: -(Math.random() * 1.8 + 0.8),
        vy: -(Math.random() * 2.2 + 2.5),
        size: Math.random() * 6 + 14,
        scale: 0.2,
        targetScale: Math.random() * 0.3 + 0.95,
        rotation: (Math.random() - 0.5) * 0.4,
        rotSpeed: (Math.random() - 0.5) * 0.04,
        opacity: 0.95,
        swayAmplitude: Math.random() * 45 + 20,
        swaySpeed: Math.random() * 0.006 + 0.003,
        age: 0,
        themeKey: effectType,
      });
    }
  };

  useEffect(() => {
    autoBurstIntervalRef.current = setInterval(() => {
      triggerFacebookLiveReaction();
    }, 550);
    return () => {
      if (autoBurstIntervalRef.current) clearInterval(autoBurstIntervalRef.current);
    };
  }, [emojisActive, effectType]);

  const handleScreenTouch = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    ripplesRef.current.push({
      x: clientX,
      y: clientY,
      radius: 10,
      maxRadius: 100,
      opacity: 0.8,
      themeKey: effectType,
    });

    if (emojisActive) {
      for (let i = 0; i < 4; i++) {
        particlesRef.current.push({
          x: clientX + (Math.random() - 0.5) * 40,
          y: clientY,
          vx: (Math.random() - 0.5) * 2.5,
          vy: -(Math.random() * 3.5 + 2.5),
          size: 16,
          scale: 0.4,
          targetScale: 1.25,
          rotation: 0,
          rotSpeed: (Math.random() - 0.5) * 0.1,
          opacity: 1,
          swayAmplitude: 25,
          swaySpeed: 0.01,
          age: 0,
          themeKey: effectType,
        });
      }
    }
  };

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

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ripplesRef.current.forEach((r) => {
        r.radius += 4 * dtFactor;
        r.opacity -= 0.04 * dtFactor;

        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = r.themeKey === 'executive-light' ? 'rgba(229,228,226,' : 'rgba(212,175,55,';
        ctx.globalAlpha = Math.max(0, r.opacity);
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      });
      ripplesRef.current = ripplesRef.current.filter((r) => r.opacity > 0);

      if (emojisActive) {
        particlesRef.current.forEach((p) => {
          p.age += deltaTime;
          p.y += p.vy * dtFactor;
          
          if (p.scale < p.targetScale) {
            p.scale += 0.08 * dtFactor;
          }

          if (p.y < window.innerHeight * 0.35) {
            p.opacity -= 0.02 * dtFactor;
          }
        });

        particlesRef.current = particlesRef.current.filter((p) => p.opacity > 0 && p.y > -50);
        if (particlesRef.current.length > 140) {
          particlesRef.current = particlesRef.current.slice(particlesRef.current.length - 140);
        }

        particlesRef.current.forEach((p) => {
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.opacity);
          const xOffset = Math.sin(p.age * p.swaySpeed) * p.swayAmplitude;
          ctx.translate(p.x + xOffset, p.y);
          ctx.scale(p.scale, p.scale);
          ctx.rotate(p.rotation);
          
          if (p.themeKey === 'executive-light') {
            ctx.shadowColor = 'rgba(229, 228, 226, 0.9)';
            ctx.shadowBlur = 10;
            ctx.fillStyle = '#e5e4e2';
            ctx.fillRect(-10, -25, 20, 50);
          } else {
            ctx.font = '32px sans-serif';
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

  const toggleAudioPlayback = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play().then(() => setIsPlayingAudio(true)).catch(() => {});
    }
  };

  const activeThemeObj = THEMES.find((t) => t.key === effectType) || THEMES[0];

  // ==========================================
  // UNBOXED IMMERSIVE GIFT NOTE VIEW
  // ==========================================
  if (isPreviewMode) {
    return (
      <div 
        onClick={handleScreenTouch}
        className="fixed inset-0 w-screen h-screen overflow-hidden bg-black text-white select-none cursor-pointer"
      >
        {/* HERO BACKGROUND PHOTO */}
        {photoUrl && (
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat pointer-events-none z-0 transition-all duration-700"
            style={{ backgroundImage: `url("${photoUrl}")` }}
          />
        )}

        {/* CINEMATIC VIGNETTE */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/90 via-black/30 to-black/70 pointer-events-none z-0" />

        {/* FLOATING CANVAS CONTENT */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-between p-6 text-center">
          
          {/* Top Bar */}
          <header className="w-full max-w-xl flex items-center justify-between pt-3">
            <p className={`text-[10px] uppercase tracking-[3px] ${activeThemeObj.text} font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]`}>
              ✦ AURA & ARCHIVE ✦
            </p>
            <div className="flex items-center gap-2 pointer-events-auto">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); handleShareDemo(); }}
                className="px-3.5 py-1.5 bg-black/70 border border-white/30 text-[10px] text-white rounded-full uppercase tracking-wider backdrop-blur-md hover:bg-black/90 transition shadow-lg font-semibold"
              >
                Share ✦
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setIsPreviewMode(false); }}
                className="px-4 py-1.5 bg-black/60 border border-white/25 text-[10px] text-white rounded-full uppercase tracking-wider backdrop-blur-md hover:bg-black/80 transition shadow-lg"
              >
                ← Studio
              </button>
            </div>
          </header>

          {/* Center Typography with whitespace-pre-wrap to preserve real line breaks */}
          <main className="my-auto space-y-4 max-w-lg px-4 pointer-events-none">
            <p className={`text-xs uppercase tracking-[3px] ${activeThemeObj.text} font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,1)]`}>
              ✦ To: {recipient || 'Someone Special'} ✦
            </p>
            <h1 className="text-xl md:text-3xl font-serif leading-relaxed text-white drop-shadow-[0_2px_12px_rgba(0,0,0,1)] whitespace-pre-wrap">
              "{message || 'Your custom background gift note.'}"
            </h1>
          </main>

          {/* Bottom Floating Media & Purchase Callout */}
          <footer className="pb-6 w-full max-w-sm space-y-3 pointer-events-auto">
            {mediaUrl && mediaFileType === 'video' ? (
              <div className="w-full backdrop-blur-xl bg-black/40 border border-white/20 rounded-2xl overflow-hidden shadow-2xl aspect-video relative group">
                <video 
                  ref={videoRef}
                  src={mediaUrl} 
                  controls 
                  playsInline
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            ) : mediaUrl && mediaFileType === 'audio' ? (
              <div className="w-full backdrop-blur-md bg-black/60 border border-white/20 p-3 rounded-2xl shadow-2xl flex items-center justify-between gap-3">
                <audio ref={audioRef} src={mediaUrl} onEnded={() => setIsPlayingAudio(false)} className="hidden" />
                <button 
                  onClick={toggleAudioPlayback}
                  className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 ${activeThemeObj.buttonBg}`}
                >
                  {isPlayingAudio ? '⏸' : '▶'}
                </button>
                <div className="flex-1 text-left">
                  <p className={`text-[10px] uppercase tracking-widest ${activeThemeObj.text} font-bold`}>Voice Note</p>
                  <p className="text-[11px] text-zinc-300 font-mono">{isPlayingAudio ? 'Playing audio...' : 'Tap to listen'}</p>
                </div>
                {isPlayingAudio && (
                  <div className="flex items-center gap-1">
                    <span className="w-1 h-3 bg-amber-400 animate-pulse rounded-full" />
                    <span className="w-1 h-5 bg-amber-400 animate-pulse delay-75 rounded-full" />
                    <span className="w-1 h-2 bg-amber-400 animate-pulse delay-150 rounded-full" />
                  </div>
                )}
              </div>
            ) : null}

            <a
              href="/"
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              className={`block w-full py-3.5 font-extrabold text-[11px] uppercase tracking-[2px] rounded-xl shadow-2xl transition-all hover:brightness-110 ${activeThemeObj.buttonBg}`}
            >
              ORDER YOUR PHYSICAL SMART CARD ✦
            </a>
          </footer>

        </div>
      </div>
    );
  }

  // ==========================================
  // PREMIUM STUDIO FORM INTERFACE
  // ==========================================
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-black text-white select-none flex flex-col justify-between p-4 md:p-8">
      
      {/* Studio Header - Equally Sized 3-Column Layout */}
      <header className="w-full max-w-xl mx-auto flex items-center justify-between gap-2 pt-2 z-20">
        <div className={`flex-1 flex items-center justify-center px-2 py-2 rounded-2xl text-[9px] tracking-[1px] uppercase ${activeThemeObj.text} ${activeThemeObj.badgeBg} border ${activeThemeObj.badgeBorder} font-bold backdrop-blur-md text-center h-10`}>
          ✦ GIFT NOTE STUDIO ✦
        </div>

        <button
          type="button"
          onClick={handleShareDemo}
          className="flex-1 flex items-center justify-center px-2 py-2 rounded-2xl text-[9px] uppercase tracking-wider font-bold border border-white/30 bg-black/60 text-white transition-all backdrop-blur-md hover:bg-black/80 text-center h-10 shadow-lg cursor-pointer"
        >
          Share Demo ✦
        </button>

        <button
          type="button"
          onClick={() => setEmojisActive(!emojisActive)}
          className={`flex-1 flex items-center justify-center px-2 py-2 rounded-2xl text-[9px] uppercase tracking-wider font-bold border transition-all backdrop-blur-md text-center h-10 shadow-lg cursor-pointer ${emojisActive ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-400' : 'bg-black/60 border-zinc-700 text-zinc-400'}`}
        >
          Reactions: {emojisActive ? 'ON ✨' : 'OFF 🚫'}
        </button>
      </header>

      {/* Main Form Box */}
      <main className="w-full max-w-lg mx-auto my-auto py-2 z-20 overflow-y-auto max-h-[82vh]">
        <div className="w-full space-y-4 text-left p-6 rounded-3xl backdrop-blur-xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.95)] bg-black/85">
          <div className="text-center space-y-1">
            <h1 className={`font-serif text-[20px] uppercase ${activeThemeObj.text} tracking-[2px]`}>
              Customize Your Gift Note
            </h1>
            <p className="text-[11px] text-zinc-400">Configure your custom background photo, message, and video or audio.</p>
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
              className="w-full bg-black/70 border border-white/20 p-2.5 text-white rounded-xl text-xs placeholder:text-zinc-600 focus:outline-none focus:border-amber-400 transition-all"
            />
          </div>

          {/* Personal Message without internal mentioning */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className={`block text-[10px] uppercase tracking-widest ${activeThemeObj.text} font-bold`}>
                Personal Message
              </label>
              <span className={`text-[9px] ${message.length > 500 ? 'text-red-400' : 'text-zinc-500'}`}>
                {message.length}/500
              </span>
            </div>
            <textarea
              rows={4}
              maxLength={500}
              value={message}
              placeholder="Type your personal note here..."
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-black/70 border border-white/20 p-2.5 text-white rounded-xl text-xs placeholder:text-zinc-600 focus:outline-none focus:border-amber-400 transition-all whitespace-pre-wrap"
            />
          </div>

          {/* Background Photo Upload */}
          <div className="p-3 rounded-xl border border-amber-500/30 bg-amber-500/5 backdrop-blur-md">
            <label className={`block text-[10px] uppercase tracking-widest ${activeThemeObj.text} mb-1.5 font-bold`}>
              Background Artwork / Photo
            </label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/jpg"
              onChange={handlePhotoSelect}
              className="w-full bg-black/70 border border-white/20 p-2 text-[11px] text-zinc-200 rounded-xl cursor-pointer file:mr-3 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-[#d4af37] file:text-black"
            />
            {photoUrl && (
              <div className="mt-2 flex items-center justify-between p-1.5 rounded-lg bg-black/90 border border-emerald-500/50">
                <span className="text-[10px] text-emerald-400 font-semibold truncate max-w-[200px]">
                  ✓ Image Cached
                </span>
                <button
                  type="button"
                  onClick={() => setPhotoUrl('')}
                  className="text-[9px] text-red-400 uppercase font-bold px-2 py-0.5 bg-red-950/60 rounded border border-red-500/30 transition"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Video / Audio Note Attachment */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className={`block text-[10px] uppercase tracking-widest ${activeThemeObj.text} font-bold`}>
                Video or Voice Note
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
                  Record Audio
                </button>
              </div>
            </div>

            {inputMode === 'upload' ? (
              <input
                type="file"
                accept="video/*,audio/*"
                onChange={handleMediaUpload}
                className="w-full bg-black/70 border border-white/20 p-2 text-[11px] text-zinc-200 rounded-xl cursor-pointer file:mr-3 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[10px] file:font-semibold file:bg-[#d4af37] file:text-black"
              />
            ) : (
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
            )}

            {mediaUrl && (
              <div className="mt-2 flex items-center justify-between p-1.5 rounded-lg bg-black/90 border border-emerald-500/50">
                <span className="text-[10px] text-emerald-400 font-semibold truncate max-w-[200px]">
                  ✓ {mediaFileType === 'video' ? 'Video' : 'Audio'} Attached
                </span>
                <button
                  type="button"
                  onClick={() => setMediaUrl('')}
                  className="text-[9px] text-red-400 uppercase font-bold px-2 py-0.5 bg-red-950/60 rounded border border-red-500/30 transition"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Theme Selector */}
          <div>
            <label className={`block text-[10px] uppercase tracking-widest ${activeThemeObj.text} mb-1 font-bold`}>
              Atmosphere Theme
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

          {/* PRIMARY PREVIEW ACTION */}
          <button
            onClick={() => setIsPreviewMode(true)}
            className={`w-full py-4 font-extrabold rounded-xl text-[12px] uppercase tracking-[2px] cursor-pointer shadow-xl transition-all hover:brightness-110 ${activeThemeObj.buttonBg}`}
          >
            PREVIEW GIFT NOTE ✦
          </button>
        </div>
      </main>

      {/* Footer Store CTA */}
      <footer className="w-full max-w-lg mx-auto pb-2 z-20">
        <div className="p-3 rounded-2xl backdrop-blur-md border border-white/10 bg-black/40 shadow-2xl text-center">
          <a
            href="/"
            target="_blank"
            className={`block w-full py-3.5 font-extrabold text-[11px] uppercase tracking-[1.5px] rounded-xl shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-all hover:brightness-110 ${activeThemeObj.buttonBg}`}
          >
            ORDER YOUR PHYSICAL SMART CARD NOW ✦
          </a>
        </div>
      </footer>

      {/* Toast Modal */}
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