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

  if (!supabaseUrl || !supabaseAnonKey) {
    redirect(`/activate?id=${encodeURIComponent(cleanId)}`);
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data: card, error } = await supabase
      .from('cards')
      .select('serial_number, is_activated, redirect_url, content_url')
      .ilike('serial_number', cleanId)
      .maybeSingle();

    if (error) {
      console.error('Supabase query error in /r/[id]:', error.message);
    }

    // If card exists AND is explicitly activated (true)
    if (card && card.is_activated === true) {
      if (card.redirect_url) {
        redirect(card.redirect_url);
      }
      if (card.content_url && !card.content_url.includes('/r/')) {
        redirect(card.content_url);
      }
      redirect(`/v/${encodeURIComponent(cleanId)}`);
    }
  } catch (err: any) {
    // Next.js redirect uses internal errors that must be re-thrown
    if (
      err?.message?.includes('NEXT_REDIRECT') ||
      err?.digest?.includes('NEXT_REDIRECT') ||
      err?.constructor?.name === 'AbortError'
    ) {
      throw err;
    }
    console.error('Redirect lookup error:', err);
  }

  // Fallback for unactivated cards (is_activated === false or null) -> send to activation flow
  redirect(`/activate?id=${encodeURIComponent(cleanId)}`);
}