'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const THEME_CONFIGS: Record<string, { border: string; text: string; badgeBg: string; badgeBorder: string; name: string }> = {
  'gold-confetti': { name: 'Aura Gold', border: 'border-[#d4af37]', text: 'text-[#d4af37]', badgeBg: 'bg-[#d4af37]/10', badgeBorder: 'border-[#d4af37]/40' },
  'executive-light': { name: 'Corporate Lumina', border: 'border-[#e5e4e2]', text: 'text-[#e5e4e2]', badgeBg: 'bg-[#e5e4e2]/10', badgeBorder: 'border-[#e5e4e2]/40' },
  'wealth-glamour': { name: 'Wealth & Glamour', border: 'border-[#b9f2ff]', text: 'text-[#b9f2ff]', badgeBg: 'bg-[#b9f2ff]/10', badgeBorder: 'border-[#b9f2ff]/40' },
  'ruby-petal': { name: 'Crimson Romance', border: 'border-[#dc143c]', text: 'text-[#ff69b4]', badgeBg: 'bg-[#dc143c]/15', badgeBorder: 'border-[#dc143c]/40' },
  'birthday': { name: 'Happy Birthday', border: 'border-[#ffb6c1]', text: 'text-[#ffb6c1]', badgeBg: 'bg-[#ffb6c1]/10', badgeBorder: 'border-[#ffb6c1]/40' },
  'christmas': { name: 'Winter & Christmas', border: 'border-[#2e8b57]', text: 'text-[#2e8b57]', badgeBg: 'bg-[#2e8b57]/10', badgeBorder: 'border-[#2e8b57]/40' },
  'halloween': { name: 'Halloween', border: 'border-[#ff8c00]', text: 'text-[#ff8c00]', badgeBg: 'bg-[#ff8c00]/10', badgeBorder: 'border-[#ff8c00]/40' },
  'valentine': { name: "Valentine's Day", border: 'border-[#ff69b4]', text: 'text-[#ff69b4]', badgeBg: 'bg-[#ff69b4]/10', badgeBorder: 'border-[#ff69b4]/40' },
  'april-fools': { name: 'April Fools & Humor', border: 'border-[#ffd700]', text: 'text-[#ffd700]', badgeBg: 'bg-[#ffd700]/10', badgeBorder: 'border-[#ffd700]/40' },
  'new-years': { name: "New Year's Eve", border: 'border-[#e5e4e2]', text: 'text-[#e5e4e2]', badgeBg: 'bg-[#e5e4e2]/10', badgeBorder: 'border-[#e5e4e2]/40' },
  'christianity': { name: 'Christianity', border: 'border-[#dda0dd]', text: 'text-[#dda0dd]', badgeBg: 'bg-[#dda0dd]/10', badgeBorder: 'border-[#dda0dd]/40' },
  'islam': { name: 'Islam', border: 'border-[#98fb98]', text: 'text-[#98fb98]', badgeBg: 'bg-[#98fb98]/10', badgeBorder: 'border-[#98fb98]/40' },
  'judaism': { name: 'Judaism', border: 'border-[#87ceeb]', text: 'text-[#87ceeb]', badgeBg: 'bg-[#87ceeb]/10', badgeBorder: 'border-[#87ceeb]/40' },
  'hinduism': { name: 'Hinduism (Diwali)', border: 'border-[#ffa500]', text: 'text-[#ffa500]', badgeBg: 'bg-[#ffa500]/10', badgeBorder: 'border-[#ffa500]/40' },
  'buddhism': { name: 'Buddhism', border: 'border-[#deb887]', text: 'text-[#deb887]', badgeBg: 'bg-[#deb887]/10', badgeBorder: 'border-[#deb887]/40' },
  'mothers-day': { name: "Mother's Day", border: 'border-[#ffb6c1]', text: 'text-[#ffb6c1]', badgeBg: 'bg-[#ffb6c1]/10', badgeBorder: 'border-[#ffb6c1]/40' },
  'fathers-day': { name: "Father's Day", border: 'border-[#4682b4]', text: 'text-[#4682b4]', badgeBg: 'bg-[#4682b4]/10', badgeBorder: 'border-[#4682b4]/40' },
  'gender-reveal': { name: 'New Arrival', border: 'border-[#87ceeb]', text: 'text-[#87ceeb]', badgeBg: 'bg-[#87ceeb]/10', badgeBorder: 'border-[#87ceeb]/40' },
  'graduation': { name: 'Graduation', border: 'border-[#daa520]', text: 'text-[#daa520]', badgeBg: 'bg-[#daa520]/10', badgeBorder: 'border-[#daa520]/40' },
  'engagement': { name: 'Engagement', border: 'border-[#e0ffff]', text: 'text-[#e0ffff]', badgeBg: 'bg-[#e0ffff]/10', badgeBorder: 'border-[#e0ffff]/40' },
  'retirement': { name: 'Retirement & Farewell', border: 'border-[#f4a460]', text: 'text-[#f4a460]', badgeBg: 'bg-[#f4a460]/10', badgeBorder: 'border-[#f4a460]/40' },
  'day-of-the-dead': { name: 'Day of the Dead', border: 'border-[#ba55d3]', text: 'text-[#ba55d3]', badgeBg: 'bg-[#ba55d3]/10', badgeBorder: 'border-[#ba55d3]/40' },
  'eternal-dove': { name: 'Eternal Remembrance', border: 'border-[#f0f8ff]', text: 'text-[#f0f8ff]', badgeBg: 'bg-white/10', badgeBorder: 'border-white/30' },
  'veteran': { name: 'Veteran Appreciation', border: 'border-[#b22222]', text: 'text-[#b22222]', badgeBg: 'bg-[#b22222]/10', badgeBorder: 'border-[#b22222]/40' },
  'get-well': { name: 'Get Well Soon', border: 'border-[#adff2f]', text: 'text-[#adff2f]', badgeBg: 'bg-[#adff2f]/10', badgeBorder: 'border-[#adff2f]/40' },
  'thank-you': { name: 'Thank You / Just Because', border: 'border-[#ffd700]', text: 'text-[#ffd700]', badgeBg: 'bg-[#ffd700]/10', badgeBorder: 'border-[#ffd700]/40' },
  'bff': { name: "BFF's (Best Friends)", border: 'border-[#ff69b4]', text: 'text-[#ff69b4]', badgeBg: 'bg-[#ff69b4]/10', badgeBorder: 'bg-[#ff69b4]/40' },
};

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

  const forceEdit = searchParams.get('edit') === 'true';
  const currentTheme = THEME_CONFIGS[effectType] || THEME_CONFIGS['gold-confetti'];

  useEffect(() => {
    const urlSerial = searchParams.get('id') || searchParams.get('serial') || searchParams.get('cardId');
    if (urlSerial) {
      const cleanSerial = urlSerial.trim();
      setSerialNumber(cleanSerial);

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (supabaseUrl && supabaseAnonKey && !forceEdit) {
        const supabase = createClient(supabaseUrl, supabaseAnonKey);
        supabase
          .from('cards')
          .select('is_activated, message_text, media_url, effect_type')
          .ilike('serial_number', cleanSerial)
          .maybeSingle()
          .then(({ data }) => {
            if (data && data.is_activated) {
              window.location.replace(`/v/${encodeURIComponent(cleanSerial)}`);
            } else if (data) {
              if (data.message_text) setMessageText(data.message_text);
              if (data.media_url) setMediaUrl(data.media_url);
              if (data.effect_type) setEffectType(data.effect_type);
            }
          });
      }
    }
  }, [searchParams, forceEdit]);

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

      const { error: uploadError } = await supabase.storage.from('media').upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage.from('media').getPublicUrl(filePath);
      setMediaUrl(publicUrlData.publicUrl);
      setUploadedFileName(file.name);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to upload media file.');
    } finally {
      setUploading(false);
    }
  };

  const handleClearMedia = () => {
    setMediaUrl('');
    setUploadedFileName('');
  };

  const drawParticle = (ctx: CanvasRenderingContext2D, themeKey: string, size: number) => {
    if (themeKey === 'executive-light') {
      ctx.shadowColor = 'rgba(229, 228, 226, 0.9)';
      ctx.shadowBlur = 12;
      ctx.fillStyle = '#e5e4e2';
      ctx.fillRect(-size * 0.25, -size * 1.8, size * 0.5, size * 3.6);
      return;
    }

    ctx.font = `${Math.max(20, size * 2.8)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const emojis: Record<string, string> = {
      'gold-confetti': '✨',
      'wealth-glamour': '💎',
      'ruby-petal': '🌹',
      'birthday': '🎂',
      'christmas': '🎄',
      'halloween': '🎃',
      'valentine': '❤️',
      'april-fools': '🤣',
      'new-years': '🥂',
      'christianity': '✝️',
      'islam': '☪️',
      'judaism': '✡️',
      'hinduism': '🪔',
      'buddhism': '☸️',
      'mothers-day': '💐',
      'fathers-day': '👔',
      'gender-reveal': '🍼',
      'graduation': '🎓',
      'engagement': '💍',
      'retirement': '🌅',
      'day-of-the-dead': '💀',
      'eternal-dove': '🕊️',
      'veteran': '🎖️',
      'get-well': '🌻',
      'thank-you': '🙏',
      'bff': '👯‍♀️',
    };

    ctx.fillText(emojis[themeKey] || '✨', 0, 0);
  };

  const triggerPreviewEffect = (themeKey: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '999999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Array<any> = [];
    const count = themeKey === 'executive-light' ? 50 : 45;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: themeKey === 'executive-light' ? Math.random() * window.innerWidth : window.innerWidth / 2,
        y: themeKey === 'executive-light' ? window.innerHeight + 20 : window.innerHeight / 2 - 40,
        vx: (Math.random() - 0.5) * (themeKey === 'executive-light' ? 2 : 14),
        vy: themeKey === 'executive-light' ? -(Math.random() * 4 + 2) : (Math.random() - 0.7) * 12 - 3,
        size: Math.random() * 8 + 8,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.08,
        opacity: 1,
        sway: Math.random() * 3,
      });
    }

    let animationFrameId: number;
    const start = Date.now();

    const render = () => {
      const elapsed = Date.now() - start;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx + Math.sin(elapsed * 0.003 + p.sway) * 0.5;
        p.y += p.vy;
        if (themeKey !== 'executive-light') {
          p.vy += 0.18;
          p.vx *= 0.98;
        }
        p.rotation += p.rotSpeed;

        if (elapsed > 1800) p.opacity -= 0.02;

        if (p.opacity > 0) {
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          drawParticle(ctx, themeKey, p.size);
          ctx.restore();
        }
      });

      if (elapsed < 3200) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        canvas.remove();
      }
    };

    animationFrameId = requestAnimationFrame(render);
  };

  const openPreview = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowPreview(true);
    triggerPreviewEffect(effectType);
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
          Configure Gift Note
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
              placeholder="e.g. 1666"
              className="w-full bg-black/60 border border-[#d4af37]/35 p-3.5 text-white rounded text-[13px] tracking-wider placeholder:text-[#b0aebf]/40 focus:outline-none focus:border-[#d4af37]"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] uppercase tracking-widest text-[#d4af37] mb-1.5">
            Write a Message
          </label>
          <textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Write your personal dedication..."
            rows={3}
            className="w-full bg-black/60 border border-[#d4af37]/35 p-3.5 text-white rounded text-[13px] tracking-wider placeholder:text-[#b0aebf]/40 focus:outline-none focus:border-[#d4af37] resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-[11px] uppercase tracking-widest text-[#d4af37]">
            Media Destination (Photos, Audio, Video, or URL)
          </label>

          {uploadedFileName || mediaUrl ? (
            <div className="flex items-center justify-between bg-[#d4af37]/10 border border-[#d4af37]/50 p-3.5 rounded-lg text-xs text-[#f4e6b0]">
              <div className="flex items-center gap-2.5 truncate pr-2">
                <span className="text-[#d4af37] font-bold">✦</span>
                <span className="truncate font-medium">Media Attached: {uploadedFileName || 'Custom URL'}</span>
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
                placeholder="Or paste media URL..."
                className="w-full bg-black/60 border border-[#d4af37]/35 p-3 text-white rounded text-[12px] tracking-wider placeholder:text-[#b0aebf]/40 focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-[11px] uppercase tracking-widest text-[#d4af37] mb-1.5">
            Gift Note Theme
          </label>
          <select
            value={effectType}
            onChange={(e) => setEffectType(e.target.value)}
            className="w-full bg-black/60 border border-[#d4af37]/35 p-3.5 text-[#f4e6b0] rounded text-[13px] tracking-wider focus:outline-none focus:border-[#d4af37]"
          >
            <optgroup label="--- Luxury & Milestones ---">
              <option value="gold-confetti">✦ Aura Gold (Celebrations)</option>
              <option value="executive-light">✦ Corporate Lumina (Prism Bars)</option>
              <option value="wealth-glamour">✦ Wealth & Glamour (Diamonds)</option>
              <option value="ruby-petal">✦ Crimson Romance & Anniversary</option>
            </optgroup>
            <optgroup label="--- Holidays & Seasons ---">
              <option value="birthday">🎂 Happy Birthday</option>
              <option value="christmas">🎄 Winter & Christmas</option>
              <option value="halloween">🎃 Halloween</option>
              <option value="valentine">❤️ Valentine's Day</option>
              <option value="april-fools">🤣 April Fools & Humor</option>
              <option value="new-years">🥂 New Year's Eve</option>
            </optgroup>
            <optgroup label="--- Faith & Heritage ---">
              <option value="christianity">✝️ Christianity</option>
              <option value="islam">☪️ Islam</option>
              <option value="judaism">✡️ Judaism</option>
              <option value="hinduism">🪔 Hinduism (Diwali)</option>
              <option value="buddhism">☸️ Buddhism</option>
            </optgroup>
            <optgroup label="--- Family & Life Milestones ---">
              <option value="mothers-day">💐 Mother's Day</option>
              <option value="fathers-day">👔 Father's Day</option>
              <option value="gender-reveal">🍼 New Arrival</option>
              <option value="graduation">🎓 Graduation</option>
              <option value="engagement">💍 Engagement</option>
              <option value="retirement">🌅 Retirement & Farewell</option>
              <option value="day-of-the-dead">💀 Day of the Dead (Día de los Muertos)</option>
              <option value="eternal-dove">🕊️ Eternal Remembrance</option>
            </optgroup>
            <optgroup label="--- Appreciation & Connection ---">
              <option value="veteran">🎖️ Veteran Appreciation</option>
              <option value="get-well">🌻 Get Well Soon</option>
              <option value="thank-you">🙏 Thank You / Just Because</option>
              <option value="bff">👯‍♀️ BFF's (Best Friends)</option>
            </optgroup>
          </select>
        </div>

        {errorMessage && (
          <p className="text-xs text-red-400 text-center">{errorMessage}</p>
        )}

        <div className="flex gap-3 pt-1">
          <button
            type="button"
            onClick={openPreview}
            className="flex-1 bg-black/60 border border-[#d4af37]/60 hover:border-[#d4af37] text-[#f4e6b0] font-semibold py-3.5 px-4 rounded text-[11px] uppercase tracking-[1.5px] transition-all cursor-pointer"
          >
            Preview Gift Note
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

      {showPreview && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className={`max-w-[500px] w-full bg-[#101014] border ${currentTheme.border} rounded-xl p-6 text-center space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto`}>
            <button
              onClick={() => setShowPreview(false)}
              className="absolute top-3 right-3 text-[#d4af37] hover:text-white text-xs uppercase tracking-wider"
            >
              ✕ Close
            </button>
            <div className={`inline-block px-3 py-1 border ${currentTheme.badgeBorder} rounded-full text-[10px] uppercase text-[#f4e6b0] ${currentTheme.badgeBg}`}>
              ✦ Live Gift Note Preview ({currentTheme.name}) ✦
            </div>
            <h2 className={`text-lg font-serif uppercase ${currentTheme.text}`}>Gift Note Preview</h2>
            
            <div className={`bg-black/60 border ${currentTheme.badgeBorder} p-4 rounded text-left space-y-2 text-sm text-[#f4e6b0]`}>
              <p className={`text-[10px] uppercase tracking-widest ${currentTheme.text}`}>Message:</p>
              <p className="text-white text-sm font-light">{messageText || "No message entered yet."}</p>
            </div>

            {mediaUrl ? (
              <div className={`relative w-full rounded border ${currentTheme.badgeBorder} bg-black aspect-video overflow-hidden`}>
                <video src={mediaUrl} controls playsInline className="w-full h-full object-contain" />
              </div>
            ) : (
              <div className="p-3 bg-black/40 border border-[#d4af37]/20 rounded text-xs text-[#b0aebf]">
                No media attached for preview.
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => triggerPreviewEffect(effectType)}
                className="flex-1 bg-black/60 border border-[#d4af37]/40 hover:border-[#d4af37] text-[#f4e6b0] py-2.5 rounded text-xs uppercase tracking-wider cursor-pointer"
              >
                Burst Gift Note Animation ✦
              </button>
              <button
                onClick={() => setShowPreview(false)}
                className="flex-1 bg-gradient-to-r from-[#d4af37] to-[#f4e6b0] text-black font-semibold py-2.5 rounded text-xs uppercase tracking-wider cursor-pointer"
              >
                Return to Editing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ActivatePage() {
  return (
    <div className="min-h-screen bg-[#070709] text-white flex flex-col items-center justify-center p-4">
      <Suspense fallback={<div className="text-[#d4af37] text-sm animate-pulse">Verifying card...</div>}>
        <ActivateForm />
      </Suspense>
    </div>
  );
}