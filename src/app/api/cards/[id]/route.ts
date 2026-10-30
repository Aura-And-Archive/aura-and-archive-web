import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cleanId = decodeURIComponent(id || '');

    // Initialize Supabase inside the handler so build-time env checks don't fail
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    );

    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .eq('serial_number', cleanId)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Card not found' }, { status: 404 });
    }

    return NextResponse.json({
      recipient: data.recipient_name,
      message: data.message_text,
      photoUrl: data.photo_url,
      mediaUrl: data.media_url,
      theme: data.theme || 'gold-confetti',
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}