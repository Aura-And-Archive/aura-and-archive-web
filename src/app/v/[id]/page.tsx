import ExperienceClient from './ExperienceClient';

export function generateStaticParams() {
  return [{ id: 'DEMO-GOLD-GRAFFITI' }];
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const cardId = resolvedParams?.id || 'DEMO-GOLD-GRAFFITI';

  return <ExperienceClient cardId={cardId} />;
}