'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

// Default mock data for demo previews using local public folder video[cite: 6]
const DEMO_PREVIEW_DATA = {
  message_text: "Welcome to the Aura & Archive Experience. A seamless fusion of physical luxury and digital narrative.",
  media_url: "/AA-Demo.mp4",
  effect_type: "gold-confetti",
};

export default function ExperienceClient({ cardId }: { cardId: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [cardData, setCardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Fetch card data from Supabase using dynamic cardId, or fallback to DEMO data[cite: 6]
  useEffect(() => {
    async function fetchCardData() {
      const cleanId = (cardId || '').trim().toUpperCase();
      const isDemo = cleanId.startsWith('DEMO');

      // If accessing a preview/demo route, bypass Supabase and load local demo data[cite: 6]
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

  // Modular Multi-Effect Canvas Particle Engine supporting all 5 Themes
  const triggerUnsealingEffect = (theme = 'gold-confetti') => {
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
    const count = theme === 'executive-light' ? 60 : 140;

    // Define Color Palettes based on Theme
    let colors = ['#d4af37', '#f4e6b0', '#96760e', '#fff6cd', '#e6ca65'];
    if (theme === 'ruby-petal') colors = ['#8b0000', '#dc143c', '#ff1493', '#b22222', '#ff69b4'];
    if (theme === 'eternal-dove') colors = ['#ffffff', '#f0f8ff', '#e0ffff', '#dcdcdc'];
    if (theme === 'gender-reveal') colors = ['#ffb6c1', '#87ceeb', '#ffffff', '#ff69b4', '#add8e6'];
    if (theme === 'executive-light') colors = ['#d4af37', '#ffffff', '#e5e4e2', '#cfb53b'];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: theme === 'executive-light' ? Math.random() * window.innerWidth : window.innerWidth / 2,
        y: theme === 'executive-light' ? window.innerHeight + 20 : window.innerHeight / 2 - 40,
        vx: (Math.random() - 0.5) * (theme === 'executive-light' ? 2 : 20),
        vy: theme === 'executive-light' ? -(Math.random() * 4 + 2) : (Math.random() - 0.7) * 18 - 4,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.2,
        opacity: 1,
        sway: Math.random() * 2,
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

        if (theme !== 'executive-light') {
          p.vy += 0.25; // Gravity
          p.vx *= 0.98;
        }

        p.rotation += p.rotSpeed;

        if (elapsed > 1800) {
          p.opacity -= 0.02;
        }

        if (p.opacity > 0) {
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;

          if (theme === 'ruby-petal') {
            // Draw Organic Petal Shape
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size, p.size * 0.5, 0, 0, Math.PI * 2);
            ctx.fill();
          } else if (theme === 'eternal-dove') {
            // Soft Feather Circles
            ctx.beginPath();
            ctx.arc(0, 0, p.size * 0.8, 0, Math.PI * 2);
            ctx.fill();
          } else if (theme === 'executive-light') {
            // Sleek Light Streaks with Glow
            ctx.shadowColor = 'rgba(212, 175, 55, 0.9)';
            ctx.shadowBlur = 10;
            ctx.fillRect(-p.size / 4, -p.size * 1.5, p.size / 2, p.size * 3);
          } else {
            // Default Gold Confetti Squares / Ribbons
            ctx.shadowColor = 'rgba(212, 175, 55, 0.8)';
            ctx.shadowBlur = 6;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          }

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

  // Automatically trigger the correct theme effect once card data loads
  useEffect(() => {
    if (cardData) {
      triggerUnsealingEffect(cardData?.effect_type || 'gold-confetti');
    }
  }, [cardData]);

  return (
    <div className="w-full max-w-[680px] p-4 md:p-6 mx-auto my-auto flex flex-col justify-center min-h-screen">
      <div className="bg-[#101014]/92 border border-[#d4af37] rounded-xl p-6 md:p-8 text-center shadow-[0_0_35px_rgba(212,175,55,0.2)] backdrop-blur-md flex flex-col gap-5">
        <div className="inline-block self-center px-4 py-1.5 border border-[#d4af37]/40 rounded-[30px] text-[10px] tracking-[2.5px] uppercase text-[#f4e6b0] bg-[#d4af37]/10">
          ✦ Aura & Archive Experience ✦
        </div>
        
        <div>
          <h1 className="font-serif text-[24px] uppercase text-[#d4af37] tracking-[2px]">Unsealing Experience</h1>
          <p className="text-[12px] text-[#b0aebf] tracking-[1px] mt-1.5">CARD ID: {cardId}</p>
        </div>

        {/* Dynamic Content Section */}
        <div className="text-left bg-black/40 border border-[#d4af37]/30 p-5 rounded-lg text-[#f4e6b0]">
          {loading ? (
            <p className="text-center text-sm text-[#b0aebf]">Loading card message...</p>
          ) : cardData?.message_text ? (
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-widest text-[#d4af37]">Message:</p>
              <p className="text-base font-light leading-relaxed">{cardData.message_text}</p>
            </div>
          ) : (
            <p className="text-center text-sm text-[#b0aebf]">No custom message stored for this card yet.</p>
          )}
        </div>

        {/* Optional Video / Media Container if media URL exists[cite: 6] */}
        {cardData?.media_url && (
          <div className="relative w-full rounded-lg overflow-hidden border border-[#d4af37]/40 bg-black aspect-video">
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
            className="btn btn-gold w-full py-3.5 text-[11px]" 
            onClick={() => triggerUnsealingEffect(cardData?.effect_type || 'gold-confetti')}
          >
            ✦ Replay Unsealing Ceremony ✦
          </button>
          
          <Link href="/" className="btn btn-outline w-full py-3.5 text-[11px]">
            Return to Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}