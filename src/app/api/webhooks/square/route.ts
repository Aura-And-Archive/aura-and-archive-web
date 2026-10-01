import { WebhooksHelper } from 'square';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const bodyText = await req.text();
  const signature = req.headers.get('x-square-hmacsha256-signature') || '';
  const notificationUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhooks/square`;

  const isValid = (WebhooksHelper as any).isValidWebhookSignature(
    bodyText,
    signature,
    process.env.SQUARE_WEBHOOK_SIGNATURE_KEY!,
    notificationUrl
  );

  if (!isValid) {
    return new Response('Invalid webhook signature', { status: 400 });
  }

  const event = JSON.parse(bodyText);

  if (event.type === 'payment.updated') {
    const payment = event.data.object.payment;

    if (payment.status === 'COMPLETED') {
      // Process your completed payment logic here
    }
  }

  return new Response('Webhook received', { status: 200 });
}