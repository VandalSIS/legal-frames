import { generateSitemap } from '@/utils/generateSitemap';

export async function GET(request: Request) {
  const domain = request.headers.get('host') || 'yourdomain.com';
  const protocol = request.headers.get('x-forwarded-proto') || 'https';
  const baseUrl = `${protocol}://${domain}`;
  
  const sitemap = generateSitemap(baseUrl);
  
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    },
  });
}