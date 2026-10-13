'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

function ActivateForm() {
  const searchParams = useSearchParams();
  const [serialNumber, setSerialNumber] = useState('');
  const [messageText, setMessageText] = useState('');
  const [mediaUrl, setMediaUrl] = useState('/AA-Demo.mp4');
  const [effectType, setEffectType] = useState('gold-confetti');
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const urlSerial = searchParams.get('id') || searchParams.get('serial') || searchParams.get('cardId');
    if (urlSerial) {
      setSerialNumber(urlSerial.trim());
    }
  }, [searchParams]);

  // Handle direct video file upload to Supabase Storage
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setErrorMessage('');

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      setErrorMessage('Supabase storage not configured.');
      setUploading(false);
      return;
    }

    try {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `card-media/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media') // Ensure you have a public bucket named 'media' in Supabase
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      setMediaUrl(publicUrlData.publicUrl);
    } catch (err: any) {
      console.error('Upload error:', err);
      setErrorMessage('Failed to upload video file. You can also paste a direct URL below.');
    } finally {
      setUploading(false);
    }
  };

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serialNumber.trim()) return;

    setStatus('loading');
    setErrorMessage('');

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      setStatus('error');
      setErrorMessage('Supabase credentials missing.');
      return;
    }

    try {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      
      const { error } = await supabase
        .from('cards')
        .update({
          message_text: messageText,
          media_url: mediaUrl,
          effect_type: effectType,
          is_activated: true,
        })
        .ilike('serial_number', serialNumber.trim());

      if (error) throw error;

      setStatus('success');
      setTimeout(() => {
        window.location.href = `/v/${encodeURIComponent(serialNumber.trim())}`;
      }, 800);
    } catch (err: any) {
      console.error('Activation error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Failed to activate card.');
    }
  };

  return (
    <div className="max-w-[520px] w-full bg-[#101014]/92 border border-[#d4af37]/40 rounded-xl p-6 md:p-8 shadow-[0_0_35px_rgba(212,175,55,0.15)] backdrop-blur-md space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-block px-4 py-1.5 border border-[#d4af37]/40 rounded-[30px] text-[10px] tracking-[2.5px] uppercase text-[#f4e6b0] bg-[#d4af37]/10">
          ✦ Aura & Archive Activation ✦
        </div>
        <h1 className="font-serif text-[22px] uppercase text-[#d4af37] tracking-[2px]">
          Configure Ceremony
        </h1>
        {serialNumber && (
          <p className="text-[12px] text-[#b0aebf] tracking-wider">
            CARD ID: <span className="text-[#d4af37] font-semibold">{serialNumber}</span>
          </p>
        )}
      </div>

      <form onSubmit={handleActivate} className="space-y-4">
        <div>
          <label className="block text-[11px] uppercase tracking-widest text-[#d4af37] mb-1.5">
            Card Serial Number
          </label>
          <input
            type="text"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            placeholder="e.g. AA-8842"
            required
            className="w-full bg-black/60 border border-[#d4af37]/35 p-3.5 text-white rounded text-[13px] tracking-wider placeholder:text-[#b0aebf]/40 focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        <div>
          <label className="block text-[11px] uppercase tracking-widest text-[#d4af37] mb-1.5">
            Written Dedication / Message
          </label>
          <textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Write your personal dedication..."
            rows={3}
            className="w-full bg-black/60 border border-[#d4af37]/35 p-3.5 text-white rounded text-[13px] tracking-wider placeholder:text-[#b0aebf]/40 focus:outline-none focus:border-[#d4af37] resize-none"
          />
        </div>

        {/* Dual Media Option: File Upload OR URL */}
        <div className="space-y-2">
          <label className="block text-[11px] uppercase tracking-widest text-[#d4af37]">
            Video Destination (Upload File or Paste URL)
          </label>
          <div className="flex gap-2 items-center">
            <label className="flex-1 cursor-pointer bg-black/60 border border-[#d4af37]/35 hover:border-[#d4af37] p-3 text-center text-xs text-[#f4e6b0] rounded transition-colors">
              {uploading ? 'Uploading Video...' : '📁 Upload Video File'}
              <input type="file" accept="video/*" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>
          <input
            type="text"
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
            placeholder="Or enter direct video URL (/AA-Demo.mp4)"
            className="w-full bg-black/60 border border-[#d4af37]/35 p-3 text-white rounded text-[12px] tracking-wider placeholder:text-[#b0aebf]/40 focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        <div>
          <label className="block text-[11px] uppercase tracking-widest text-[#d4af37] mb-1.5">
            Unsealing Ceremony Theme
          </label>
          <select
            value={effectType}
            onChange={(e) => setEffectType(e.target.value)}
            className="w-full bg-black/60 border border-[#d4af37]/35 p-3.5 text-[#f4e6b0] rounded text-[13px] tracking-wider focus:outline-none focus:border-[#d4af37]"
          >
            <option value="gold-confetti">✦ Aura Gold (Celebrations & Milestones)</option>
            <option value="executive-light">✦ Corporate Lumina (Professional & Commercial)</option>
            <option value="eternal-dove">✦ Eternal Remembrance (Condolences & Memorials)</option>
            <option value="gender-reveal">✦ New Arrival (Baby Showers & Gender Reveals)</option>
            <option value="ruby-petal">✦ Crimson Romance (Anniversaries & Proposals)</option>
          </select>
        </div>

        {errorMessage && (
          <p className="text-xs text-red-400 text-center">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="w-full bg-gradient-to-r from-[#d4af37] to-[#f4e6b0] hover:brightness-110 text-black font-semibold py-3.5 px-6 rounded text-[12px] uppercase tracking-[1.5px] transition-all cursor-pointer disabled:opacity-50"
        >
          {status === 'loading' ? 'Activating Card...' : status === 'success' ? 'Activated!' : 'Activate & Save Ceremony'}
        </button>
      </form>
    </div>
  );
}

export default function ActivatePage() {
  return (
    <div className="min-h-screen bg-[#070709] text-white flex flex-col items-center justify-center p-4">
      <Suspense fallback={<div className="text-[#d4af37] text-sm animate-pulse">Loading activation portal...</div>}>
        <ActivateForm />
      </Suspense>
    </div>
  );
}