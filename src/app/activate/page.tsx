'use client';

import { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

function ActivateForm() {
  const searchParams = useSearchParams();
  const [serialNumber, setSerialNumber] = useState('');
  const [activationCode, setActivationCode] = useState('');
  const [messageText, setMessageText] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [effectType, setEffectType] = useState('gold-confetti');
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const urlSerial = searchParams.get('id') || searchParams.get('serial') || searchParams.get('cardId');
    if (urlSerial) {
      setSerialNumber(urlSerial.trim());
    }
  }, [searchParams]);

  // Handle direct file upload for Pictures, Audio, and Video
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
      setErrorMessage(err?.message || 'Failed to upload media file.');
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] uppercase tracking-widest text-[#d4af37] mb-1.5">
              Card Serial Number
            </label>
            <input
              type="text"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              placeholder="e.g. AA-1090"
              required
              className="w-full bg-black/60 border border-[#d4af37]/35 p-3.5 text-white rounded text-[13px] tracking-wider placeholder:text-[#b0aebf]/40 focus:outline-none focus:border-[#d4af37]"
            />
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-widest text-[#d4af37] mb-1.5">
              Activation Code <span className="text-[#b0aebf]/60 lowercase">(optional)</span>
            </label>
            <input
              type="text"
              value={activationCode}
              onChange={(e) => setActivationCode(e.target.value)}
              placeholder="e.g. 8842"
              className="w-full bg-black/60 border border-[#d4af37]/35 p-3.5 text-white rounded text-[13px] tracking-wider placeholder:text-[#b0aebf]/40 focus:outline-none focus:border-[#d4af37]"
            />
          </div>
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

        {/* Modern Aura Gold Upload Button & Masked Success State */}
        <div className="space-y-2">
          <label className="block text-[11px] uppercase tracking-widest text-[#d4af37]">
            Media Destination (Photos, Audio, Video, or URL)
          </label>

          {uploadedFileName ? (
            <div className="flex items-center justify-between bg-[#d4af37]/10 border border-[#d4af37]/50 p-3.5 rounded-lg text-xs text-[#f4e6b0]">
              <div className="flex items-center gap-2.5 truncate pr-2">
                <span className="text-[#d4af37] font-bold">✦</span>
                <span className="truncate font-medium">Asset Attached: {uploadedFileName}</span>
              </div>
              <button
                type="button"
                onClick={handleClearMedia}
                className="text-[11px] text-[#b0aebf] hover:text-[#f4e6b0] uppercase tracking-wider underline cursor-pointer shrink-0"
              >
                Replace
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="block cursor-pointer bg-black/60 border border-[#d4af37]/40 hover:border-[#d4af37] p-3.5 text-center text-xs text-[#f4e6b0] rounded-lg transition-all shadow-[0_0_15px_rgba(212,175,55,0.08)]">
                {uploading ? 'Securing Asset in Vault...' : '✦ Upload Media Asset (Photo, Audio, Video) ✦'}
                <input type="file" accept="image/*,audio/*,video/*" onChange={handleFileUpload} className="hidden" />
              </label>

              <input
                type="text"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                placeholder="Or paste media URL (YouTube, Vimeo, MP4 link)..."
                className="w-full bg-black/60 border border-[#d4af37]/35 p-3 text-white rounded text-[12px] tracking-wider placeholder:text-[#b0aebf]/40 focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          )}
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

        <div className="flex gap-3 pt-1">
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            className="flex-1 bg-black/60 border border-[#d4af37]/60 hover:border-[#d4af37] text-[#f4e6b0] font-semibold py-3.5 px-4 rounded text-[11px] uppercase tracking-[1.5px] transition-all cursor-pointer"
          >
            Preview Ceremony
          </button>
          
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="flex-1 bg-gradient-to-r from-[#d4af37] to-[#f4e6b0] hover:brightness-110 text-black font-semibold py-3.5 px-6 rounded text-[11px] uppercase tracking-[1.5px] transition-all cursor-pointer disabled:opacity-50"
          >
            {status === 'loading' ? 'Activating Card...' : status === 'success' ? 'Activated!' : 'Activate & Save'}
          </button>
        </div>
      </form>

      {/* Fully Functional Live Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="max-w-[500px] w-full bg-[#101014] border border-[#d4af37] rounded-xl p-6 text-center space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowPreview(false)}
              className="absolute top-3 right-3 text-[#d4af37] hover:text-white text-xs uppercase tracking-wider"
            >
              ✕ Close
            </button>
            <div className="inline-block px-3 py-1 border border-[#d4af37]/40 rounded-full text-[10px] uppercase text-[#f4e6b0] bg-[#d4af37]/10">
              ✦ Live Ceremony Preview ({effectType}) ✦
            </div>
            <h2 className="text-lg font-serif uppercase text-[#d4af37]">Unsealing Preview</h2>
            
            <div className="bg-black/60 border border-[#d4af37]/30 p-4 rounded text-left space-y-2 text-sm text-[#f4e6b0]">
              <p className="text-[10px] uppercase tracking-widest text-[#d4af37]">Message:</p>
              <p className="text-white text-sm font-light">{messageText || "No custom message entered yet."}</p>
            </div>

            {mediaUrl ? (
              <div className="relative w-full rounded border border-[#d4af37]/30 bg-black aspect-video overflow-hidden">
                <video src={mediaUrl} controls playsInline className="w-full h-full object-contain" />
              </div>
            ) : (
              <div className="p-3 bg-black/40 border border-[#d4af37]/20 rounded text-xs text-[#b0aebf]">
                No media attached for preview.
              </div>
            )}

            <button
              onClick={() => setShowPreview(false)}
              className="w-full bg-gradient-to-r from-[#d4af37] to-[#f4e6b0] text-black font-semibold py-3 rounded text-xs uppercase tracking-wider cursor-pointer"
            >
              Return to Editing
            </button>
          </div>
        </div>
      )}
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