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

  const cleanSerial = rawId.trim().toUpperCase();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseAnonKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      // Query Supabase using serial_number and check message details
      const { data: card, error } = await supabase
        .from('cards')
        .select('serial_number, message_text, redirect_url, media_url')
        .ilike('serial_number', cleanSerial)
        .maybeSingle();

      if (!error && card) {
        if (card.redirect_url) {
          redirect(card.redirect_url);
        }

        // If a message or media is saved, card is activated -> Go straight to experience viewer
        if ((card.message_text && card.message_text.trim().length > 0) || (card.media_url && card.media_url.trim().length > 0)) {
          redirect(`/c/${encodeURIComponent(cleanSerial)}`);
        }
      }
    } catch (err) {
      console.error('Redirect lookup error:', err);
    }
  }

  // Fallback: Unactivated -> Send to activation portal
  redirect(`/activate?card=${encodeURIComponent(cleanSerial)}`);
}