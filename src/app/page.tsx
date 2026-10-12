import StorefrontContent from './StorefrontContent';

// Force static HTML export so Render/Vercel serves the page instantly (< 100ms)
export const dynamic = 'force-static';
export const revalidate = false;

export default function StorefrontPage() {
  return (
    <main style={{ background: 'transparent', minHeight: '100vh', width: '100%' }}>
      <StorefrontContent />
    </main>
  );
}