import StorefrontContent from './StorefrontContent';

// Force static HTML export so Render serves the page instantly (< 100ms)
export const dynamic = 'force-static';
export const revalidate = false;

export default function StorefrontPage() {
  return <StorefrontContent />;
}