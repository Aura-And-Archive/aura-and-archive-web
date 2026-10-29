import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cleanId = decodeURIComponent(id || '').trim();

    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .eq('card_id', cleanId)
      .single();

    if (error || !data) {
      // Fallback check for id column if card_id doesn't match
      const { data: fallbackData, error: fallbackError } = await supabase
        .from('cards')
        .select('*')
        .eq('id', cleanId)
        .single();

      if (fallbackError || !fallbackData) {
        return NextResponse.json({ error: 'Card not found' }, { status: 404 });
      }
      return NextResponse.json(fallbackData);
    }

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}