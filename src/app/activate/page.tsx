'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter, useSearchParams } from 'next/navigation';

const THEMES = [
  { key: 'gold-confetti', name: 'Aura Gold' },
  { key: 'wealth-glamour', name: 'Wealth & Glamour' },
  { key: 'ruby-petal', name: 'Crimson Romance' },
  { key: 'birthday', name: 'Happy Birthday' },
  { key: 'christmas', name: 'Winter & Christmas' },
  { key: 'halloween', name: 'Halloween' },
  { key: 'valentine', name: "Valentine's Day" },
  { key: 'april-fools', name: 'April Fools & Humor' },
  { key: 'new-years', name: "New Year's Eve" },
  { key: 'christianity', name: 'Christianity' },
  { key: 'islam', name: 'Islam' },
  { key: 'judaism', name: 'Judaism' },
  { key: 'hinduism', name: 'Hinduism (Diwali)' },
  { key: 'buddhism', name: 'Buddhism' },
  { key: 'mothers-day', name: "Mother's Day" },
  { key: 'fathers-day', name: "Father's Day" },
  { key: 'gender-reveal', name: 'New Arrival' },
  { key: 'graduation', name: 'Graduation' },
  { key: 'engagement', name: 'Engagement' },
  { key: 'retirement', name: 'Retirement & Farewell' },
  { key: 'day-of-the-dead', name: 'Day of the Dead' },
  { key: 'eternal-dove', name: 'Eternal Remembrance' },
  { key: 'veteran', name: 'Veteran Appreciation' },
  { key: 'get-well', name: 'Get Well Soon' },
  { key: 'thank-you', name: 'Thank You / Just Because' },
  { key: 'bff', name: "BFF's (Best Friends)" },
  { key: 'executive-light', name: 'Corporate Lumina' },
];

function ActivateForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [serialNumber, setSerialNumber] = useState('');
  const [activationCode, setActivationCode] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [messageText, setMessageText] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [effectType, setEffectType] = useState('gold-confetti');
  
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const cardParam = searchParams.get('card') || searchParams.get('id');
    if (cardParam) {
      setSerialNumber(cardParam.trim().toUpperCase());
    }
  }, [searchParams]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setErrorMsg('');

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      setErrorMsg('Supabase environment credentials are missing.');
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

      const { data: publicURLData } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      if (publicURLData?.publicUrl) {
        setMediaUrl(publicURLData.publicUrl);
        setSuccessMsg('✦ Media uploaded successfully! ✦');
        setTimeout(() => setSuccessMsg(''), 3000);
      }
    } catch (err: any) {
      console.error('Upload error:', err);
      setErrorMsg(err.message || 'Failed to upload media file.');
    } finally {
      setUploading(false);
    }
  };

  const handleActivateAndSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const cleanSerial = serialNumber.trim().toUpperCase();
    if (!cleanSerial) {
      setErrorMsg('Please enter a valid Card Serial Number.');
      return;
    }

    setLoading(true);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      setErrorMsg('Supabase environment variables are missing.');
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      const payload = {
        serial_number: cleanSerial,
        activation_code: activationCode.trim() || null,
        recipient_name: recipientName.trim(),
        message_text: messageText.trim(),
        media_url: mediaUrl.trim(),
        effect_type: effectType,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('cards')
        .upsert(payload, { onConflict: 'serial_number' });

      if (error) throw error;

      sessionStorage.removeItem(`preview_${cleanSerial}`);

      setSuccessMsg('✦ Card successfully activated & saved! Redirecting... ✦');
      setTimeout(() => {
        router.push(`/v/${cleanSerial}`);
      }, 1500);

    } catch (err: any) {
      console.error('Activation error:', err);
      setErrorMsg(err.message || 'Failed to save card activation data.');
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = () => {
    const cleanSerial = (serialNumber || 'DEMO').trim().toUpperCase();
    if (!cleanSerial) {
      setErrorMsg('Please enter a serial number to preview.');
      return;
    }

    const previewPayload = {
      serial_number: cleanSerial,
      activation_code: activationCode.trim() || null,
      recipient_name: recipientName.trim(),
      message_text: messageText.trim(),
      media_url: mediaUrl.trim(),
      effect_type: effectType,
    };
    
    sessionStorage.setItem(`preview_${cleanSerial}`, JSON.stringify(previewPayload));
    router.push(`/v/${cleanSerial}`);
  };

  return (
    <div className="w-full max-w-[680px] p-4 md:p-6 mx-auto my-auto flex flex-col justify-center min-h-screen">
      <div className="bg-[#101014]/92 border border-[#d4af37]/40 rounded-xl p-6 md:p-8 text-center shadow-[0_0_40px_rgba(212,175,55,0.15)] backdrop-blur-md flex flex-col gap-6">
        
        <div className="inline-block self-center px-4 py-1.5 border border-[#d4af37]/40 rounded-[30px] text-[10px] tracking-[2.5px] uppercase text-[#f4e6b0] bg-[#d4af37]/10">
          ✦ Aura & Archive™ Activation Portal ✦
        </div>

        <div>
          <h1 className="font-serif text-[26px] uppercase text-[#d4af37] tracking-[2px]">Activate Your Gift Note</h1>
          <p className="text-[12px] text-[#b0aebf] tracking-[1px] mt-1.5">Configure your custom message, media, and animation theme.</p>
        </div>

        <form onSubmit={handleActivateAndSave} className="space-y-4 text-left">
          
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#d4af37] mb-2 font-semibold">
              Card Serial Number *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. AA-1083"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              className="w-full bg-black/60 border border-[#d4af37]/40 p-3.5 text-white rounded text-sm uppercase tracking-wider focus:outline-none focus:border-[#d4af37] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-[#d4af37] mb-2 font-semibold">
              Activation Code / Secure PIN (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. 777 (Leave blank for public open access)"
              value={activationCode}
              onChange={(e) => setActivationCode(e.target.value)}
              className="w-full bg-black/60 border border-[#d4af37]/40 p-3.5 text-white rounded text-sm tracking-wider focus:outline-none focus:border-[#d4af37] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-[#d4af37] mb-2 font-semibold">
              Recipient Name
            </label>
            <input
              type="text"
              placeholder="e.g. Mama Bear"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="w-full bg-black/60 border border-[#d4af37]/40 p-3.5 text-white rounded text-sm focus:outline-none focus:border-[#d4af37] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-[#d4af37] mb-2 font-semibold">
              Personal Gift Message
            </label>
            <textarea
              rows={4}
              placeholder="Write your heartfelt message here..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="w-full bg-black/60 border border-[#d4af37]/40 p-3.5 text-white rounded text-sm font-light leading-relaxed focus:outline-none focus:border-[#d4af37] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-[#d4af37] mb-2 font-semibold">
              Media (Upload File or Paste URL)
            </label>
            <div className="flex flex-col gap-2.5">
              <label className="flex-1 py-3 px-4 bg-black/80 border border-[#d4af37]/50 hover:border-[#d4af37] text-[#f4e6b0] text-xs font-semibold uppercase tracking-wider rounded cursor-pointer text-center transition-all shadow-sm flex items-center justify-center gap-2">
                <span>✦</span>
                <span>{uploading ? 'Uploading Media...' : 'Choose Media File (Video, Audio, Photo)'}</span>
                <input
                  type="file"
                  accept="video/*,audio/*,image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <input
                type="text"
                placeholder="Or paste direct media URL (.mp4, .mp3, .jpg, etc.)"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                className="w-full bg-black/60 border border-[#d4af37]/40 p-3.5 text-white rounded text-sm focus:outline-none focus:border-[#d4af37] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-[#d4af37] mb-2 font-semibold">
              Gift Note Theme & Effect
            </label>
            <select
              value={effectType}
              onChange={(e) => setEffectType(e.target.value)}
              className="w-full bg-black/60 border border-[#d4af37]/40 p-3.5 text-white rounded text-sm focus:outline-none focus:border-[#d4af37] transition-all cursor-pointer"
            >
              {THEMES.map((t) => (
                <option key={t.key} value={t.key} className="bg-[#101014] text-white">
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {errorMsg && <p className="text-xs text-red-400 text-center tracking-wider">{errorMsg}</p>}
          {successMsg && <p className="text-xs text-[#d4af37] text-center tracking-wider font-semibold">{successMsg}</p>}

          <div className="flex flex-col md:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={handlePreview}
              className="flex-1 py-3.5 bg-black/60 border border-[#d4af37]/60 hover:border-[#d4af37] text-[#f4e6b0] font-semibold rounded text-[11px] uppercase tracking-[1.5px] transition-all cursor-pointer"
            >
              Preview Experience ✦
            </button>

            <button
              type="submit"
              disabled={loading || uploading}
              className="flex-1 py-3.5 bg-gradient-to-r from-[#d4af37] to-[#f4e6b0] hover:brightness-110 text-black font-semibold rounded text-[11px] uppercase tracking-[1.5px] transition-all cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.2)] disabled:opacity-50"
            >
              {loading ? 'Saving Activation...' : 'Activate & Save ✦'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default function ActivatePage() {
  return (
    <Suspense fallback={<div className="w-full text-center text-[#d4af37] p-10">Loading Portal...</div>}>
      <ActivateForm />
    </Suspense>
  );
}