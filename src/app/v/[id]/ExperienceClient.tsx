'use client';

import React, { useEffect, useState } from 'react';
import CardExperience from '@/components/CardExperience';

interface ExperienceClientProps {
  cardId: string;
}

export default function ExperienceClient({ cardId }: ExperienceClientProps) {
  const [cardData, setCardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCard() {
      try {
        const res = await fetch(`/api/cards/${cardId}`);
        if (res.ok) {
          const data = await res.json();
          setCardData(data);
        }
      } catch (err) {
        console.error('Failed to load card data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchCard();
  }, [cardId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-mono text-xs uppercase tracking-widest">
        Loading Vault...
      </div>
    );
  }

  // If card is not configured yet, allow sandbox/editing mode so the gifter can setup audio/text
  const isCardConfigured = cardData?.is_configured ?? false;

  return (
    <CardExperience
      cardId={cardId}
      initialRecipient={cardData?.recipient_name || cardData?.recipient || ''}
      initialMessage={cardData?.message || ''}
      initialPhotoUrl={cardData?.photo_url || cardData?.photoUrl || ''} // FIXED: Now passes database background photo url
      initialMediaUrl={cardData?.media_url || cardData?.mediaUrl || ''}
      initialTheme={cardData?.theme_key || cardData?.theme || 'gold-confetti'}
      isSandbox={!isCardConfigured}
    />
  );
}