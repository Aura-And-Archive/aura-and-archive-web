import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { recipient, message, photoUrl, mediaUrl, effectType } = body;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase configuration error: Missing URL or API key in environment variables.');
      return NextResponse.json(
        { success: false, error: 'Missing Supabase environment configuration.' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Generate a short unique serial number for the demo card
    const serialNumber = Math.random().toString(36).substring(2, 9);
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    const payload = {
      serial_number: serialNumber,
      recipient_name: recipient || '',
      message_text: message || '',
      photo_url: photoUrl || null,
      media_url: mediaUrl || null,
      effect_type: effectType || 'gold-confetti',
      expires_at: expiresAt,
    };

    const { data, error } = await supabase
      .from('cards')
      .insert([payload])
      .select('serial_number')
      .single();

    if (error) {
      console.error('Supabase Database Error:', error);
      throw error;
    }

    return NextResponse.json({
      success: true,
      cardId: data?.serial_number || serialNumber,
    });
  } catch (err: any) {
    console.error('API /api/cards Execution Error:', err);
    return NextResponse.json(
      { success: false, error: err?.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}