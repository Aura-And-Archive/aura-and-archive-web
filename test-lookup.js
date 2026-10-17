import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Read .env.local manually without needing external packages
const envFile = fs.readFileSync('.env.local', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    env[parts[0].trim()] = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Could not read Supabase credentials from .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testQuery() {
  const serial = 'AA-1083';
  console.log(`🔍 Querying Supabase for serial_number: ${serial}...`);

  const { data, error } = await supabase
    .from('cards')
    .select('serial_number, message_text, recipient_name')
    .ilike('serial_number', serial)
    .maybeSingle();

  if (error) {
    console.error("❌ Supabase Error:", error);
  } else if (!data) {
    console.warn("⚠️ Warning: Row not found or RLS policy blocked access!");
  } else {
    console.log("✅ Success! Retrieved Card Data:", data);
  }
}

testQuery();
