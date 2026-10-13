import ExperienceClient from './ExperienceClient';

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