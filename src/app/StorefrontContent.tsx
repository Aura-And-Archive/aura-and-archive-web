'use client';

import { useState, useRef, useEffect } from 'react';

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

export default function StorefrontContent() {
  const [activeModal, setActiveModal] = useState<'demoModal' | 'intakeModal' | null>(null);

  // Interactive Demo Builder State
  const [demoRecipient, setDemoRecipient] = useState('');
  const [demoMessage, setDemoMessage] = useState('');
  const [demoMediaUrl, setDemoMediaUrl] = useState('');
  const [demoMediaFileType, setDemoMediaFileType] = useState<'video' | 'audio' | 'image'>('video');
  const [demoEffectType, setDemoEffectType] = useState('gold-confetti');
  const [isEditingDemo, setIsEditingDemo] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Array<any>>([]);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const lastClickTimeRef = useRef<number>(0);
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement>(null);

  const handleDemoFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type.startsWith('image/')) {
      setDemoMediaFileType('image');
    } else if (file.type.startsWith('audio/')) {
      setDemoMediaFileType('audio');
    } else {
      setDemoMediaFileType('video');
    }

    const localUrl = URL.createObjectURL(file);
    setDemoMediaUrl(localUrl);
  };

  // Canvas Particle Animation for Demo
  useEffect(() => {
    if (activeModal !== 'demoModal' || isEditingDemo) return;

    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '999999';
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
  }, [activeModal, isEditingDemo]);

  const triggerDemoEffect = () => {
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
        themeKey: demoEffectType,
      });
    }
  };

  // Auto-trigger initial emoji burst on entering preview mode inside modal
  useEffect(() => {
    if (activeModal === 'demoModal' && !isEditingDemo) {
      const timer = setTimeout(() => {
        triggerDemoEffect();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [activeModal, isEditingDemo]);

  const openModal = (id: 'demoModal' | 'intakeModal') => {
    setActiveModal(id);
    if (id === 'demoModal') {
      setIsEditingDemo(true);
    }
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal]);

  const activeThemeObj = THEMES.find((t) => t.key === demoEffectType) || THEMES[0];

  return (
    <>
      <div className="app-viewport max-w-[1140px] mx-auto px-4 w-full min-h-screen bg-transparent" id="mainLandingContent">
        {/* NAV BAR WITH RESERVED MIN-HEIGHT */}
        <nav className="app-nav grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 py-6 border-b border-[#d4af37]/35 mb-8 items-center min-h-[110px] md:min-h-[82px]">
          <div>
            <div className="brand-title font-serif text-[20px] font-extrabold tracking-[3px] uppercase text-[#d4af37] leading-tight min-h-[24px]">
              Aura & Archive
            </div>
            <span className="brand-subtitle text-[11px] text-[#f4e6b0] tracking-[1.5px] uppercase block mt-[2px] opacity-80 min-h-[16px]">
              Luxury Smart Cards & Interactive Media
            </span>
          </div>
          <div className="nav-actions grid grid-cols-1 md:grid-cols-3 gap-2.5 min-h-[44px]">
            <a href="/activate" className="btn btn-outline min-h-[44px]">Activate Card</a>
            <button className="btn btn-outline min-h-[44px]" onClick={() => openModal('demoModal')}>Preview Experience</button>
            <button className="btn btn-gold min-h-[44px]" onClick={() => openModal('intakeModal')}>Custom Order</button>
          </div>
        </nav>

        {/* HERO SECTION WITH FIXED VERTICAL BOUNDS */}
        <section className="hero-section text-center py-5 md:pb-12 flex flex-col items-center gap-5 min-h-[420px] md:min-h-[380px] justify-center">
          <div className="hero-badge justify-self-center px-4 py-1.5 border border-[#d4af37]/35 rounded-[30px] text-[10px] tracking-[2.5px] uppercase text-[#f4e6b0] bg-[#d4af37]/10 backdrop-blur-sm min-h-[28px] flex items-center">
            ✦ Welcome to Aura & Archive ✦
          </div>
          
          <h1 className="hero-title font-serif text-[clamp(28px,6vw,56px)] font-extrabold leading-[1.15] uppercase tracking-[2px] break-words bg-gradient-to-b from-white via-white to-[#f4e6b0] bg-clip-text text-transparent min-h-[2.3em] flex items-center justify-center">
            The Physical Gateway to Digital Elegance
          </h1>

          <p className="hero-desc font-serif italic text-[16px] text-[#f4e6b0] max-w-[760px] mx-auto leading-[1.7] opacity-90 min-h-[80px]">
            Welcome. Step inside our sanctum of Modern Allure—a luxury smart card platform transforming your most intimate vows, spoken confessions, and cinematic moments into instant, high-touch digital experiences.
          </p>
          
          <div className="hero-buttons grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 w-full md:w-auto justify-center min-h-[48px]">
            <a href="/activate" className="btn btn-gold min-h-[44px]">Activate Card</a>
            <button className="btn btn-outline min-h-[44px]" onClick={() => openModal('intakeModal')}>Commission Custom Smart Card</button>
            <button className="btn btn-outline min-h-[44px]" onClick={() => openModal('demoModal')}>Preview Sample</button>
          </div>
        </section>

        {/* THREE CORE FEATURES GRID */}
        <div className="grid-container grid grid-cols-1 md:grid-cols-3 gap-5 my-7 w-full min-h-[180px]">
          <div className="app-card bg-[#0d0c0a]/75 border border-[#d4af37]/35 rounded-lg p-7 grid grid-cols-1 gap-3 w-full backdrop-blur-md">
            <h3 className="font-serif text-[16px] tracking-[1.5px] uppercase text-[#d4af37]">01. Tactile Craftsmanship</h3>
            <p className="text-[13px] text-[#b0aebf] leading-[1.7]">Crafted from weighted physical material, each card pairs elegant tactile finishes with an embedded QR archway—serving as an instant physical gateway to your digital media.</p>
          </div>

          <div className="app-card bg-[#0d0c0a]/75 border border-[#d4af37]/35 rounded-lg p-7 grid grid-cols-1 gap-3 w-full backdrop-blur-md">
            <h3 className="font-serif text-[16px] tracking-[1.5px] uppercase text-[#d4af37]">02. High-Touch Media Delivery</h3>
            <p className="text-[13px] text-[#b0aebf] leading-[1.7]">Recipients scan the embedded QR archway to instantly launch rich, full-screen audio, HD video messages, and written letters directly on their smartphones—no app download required.</p>
          </div>

          <div className="app-card bg-[#0d0c0a]/75 border border-[#d4af37]/35 rounded-lg p-7 grid grid-cols-1 gap-3 w-full backdrop-blur-md">
            <h3 className="font-serif text-[16px] tracking-[1.5px] uppercase text-[#d4af37]">03. Reusable & Flexible</h3>
            <p className="text-[13px] text-[#b0aebf] leading-[1.7]">Includes complimentary card resets to update your media destination whenever needed, backed by permanent physical media architecture.</p>
          </div>
        </div>

        {/* GIFT SUITE TIERS */}
        <section id="pricing" className="my-10">
          <h2 className="text-center font-serif text-[22px] uppercase text-[#d4af37] mb-6 tracking-[2px]">
            The Undiscardable Suite
          </h2>
          
          <div className="pricing-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-7 w-full items-stretch">
            <div className="pricing-card bg-[#0d0c0a]/75 border border-[#d4af37]/35 rounded-lg p-8 flex flex-col justify-between h-full backdrop-blur-md">
              <div className="plan-header flex flex-col">
                <div className="plan-title font-serif text-[15px] text-[#d4af37] uppercase font-extrabold tracking-[1.5px] leading-[1.35] h-[42px] flex items-center">Single Undiscardable Card</div>
                <div className="plan-price-wrapper h-[52px] flex items-baseline mt-2 whitespace-nowrap">
                  <div className="plan-price font-serif text-[32px] font-extrabold text-white leading-none">$9.99 <span className="text-[12px] text-[#b0aebf] font-sans font-normal ml-1">+ tax</span></div>
                </div>
                <div className="plan-desc text-[12px] text-[#b0aebf] leading-[1.6] my-[14px] h-[58px] line-clamp-3 overflow-hidden">An essential physical smart token built for eternal keepsake value and individual media delivery.</div>
                <ul className="plan-features list-none text-[11px] leading-[2.2] text-[#f3f3f7] mb-7 border-t border-[#d4af37]/15 pt-4">
                  <li className="whitespace-nowrap overflow-hidden text-ellipsis">✦ 1 Premium Physical Smart Card</li>
                  <li className="whitespace-nowrap overflow-hidden text-ellipsis">✦ 1 Standard Protective Sleeving</li>
                  <li className="whitespace-nowrap overflow-hidden text-ellipsis">✦ 3 Complimentary Data Resets</li>
                  <li className="whitespace-nowrap overflow-hidden text-ellipsis">✦ Permanent Archival Memory</li>
                </ul>
              </div>
              <button className="btn btn-gold min-h-[44px]" onClick={() => openModal('intakeModal')}>Order Single Card</button>
            </div>

            <div className="pricing-card featured bg-[#d4af37]/15 border border-[#d4af37] rounded-lg p-8 flex flex-col justify-between h-full backdrop-blur-md shadow-[0_0_25px_rgba(212,175,55,0.2)]">
              <div className="plan-header flex flex-col">
                <div className="plan-title font-serif text-[15px] text-[#d4af37] uppercase font-extrabold tracking-[1.5px] leading-[1.35] h-[42px] flex items-center">Undiscardable VIP Package</div>
                <div className="plan-price-wrapper h-[52px] flex items-baseline mt-2 whitespace-nowrap">
                  <div className="plan-price font-serif text-[32px] font-extrabold text-white leading-none">$24.99 <span className="text-[12px] text-[#b0aebf] font-sans font-normal ml-1">+ tax</span></div>
                </div>
                <div className="plan-desc text-[12px] text-[#b0aebf] leading-[1.6] my-[14px] h-[58px] line-clamp-3 overflow-hidden">The flagship made-to-order smart gifting presentation tailored for signature life milestones.</div>
                <ul className="plan-features list-none text-[11px] leading-[2.2] text-[#f3f3f7] mb-7 border-t border-[#d4af37]/15 pt-4">
                  <li className="whitespace-nowrap overflow-hidden text-ellipsis">✦ 1 Premium Physical Smart Card</li>
                  <li className="whitespace-nowrap overflow-hidden text-ellipsis">✦ 1 Premium Display Stand</li>
                  <li className="whitespace-nowrap overflow-hidden text-ellipsis">✦ Custom VIP Envelope</li>
                  <li className="whitespace-nowrap overflow-hidden text-ellipsis">✦ 10 Complimentary Data Resets</li>
                </ul>
              </div>
              <button className="btn btn-gold min-h-[44px]" onClick={() => openModal('intakeModal')}>Order VIP Package</button>
            </div>

            <div className="pricing-card bg-[#0d0c0a]/75 border border-[#d4af37]/35 rounded-lg p-8 flex flex-col justify-between h-full backdrop-blur-md">
              <div className="plan-header flex flex-col">
                <div className="plan-title font-serif text-[15px] text-[#d4af37] uppercase font-extrabold tracking-[1.5px] leading-[1.35] h-[42px] flex items-center">Special Event & Party Tier</div>
                <div className="plan-price-wrapper h-[52px] flex items-baseline mt-2 whitespace-nowrap">
                  <div className="plan-price font-serif text-[32px] font-extrabold text-white leading-none">25–100 <span className="text-[12px] text-[#b0aebf] font-sans font-normal ml-1">/ volume order</span></div>
                </div>
                <div className="plan-desc text-[12px] text-[#b0aebf] leading-[1.6] my-[14px] h-[58px] line-clamp-3 overflow-hidden">Custom-curated smart card suites for weddings, galas, milestones, and high-profile celebrations.</div>
                <ul className="plan-features list-none text-[11px] leading-[2.2] text-[#f3f3f7] mb-7 border-t border-[#d4af37]/15 pt-4">
                  <li className="whitespace-nowrap overflow-hidden text-ellipsis">✦ Custom Batch Serial Pairing</li>
                  <li className="whitespace-nowrap overflow-hidden text-ellipsis">✦ Tailored Event Visual Branding</li>
                  <li className="whitespace-nowrap overflow-hidden text-ellipsis">✦ Multi-Card Event Sets</li>
                  <li className="whitespace-nowrap overflow-hidden text-ellipsis">✦ Dedicated Concierge Support</li>
                </ul>
              </div>
              <button className="btn btn-outline min-h-[44px]" onClick={() => openModal('intakeModal')}>Event Inquiry</button>
            </div>

            <div className="pricing-card bg-[#0d0c0a]/75 border border-[#d4af37]/35 rounded-lg p-8 flex flex-col justify-between h-full backdrop-blur-md">
              <div className="plan-header flex flex-col">
                <div className="plan-title font-serif text-[15px] text-[#d4af37] uppercase font-extrabold tracking-[1.5px] leading-[1.35] h-[42px] flex items-center">VIP Concierge Delivery</div>
                <div className="plan-price-wrapper h-[52px] flex items-baseline mt-2 whitespace-nowrap">
                  <div className="plan-price font-serif text-[32px] font-extrabold text-white leading-none">On Demand Quote</div>
                </div>
                <div className="plan-desc text-[12px] text-[#b0aebf] leading-[1.6] my-[14px] h-[58px] line-clamp-3 overflow-hidden">Hand-crafted smart letter boarding (black) and scheduled direct-to-recipient delivery.</div>
                <ul className="plan-features list-none text-[11px] leading-[2.2] text-[#f3f3f7] mb-7 border-t border-[#d4af37]/15 pt-4">
                  <li className="whitespace-nowrap overflow-hidden text-ellipsis">✦ Custom Physical Packaging</li>
                  <li className="whitespace-nowrap overflow-hidden text-ellipsis">✦ Scheduled Destination Delivery</li>
                  <li className="whitespace-nowrap overflow-hidden text-ellipsis">✦ Hand-Lettered Inscription</li>
                  <li className="whitespace-nowrap overflow-hidden text-ellipsis">✦ Dedicated Concierge Support</li>
                </ul>
              </div>
              <button className="btn btn-outline min-h-[44px]" onClick={() => openModal('intakeModal')}>Delivery Inquiry</button>
            </div>
          </div>
        </section>

        {/* OCCASION SUITE */}
        <section id="conference-suite" className="enterprise-briefing py-[50px] my-10 bg-[#0c0a06]/50 border-y border-[#d4af37]/35 backdrop-blur-md">
          <div className="briefing-header text-center max-w-[700px] mx-auto mb-[40px]">
            <div className="hero-badge inline-block px-4 py-1.5 border border-[#d4af37]/35 rounded-[30px] text-[10px] tracking-[2.5px] uppercase text-[#f4e6b0] bg-[#d4af37]/10 backdrop-blur-sm">
              ✦ Cherished Moments ✦
            </div>
            <h2 className="font-serif text-[26px] tracking-[2px] uppercase text-white my-3">Designed For Life's Intimate Milestones</h2>
            <p className="subtitle text-[13px] text-[#b0aebf] leading-[1.6]">Transform traditional paper greetings into interactive physical and digital smart tokens.</p>
          </div>

          <div className="briefing-grid grid grid-cols-1 md:grid-cols-2 gap-5 mb-[40px]">
            <div className="briefing-card bg-[#0d0c0a]/75 border border-[#d4af37]/35 rounded-lg p-6 transition-transform hover:-translate-y-0.5 hover:border-[#d4af37]">
              <div className="card-icon text-[22px] mb-2">💍</div>
              <h3 className="font-serif text-[15px] text-[#d4af37] mb-2 uppercase tracking-[1px]">Wedding Vows & Proposals</h3>
              <p className="text-[12px] text-[#f3f3f7] leading-[1.6] opacity-85">Pair your ceremony audio, written vows, and proposal footage inside a luxury physical card that presents beautifully on any mantle.</p>
            </div>

            <div className="briefing-card bg-[#0d0c0a]/75 border border-[#d4af37]/35 rounded-lg p-6 transition-transform hover:-translate-y-0.5 hover:border-[#d4af37]">
              <div className="card-icon text-[22px] mb-2">💌</div>
              <h3 className="font-serif text-[15px] text-[#d4af37] mb-2 uppercase tracking-[1px]">Long-Distance Letters</h3>
              <p className="text-[12px] text-[#f3f3f7] leading-[1.6] opacity-85">Bridge the gap across miles with custom voice notes and HD video moments attached to a weighted luxury card sent directly through the mail.</p>
            </div>

            <div className="briefing-card bg-[#0d0c0a]/75 border border-[#d4af37]/35 rounded-lg p-6 transition-transform hover:-translate-y-0.5 hover:border-[#d4af37]">
              <div className="card-icon text-[22px] mb-2">👶</div>
              <h3 className="font-serif text-[15px] text-[#d4af37] mb-2 uppercase tracking-[1px]">Interactive Time Capsules</h3>
              <p className="text-[12px] text-[#f3f3f7] leading-[1.6] opacity-85">Record seasonal messages for birthdays or milestones that your family can scan and replay whenever they choose.</p>
            </div>

            <div className="briefing-card bg-[#0d0c0a]/75 border border-[#d4af37]/35 rounded-lg p-6 transition-transform hover:-translate-y-0.5 hover:border-[#d4af37]">
              <div className="card-icon text-[22px] mb-2">🕊</div>
              <h3 className="font-serif text-[15px] text-[#d4af37] mb-2 uppercase tracking-[1px]">Tributes & Keepsakes</h3>
              <p className="text-[12px] text-[#f3f3f7] leading-[1.6] opacity-85">Share stories, spoken laughter, and family histories through an elegant smart card experience designed for modern luxury.</p>
            </div>
          </div>

          <div className="investor-cta-box bg-[radial-gradient(circle,rgba(212,175,55,0.2)_0%,rgba(7,7,9,0.85)_100%)] border border-[#d4af37] rounded-xl p-6 md:p-[36px_40px] flex flex-col md:flex-row items-center text-center md:text-left justify-between gap-5">
            <div className="cta-content">
              <h3 className="font-serif text-[20px] text-white uppercase tracking-[1px] mb-1.5">Complimentary Data Resets</h3>
              <p className="text-[13px] text-[#b0aebf] max-w-[520px] leading-[1.6]">Need to update or reassign your card's digital experience? Submit a reset request with your card serial number to update your media destination at any time.</p>
            </div>
            <div className="cta-action">
              <button className="btn btn-gold w-full md:w-auto min-h-[44px]" onClick={() => openModal('intakeModal')}>Reset Card Data</button>
            </div>
          </div>
        </section>
      </div>

      {/* INTERACTIVE LIVE CARD BUILDER MODAL */}
      {activeModal === 'demoModal' && (
        <div className="modal-overlay fixed inset-0 w-full h-full bg-black/92 backdrop-blur-xl flex items-center justify-center z-[9999] p-4 overflow-y-auto" onClick={closeModal}>
          <div className="modal-card bg-[#101014]/95 border border-[#d4af37] rounded-xl p-6 w-full max-w-[620px] my-auto flex flex-col gap-4 relative shadow-[0_10px_40px_rgba(0,0,0,0.8)] text-center text-white" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close absolute top-4 right-5 text-[#b0aebf] text-[24px] cursor-pointer z-10 bg-none border-none hover:text-white" onClick={closeModal} aria-label="Close modal">&times;</button>
            
            <div className={`inline-block self-center px-4 py-1.5 border ${activeThemeObj.badgeBorder} rounded-[30px] text-[10px] tracking-[2.5px] uppercase ${activeThemeObj.text} ${activeThemeObj.badgeBg}`}>
              ✦ AURA & ARCHIVE™ LIVE ACTIVATION ✦
            </div>

            {isEditingDemo ? (
              <div className="space-y-4 text-left">
                <h3 className={`font-serif text-[22px] uppercase ${activeThemeObj.text} tracking-[2px] text-center`}>
                  {activeThemeObj.name} Portal
                </h3>
                <p className="text-[12px] text-[#b0aebf] text-center">Configure your custom message, media, and theme.</p>
                
                <div>
                  <label className={`block text-xs uppercase tracking-widest ${activeThemeObj.text} mb-1 font-semibold`}>
                    Recipient Name
                  </label>
                  <input
                    type="text"
                    value={demoRecipient}
                    placeholder="e.g. Sarah"
                    onChange={(e) => setDemoRecipient(e.target.value)}
                    className={`w-full bg-black/60 border ${activeThemeObj.badgeBorder} p-3 text-white rounded text-sm placeholder:text-zinc-600 focus:outline-none focus:border-white transition-all`}
                  />
                </div>

                <div>
                  <label className={`block text-xs uppercase tracking-widest ${activeThemeObj.text} mb-1 font-semibold`}>
                    Personal Gift Message
                  </label>
                  <textarea
                    rows={3}
                    value={demoMessage}
                    placeholder="Type your personal note here..."
                    onChange={(e) => setDemoMessage(e.target.value)}
                    className={`w-full bg-black/60 border ${activeThemeObj.badgeBorder} p-3 text-white rounded text-sm placeholder:text-zinc-600 focus:outline-none focus:border-white transition-all`}
                  />
                </div>

                <div>
                  <label className={`block text-xs uppercase tracking-widest ${activeThemeObj.text} mb-1 font-semibold`}>
                    Media Attachment (Photo, Audio, or Video)
                  </label>
                  <input
                    type="file"
                    accept="video/*,audio/*,image/*"
                    onChange={handleDemoFileSelect}
                    className={`w-full bg-black/60 border ${activeThemeObj.badgeBorder} p-2.5 text-xs text-[#f4e6b0] rounded cursor-pointer file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[#d4af37] file:text-black hover:file:brightness-110`}
                  />
                </div>

                <div>
                  <label className={`block text-xs uppercase tracking-widest ${activeThemeObj.text} mb-1 font-semibold`}>
                    Gift Note Theme & Effect (All 27 Themes)
                  </label>
                  <select
                    value={demoEffectType}
                    onChange={(e) => setDemoEffectType(e.target.value)}
                    className={`w-full bg-black/60 border ${activeThemeObj.badgeBorder} p-3 text-white rounded text-sm focus:outline-none focus:border-white cursor-pointer transition-all`}
                  >
                    {THEMES.map((t) => (
                      <option key={t.key} value={t.key} className="bg-[#101014] text-white">{t.name}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => setIsEditingDemo(false)}
                  className={`w-full py-3.5 font-bold rounded text-[11px] uppercase tracking-[1.5px] cursor-pointer shadow-lg transition-all ${activeThemeObj.buttonBg}`}
                >
                  Preview Live Card Experience ✦
                </button>
              </div>
            ) : (
              <div className="space-y-6 text-left">
                <div>
                  <h3 className={`font-serif text-[24px] uppercase ${activeThemeObj.text} tracking-[2px]`}>{activeThemeObj.name} Experience</h3>
                  <p className="text-[12px] text-[#b0aebf] tracking-[1px] mt-1">LIVE CARD PREVIEW</p>
                </div>

                <div className={`bg-black/40 border ${activeThemeObj.badgeBorder} p-5 rounded-lg text-[#f4e6b0]`}>
                  <p className={`text-xs uppercase tracking-widest ${activeThemeObj.text} font-semibold mb-2`}>To: {demoRecipient || 'A Special Friend'}</p>
                  <p className="text-base font-light leading-relaxed whitespace-pre-wrap">{demoMessage || 'Your personal gift message will appear here!'}</p>
                </div>

                {demoMediaUrl && (
                  <div className={`relative w-full rounded-lg overflow-hidden border ${activeThemeObj.badgeBorder} bg-black/60 p-4 flex flex-col items-center justify-center gap-4`}>
                    {demoMediaFileType === 'image' ? (
                      <div className="w-full flex flex-col items-center justify-center">
                        <img src={demoMediaUrl} alt="Uploaded Media" className="max-h-[300px] w-auto object-contain rounded-lg shadow-md" />
                      </div>
                    ) : demoMediaFileType === 'audio' ? (
                      <div className="w-full flex flex-col items-center gap-3 py-2">
                        <div className={`relative w-20 h-20 rounded-full overflow-hidden border-2 ${activeThemeObj.border} ${activeThemeObj.glow} bg-black flex items-center justify-center p-2 shadow-xl animate-pulse`}>
                          <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                        </div>
                        <p className={`text-xs uppercase tracking-[2px] ${activeThemeObj.text} font-semibold`}>✦ Exclusive Media Note ✦</p>
                        <audio ref={mediaRef as React.RefObject<HTMLAudioElement>} src={demoMediaUrl} controls className="w-full mt-2" />
                      </div>
                    ) : (
                      <div className={`relative w-full rounded-lg overflow-hidden border ${activeThemeObj.badgeBorder} bg-black aspect-video`}>
                        <video ref={mediaRef as React.RefObject<HTMLVideoElement>} src={demoMediaUrl} controls playsInline className="w-full h-full object-contain block" />
                      </div>
                    )}
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  <button 
                    className={`w-full py-3.5 text-[11px] font-bold uppercase tracking-[1.5px] rounded cursor-pointer shadow-md ${activeThemeObj.buttonBg}`} 
                    onClick={triggerDemoEffect}
                  >
                    ✦ Burst Gift Note Animation ✦
                  </button>

                  <button 
                    onClick={() => setIsEditingDemo(true)}
                    className="w-full py-3 text-[11px] bg-black/60 border border-[#d4af37]/60 text-[#f4e6b0] font-semibold rounded uppercase tracking-[1.5px] cursor-pointer hover:bg-black/80 transition-all text-center"
                  >
                    ✦ Edit Sample Message & Theme ✦
                  </button>

                  <div className="pt-4 border-t border-[#d4af37]/20 text-center space-y-2">
                    <p className="text-xs text-[#b0aebf]">Love this interactive smart card? Lock it in permanently.</p>
                    <a
                      href="/"
                      target="_blank"
                      className="block w-full py-3.5 bg-gradient-to-r from-[#d4af37] to-[#f4e6b0] !text-black font-extrabold text-[12px] uppercase tracking-[1.5px] rounded shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-all hover:brightness-110 text-center"
                    >
                      ORDER YOUR OWN PHYSICAL CARD NOW ✦
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* INTAKE FORM MODAL */}
      {activeModal === 'intakeModal' && (
        <div className="modal-overlay fixed inset-0 w-full h-full bg-black/92 backdrop-blur-xl flex items-center justify-center z-[9999] p-4" onClick={closeModal}>
          <div className="modal-card bg-[#0d0c0a] border border-[#d4af37] rounded-lg p-6 w-full max-w-[540px] max-h-[85vh] min-h-0 flex flex-col gap-3 relative shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close absolute top-4 right-5 text-[#b0aebf] text-[24px] cursor-pointer z-10 bg-none border-none" onClick={closeModal} aria-label="Close modal">&times;</button>
            <h3 className="font-serif text-[18px] uppercase text-[#d4af37]">Custom Order Request</h3>
            <p className="text-[12px] text-[#b0aebf]">Tell us about your occasion and we will reach out to fulfill your personalized luxury smart card package.</p>
            
            <form action="https://formspree.io/f/xjybzbpr" method="POST" className="grid gap-3.5">
              <input type="text" name="name" placeholder="Your Full Name" required className="w-full bg-[#151412] border border-[#d4af37]/35 p-3.5 text-white rounded text-[12px]" />
              <input type="email" name="email" placeholder="Email Address" required className="w-full bg-[#151412] border border-[#d4af37]/35 p-3.5 text-white rounded text-[12px]" />
              <select name="tier" defaultValue="Single Undiscardable Card ($9.99 + tax)" className="w-full bg-[#151412] border border-[#d4af37]/35 p-3.5 text-white rounded text-[12px]">
                <option value="Single Undiscardable Card ($9.99 + tax)">Single Undiscardable Card ($9.99 + tax)</option>
                <option value="Undiscardable VIP Package ($24.99 + tax)">Undiscardable VIP Package ($24.99 + tax)</option>
                <option value="Special Event & Party Commission">Special Event & Party Commission</option>
                <option value="VIP Concierge Delivery">VIP Concierge Delivery</option>
                <option value="Card Data Reset Request">Card Data Reset Request</option>
              </select>
              <textarea name="message" placeholder="Include details about your occasion, recipient, or special date..." rows={3} className="w-full bg-[#151412] border border-[#d4af37]/35 p-3.5 text-white rounded text-[12px]"></textarea>
              <button type="submit" className="btn btn-gold min-h-[44px]">Submit Request</button>
            </form>
          </div>
        </div>
      )}

      <footer className="border-t border-[#d4af37]/35 py-10 mt-10 bg-[#040406]/85">
        <div className="app-viewport max-w-[1140px] mx-auto px-4 w-full">
          <div className="footer-grid grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-7">
            <div>
              <div className="brand-title font-serif text-[20px] font-extrabold tracking-[3px] uppercase text-[#d4af37]">Aura & Archive</div>
              <p className="text-[12px] text-[#b0aebf] mt-2">Elevating personal expression through luxury physical-to-digital smart cards.</p>
            </div>
            <div>
              <h4 className="text-[11px] text-[#d4af37] uppercase mb-2.5 tracking-[1px]">Navigation</h4>
              <p className="text-[12px]"><a href="/activate" className="text-[#b0aebf] no-underline hover:text-[#d4af37]">Activate Smart Card</a></p>
              <p className="text-[12px] mt-2">
                <button className="footer-link-btn bg-none border-none text-[#b0aebf] text-[12px] cursor-pointer p-0 text-left hover:text-[#d4af37]" onClick={() => openModal('demoModal')}>Interactive Sample</button>
              </p>
            </div>
            <div>
              <h4 className="text-[11px] text-[#d4af37] uppercase mb-2.5 tracking-[1px]">Support Desk</h4>
              <p className="text-[12px]"><a href="mailto:notifications@aura-and-archive.com" className="text-[#b0aebf] no-underline hover:text-[#d4af37]">Contact Design Studio</a></p>
            </div>
          </div>
          <div className="mt-7 text-center text-[10px] text-[#b0aebf] tracking-[1px]">
            © 2026 Aura & Archive, Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}