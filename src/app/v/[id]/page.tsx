import { Metadata } from 'next';
import ExperienceClient from './ExperienceClient';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aura-and-archive-web-zdqe.vercel.app';

  return {
    title: `You've Received a Gift Note | Aura & Archive™`,
    description: `Tap to open your secure luxury gift note experience (Card ID: ${id}).`,
    openGraph: {
      title: `You've Received a Gift Note ✦ Aura & Archive™`,
      description: `Tap to open your secure luxury gift note experience.`,
      url: `${siteUrl}/v/${id}`,
      siteName: 'Aura & Archive',
      images: [
        {
          url: `${siteUrl}/logo.png`,
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
      images: [`${siteUrl}/logo.png`],
    },
  };
}

export default async function ExperiencePage({ params }: Props) {
  const { id } = await params;
  return <ExperienceClient cardId={id} />;
}