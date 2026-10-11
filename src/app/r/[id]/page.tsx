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
        .select('id, is_activated, redirect_url, content_url')
        .ilike('id', cleanId)
        .maybeSingle();

      if (!error && card) {
        // 1. If not activated, send directly to activation flow
        if (!card.is_activated) {
          redirect(`/activate?id=${encodeURIComponent(card.id)}`);
        }

        // 2. If activated and has a custom external redirect URL, use it
        if (card.redirect_url) {
          redirect(card.redirect_url);
        }

        // 3. If content_url exists and is NOT a self-referencing /r/ link, use it
        if (card.content_url && !card.content_url.includes('/r/')) {
          redirect(card.content_url);
        }
      }
    } catch (err) {
      console.error('Redirect lookup error:', err);
    }
  }

  // 4. Fallback for activated cards without an external link -> goes to viewer page
  redirect(`/v/${encodeURIComponent(cleanId)}`);
}