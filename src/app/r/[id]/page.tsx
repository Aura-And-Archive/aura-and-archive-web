import { createClient } from '@supabase/supabase-js';
import { redirect, notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function RedirectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const rawId = resolvedParams?.id;

  if (!rawId) {
    notFound();
  }

  const cleanId = rawId.trim();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let cardData: any = null;

  if (supabaseUrl && supabaseAnonKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      // Query Supabase for activation status, custom redirect, and content_url
      const { data, error } = await supabase
        .from('cards')
        .select('serial_number, is_activated, redirect_url, content_url')
        .ilike('serial_number', cleanId)
        .maybeSingle();

      if (!error && data) {
        cardData = data;
      }
    } catch (err) {
      console.error('Redirect lookup error:', err);
    }
  }

  // Handle routing logic outside the try/catch block so Next.js redirect works properly
  if (cardData) {
    // 1. If not activated, send directly to activation flow
    if (cardData.is_activated === false || !cardData.is_activated) {
      redirect(`/activate?id=${encodeURIComponent(cardData.serial_number)}`);
    }

    // 2. If activated and has a custom external redirect URL, use it
    if (cardData.redirect_url) {
      redirect(cardData.redirect_url);
    }

    // 3. If content_url exists and is NOT a self-referencing /r/ link, use it
    if (cardData.content_url && !cardData.content_url.includes('/r/')) {
      redirect(cardData.content_url);
    }
  }

  // 4. Fallback for activated cards (or if lookup fails) -> goes to viewer page
  redirect(`/v/${encodeURIComponent(cleanId)}`);
}