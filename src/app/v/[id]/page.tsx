import ExperienceClient from './ExperienceClient';

// Enable dynamic rendering so any card ID (e.g. AA-1095) is rendered on demand
export const dynamicParams = true;

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const cardId = resolvedParams?.id || 'DEMO-GOLD-GRAFFITI';

  return <ExperienceClient cardId={cardId} />;
}