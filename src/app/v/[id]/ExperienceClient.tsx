'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

const DEMO_PREVIEW_DATA = {
  message_text: "Welcome to the Aura & Archive Experience. The all-in-one universal greeting card platform.",
  media_url: "/AA-Demo.mp4",
  effect_type: "gold-confetti",
};

const THEME_STYLES: Record<string, { border: string; glow: string; text: string; badgeBg: string; badgeBorder: string; buttonBg: string; name: string }> = {
  'gold-confetti': { name: 'Aura Gold', border: 'border-[#d4af37]', glow: 'shadow-[0_0_35px_rgba(212,175,55,0.2)]', text: 'text-[#d4af37]', badgeBg: 'bg-[#d4af37]/10', badgeBorder: 'border-[#d4af37]/40', buttonBg: 'bg-gradient-to-r from-[#d4af37] to-[#f4e6b0] text-black' },
  'executive-light': { name: 'Corporate Lumina', border: 'border-[#e5e4e2]', glow: 'shadow-[0_0_35px_rgba(229,228,226,0.2)]', text: 'text-[#e5e4e2]', badgeBg: 'bg-[#e5e4e2]/10', badgeBorder: 'border-[#e5e4e2]/40', buttonBg: 'bg-gradient-to-r from-[#e5e4e2] to-[#ffffff] text-black' },
  'eternal-dove': { name: 'Eternal Remembrance', border: 'border-[#f0f8ff]', glow: 'shadow-[0_0_35px_rgba(240,248,255,0.15)]', text: 'text-[#f0f8ff]', badgeBg: 'bg-white/10', badgeBorder: 'border-white/30', buttonBg: 'bg-gradient-to-r from-[#ffffff] to-[#dcdcdc] text-black' },
  'gender-reveal': { name: 'New Arrival', border: 'border-[#ffb6c1]', glow: 'shadow-[0_0_35px_rgba(255,182,193,0.25)]', text: 'text-[#ffb6c1]', badgeBg: 'bg-[#ffb6c1]/10', badgeBorder: 'border-[#ffb6c1]/40', buttonBg: 'bg-gradient-to-r from-[#ffb6c1] to-[#87ceeb] text-black' },
  'ruby-petal': { name: 'Crimson Romance', border: 'border-[#dc143c]', glow: 'shadow-[0_0_35px_rgba(220,20,60,0.25)]', text: 'text-[#ff69b4]', badgeBg: 'bg-[#dc143c]/15', badgeBorder: 'border-[#dc143c]/40', buttonBg: 'bg-gradient-to-r from-[#dc143c] to-[#ff1493] text-white' },
  'wealth-glamour': { name: 'Wealth & Glamour', border: 'border-[#b9f2ff]', glow: 'shadow-[0_0_35px_rgba(185,242,255,0.25)]', text: 'text-[#b9f2ff]', badgeBg: 'bg-[#b9f2ff]/10', badgeBorder: 'border-[#b9f2ff]/40', buttonBg: 'bg-gradient-to-r from-[#b9f2ff] to-[#ffffff] text-black' },
  'birthday': { name: 'Happy Birthday', border: 'border-[#ffd700]', glow: 'shadow-[0_0_35px_rgba(255,215,0,0.25)]', text: 'text-[#ffd700]', badgeBg: 'bg-[#ffd700]/10', badgeBorder: 'border-[#ffd700]/40', buttonBg: 'bg-gradient-to-r from-[#ffd700] to-[#ffffff] text-black' },
  'christmas': { name: 'Winter & Christmas', border: 'border-[#ff4d4d]', glow: 'shadow-[0_0_35px_rgba(255,77,77,0.25)]', text: 'text-[#ff4d4d]', badgeBg: 'bg-[#ff4d4d]/10', badgeBorder: 'border-[#ff4d4d]/40', buttonBg: 'bg-gradient-to-r from-[#ff4d4d] to-[#00aa55] text-white' },
  'halloween': { name: 'Halloween', border: 'border-[#ff9900]', glow: 'shadow-[0_0_35px_rgba(255,153,0,0.25)]', text: 'text-[#ff9900]', badgeBg: 'bg-[#ff9900]/10', badgeBorder: 'border-[#ff9900]/40', buttonBg: 'bg-gradient-to-r from-[#ff9900] to-[#333333] text-white' },
  'valentines': { name: "Valentine's Day", border: 'border-[#ff1493]', glow: 'shadow-[0_0_35px_rgba(255,20,147,0.25)]', text: 'text-[#ff1493]', badgeBg: 'bg-[#ff1493]/10', badgeBorder: 'border-[#ff1493]/40', buttonBg: 'bg-gradient-to-r from-[#ff1493] to-[#ffb6c1] text-white' },
  'april-fools': { name: 'April Fools & Humor', border: 'border-[#00ffcc]', glow: 'shadow-[0_0_35px_rgba(0,255,204,0.25)]', text: 'text-[#00ffcc]', badgeBg: 'bg-[#00ffcc]/10', badgeBorder: 'border-[#00ffcc]/40', buttonBg: 'bg-gradient-to-r from-[#00ffcc] to-[#ffff00] text-black' },
  'veterans-day': { name: 'Veteran Appreciation', border: 'border-[#4169e1]', glow: 'shadow-[0_0_35px_rgba(65,105,225,0.25)]', text: 'text-[#4169e1]', badgeBg: 'bg-[#4169e1]/10', badgeBorder: 'border-[#4169e1]/40', buttonBg: 'bg-gradient-to-r from-[#4169e1] to-[#ffffff] text-black' },
  'fourth-of-july': { name: 'Fourth of July', border: 'border-[#ff3333]', glow: 'shadow-[0_0_35px_rgba(255,51,51,0.25)]', text: 'text-[#ff3333]', badgeBg: 'bg-[#ff3333]/10', badgeBorder: 'border-[#ff3333]/40', buttonBg: 'bg-gradient-to-r from-[#ff3333] to-[#ffffff] text-black' },
  'thanksgiving': { name: 'Thanksgiving', border: 'border-[#ff8c00]', glow: 'shadow-[0_0_35px_rgba(255,140,0,0.25)]', text: 'text-[#ff8c00]', badgeBg: 'bg-[#ff8c00]/10', badgeBorder: 'border-[#ff8c00]/40', buttonBg: 'bg-gradient-to-r from-[#ff8c00] to-[#deb887] text-black' },
  'christianity': { name: 'Christianity', border: 'border-[#ffffff]', glow: 'shadow-[0_0_35px_rgba(255,255,255,0.25)]', text: 'text-[#ffffff]', badgeBg: 'bg-white/10', badgeBorder: 'border-white/30', buttonBg: 'bg-gradient-to-r from-[#ffffff] to-[#dcdcdc] text-black' },
  'islam': { name: 'Islam', border: 'border-[#00fa9a]', glow: 'shadow-[0_0_35px_rgba(0,250,154,0.25)]', text: 'text-[#00fa9a]', badgeBg: 'bg-[#00fa9a]/10', badgeBorder: 'border-[#00fa9a]/40', buttonBg: 'bg-gradient-to-r from-[#00fa9a] to-[#ffffff] text-black' },
  'judaism': { name: 'Judaism', border: 'border-[#1e90ff]', glow: 'shadow-[0_0_35px_rgba(30,144,255,0.25)]', text: 'text-[#1e90ff]', badgeBg: 'bg-[#1e90ff]/10', badgeBorder: 'border-[#1e90ff]/40', buttonBg: 'bg-gradient-to-r from-[#1e90ff] to-[#ffffff] text-black' },
  'hinduism': { name: 'Hinduism', border: 'border-[#ff8c00]', glow: 'shadow-[0_0_35px_rgba(255,140,0,0.25)]', text: 'text-[#ff8c00]', badgeBg: 'bg-[#ff8c00]/10', badgeBorder: 'border-[#ff8c00]/40', buttonBg: 'bg-gradient-to-r from-[#ff8c00] to-[#ffd700] text-black' },
  'buddhism': { name: 'Buddhism', border: 'border-[#dda0dd]', glow: 'shadow-[0_0_35px_rgba(221,160,221,0.25)]', text: 'text-[#dda0dd]', badgeBg: 'bg-[#dda0dd]/10', badgeBorder: 'border-[#dda0dd]/40', buttonBg: 'bg-gradient-to-r from-[#dda0dd] to-[#ffffff] text-black' },
  'mothers-day': { name: "Mother's Day", border: 'border-[#ffb6c1]', glow: 'shadow-[0_0_35px_rgba(255,182,193,0.25)]', text: 'text-[#ffb6c1]', badgeBg: 'bg-[#ffb6c1]/10', badgeBorder: 'border-[#ffb6c1]/40', buttonBg: 'bg-gradient-to-r from-[#ffb6c1] to-[#ff1493] text-white' },
  'fathers-day': { name: "Father's Day", border: 'border-[#4682b4]', glow: 'shadow-[0_0_35px_rgba(70,130,180,0.25)]', text: 'text-[#4682b4]', badgeBg: 'bg-[#4682b4]/10', badgeBorder: 'border-[#4682b4]/40', buttonBg: 'bg-gradient-to-r from-[#4682b4] to-[#ffffff] text-black' },
  'day-of-the-dead': { name: 'Day of the Dead', border: 'border-[#ff6347]', glow: 'shadow-[0_0_35px_rgba(255,99,71,0.25)]', text: 'text-[#ff6347]', badgeBg: 'bg-[#ff6347]/10', badgeBorder: 'border-[#ff6347]/40', buttonBg: 'bg-gradient-to-r from-[#ff6347] to-[#ffd700] text-black' },
  'graduation': { name: 'Graduation', border: 'border-[#9370db]', glow: 'shadow-[0_0_35px_rgba(147,112,219,0.25)]', text: 'text-[#9370db]', badgeBg: 'bg-[#9370db]/10', badgeBorder: 'border-[#9370db]/40', buttonBg: 'bg-gradient-to-r from-[#9370db] to-[#ffd700] text-black' },
  'get-well': { name: 'Get Well Soon', border: 'border-[#98fb98]', glow: 'shadow-[0_0_35px_rgba(152,251,152,0.25)]', text: 'text-[#98fb98]', badgeBg: 'bg-[#98fb98]/10', badgeBorder: 'border-[#98fb98]/40', buttonBg: 'bg-gradient-to-r from-[#98fb98] to-[#ffffff] text-black' },
  'thank-you': { name: 'Thank You', border: 'border-[#ffe4e1]', glow: 'shadow-[0_0_35px_rgba(255,228,225,0.25)]', text: 'text-[#ffe4e1]', badgeBg: 'bg-[#ffe4e1]/10', badgeBorder: 'border-[#ffe4e1]/40', buttonBg: 'bg-gradient-to-r from-[#ffe4e1] to-[#ffb6c1] text-black' },
  'bffs': { name: "BFF's", border: 'border-[#ff69b4]', glow: 'shadow-[0_0_35px_rgba(255,105,180,0.25)]', text: 'text-[#ff69b4]', badgeBg: 'bg-[#ff69b4]/10', badgeBorder: 'border-[#ff69b4]/40', buttonBg: 'bg-gradient-to-r from-[#ff69b4] to-[#ff1493] text-white' },
  'engagement': { name: 'Engagement', border: 'border-[#e0ffff]', glow: 'shadow-[0_0_35px_rgba(224,255,255,0.25)]', text: 'text-[#e0ffff]', badgeBg: 'bg-[#e0ffff]/10', badgeBorder: 'border-[#e0ffff]/40', buttonBg: 'bg-gradient-to-r from-[#e0ffff] to-[#ffd700] text-black' },
  'retirement': { name: 'Retirement & Farewell', border: 'border-[#f4a460]', glow: 'shadow-[0_0_35px_rgba(244,164,96,0.25)]', text: 'text-[#f4a460]', badgeBg: 'bg-[#f4a460]/10', badgeBorder: 'border-[#f4a460]/40', buttonBg: 'bg-gradient-to-r from-[#f4a460] to-[#ffffff] text-black' },
  'new-years': { name: "New Year's Eve", border: 'border-[#e5e4e2]', glow: 'shadow-[0_0_35px_rgba(229,228,226,0.25)]', text: 'text-[#e5e4e2]', badgeBg: 'bg-[#e5e4e2]/10', badgeBorder: 'border-[#e5e4e2]/40', buttonBg: 'bg-gradient-to-r from-[#e5e4e2] to-[#ffd700] text-black' },
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

  const drawParticle = (ctx: CanvasRenderingContext2D, themeKey: string, size: number) => {
    if (themeKey === 'executive-light') {
      ctx.shadowColor = 'rgba(229, 228, 226, 0.9)';
      ctx.shadowBlur = 12;
      ctx.fillStyle = '#e5e4e2';
      ctx.fillRect(-size * 0.25, -size * 1.8, size * 0.5, size * 3.6);
      return;
    }

    ctx.font = `${Math.max(20, size * 2.8)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    let emoji = '✨';
    switch (themeKey) {
      case 'gold-confetti': emoji = '✨'; break;
      case 'eternal-dove': emoji = '🕊️'; break;
      case 'gender-reveal': emoji = '🍼'; break;
      case 'ruby-petal': emoji = '🌹'; break;
      case 'wealth-glamour': emoji = '💎'; break;
      case 'birthday': emoji = '🎂'; break;
      case 'christmas': emoji = '🎄'; break;
      case 'halloween': emoji = '🎃'; break;
      case 'valentines': emoji = '❤️'; break;
      case 'april-fools': emoji = '🤣'; break;
      case 'veterans-day': emoji = '🎖️'; break;
      case 'fourth-of-july': emoji = '🎆'; break;
      case 'thanksgiving': emoji = '🦃'; break;
      case 'christianity': emoji = '✝️'; break;
      case 'islam': emoji = '☪️'; break;
      case 'judaism': emoji = '✡️'; break;
      case 'hinduism': emoji = '🪔'; break;
      case 'buddhism': emoji = '🪷'; break;
      case 'mothers-day': emoji = '💐'; break;
      case 'fathers-day': emoji = '👔'; break;
      case 'day-of-the-dead': emoji = '💀'; break;
      case 'graduation': emoji = '🎓'; break;
      case 'get-well': emoji = '🌻'; break;
      case 'thank-you': emoji = '🙏'; break;
      case 'bffs': emoji = '👯'; break;
      case 'engagement': emoji = '💍'; break;
      case 'retirement': emoji = '🌅'; break;
      case 'new-years': emoji = '🥂'; break;
      default: emoji = '✨';
    }

    ctx.fillText(emoji, 0, 0);
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
    const count = themeKey === 'executive-light' ? 50 : 45;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: themeKey === 'executive-light' ? Math.random() * window.innerWidth : window.innerWidth / 2,
        y: themeKey === 'executive-light' ? window.innerHeight + 20 : window.innerHeight / 2 - 40,
        vx: (Math.random() - 0.5) * (themeKey === 'executive-light' ? 2 : 14),
        vy: themeKey === 'executive-light' ? -(Math.random() * 4 + 2) : (Math.random() - 0.7) * 12 - 3,
        size: Math.random() * 8 + 8,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.08,
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
        if (themeKey !== 'executive-light') {
          p.vy += 0.18;
          p.vx *= 0.98;
        }
        p.rotation += p.rotSpeed;

        if (elapsed > 1800) p.opacity -= 0.02;

        if (p.opacity > 0) {
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          
          drawParticle(ctx, themeKey, p.size);

          ctx.restore();
        }
      });

      if (elapsed < 3200) {
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