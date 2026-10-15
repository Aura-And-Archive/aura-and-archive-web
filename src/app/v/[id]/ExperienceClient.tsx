'use client';

import React, { useEffect, useState, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

const DEMO_PREVIEW_DATA = {
  message_text: "Welcome to the Aura & Archive Experience. A seamless fusion of physical luxury and digital narrative.",
  media_url: "/AA-Demo.mp4",
  effect_type: "gold-confetti",
};

const THEME_STYLES: Record<string, { border: string; glow: string; text: string; badgeBg: string; badgeBorder: string; buttonBg: string; name: string }> = {
  'gold-confetti': { name: 'Aura Gold', border: 'border-[#d4af37]', glow: 'shadow-[0_0_35px_rgba(212,175,55,0.2)]', text: 'text-[#d4af37]', badgeBg: 'bg-[#d4af37]/10', badgeBorder: 'border-[#d4af37]/40', buttonBg: 'bg-gradient-to-r from-[#d4af37] to-[#f4e6b0] text-black' },
  'executive-light': { name: 'Corporate Lumina', border: 'border-[#e5e4e2]', glow: 'shadow-[0_0_35px_rgba(229,228,226,0.2)]', text: 'text-[#e5e4e2]', badgeBg: 'bg-[#e5e4e2]/10', badgeBorder: 'border-[#e5e4e2]/40', buttonBg: 'bg-gradient-to-r from-[#e5e4e2] to-[#ffffff] text-black' },
  'wealth-glamour': { name: 'Wealth & Glamour', border: 'border-[#b9f2ff]', glow: 'shadow-[0_0_35px_rgba(185,242,255,0.25)]', text: 'text-[#b9f2ff]', badgeBg: 'bg-[#b9f2ff]/10', badgeBorder: 'border-[#b9f2ff]/40', buttonBg: 'bg-gradient-to-r from-[#b9f2ff] to-[#ffffff] text-black' },
  'ruby-petal': { name: 'Crimson Romance', border: 'border-[#dc143c]', glow: 'shadow-[0_0_35px_rgba(220,20,60,0.25)]', text: 'text-[#ff69b4]', badgeBg: 'bg-[#dc143c]/15', badgeBorder: 'border-[#dc143c]/40', buttonBg: 'bg-gradient-to-r from-[#dc143c] to-[#ff1493] text-white' },
  'birthday': { name: 'Happy Birthday', border: 'border-[#ffb6c1]', glow: 'shadow-[0_0_35px_rgba(255,182,193,0.25)]', text: 'text-[#ffb6c1]', badgeBg: 'bg-[#ffb6c1]/10', badgeBorder: 'border-[#ffb6c1]/40', buttonBg: 'bg-gradient-to-r from-[#ffb6c1] to-[#ff69b4] text-black' },
  'christmas': { name: 'Winter & Christmas', border: 'border-[#2e8b57]', glow: 'shadow-[0_0_35px_rgba(46,139,87,0.25)]', text: 'text-[#2e8b57]', badgeBg: 'bg-[#2e8b57]/10', badgeBorder: 'border-[#2e8b57]/40', buttonBg: 'bg-gradient-to-r from-[#2e8b57] to-[#ffffff] text-black' },
  'halloween': { name: 'Halloween', border: 'border-[#ff8c00]', glow: 'shadow-[0_0_35px_rgba(255,140,0,0.25)]', text: 'text-[#ff8c00]', badgeBg: 'bg-[#ff8c00]/10', badgeBorder: 'border-[#ff8c00]/40', buttonBg: 'bg-gradient-to-r from-[#ff8c00] to-[#000000] text-white' },
  'valentine': { name: "Valentine's Day", border: 'border-[#ff69b4]', glow: 'shadow-[0_0_35px_rgba(255,105,180,0.25)]', text: 'text-[#ff69b4]', badgeBg: 'bg-[#ff69b4]/10', badgeBorder: 'border-[#ff69b4]/40', buttonBg: 'bg-gradient-to-r from-[#ff69b4] to-[#ffffff] text-black' },
  'april-fools': { name: 'April Fools & Humor', border: 'border-[#ffd700]', glow: 'shadow-[0_0_35px_rgba(255,215,0,0.25)]', text: 'text-[#ffd700]', badgeBg: 'bg-[#ffd700]/10', badgeBorder: 'border-[#ffd700]/40', buttonBg: 'bg-gradient-to-r from-[#ffd700] to-[#ffffff] text-black' },
  'new-years': { name: "New Year's Eve", border: 'border-[#e5e4e2]', glow: 'shadow-[0_0_35px_rgba(229,228,226,0.25)]', text: 'text-[#e5e4e2]', badgeBg: 'bg-[#e5e4e2]/10', badgeBorder: 'border-[#e5e4e2]/40', buttonBg: 'bg-gradient-to-r from-[#e5e4e2] to-[#ffffff] text-black' },
  'christianity': { name: 'Christianity', border: 'border-[#dda0dd]', glow: 'shadow-[0_0_35px_rgba(221,160,221,0.25)]', text: 'text-[#dda0dd]', badgeBg: 'bg-[#dda0dd]/10', badgeBorder: 'border-[#dda0dd]/40', buttonBg: 'bg-gradient-to-r from-[#dda0dd] to-[#ffffff] text-black' },
  'islam': { name: 'Islam', border: 'border-[#98fb98]', glow: 'shadow-[0_0_35px_rgba(152,251,152,0.25)]', text: 'text-[#98fb98]', badgeBg: 'bg-[#98fb98]/10', badgeBorder: 'border-[#98fb98]/40', buttonBg: 'bg-gradient-to-r from-[#98fb98] to-[#ffffff] text-black' },
  'judaism': { name: 'Judaism', border: 'border-[#87ceeb]', glow: 'shadow-[0_0_35px_rgba(135,206,235,0.25)]', text: 'text-[#87ceeb]', badgeBg: 'bg-[#87ceeb]/10', badgeBorder: 'border-[#87ceeb]/40', buttonBg: 'bg-gradient-to-r from-[#87ceeb] to-[#ffffff] text-black' },
  'hinduism': { name: 'Hinduism (Diwali)', border: 'border-[#ffa500]', glow: 'shadow-[0_0_35px_rgba(255,165,0,0.25)]', text: 'text-[#ffa500]', badgeBg: 'bg-[#ffa500]/10', badgeBorder: 'border-[#ffa500]/40', buttonBg: 'bg-gradient-to-r from-[#ffa500] to-[#ffffff] text-black' },
  'buddhism': { name: 'Buddhism', border: 'border-[#deb887]', glow: 'shadow-[0_0_35px_rgba(222,184,135,0.25)]', text: 'text-[#deb887]', badgeBg: 'bg-[#deb887]/10', badgeBorder: 'border-[#deb887]/40', buttonBg: 'bg-gradient-to-r from-[#deb887] to-[#ffffff] text-black' },
  'mothers-day': { name: "Mother's Day", border: 'border-[#ffb6c1]', glow: 'shadow-[0_0_35px_rgba(255,182,193,0.25)]', text: 'text-[#ffb6c1]', badgeBg: 'bg-[#ffb6c1]/10', badgeBorder: 'border-[#ffb6c1]/40', buttonBg: 'bg-gradient-to-r from-[#ffb6c1] to-[#ffffff] text-black' },
  'fathers-day': { name: "Father's Day", border: 'border-[#4682b4]', glow: 'shadow-[0_0_35px_rgba(70,130,180,0.25)]', text: 'text-[#4682b4]', badgeBg: 'bg-[#4682b4]/10', badgeBorder: 'border-[#4682b4]/40', buttonBg: 'bg-gradient-to-r from-[#4682b4] to-[#ffffff] text-black' },
  'gender-reveal': { name: 'New Arrival', border: 'border-[#87ceeb]', glow: 'shadow-[0_0_35px_rgba(135,206,235,0.25)]', text: 'text-[#87ceeb]', badgeBg: 'bg-[#87ceeb]/10', badgeBorder: 'border-[#87ceeb]/40', buttonBg: 'bg-gradient-to-r from-[#87ceeb] to-[#ffffff] text-black' },
  'graduation': { name: 'Graduation', border: 'border-[#daa520]', glow: 'shadow-[0_0_35px_rgba(218,165,32,0.25)]', text: 'text-[#daa520]', badgeBg: 'bg-[#daa520]/10', badgeBorder: 'border-[#daa520]/40', buttonBg: 'bg-gradient-to-r from-[#daa520] to-[#ffffff] text-black' },
  'engagement': { name: 'Engagement', border: 'border-[#e0ffff]', glow: 'shadow-[0_0_35px_rgba(224,255,255,0.25)]', text: 'text-[#e0ffff]', badgeBg: 'bg-[#e0ffff]/10', badgeBorder: 'border-[#e0ffff]/40', buttonBg: 'bg-gradient-to-r from-[#e0ffff] to-[#ffffff] text-black' },
  'retirement': { name: 'Retirement & Farewell', border: 'border-[#f4a460]', glow: 'shadow-[0_0_35px_rgba(244,164,96,0.25)]', text: 'text-[#f4a460]', badgeBg: 'bg-[#f4a460]/10', badgeBorder: 'border-[#f4a460]/40', buttonBg: 'bg-gradient-to-r from-[#f4a460] to-[#ffffff] text-black' },
  'day-of-the-dead': { name: 'Day of the Dead', border: 'border-[#ba55d3]', glow: 'shadow-[0_0_35px_rgba(186,85,211,0.25)]', text: 'text-[#ba55d3]', badgeBg: 'bg-[#ba55d3]/10', badgeBorder: 'border-[#ba55d3]/40', buttonBg: 'bg-gradient-to-r from-[#ba55d3] to-[#ffffff] text-black' },
  'eternal-dove': { name: 'Eternal Remembrance', border: 'border-[#f0f8ff]', glow: 'shadow-[0_0_35px_rgba(240,248,255,0.15)]', text: 'text-[#f0f8ff]', badgeBg: 'bg-white/10', badgeBorder: 'border-white/30', buttonBg: 'bg-gradient-to-r from-[#ffffff] to-[#dcdcdc] text-black' },
  'veteran': { name: 'Veteran Appreciation', border: 'border-[#b22222]', glow: 'shadow-[0_0_35px_rgba(178,34,34,0.25)]', text: 'text-[#b22222]', badgeBg: 'bg-[#b22222]/10', badgeBorder: 'border-[#b22222]/40', buttonBg: 'bg-gradient-to-r from-[#b22222] to-[#ffffff] text-black' },
  'get-well': { name: 'Get Well Soon', border: 'border-[#adff2f]', glow: 'shadow-[0_0_35px_rgba(173,255,47,0.25)]', text: 'text-[#adff2f]', badgeBg: 'bg-[#adff2f]/10', badgeBorder: 'border-[#adff2f]/40', buttonBg: 'bg-gradient-to-r from-[#adff2f] to-[#ffffff] text-black' },
  'thank-you': { name: 'Thank You / Just Because', border: 'border-[#ffd700]', glow: 'shadow-[0_0_35px_rgba(255,215,0,0.25)]', text: 'text-[#ffd700]', badgeBg: 'bg-[#ffd700]/10', badgeBorder: 'border-[#ffd700]/40', buttonBg: 'bg-gradient-to-r from-[#ffd700] to-[#ffffff] text-black' },
  'bff': { name: "BFF's (Best Friends)", border: 'border-[#ff69b4]', glow: 'shadow-[0_0_35px_rgba(255,105,180,0.25)]', text: 'text-[#ff69b4]', badgeBg: 'bg-[#ff69b4]/10', badgeBorder: 'border-[#ff69b4]/40', buttonBg: 'bg-gradient-to-r from-[#ff69b4] to-[#ffffff] text-black' },
};

export default function ExperienceClient({ cardId }: { cardId: string }) {
  const [cardData, setCardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
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

  const triggerGiftNoteEffect = (themeKey = 'gold-confetti') => {
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
      triggerGiftNoteEffect(cardData?.effect_type || 'gold-confetti');
    }
  }, [cardData]);

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

  return (
    <div className="w-full max-w-[680px] p-4 md:p-6 mx-auto my-auto flex flex-col justify-center min-h-screen">
      <div className={`bg-[#101014]/92 border ${theme.border} rounded-xl p-6 md:p-8 text-center ${theme.glow} backdrop-blur-md flex flex-col gap-5 transition-all duration-500`}>
        <div className={`inline-block self-center px-4 py-1.5 border ${theme.badgeBorder} rounded-[30px] text-[10px] tracking-[2.5px] uppercase ${theme.text} ${theme.badgeBg}`}>
          ✦ {theme.name} Gift Note ✦
        </div>
        
        <div>
          <h1 className={`font-serif text-[24px] uppercase ${theme.text} tracking-[2px]`}>Gift Note Experience</h1>
          <p className="text-[12px] text-[#b0aebf] tracking-[1px] mt-1.5">CARD ID: {cardId}</p>
        </div>

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
            </div>
          )}
        </div>

        {cardData?.media_url && (
          <div className={`relative w-full rounded-lg overflow-hidden border ${theme.badgeBorder} bg-black aspect-video`}>
            <video
              ref={videoRef}
              src={cardData.media_url}
              controls
              playsInline
              preload="metadata"
              className="w-full h-full object-contain block"
            />
          </div>
        )}

        <div className="flex flex-col gap-3 mt-2">
          <button 
            className={`w-full py-3.5 text-[11px] font-semibold uppercase tracking-[1.5px] rounded transition-all cursor-pointer ${theme.buttonBg}`} 
            onClick={() => triggerGiftNoteEffect(cardData?.effect_type || 'gold-confetti')}
          >
            ✦ Burst Gift Note Animation ✦
          </button>

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