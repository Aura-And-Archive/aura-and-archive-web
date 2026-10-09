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
    // Query Supabase for the card record matching the ID (case-insensitive)
    const { data: card, error } = await supabase
      .from('cards')
      .select('id, redirect_url')
      .ilike('id', cleanId)
      .maybeSingle();

    if (!error && card?.redirect_url) {
      redirect(card.redirect_url);
    }
  } catch (err) {
    // Fail silently on database error and proceed to the fallback route
    console.error('Redirect lookup error:', err);
  }

  // Fallback to viewing the card directly on the main application route
  redirect(`/v/${encodeURIComponent(cleanId)}`);
}