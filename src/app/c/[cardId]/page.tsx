import { Metadata } from 'next';
import CardExperience from '@/components/CardExperience';

type Props = {
  params: Promise<{ cardId: string }>;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aura-and-archive.com';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cardId } = await params;
  const cleanId = decodeURIComponent(cardId || '').trim();

  return {
    title: `Aura & Archive | Luxury Keepsake Sandbox`,
    description: `Experience and customize your interactive digital keepsake (ID: ${cleanId}).`,
    openGraph: {
      title: `Aura & Archive | Luxury Keepsake Sandbox`,
      description: `Experience and customize your interactive digital keepsake.`,
      url: `${SITE_URL}/c/${encodeURIComponent(cleanId)}`,
      siteName: 'Aura & Archive',
      images: [{ url: `${SITE_URL}/logo.png`, width: 800, height: 800, alt: 'Logo' }],
      type: 'website',
    },
  };
}

export default async function DedicatedCardViewer({ params }: Props) {
  const { cardId } = await params;
  const cleanId = decodeURIComponent(cardId || '').trim();

  return (
    <main className="min-h-screen w-full bg-black relative overflow-x-hidden flex flex-col justify-center items-center">
      <CardExperience cardId={cleanId} isSandbox={true} />
    </main>
  );
}