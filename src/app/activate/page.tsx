'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

function ActivateForm() {
  const searchParams = useSearchParams();
  const [serialNumber, setSerialNumber] = useState('');
  const [messageText, setMessageText] = useState('');
  const [mediaUrl, setMediaUrl] = useState(''); // Clean & unpopulated
  const [uploadedFileName, setUploadedFileName] = useState(''); // Masked status indicator
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

  // Handle direct file upload for Pictures, Audio, and Video (Hospitality Grade)
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
        .from('media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      setMediaUrl(publicUrlData.publicUrl);
      setUploadedFileName(file.name);
    } catch (err: any) {
      console.error('Upload error:', err);
      setErrorMessage(err?.message || 'Failed to upload media asset.');
    } finally {
      setUploading(false);
    }
  };

  const handleClearMedia = () => {
    setMediaUrl('');
    setUploadedFileName('');
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
      setErrorMessage(err.message || 'Failed to activate experience.');
    }
  };

  return (
    <div className="max-w-[540px] w-full bg-[#101014]/94 border border-[#d4af37]/40 rounded-xl p-6 md:p-8 shadow-[0_0_40px_rgba(212,175,55,0.18)] backdrop-blur-md space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-block px-4 py-1.5 border border-[#d4af37]/40 rounded-[30px] text-[10px] tracking-[2.5px] uppercase text-[#f4e6b0] bg-[#d4af37]/10">
          ✦ Aura & Archive Concierge ✦
        </div>
        <h1 className="font-serif text-[22px] uppercase text-[#d4af37] tracking-[2px]">
          Configure Unsealing Ceremony
        </h1>
        {serialNumber && (
          <p className="text-[12px] text-[#b0aebf] tracking-wider">
            SECURE ACCESS ID: <span className="text-[#d4af37] font-semibold">{serialNumber}</span>
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
            Concierge Dedication / Personal Note
          </label>
          <textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Enter the tailored welcome message or private dedication..."
            rows={3}
            className="w-full bg-black/60 border border-[#d4af37]/35 p-3.5 text-white rounded text-[13px] tracking-wider placeholder:text-[#b0aebf]/40 focus:outline-none focus:border-[#d4af37] resize-none"
          />
        </div>

        {/* Premium Masked Media Destination UI */}
        <div className="space-y-2">
          <label className="block text-[11px] uppercase tracking-widest text-[#d4af37]">
            Media Asset (Photo, Audio, Video, or Secure URL)
          </label>

          {uploadedFileName ? (
            <div className="flex items-center justify-between bg-[#102217] border border-[#2e7d32] p-3 rounded text-xs text-[#a5d6a7]">
              <div className="flex items-center gap-2 truncate pr-2">
                <span className="text-emerald-400 font-bold text-sm">✓</span>
                <span className="truncate font-medium">Asset Secured: {uploadedFileName}</span>
              </div>
              <button
                type="button"
                onClick={handleClearMedia}
                className="text-[11px] text-red-300 hover:text-red-100 uppercase tracking-wider underline cursor-pointer shrink-0"
              >
                Replace
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="block cursor-pointer bg-black/60 border border-[#d4af37]/35 hover:border-[#d4af37] p-3 text-center text-xs text-[#f4e6b0] rounded transition-colors">
                {uploading ? 'Securing Asset in Vault...' : '📁 Attach Hospitality Asset (Photo, Audio, Video)'}
                <input type="file" accept="image/*,audio/*,video/*" onChange={handleFileUpload} className="hidden" />
              </label>

              <input
                type="text"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                placeholder="Or paste secure media URL (YouTube, Vimeo, direct link)..."
                className="w-full bg-black/60 border border-[#d4af37]/35 p-3 text-white rounded text-[12px] tracking-wider placeholder:text-[#b0aebf]/40 focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-[11px] uppercase tracking-widest text-[#d4af37] mb-1.5">
            Occasion Ceremony Theme
          </label>
          <select
            value={effectType}
            onChange={(e) => setEffectType(e.target.value)}
            className="w-full bg-black/60 border border-[#d4af37]/35 p-3.5 text-[#f4e6b0] rounded text-[13px] tracking-wider focus:outline-none focus:border-[#d4af37]"
          >
            <option value="gold-confetti">✦ Aura Gold (Luxury Celebrations & Milestones)</option>
            <option value="executive-light">✦ Corporate Lumina (Hospitality & Executive)</option>
            <option value="eternal-dove">✦ Eternal Remembrance (Condolences & Memorials)</option>
            <option value="gender-reveal">✦ New Arrival (Boutique Baby & Family Gifts)</option>
            <option value="ruby-petal">✦ Crimson Romance (Resort Anniversaries & Proposals)</option>
          </select>
        </div>

        {errorMessage && (
          <p className="text-xs text-red-400 text-center">{errorMessage}</p>
        )}

        <div className="flex gap-3 pt-1">
          {serialNumber && (
            <a
              href={`/v/${encodeURIComponent(serialNumber.trim())}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-black/60 border border-[#d4af37]/60 hover:border-[#d4af37] text-[#f4e6b0] text-center font-semibold py-3.5 px-4 rounded text-[11px] uppercase tracking-[1.5px] transition-all"
            >
              Preview Ceremony ↗
            </a>
          )}
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="flex-2 w-full bg-gradient-to-r from-[#d4af37] to-[#f4e6b0] hover:brightness-110 text-black font-semibold py-3.5 px-6 rounded text-[11px] uppercase tracking-[1.5px] transition-all cursor-pointer disabled:opacity-50"
          >
            {status === 'loading' ? 'Encrypting & Saving...' : status === 'success' ? 'Ceremony Live!' : 'Activate & Seal Experience'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function ActivatePage() {
  return (
    <div className="min-h-screen bg-[#070709] text-white flex flex-col items-center justify-center p-4">
      <Suspense fallback={<div className="text-[#d4af37] text-sm animate-pulse">Loading concierge portal...</div>}>
        <ActivateForm />
      </Suspense>
    </div>
  );
}