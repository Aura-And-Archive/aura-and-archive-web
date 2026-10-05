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

  const cleanId = rawId.trim().toLowerCase();

  // Query Supabase for the card record using case-insensitive match
  const { data: card, error } = await supabase
    .from('cards') // Change 'cards' to your table name if different (e.g., 'keepsakes')
    .select('id, redirect_url')
    .ilike('id', cleanId)
    .maybeSingle();

  if (error || !card) {
    // If not found in database, fallback to the view page with the clean ID or trigger 404
    redirect(`/v/${encodeURIComponent(cleanId)}`);
  }

  // If a custom target URL exists in DB, redirect there; otherwise default to /v/[id]
  const targetUrl = card.redirect_url || `/v/${card.id}`;
  redirect(targetUrl);
}