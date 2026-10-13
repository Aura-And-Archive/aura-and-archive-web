'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

const DEMO_PREVIEW_DATA = {
  message_text: "Welcome to the Aura & Archive Experience. A seamless fusion of physical luxury and digital narrative.",
  media_url: "/AA-Demo.mp4",
  effect_type: "gold-confetti",
};

const THEME_STYLES: Record<string, { border: string; glow: string; text: string; badgeBg: string; badgeBorder: string; buttonBg: string; name: string; colors: string[] }> = {
  'gold-confetti': {
    name: 'Aura Gold',
    border: 'border-[#d4af37]',
    glow: 'shadow-[0_0_35px_rgba(212,175,55,0.2)]',
    text: 'text-[#d4af37]',
    badgeBg: 'bg-[#d4af37]/10',
    badgeBorder: 'border-[#d4af37]/40',
    buttonBg: 'bg-gradient-to-r from-[#d4af37] to-[#f4e6b0] text-black',
    colors: ['#d4af37', '#f4e6b0', '#96760e'],
  },
  'executive-light': {
    name: 'Corporate Lumina',
    border: 'border-[#e5e4e2]',
    glow: 'shadow-[0_0_35px_rgba(229,228,226,0.2)]',
    text: 'text-[#e5e4e2]',
    badgeBg: 'bg-[#e5e4e2]/10',
    badgeBorder: 'border-[#e5e4e2]/40',
    buttonBg: 'bg-gradient-to-r from-[#e5e4e2] to-[#ffffff] text-black',
    colors: ['#ffffff', '#e5e4e2', '#d4af37'],
  },
  'eternal-dove': {
    name: 'Eternal Remembrance',
    border: 'border-[#f0f8ff]',
    glow: 'shadow-[0_0_35px_rgba(240,248,255,0.15)]',
    text: 'text-[#f0f8ff]',
    badgeBg: 'bg-white/10',
    badgeBorder: 'border-white/30',
    buttonBg: 'bg-gradient-to-r from-[#ffffff] to-[#dcdcdc] text-black',
    colors: ['#ffffff', '#f0f8ff', '#e6f2ff'],
  },
  'gender-reveal': {
    name: 'New Arrival',
    border: 'border-[#ffb6c1]',
    glow: 'shadow-[0_0_35px_rgba(255,182,193,0.25)]',
    text: 'text-[#ffb6c1]',
    badgeBg: 'bg-[#ffb6c1]/10',
    badgeBorder: 'border-[#ffb6c1]/40',
    buttonBg: 'bg-gradient-to-r from-[#ffb6c1] to-[#87ceeb] text-black',
    colors: ['#ffb6c1', '#87ceeb', '#ffffff', '#ff69b4'],
  },
  'ruby-petal': {
    name: 'Crimson Romance',
    border: 'border-[#dc143c]',
    glow: 'shadow-[0_0_35px_rgba(220,20,60,0.25)]',
    text: 'text-[#ff69b4]',
    badgeBg: 'bg-[#dc143c]/15',
    badgeBorder: 'border-[#dc143c]/40',
    buttonBg: 'bg-gradient-to-r from-[#dc143c] to-[#ff1493] text-white',
    colors: ['#8b0000', '#dc143c', '#ff1493', '#e60049'],
  },
};

