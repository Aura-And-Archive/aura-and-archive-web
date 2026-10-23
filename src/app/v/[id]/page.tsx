import { Metadata } from 'next';
import ExperienceClient from './ExperienceClient';

type Props = {
  params: Promise<{ id: string }>;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://web-zdqe.vercel.app';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const cleanId = decodeURIComponent(id || '').trim();
  const pageUrl = `${SITE_URL}/v/${encodeURIComponent(cleanId)}`;

  return {
    title: `You've Received a Gift Note | Aura & Archive™`,
    description: `Tap to open your secure luxury gift note experience (Card ID: ${cleanId}).`,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `You've Received a Gift Note ✦ Aura & Archive™`,
      description: `Tap to open your secure luxury gift note experience.`,
      url: pageUrl,
      siteName: 'Aura & Archive',
      images: [
        {
          url: `${SITE_URL}/logo.png`,
          width: 1200,
          height: 630,
          alt: 'Aura & Archive Logo',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `You've Received a Gift Note ✦ Aura & Archive™`,
      description: `Tap to open your secure luxury gift note experience.`,
      images: [`${SITE_URL}/logo.png`],
    },
  };
}

export default async function ExperiencePage({ params }: Props) {
  const { id } = await params;
  const cleanId = decodeURIComponent(id || '').trim();

  return <ExperienceClient cardId={cleanId} />;
}