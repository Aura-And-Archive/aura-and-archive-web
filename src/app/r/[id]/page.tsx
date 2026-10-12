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

  if (supabaseUrl && supabaseAnonKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      // Query Supabase for activation status, custom redirect, and content_url
      const { data: card, error } = await supabase
        .from('cards')
        .select('serial_number, is_activated, redirect_url, content_url')
        .ilike('serial_number', cleanId)
        .maybeSingle();

      if (!error && card) {
        // STEP 1: FORCE ACTIVATION FLOW FIRST IF NOT ACTIVATED
        if (card.is_activated === false || !card.is_activated) {
          redirect(`/activate?id=${encodeURIComponent(card.serial_number)}`);
        }

        // STEP 2: IF ACTIVATED, CHECK CUSTOM EXTERNAL REDIRECT URL
        if (card.redirect_url) {
          redirect(card.redirect_url);
        }

        // STEP 3: IF ACTIVATED AND HAS CUSTOM CONTENT_URL THAT IS NOT SELF-REFERENCING /r/
        if (card.content_url && !card.content_url.includes('/r/')) {
          redirect(card.content_url);
        }
      }
    } catch (err) {
      console.error('Redirect lookup error:', err);
    }
  }

  // STEP 4: FALLBACK FOR ACTIVATED CARDS WITHOUT EXTERNAL LINK -> VIEWER PAGE
  redirect(`/v/${encodeURIComponent(cleanId)}`);
}