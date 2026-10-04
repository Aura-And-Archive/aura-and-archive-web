import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = (supabaseUrl && supabaseAnonKey) ? createClient(supabaseUrl, supabaseAnonKey) : null;

export default async function CardRedirectPage({
  params,
}: {
  params: { id: string };
}) {
  const cardId = params.id;

  // Query Supabase for the card by ID or matching URL string
  const { data: card, error } = await supabase
    .from('cards')
    .select('content_url')
    .or(`id.eq.${cardId},content_url.ilike.%${cardId}%`)
    .single();

  if (error || !card) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h1>Card Not Found</h1>
        <p>Could not locate keepsake ID: {cardId}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>Aura & Archive Card: {cardId}</h1>
      <p>Card content loaded successfully.</p>
    </div>
  );
}