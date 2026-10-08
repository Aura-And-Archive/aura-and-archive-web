'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

// Route segment configurations for fast client streaming
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default function ExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const cardId = resolvedParams?.id || 'DEMO-GOLD-GRAFFITI';

  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const triggerGoldConfetti = () => {
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

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      rotation: number;
      rotSpeed: number;
      opacity: number;
    }> = [];

    const goldShades = ['#d4af37', '#f4e6b0', '#96760e', '#fff6cd', '#e6ca65'];

    for (let i = 0; i < 140; i++) {
      particles.push({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2 - 40,
        vx: (Math.random() - 0.5) * 20,
        vy: (Math.random() - 0.7) * 18 - 4,
        size: Math.random() * 8 + 4,
        color: goldShades[Math.floor(Math.random() * goldShades.length)],
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.2,
        opacity: 1,
      });
    }

    let animationFrameId: number;
    const start = Date.now();

    const render = () => {
      const elapsed = Date.now() - start;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.25;
        p.vx *= 0.98;
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
          ctx.shadowColor = 'rgba(212, 175, 55, 0.8)';
          ctx.shadowBlur = 6;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
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
    triggerGoldConfetti();
  }, []);

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

        <div className="relative w-full rounded-lg overflow-hidden border border-[#d4af37]/40 bg-black aspect-video">
          <video
            ref={videoRef}
            src="/AA-Demo.mp4"
            controls
            playsInline
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            className="w-full h-full object-contain block"
          />
        </div>

        <div className="flex flex-col gap-3 mt-2">
          <button className="btn btn-gold w-full py-3.5 text-[11px]" onClick={triggerGoldConfetti}>
            ✦ Trigger Gold Confetti Burst ✦
          </button>
          
          <Link href="/" className="btn btn-outline w-full py-3.5 text-[11px]">
            Return to Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}