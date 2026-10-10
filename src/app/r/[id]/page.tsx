import { createClient } from '@supabase/supabase-js';
import { redirect, notFound } from 'next/navigation';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

  try {
    // Query Supabase for activation status and custom redirect
    const { data: card, error } = await supabase
      .from('cards')
      .select('id, is_activated, redirect_url')
      .ilike('id', cleanId)
      .maybeSingle();

    if (!error && card) {
      // 1. If not activated, send to activation flow
      if (!card.is_activated) {
        redirect(`/activate?id=${encodeURIComponent(card.id)}`);
      }

      // 2. If activated and has a custom redirect URL, use it
      if (card.redirect_url) {
        redirect(card.redirect_url);
      }
    }
  } catch (err) {
    console.error('Redirect lookup error:', err);
  }

  // 3. Default fallback for activated cards (or if lookup fails)
  redirect(`/v/${encodeURIComponent(cleanId)}`);
}