'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import CardExperience from '@/components/CardExperience';

interface ExperienceClientProps {
  cardId: string;
}

export default function ExperienceClient({ cardId }: ExperienceClientProps) {
  const [cardData, setCardData] = useState<{
    recipient?: string;
    message?: string;
    mediaUrl?: string;
    theme?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCard() {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        setLoading(false);
        return;
      }

      try {
        const supabase = createClient(supabaseUrl, supabaseAnonKey);
        const cleanSerial = decodeURIComponent(cardId || '').trim().toUpperCase();

        const { data, error } = await supabase
          .from('cards')
          .select('recipient_name, message_text, media_url, theme')
          .ilike('serial_number', cleanSerial)
          .maybeSingle();

        if (!error && data) {
          setCardData({
            recipient: data.recipient_name,
            message: data.message_text,
            mediaUrl: data.media_url,
            theme: data.theme,
          });
        }
      } catch (err) {
        console.error('Error fetching card experience:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCard();
  }, [cardId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xs uppercase tracking-widest text-[#d4af37] animate-pulse">Loading Experience ✦</p>
      </div>
    );
  }

  return (
    <CardExperience
      initialRecipient={cardData?.recipient || ''}
      initialMessage={cardData?.message || ''}
      initialMediaUrl={cardData?.mediaUrl || ''}
      initialTheme={cardData?.theme || 'gold-confetti'}
      isSandbox={false}
    />
  );
}