export default function ExperienceClient({ cardId }: { cardId: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [cardData, setCardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    async function fetchCardData() {
      const cleanId = (cardId || '').trim().toUpperCase();
      const isDemo = cleanId.startsWith('DEMO');

      if (isDemo) {
        setCardData(DEMO_PREVIEW_DATA);
        setLoading(false);
        return;
      }

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (supabaseUrl && supabaseAnonKey) {
        try {
          const supabase = createClient(supabaseUrl, supabaseAnonKey);
          const { data, error } = await supabase
            .from('cards')
            .select('*')
            .ilike('serial_number', cardId)
            .maybeSingle();

          if (!error && data) {
            setCardData(data);
          }
        } catch (err) {
          console.error('Error fetching card data:', err);
        }
      }
      setLoading(false);
    }

    fetchCardData();
  }, [cardId]);

  const activeThemeKey = cardData?.effect_type || 'gold-confetti';
  const theme = THEME_STYLES[activeThemeKey] || THEME_STYLES['gold-confetti'];

  // Refined Luxury Shape Drawer for Live Viewer
  const drawRefinedShape = (ctx: CanvasRenderingContext2D, type: string, size: number, color: string) => {
    ctx.fillStyle = color;
    ctx.strokeStyle = color;

    if (type === 'ruby-petal') {
      // Elegant Rose Petal 🌹
      ctx.beginPath();
      ctx.moveTo(0, -size * 1.2);
      ctx.bezierCurveTo(size * 1.2, -size * 0.5, size * 1.4, size * 0.8, 0, size * 1.4);
      ctx.bezierCurveTo(-size * 1.4, size * 0.8, -size * 1.2, -size * 0.5, 0, -size * 1.2);
      ctx.fill();
    } else if (type === 'eternal-dove') {
      // Minimalist Dove / Wing Silhouette 🕊️
      ctx.beginPath();
      ctx.moveTo(-size * 1.2, -size * 0.2);
      ctx.quadraticCurveTo(0, -size * 1.5, size * 1.2, -size * 0.2);
      ctx.quadraticCurveTo(size * 0.4, size * 0.2, 0, size * 0.8);
      ctx.quadraticCurveTo(-size * 0.4, size * 0.2, -size * 1.2, -size * 0.2);
      ctx.fill();
    } else if (type === 'gender-reveal') {
      // Distinct Baby Bottle Silhouette 🍼
      ctx.beginPath();
      ctx.rect(-size * 0.35, -size * 0.3, size * 0.7, size * 1.1);
      ctx.fill();
      ctx.beginPath();
      ctx.rect(-size * 0.2, -size * 0.7, size * 0.4, size * 0.4);
      ctx.fill();
    } else if (type === 'executive-light') {
      // Sleek Platinum Prism Bar
      ctx.shadowColor = 'rgba(229, 228, 226, 0.9)';
      ctx.shadowBlur = 10;
      ctx.fillRect(-size * 0.25, -size * 1.5, size * 0.5, size * 3);
    } else {
      // Crisp Luxury Star Sparkle ✦
      ctx.beginPath();
      ctx.moveTo(0, -size * 1.3);
      ctx.lineTo(size * 0.35, -size * 0.35);
      ctx.lineTo(size * 1.3, 0);
      ctx.lineTo(size * 0.35, size * 0.35);
      ctx.lineTo(0, size * 1.3);
      ctx.lineTo(-size * 0.35, size * 0.35);
      ctx.lineTo(-size * 1.3, 0);
      ctx.lineTo(-size * 0.35, -size * 0.35);
      ctx.closePath();
      ctx.fill();
    }
  };

  const triggerUnsealingEffect = (themeKey = 'gold-confetti') => {
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

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Array<any> = [];
    const count = 90;
    const colors = THEME_STYLES[themeKey]?.colors || ['#d4af37', '#f4e6b0'];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2 - 40,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.7) * 14 - 3,
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.12,
        opacity: 1,
        sway: Math.random() * 3,
      });
    }

    let animationFrameId: number;
    const start = Date.now();

    const render = () => {
      const elapsed = Date.now() - start;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx + Math.sin(elapsed * 0.003 + p.sway) * 0.5;
        p.y += p.vy;
        p.vy += 0.22;
        p.vx *= 0.98;
        p.rotation += p.rotSpeed;

        if (elapsed > 1800) p.opacity -= 0.02;

        if (p.opacity > 0) {
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          
          drawRefinedShape(ctx, themeKey, p.size, p.color);

          ctx.restore();
        }
      });

      if (elapsed < 3000) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        canvas.remove();
      }
    };

    animationFrameId = requestAnimationFrame(render);
  };

  useEffect(() => {
    if (cardData) {
      triggerUnsealingEffect(cardData?.effect_type || 'gold-confetti');
    }
  }, [cardData]);

  return (
    <div className="w-full max-w-[680px] p-4 md:p-6 mx-auto my-auto flex flex-col justify-center min-h-screen">
      <div className={`bg-[#101014]/92 border ${theme.border} rounded-xl p-6 md:p-8 text-center ${theme.glow} backdrop-blur-md flex flex-col gap-5 transition-all duration-500`}>
        <div className={`inline-block self-center px-4 py-1.5 border ${theme.badgeBorder} rounded-[30px] text-[10px] tracking-[2.5px] uppercase ${theme.text} ${theme.badgeBg}`}>
          ✦ {theme.name} Ceremony ✦
        </div>
        
        <div>
          <h1 className={`font-serif text-[24px] uppercase ${theme.text} tracking-[2px]`}>Unsealing Experience</h1>
          <p className="text-[12px] text-[#b0aebf] tracking-[1px] mt-1.5">CARD ID: {cardId}</p>
        </div>

        {/* Dynamic Content Section */}
        <div className={`text-left bg-black/40 border ${theme.badgeBorder} p-5 rounded-lg text-[#f4e6b0]`}>
          {loading ? (
            <p className="text-center text-sm text-[#b0aebf]">Loading card message...</p>
          ) : cardData?.message_text ? (
            <div className="space-y-2">
              <p className={`text-xs uppercase tracking-widest ${theme.text}`}>Message:</p>
              <p className="text-base font-light leading-relaxed">{cardData.message_text}</p>
            </div>
          ) : (
            <div className="text-center space-y-2">
              <p className="text-sm text-[#b0aebf]">No custom message stored for this card yet.</p>
              <Link 
                href={`/activate?id=${encodeURIComponent(cardId)}`}
                className="inline-block text-xs text-[#d4af37] underline tracking-wider uppercase mt-1"
              >
                Configure This Card Now ↗
              </Link>
            </div>
          )}
        </div>

        {/* Media Container */}
        {cardData?.media_url && (
          <div className={`relative w-full rounded-lg overflow-hidden border ${theme.badgeBorder} bg-black aspect-video`}>
            <video
              ref={videoRef}
              src={cardData.media_url}
              controls
              playsInline
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              className="w-full h-full object-contain block"
            />
          </div>
        )}

        <div className="flex flex-col gap-3 mt-2">
          <button 
            className={`w-full py-3.5 text-[11px] font-semibold uppercase tracking-[1.5px] rounded transition-all cursor-pointer ${theme.buttonBg}`} 
            onClick={() => triggerUnsealingEffect(cardData?.effect_type || 'gold-confetti')}
          >
            ✦ Replay Unsealing Ceremony ✦
          </button>
          
          <Link 
            href={`/activate?id=${encodeURIComponent(cardId)}`}
            className="w-full py-3 text-[11px] border border-[#d4af37]/50 text-[#f4e6b0] hover:border-[#d4af37] rounded uppercase tracking-wider text-center"
          >
            Configure / Edit This Card
          </Link>

          <Link href="/" className="btn btn-outline w-full py-3.5 text-[11px]">
            Return to Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}