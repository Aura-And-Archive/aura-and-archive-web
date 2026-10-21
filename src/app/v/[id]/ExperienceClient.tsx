'use client';

import React, { useEffect, useState, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

const DEMO_PREVIEW_DATA = {
  recipient_name: "Sarah",
  message_text: "To: One of the best mothers ever...\n\nYou are just as glamorous now, as the very first day I met you 😚😊🌹❤️\n\n-William",
  media_url: "/AA-Demo.mp4",
  effect_type: "wealth-glamour",
  activation_code: "1666",
};

const THEME_STYLES: Record<string, { border: string; glow: string; text: string; badgeBg: string; badgeBorder: string; buttonBg: string; name: string }> = {
  'gold-confetti': { name: 'Aura Gold', border: 'border-[#d4af37]', glow: 'shadow-[0_0_35px_rgba(212,175,55,0.2)]', text: 'text-[#d4af37]', badgeBg: 'bg-[#d4af37]/10', badgeBorder: 'border-[#d4af37]/40', buttonBg: 'bg-gradient-to-r from-[#d4af37] to-[#f4e6b0] text-black font-semibold' },
  'executive-light': { name: 'Corporate Lumina', border: 'border-[#e5e4e2]', glow: 'shadow-[0_0_35px_rgba(229,228,226,0.2)]', text: 'text-[#e5e4e2]', badgeBg: 'bg-[#e5e4e2]/10', badgeBorder: 'border-[#e5e4e2]/40', buttonBg: 'bg-gradient-to-r from-[#e5e4e2] to-[#ffffff] text-black font-semibold' },
  'wealth-glamour': { name: 'Wealth & Glamour', border: 'border-[#b9f2ff]', glow: 'shadow-[0_0_35px_rgba(185,242,255,0.25)]', text: 'text-[#b9f2ff]', badgeBg: 'bg-[#b9f2ff]/10', badgeBorder: 'border-[#b9f2ff]/40', buttonBg: 'bg-gradient-to-r from-[#b9f2ff] to-[#ffffff] text-black font-semibold' },
  'ruby-petal': { name: 'Crimson Romance', border: 'border-[#dc143c]', glow: 'shadow-[0_0_35px_rgba(220,20,60,0.25)]', text: 'text-[#ff69b4]', badgeBg: 'bg-[#dc143c]/15', badgeBorder: 'border-[#dc143c]/40', buttonBg: 'bg-gradient-to-r from-[#dc143c] to-[#ff1493] text-white font-semibold' },
  'birthday': { name: 'Happy Birthday', border: 'border-[#ffb6c1]', glow: 'shadow-[0_0_35px_rgba(255,182,193,0.25)]', text: 'text-[#ffb6c1]', badgeBg: 'bg-[#ffb6c1]/10', badgeBorder: 'border-[#ffb6c1]/40', buttonBg: 'bg-gradient-to-r from-[#ffb6c1] to-[#ff69b4] text-black font-semibold' },
  'christmas': { name: 'Winter & Christmas', border: 'border-[#2e8b57]', glow: 'shadow-[0_0_35px_rgba(46,139,87,0.25)]', text: 'text-[#2e8b57]', badgeBg: 'bg-[#2e8b57]/10', badgeBorder: 'border-[#2e8b57]/40', buttonBg: 'bg-gradient-to-r from-[#2e8b57] to-[#ffffff] text-black font-semibold' },
  'halloween': { name: 'Halloween', border: 'border-[#ff8c00]', glow: 'shadow-[0_0_35px_rgba(255,140,0,0.25)]', text: 'text-[#ff8c00]', badgeBg: 'bg-[#ff8c00]/10', badgeBorder: 'border-[#ff8c00]/40', buttonBg: 'bg-gradient-to-r from-[#ff8c00] to-[#000000] text-white font-semibold' },
  'valentine': { name: "Valentine's Day", border: 'border-[#ff69b4]', glow: 'shadow-[0_0_35px_rgba(255,105,180,0.25)]', text: 'text-[#ff69b4]', badgeBg: 'bg-[#ff69b4]/10', badgeBorder: 'border-[#ff69b4]/40', buttonBg: 'bg-gradient-to-r from-[#ff69b4] to-[#ffffff] text-black font-semibold' },
  'april-fools': { name: 'April Fools & Humor', border: 'border-[#ffd700]', glow: 'shadow-[0_0_35px_rgba(255,215,0,0.25)]', text: 'text-[#ffd700]', badgeBg: 'bg-[#ffd700]/10', badgeBorder: 'border-[#ffd700]/40', buttonBg: 'bg-gradient-to-r from-[#ffd700] to-[#ffffff] text-black font-semibold' },
  'new-years': { name: "New Year's Eve", border: 'border-[#e5e4e2]', glow: 'shadow-[0_0_35px_rgba(229,228,226,0.25)]', text: 'text-[#e5e4e2]', badgeBg: 'bg-[#e5e4e2]/10', badgeBorder: 'border-[#e5e4e2]/40', buttonBg: 'bg-gradient-to-r from-[#e5e4e2] to-[#ffffff] text-black font-semibold' },
  'christianity': { name: 'Christianity', border: 'border-[#dda0dd]', glow: 'shadow-[0_0_35px_rgba(221,160,221,0.25)]', text: 'text-[#dda0dd]', badgeBg: 'bg-[#dda0dd]/10', badgeBorder: 'border-[#dda0dd]/40', buttonBg: 'bg-gradient-to-r from-[#dda0dd] to-[#ffffff] text-black font-semibold' },
  'islam': { name: 'Islam', border: 'border-[#98fb98]', glow: 'shadow-[0_0_35px_rgba(152,251,152,0.25)]', text: 'text-[#98fb98]', badgeBg: 'bg-[#98fb98]/10', badgeBorder: 'border-[#98fb98]/40', buttonBg: 'bg-gradient-to-r from-[#98fb98] to-[#ffffff] text-black font-semibold' },
  'judaism': { name: 'Judaism', border: 'border-[#87ceeb]', glow: 'shadow-[0_0_35px_rgba(135,206,235,0.25)]', text: 'text-[#87ceeb]', badgeBg: 'bg-[#87ceeb]/10', badgeBorder: 'border-[#87ceeb]/40', buttonBg: 'bg-gradient-to-r from-[#87ceeb] to-[#ffffff] text-black font-semibold' },
  'hinduism': { name: 'Hinduism (Diwali)', border: 'border-[#ffa500]', glow: 'shadow-[0_0_35px_rgba(255,165,0,0.25)]', text: 'text-[#ffa500]', badgeBg: 'bg-[#ffa500]/10', badgeBorder: 'border-[#ffa500]/40', buttonBg: 'bg-gradient-to-r from-[#ffa500] to-[#ffffff] text-black font-semibold' },
  'buddhism': { name: 'Buddhism', border: 'border-[#deb887]', glow: 'shadow-[0_0_35px_rgba(222,184,135,0.25)]', text: 'text-[#deb887]', badgeBg: 'bg-[#deb887]/10', badgeBorder: 'border-[#deb887]/40', buttonBg: 'bg-gradient-to-r from-[#deb887] to-[#ffffff] text-black font-semibold' },
  'mothers-day': { name: "Mother's Day", border: 'border-[#ffb6c1]', glow: 'shadow-[0_0_35px_rgba(255,182,193,0.25)]', text: 'text-[#ffb6c1]', badgeBg: 'bg-[#ffb6c1]/10', badgeBorder: 'border-[#ffb6c1]/40', buttonBg: 'bg-gradient-to-r from-[#ffb6c1] to-[#ffffff] text-black font-semibold' },
  'fathers-day': { name: "Father's Day", border: 'border-[#4682b4]', glow: 'shadow-[0_0_35px_rgba(70,130,180,0.25)]', text: 'text-[#4682b4]', badgeBg: 'bg-[#4682b4]/10', badgeBorder: 'border-[#4682b4]/40', buttonBg: 'bg-gradient-to-r from-[#4682b4] to-[#ffffff] text-black font-semibold' },
  'gender-reveal': { name: 'New Arrival', border: 'border-[#87ceeb]', glow: 'shadow-[0_0_35px_rgba(135,206,235,0.25)]', text: 'text-[#87ceeb]', badgeBg: 'bg-[#87ceeb]/10', badgeBorder: 'border-[#87ceeb]/40', buttonBg: 'bg-gradient-to-r from-[#87ceeb] to-[#ffffff] text-black font-semibold' },
  'graduation': { name: 'Graduation', border: 'border-[#daa520]', glow: 'shadow-[0_0_35px_rgba(218,165,32,0.25)]', text: 'text-[#daa520]', badgeBg: 'bg-[#daa520]/10', badgeBorder: 'border-[#daa520]/40', buttonBg: 'bg-gradient-to-r from-[#daa520] to-[#ffffff] text-black font-semibold' },
  'engagement': { name: 'Engagement', border: 'border-[#e0ffff]', glow: 'shadow-[0_0_35px_rgba(224,255,255,0.25)]', text: 'text-[#e0ffff]', badgeBg: 'bg-[#e0ffff]/10', badgeBorder: 'border-[#e0ffff]/40', buttonBg: 'bg-gradient-to-r from-[#e0ffff] to-[#ffffff] text-black font-semibold' },
  'retirement': { name: 'Retirement & Farewell', border: 'border-[#f4a460]', glow: 'shadow-[0_0_35px_rgba(244,164,96,0.25)]', text: 'text-[#f4a460]', badgeBg: 'bg-[#f4a460]/10', badgeBorder: 'border-[#f4a460]/40', buttonBg: 'bg-gradient-to-r from-[#f4a460] to-[#ffffff] text-black font-semibold' },
  'day-of-the-dead': { name: 'Day of the Dead', border: 'border-[#ba55d3]', glow: 'shadow-[0_0_35px_rgba(186,85,211,0.25)]', text: 'text-[#ba55d3]', badgeBg: 'bg-[#ba55d3]/10', badgeBorder: 'border-[#ba55d3]/40', buttonBg: 'bg-gradient-to-r from-[#ba55d3] to-[#ffffff] text-black font-semibold' },
  'eternal-dove': { name: 'Eternal Remembrance', border: 'border-[#f0f8ff]', glow: 'shadow-[0_0_35px_rgba(240,248,255,0.15)]', text: 'text-[#f0f8ff]', badgeBg: 'bg-white/10', badgeBorder: 'border-white/30', buttonBg: 'bg-gradient-to-r from-[#ffffff] to-[#dcdcdc] text-black font-semibold' },
  'veteran': { name: 'Veteran Appreciation', border: 'border-[#b22222]', glow: 'shadow-[0_0_35px_rgba(178,34,34,0.25)]', text: 'text-[#b22222]', badgeBg: 'bg-[#b22222]/10', badgeBorder: 'border-[#b22222]/40', buttonBg: 'bg-gradient-to-r from-[#b22222] to-[#ffffff] text-black font-semibold' },
  'get-well': { name: 'Get Well Soon', border: 'border-[#adff2f]', glow: 'shadow-[0_0_35px_rgba(173,255,47,0.25)]', text: 'text-[#adff2f]', badgeBg: 'bg-[#adff2f]/10', badgeBorder: 'border-[#adff2f]/40', buttonBg: 'bg-gradient-to-r from-[#adff2f] to-[#ffffff] text-black font-semibold' },
  'thank-you': { name: 'Thank You / Just Because', border: 'border-[#ffd700]', glow: 'shadow-[0_0_35px_rgba(255,215,0,0.25)]', text: 'text-[#ffd700]', badgeBg: 'bg-[#ffd700]/10', badgeBorder: 'border-[#ffd700]/40', buttonBg: 'bg-gradient-to-r from-[#ffd700] to-[#ffffff] text-black font-semibold' },
  'bff': { name: "BFF's (Best Friends)", border: 'border-[#ff69b4]', glow: 'shadow-[0_0_35px_rgba(255,105,180,0.25)]', text: 'text-[#ff69b4]', badgeBg: 'bg-[#ff69b4]/10', badgeBorder: 'border-[#ff69b4]/40', buttonBg: 'bg-gradient-to-r from-[#ff69b4] to-[#ffffff] text-black font-semibold' },
};

export default function ExperienceClient({ cardId }: { cardId: string }) {
  const router = useRouter();
  const [cardData, setCardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [enteredCode, setEnteredCode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement>(null);

  const cleanSerial = decodeURIComponent(cardId || '').trim().toUpperCase();

  // Persistent Particle Pool & Throttle Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Array<any>>([]);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const lastClickTimeRef = useRef<number>(0);

  useEffect(() => {
    async function fetchCardData() {
      if (!cleanSerial) {
        setLoading(false);
        return;
      }

      const isDemo = cleanSerial.startsWith('DEMO');
      if (isDemo) {
        setCardData(DEMO_PREVIEW_DATA);
        setIsPreviewMode(true);
        setLoading(false);
        return;
      }

      // 1. CHECK SESSION STORAGE FIRST (FOR PREVIEWS)
      const localPreview = sessionStorage.getItem(`preview_${cleanSerial}`);
      if (localPreview) {
        try {
          const parsed = JSON.parse(localPreview);
          setCardData(parsed);
          setIsUnlocked(true);
          setIsPreviewMode(true);
          setLoading(false);
          return;
        } catch (e) {
          console.error('Error parsing local preview draft', e);
        }
      }

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      // 2. QUERY SUPABASE SECOND (Live committed database records)
      if (supabaseUrl && supabaseAnonKey) {
        try {
          const supabase = createClient(supabaseUrl, supabaseAnonKey);
          const { data, error } = await supabase
            .from('cards')
            .select('*')
            .ilike('serial_number', cleanSerial)
            .maybeSingle();

          if (!error && data && data.message_text) {
            setCardData(data);
            if (!data.activation_code) {
              setIsUnlocked(true);
            }
            setLoading(false);
            return;
          }
        } catch (err) {
          console.error('Error fetching card data from Supabase:', err);
        }
      }

      setLoading(false);
    }

    fetchCardData();
  }, [cleanSerial]);

  // Persistent single canvas loop with strict particle performance cap
  useEffect(() => {
    if (!isUnlocked) return;

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
        p.x += (p.vx + Math.sin(p.age * 0.003 + p.sway) * 0.4) * dtFactor;
        p.y += p.vy * dtFactor;
        if (p.themeKey !== 'executive-light') {
          // Smoother, dialed-down gravity and friction
          p.vy += (isDesktop ? 0.35 : 0.10) * dtFactor;
          p.vx *= Math.pow(isDesktop ? 0.98 : 0.99, dtFactor);
        }
        p.rotation += p.rotSpeed * dtFactor;
        p.age += deltaTime;

        // Longer fade-out duration for gentle drifting
        if (p.age > 2800) {
          p.opacity -= 0.018 * dtFactor;
        }
      });

      particlesRef.current = particlesRef.current.filter((p) => p.opacity > 0);
      if (particlesRef.current.length > 150) {
        particlesRef.current = particlesRef.current.slice(particlesRef.current.length - 150);
      }

      particlesRef.current.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        drawParticle(ctx, p.themeKey, p.size);
        ctx.restore();
      });

      animFrameRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameRef.current = requestAnimationFrame(renderLoop);

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (canvasRef.current) canvasRef.current.remove();
      window.removeEventListener('resize', handleResize);
    };
  }, [isUnlocked]);

  const activeThemeKey = cardData?.effect_type || 'gold-confetti';
  const theme = THEME_STYLES[activeThemeKey] || THEME_STYLES['gold-confetti'];

  const drawParticle = (ctx: CanvasRenderingContext2D, themeKey: string, size: number) => {
    if (themeKey === 'executive-light') {
      ctx.shadowColor = 'rgba(229, 228, 226, 0.9)';
      ctx.shadowBlur = 12;
      ctx.fillStyle = '#e5e4e2';
      ctx.fillRect(-size * 0.25, -size * 1.8, size * 0.5, size * 3.6);
      return;
    }

    ctx.font = `${Math.max(20, size * 2.6)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const emojis: Record<string, string> = {
      'gold-confetti': '✨',
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

    ctx.fillText(emojis[themeKey] || '✨', 0, 0);
  };

  // Dialed-down, smooth floating burst engine
  const triggerGiftNoteEffect = (themeKey = 'gold-confetti') => {
    const now = performance.now();
    if (now - lastClickTimeRef.current < 80) return; // Spam throttle filter
    lastClickTimeRef.current = now;

    const scale = Math.max(window.innerWidth, window.innerHeight) / 900;
    const isDesktop = window.innerWidth > 768;
    const count = isDesktop ? 18 : 22; // Softer particle count

    const startX = isDesktop ? Math.random() * window.innerWidth : window.innerWidth / 2;
    const startY = isDesktop ? -20 : window.innerHeight / 2 - 40;

    for (let i = 0; i < count; i++) {
      const angle = isDesktop ? (Math.random() * Math.PI) + Math.PI * 0.25 : Math.random() * Math.PI * 2;
      // Lower start velocities for a gentle drift instead of a violent burst
      const speed = isDesktop ? (Math.random() * 5 + 2) : (Math.random() * 8 + 3) * Math.min(scale, 1.2);

      particlesRef.current.push({
        x: startX + (isDesktop ? (Math.random() - 0.5) * window.innerWidth * 0.8 : (Math.random() - 0.5) * 60),
        y: startY + (isDesktop ? 0 : (Math.random() - 0.5) * 30),
        vx: Math.cos(angle) * speed,
        vy: isDesktop ? Math.random() * 3 + 1 : Math.sin(angle) * speed - 2.5,
        size: (Math.random() * 6 + 9) * Math.min(scale, 1.2),
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.15,
        opacity: 1,
        sway: Math.random() * 3,
        age: 0,
        themeKey,
      });
    }
  };

  useEffect(() => {
    if (cardData && isUnlocked) {
      triggerGiftNoteEffect(cardData?.effect_type || 'gold-confetti');
    }
  }, [cardData, isUnlocked]);

  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Aura & Archive | Premium Gift Note',
          text: 'You have received a premium gift note from Aura & Archive™',
          url: shareUrl,
        });
        return;
      } catch (err) {}
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy link', err);
    }
  };

  const handleUnlockAttempt = () => {
    if (enteredCode.trim().toLowerCase() === String(cardData?.activation_code || '').trim().toLowerCase()) {
      setIsUnlocked(true);
    } else {
      setCodeError(true);
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-[480px] p-6 mx-auto my-auto min-h-screen flex items-center justify-center text-[#d4af37] text-sm animate-pulse">
        ✦ LOADING GIFT NOTE...
      </div>
    );
  }

  // Access Code Lock Screen
  if (cardData?.activation_code && !isUnlocked) {
    return (
      <div className="w-full max-w-[480px] p-6 mx-auto my-auto min-h-screen flex flex-col justify-center">
        <div className="bg-[#101014]/92 border border-[#d4af37]/40 rounded-xl p-8 text-center space-y-5 shadow-[0_0_50px_rgba(212,175,55,0.15)] backdrop-blur-md">
          <div className="inline-block px-4 py-1.5 border border-[#d4af37]/40 rounded-[30px] text-[10px] tracking-[2.5px] uppercase text-[#f4e6b0] bg-[#d4af37]/15">
            ✦ Secure Vault ✦
          </div>
          <h1 className="font-serif text-[22px] uppercase text-[#d4af37] tracking-[2px]">Protected Gift Note</h1>
          <p className="text-[12px] text-[#b0aebf] leading-relaxed">Please enter the access code provided with your card to view this secure gift note.</p>
          
          <input
            type="password"
            value={enteredCode}
            onChange={(e) => {
              setEnteredCode(e.target.value);
              setCodeError(false);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleUnlockAttempt();
            }}
            placeholder="Enter access code..."
            autoFocus
            className="w-full bg-black/60 border border-[#d4af37]/40 p-3.5 text-white rounded text-center text-sm tracking-widest focus:outline-none focus:border-[#d4af37] transition-all"
          />
          
          {codeError && <p className="text-xs text-red-400 tracking-wider">Incorrect access code. Please try again.</p>}

          <button
            onClick={handleUnlockAttempt}
            className="w-full py-3.5 bg-gradient-to-r from-[#d4af37] to-[#f4e6b0] hover:brightness-110 text-black font-semibold rounded text-[11px] uppercase tracking-[1.5px] cursor-pointer transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)]"
          >
            Unlock Gift Note ✦
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[680px] p-4 md:p-6 mx-auto my-auto flex flex-col justify-center min-h-screen">
      <div className={`bg-[#101014]/92 border ${theme.border} rounded-xl p-6 md:p-8 text-center ${theme.glow} backdrop-blur-md flex flex-col gap-5 transition-all duration-500`}>
        <div className={`inline-block self-center px-4 py-1.5 border ${theme.badgeBorder} rounded-[30px] text-[10px] tracking-[2.5px] uppercase ${theme.text} ${theme.badgeBg}`}>
          ✦ {theme.name} Gift Note ✦
        </div>
        
        <div>
          <h1 className={`font-serif text-[24px] uppercase ${theme.text} tracking-[2px]`}>Gift Note Experience</h1>
          <p className="text-[12px] text-[#b0aebf] tracking-[1px] mt-1.5">CARD ID: {cleanSerial}</p>
        </div>

        <div className={`text-left bg-black/40 border ${theme.badgeBorder} p-5 rounded-lg text-[#f4e6b0]`}>
          {cardData?.message_text || cardData?.recipient_name ? (
            <div className="space-y-2">
              {cardData?.recipient_name && (
                <p className={`text-xs uppercase tracking-widest ${theme.text} font-semibold`}>
                  To: {cardData.recipient_name}
                </p>
              )}
              <p className="text-base font-light leading-relaxed whitespace-pre-wrap">{cardData.message_text}</p>
            </div>
          ) : (
            <div className="text-center space-y-2">
              <p className="text-sm text-[#b0aebf]">No custom message stored for this card yet.</p>
            </div>
          )}
        </div>

        {cardData?.media_url && (
          <div className={`relative w-full rounded-lg overflow-hidden border ${theme.badgeBorder} bg-black/60 p-4 flex flex-col items-center justify-center gap-4`}>
            {/\.(mp3|wav|m4a|aac|ogg)(\?.*)?$/i.test(cardData.media_url) ? (
              <div className="w-full flex flex-col items-center gap-3 py-2">
                <div className={`relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 ${theme.border} ${theme.glow} bg-black flex items-center justify-center p-2 shadow-xl animate-pulse`}>
                  <img 
                    src="/logo.png" 
                    alt="Aura & Archive Cover Art" 
                    className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]"
                  />
                </div>
                <div className="text-center">
                  <p className={`text-xs uppercase tracking-[2px] ${theme.text} font-semibold`}>✦ Exclusive Audio Note ✦</p>
                </div>
                <audio
                  ref={mediaRef as React.RefObject<HTMLAudioElement>}
                  src={cardData.media_url}
                  controls
                  preload="metadata"
                  className="w-full mt-2"
                />
              </div>
            ) : (
              <div className={`relative w-full rounded-lg overflow-hidden border ${theme.badgeBorder} bg-black aspect-video`}>
                <video
                  ref={mediaRef as React.RefObject<HTMLVideoElement>}
                  src={cardData.media_url}
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-contain block"
                />
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col gap-3 mt-2">
          <button 
            className={`w-full py-3.5 text-[11px] uppercase tracking-[1.5px] rounded transition-all cursor-pointer ${theme.buttonBg}`} 
            onClick={() => triggerGiftNoteEffect(cardData?.effect_type || 'gold-confetti')}
          >
            ✦ Burst Gift Note Animation ✦
          </button>

          {/* Refined and cleanly proportioned footer CTA button styling */}
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <p className="text-[11px] text-zinc-400 font-light tracking-wide text-center">
              Love this interactive smart card? Lock it in permanently.
            </p>
            <button
              onClick={() => router.push('https://www.auraandarchive.com')} // Update with your physical card order / store link if needed
              className="w-full py-3 px-4 bg-gradient-to-r from-[#d4af37] via-[#f4e6b0] to-[#b8860b] hover:brightness-110 text-zinc-950 font-bold text-xs uppercase tracking-[1.5px] rounded-lg shadow-md transition-all cursor-pointer"
            >
              Order Your Own Physical Card Now ✦
            </button>
          </div>

          {isPreviewMode && (
            <button 
              onClick={() => router.push(`/activate?card=${cleanSerial}`)}
              className="w-full py-3 text-[11px] bg-black/60 border border-[#d4af37]/60 hover:border-[#d4af37] text-[#f4e6b0] font-semibold rounded uppercase tracking-[1.5px] transition-all cursor-pointer shadow-[0_0_15px_rgba(212,175,55,0.08)]"
            >
              ✦ Back to Editing ✦
            </button>
          )}

          <button 
            onClick={handleShare}
            className="w-full py-3 text-[11px] bg-black/60 border border-[#d4af37]/60 hover:border-[#d4af37] text-[#f4e6b0] font-semibold rounded uppercase tracking-[1.5px] transition-all cursor-pointer shadow-[0_0_15px_rgba(212,175,55,0.08)]"
          >
            {copied ? '✦ Link Copied to Clipboard ✦' : '✦ Share Gift Note Link ✦'}
          </button>
        </div>
      </div>
    </div>
  );
}