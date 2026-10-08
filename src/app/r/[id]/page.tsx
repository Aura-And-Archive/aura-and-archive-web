'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function RedirectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function resolveRedirect() {
      const resolvedParams = await params;
      const rawId = resolvedParams?.id;

      if (!rawId) {
        router.push('/404');
        return;
      }

      const cleanId = rawId.trim().toLowerCase();

      try {
        const { data: card, error } = await supabase
          .from('cards')
          .select('id, redirect_url')
          .ilike('id', cleanId)
          .maybeSingle();

        if (error || !card) {
          router.push(`/v/${encodeURIComponent(cleanId)}`);
          return;
        }

        const targetUrl = card.redirect_url || `/v/${card.id}`;
        window.location.href = targetUrl;
      } catch (err) {
        router.push(`/v/${encodeURIComponent(cleanId)}`);
      }
    }

    resolveRedirect();
  }, [params, router]);

  return (
    <div className="min-h-screen bg-[#070709] text-[#f3f3f7] flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="inline-block px-4 py-1.5 border border-[#d4af37]/40 rounded-[30px] text-[10px] tracking-[2.5px] uppercase text-[#f4e6b0] bg-[#d4af37]/10 animate-pulse">
          ✦ Redirecting to Experience ✦
        </div>
      </div>
    </div>
  );
}