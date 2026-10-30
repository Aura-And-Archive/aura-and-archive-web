'use client';

import React, { useEffect, useState, useRef, use } from 'react';

export default function DedicatedCardViewer({ params }: { params: Promise<{ cardId: string }> }) {
  const resolvedParams = use(params);
  const cardId = resolvedParams?.cardId || 'demo';

  const [cardData, setCardData] = useState<any>(null);
  const mediaRef = useRef<HTMLAudioElement | HTMLVideoElement>(null);

  useEffect(() => {
    // 1. Parse URL query params (for live demos/sandbox) or fetch from Supabase/API by cardId
    if (typeof window !== 'undefined') {
      const query = new URLSearchParams(window.location.search);
      const to = query.get('to') || '';
      const msg = query.get('msg') || '';
      const photo = query.get('photo') || '';
      const media = query.get('media') || '';
      const theme = query.get('theme') || 'gold-confetti';

      if (to || msg || photo || media) {
        setCardData({ recipient: to, message: msg, photoUrl: photo, mediaUrl: media, theme });
      } else {
        // Fetch saved card from database
        fetch(`/api/cards/${cardId}`)
          .then((res) => res.json())
          .then((data) => setCardData(data))
          .catch((err) => console.error('Error fetching card:', err));
      }
    }
  }, [cardId]);

  useEffect(() => {
    if (cardData?.mediaUrl && mediaRef.current) {
      mediaRef.current.play().catch(() => console.log('Autoplay muted by browser policy'));
    }
  }, [cardData]);

  if (!cardData) {
    return (
      <div className="fixed inset-0 bg-black text-white flex items-center justify-center">
        <p className="text-xs uppercase tracking-[3px] text-zinc-500 font-mono animate-pulse">
          ✦ Loading Keepsake... ✦
        </p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-black text-white select-none">
      
      {/* LAYER 0: HERO FULL-SCREEN BACKGROUND PHOTO (Absolute Edge-to-Edge) */}
      {cardData.photoUrl && (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat pointer-events-none z-0"
          style={{ backgroundImage: `url("${cardData.photoUrl}")` }}
        />
      )}

      {/* LAYER 1: CINEMATIC VIGNETTE (Soft gradient shading ONLY — Zero solid containers) */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/85 via-black/20 to-black/60 pointer-events-none z-0" />

      {/* LAYER 2: FLOATING CANVAS CONTENT (Pure typography & floating media player) */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between p-6 text-center">
        
        {/* Header Branding */}
        <header className="pt-4">
          <p className="text-[10px] uppercase tracking-[3px] text-[#d4af37] font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            ✦ AURA & ARCHIVE ✦
          </p>
        </header>

        {/* Center Text (Floating Directly Over Photo with Heavy Shadow) */}
        <main className="my-auto space-y-4 max-w-lg">
          <p className="text-xs uppercase tracking-[3px] text-[#d4af37] font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">
            ✦ To: {cardData.recipient || 'Someone Special'} ✦
          </p>
          <h1 className="text-2xl md:text-3xl font-light leading-relaxed text-white drop-shadow-[0_2px_12px_rgba(0,0,0,1)]">
            {cardData.message || 'Your custom background keepsake.'}
          </h1>
        </main>

        {/* Bottom Floating Media Player */}
        <footer className="pb-6 w-full max-w-sm">
          {cardData.mediaUrl && (
            <div className="w-full backdrop-blur-md bg-black/40 border border-white/20 p-2 rounded-2xl shadow-2xl">
              <audio 
                ref={mediaRef as React.RefObject<HTMLAudioElement>}
                src={cardData.mediaUrl} 
                controls 
                autoPlay 
                className="w-full h-8"
              />
            </div>
          )}
        </footer>

      </div>
    </div>
  );
}