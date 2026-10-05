'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

export default function ExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap the params promise using React.use
  const resolvedParams = React.use(params);
  const cardId = resolvedParams?.id || 'DEMO-GOLD-GRAFFITI';

  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Trigger Gold Confetti Effect using HTML5 Canvas
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
        p.vy += 0.25; // gravity
        p.vx *= 0.98; // drag
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
    // Automatically trigger confetti when the page loads
    triggerGoldConfetti();
  }, []);

  return (
    <div className="experience-container">
      <style jsx global>{`
        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          background: radial-gradient(circle at 50% 30%, #2a220d 0%, #0c0b07 50%, #050506 100%);
          min-height: 100vh;
          font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
          color: #f3f3f7;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow-x: hidden;
        }

        .experience-container {
          width: 100%;
          max-width: 680px;
          padding: 24px 16px;
          margin: 0 auto;
        }

        .experience-card {
          background: rgba(16, 16, 20, 0.92);
          border: 1px solid #d4af37;
          border-radius: 12px;
          padding: 32px 24px;
          text-align: center;
          box-shadow: 0 0 35px rgba(212, 175, 55, 0.2);
          backdrop-filter: blur(12px);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .badge {
          display: inline-block;
          align-self: center;
          padding: 6px 16px;
          border: 1px solid rgba(212, 175, 55, 0.4);
          border-radius: 30px;
          font-size: 10px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #f4e6b0;
          background: rgba(212, 175, 55, 0.08);
        }

        .title {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          text-transform: uppercase;
          color: #d4af37;
          letter-spacing: 2px;
        }

        .card-id-sub {
          font-size: 12px;
          color: #b0aebf;
          letter-spacing: 1px;
          margin-top: 6px;
        }

        .video-wrapper {
          position: relative;
          width: 100%;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid rgba(212, 175, 55, 0.4);
          background: #000;
          aspect-ratio: 16 / 9;
        }

        .video-wrapper video {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }

        .btn-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 8px;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 14px 20px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          border-radius: 4px;
          text-decoration: none;
          cursor: pointer;
          border: none;
          transition: all 0.3s ease;
        }

        .btn-gold {
          background: linear-gradient(135deg, #f4e6b0 0%, #d4af37 50%, #96760e 100%);
          color: #000;
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.25);
        }

        .btn-gold:hover {
          box-shadow: 0 6px 20px rgba(212, 175, 55, 0.45);
          transform: translateY(-1px);
        }

        .btn-outline {
          background: rgba(0, 0, 0, 0.4);
          color: #f4e6b0;
          border: 1px solid rgba(212, 175, 55, 0.35);
        }

        .btn-outline:hover {
          border-color: #d4af37;
          background: rgba(212, 175, 55, 0.1);
        }
      `}</style>

      <div className="experience-card">
        <div className="badge">✦ Aura & Archive Experience ✦</div>
        
        <div>
          <h1 className="title">Unsealing Experience</h1>
          <p className="card-id-sub">CARD ID: {cardId}</p>
        </div>

        <div className="video-wrapper">
          <video
            ref={videoRef}
            src="/AA-Demo.mp4"
            controls
            playsInline
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
          />
        </div>

        <div className="btn-group">
          <button className="btn btn-gold" onClick={triggerGoldConfetti}>
            ✦ Trigger Gold Confetti Burst ✦
          </button>
          
          <Link href="/" className="btn btn-outline">
            Return to Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}