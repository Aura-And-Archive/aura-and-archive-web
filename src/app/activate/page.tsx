'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

function ActivateForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [serialNumber, setSerialNumber] = useState('');
  const [cardPin, setCardPin] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [messageText, setMessageText] = useState('');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState('INITIALIZE SMART CARD');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const idParam = searchParams.get('id') || searchParams.get('serial') || searchParams.get('s');
    if (idParam) {
      const cleaned = idParam.trim().toUpperCase();
      setSerialNumber(cleaned);

      // Check activation status via Supabase
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (supabaseUrl && supabaseAnonKey) {
        const supabase = createClient(supabaseUrl, supabaseAnonKey);
        supabase
          .from('cards')
          .select('is_activated')
          .ilike('serial_number', cleaned)
          .maybeSingle()
          .then(({ data }) => {
            if (data && data.is_activated) {
              router.replace(`/v/${cleaned}`);
            } else {
              setIsReady(true);
            }
          })
          .catch(() => {
            setIsReady(true);
          });
      } else {
        setIsReady(true);
      }
    } else {
      setIsReady(true);
    }
  }, [searchParams, router]);

  const handleActivation = async (e: React.FormEvent) => {
    e.preventDefault();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      alert('Supabase environment variables are missing.');
      return;
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    try {
      setLoading(true);
      setStatusText('INITIALIZING ARCHIVE...');

      const cleanSerial = serialNumber.trim().toUpperCase();
      let mediaUrl = null;

      if (mediaFile) {
        setStatusText('UPLOADING MEDIA...');
        const fileExt = mediaFile.name.split('.').pop();
        const filePath = `${cleanSerial}/${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('dispatch-media')
          .upload(filePath, mediaFile, {
            cacheControl: '3600',
            upsert: true,
          });

        if (uploadError) {
          throw new Error(`Media Upload Failed: ${uploadError.message}`);
        }

        const { data: publicUrlData } = supabase.storage
          .from('dispatch-media')
          .getPublicUrl(filePath);

        mediaUrl = publicUrlData.publicUrl;
      }

      setStatusText('WRITING LEGACY RECORD...');

      const { error: dbError } = await supabase
        .from('cards')
        .upsert(
          {
            serial_number: cleanSerial,
            pin: cardPin.trim() || null,
            recipient_name: recipientName.trim(),
            message_text: messageText.trim() || null,
            media_url: mediaUrl,
            is_activated: true,
            activated_at: new Date().toISOString(),
          },
          { onConflict: 'serial_number' }
        );

      if (dbError) {
        throw new Error(`Database Record Failed: ${dbError.message}`);
      }

      router.replace(`/v/${cleanSerial}`);
    } catch (err: any) {
      console.error('Activation Error:', err);
      alert(`Error: ${err.message}`);
      setLoading(false);
      setStatusText('INITIALIZE SMART CARD');
    }
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '520px',
        background: 'rgba(16, 16, 20, 0.85)',
        border: '1px solid rgba(212, 175, 55, 0.35)',
        borderRadius: '12px',
        padding: '36px 28px',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 10px 40px rgba(0,0,0,0.8)',
        display: isReady ? 'flex' : 'none',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '16px',
            fontWeight: 800,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#d4af37',
          }}
        >
          Aura & Archive
        </div>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '26px',
            fontWeight: 800,
            color: '#ffffff',
            marginTop: '6px',
            letterSpacing: '1px',
          }}
        >
          Activate Smart Card
        </h1>
        <p
          style={{
            fontSize: '12px',
            color: '#b0aebf',
            marginTop: '6px',
            lineHeight: '1.5',
          }}
        >
          Link your audio, video, or digital letter to your physical smart card destination.
        </p>
      </div>

      <form onSubmit={handleActivation} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#f4e6b0' }}>
            Serial Number
          </label>
          <input
            type="text"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            placeholder="Enter card serial number"
            required
            style={{
              width: '100%',
              background: 'rgba(10, 9, 7, 0.8)',
              border: '1px solid rgba(212, 175, 55, 0.35)',
              borderRadius: '4px',
              padding: '14px',
              color: '#f3f3f7',
              fontFamily: 'inherit',
              fontSize: '13px',
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#f4e6b0' }}>
            Security PIN (Optional)
          </label>
          <input
            type="password"
            value={cardPin}
            onChange={(e) => setCardPin(e.target.value)}
            placeholder="Enter an optional security pin"
            maxLength={8}
            style={{
              width: '100%',
              background: 'rgba(10, 9, 7, 0.8)',
              border: '1px solid rgba(212, 175, 55, 0.35)',
              borderRadius: '4px',
              padding: '14px',
              color: '#f3f3f7',
              fontFamily: 'inherit',
              fontSize: '13px',
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#f4e6b0' }}>
            Recipient Name
          </label>
          <input
            type="text"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            placeholder="e.g. Eleanor"
            required
            style={{
              width: '100%',
              background: 'rgba(10, 9, 7, 0.8)',
              border: '1px solid rgba(212, 175, 55, 0.35)',
              borderRadius: '4px',
              padding: '14px',
              color: '#f3f3f7',
              fontFamily: 'inherit',
              fontSize: '13px',
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#f4e6b0' }}>
            Written Letter / Message
          </label>
          <textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            rows={4}
            placeholder="Type your letter or note here..."
            style={{
              width: '100%',
              background: 'rgba(10, 9, 7, 0.8)',
              border: '1px solid rgba(212, 175, 55, 0.35)',
              borderRadius: '4px',
              padding: '14px',
              color: '#f3f3f7',
              fontFamily: 'inherit',
              fontSize: '13px',
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#f4e6b0' }}>
            Digital Media (Audio or Video File)
          </label>
          <input
            type="file"
            accept="audio/*,video/*"
            onChange={(e) => setMediaFile(e.target.files ? e.target.files[0] : null)}
            style={{ fontSize: '12px', color: '#b0aebf', marginTop: '4px' }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: '16px 20px',
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            border: 'none',
            background: 'linear-gradient(135deg, #f4e6b0 0%, #d4af37 50%, #96760e 100%)',
            color: '#000',
            boxShadow: '0 4px 15px rgba(212, 175, 55, 0.25)',
            marginTop: '10px',
            opacity: loading ? 0.6 : 1,
          }}
        >
          {statusText}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <Link
          href="/"
          style={{
            color: '#b0aebf',
            fontSize: '11px',
            letterSpacing: '1px',
            textDecoration: 'none',
            textTransform: 'uppercase',
          }}
        >
          ← Return to Main Studio
        </Link>
      </div>
    </div>
  );
}

export default function ActivatePage() {
  return (
    <div
      style={{
        width: '100vw',
        maxWidth: '100vw',
        minHeight: '100vh',
        overflowX: 'hidden',
        background: 'radial-gradient(circle at 50% 30%, #2a220d 0%, #0c0b07 50%, #050506 100%)',
        backgroundAttachment: 'fixed',
        color: '#f3f3f7',
        fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '24px 16px',
      }}
    >
      <Suspense fallback={<div style={{ color: '#d4af37', letterSpacing: '2px' }}>Loading activation portal...</div>}>
        <ActivateForm />
      </Suspense>
    </div>
  );
}