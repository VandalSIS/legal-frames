import { useEffect } from 'react';
import { videos } from '@/data/videos';

const generateSitemap = (domain: string) => {
  const today = new Date().toISOString();
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
        http://www.google.com/schemas/sitemap-video/1.1
        http://www.google.com/schemas/sitemap-video/1.1/sitemap-video.xsd">
  
  <!-- Home page -->
  <url>
    <loc>${domain}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Video pages -->
  ${videos.map(video => `
  <url>
    <loc>${domain}/video/${video.id}</loc>
    <lastmod>${video.uploadDate.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <video:video>
      <video:thumbnail_loc>${video.thumbnail}</video:thumbnail_loc>
      <video:title>${escapeXml(video.title)}</video:title>
      <video:description>${escapeXml(video.description)}</video:description>
      <video:player_loc>${video.embedUrl}</video:player_loc>
      <video:duration>${getDurationInSeconds(video.duration)}</video:duration>
      <video:publication_date>${video.uploadDate.toISOString()}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:uploader info="${domain}/channel/${video.channel}">
        ${escapeXml(video.channel)}
      </video:uploader>
      <video:view_count>${video.views}</video:view_count>
      <video:tag>${video.tags.map(tag => escapeXml(tag)).join('</video:tag><video:tag>')}</video:tag>
      <video:category>${escapeXml(video.category)}</video:category>
    </video:video>
  </url>`).join('\n')}
</urlset>`;
};

// Helper function to escape XML special characters
function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case "'": return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

// Convert duration string (MM:SS) to seconds
function getDurationInSeconds(duration: string): number {
  const [minutes, seconds] = duration.split(':').map(Number);
  return minutes * 60 + seconds;
}

export default function Sitemap() {
  useEffect(() => {
    const domain = window.location.origin;
    const sitemap = generateSitemap(domain);
    
    // Set content type and security headers
    const blob = new Blob([sitemap], { 
      type: 'application/xml; charset=utf-8'
    });
    const url = URL.createObjectURL(blob);
    
    // Add security headers
    const headers = new Headers({
      'Content-Type': 'application/xml; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Content-Security-Policy': "default-src 'self'",
      'X-XSS-Protection': '1; mode=block'
    });

    window.location.href = url;
  }, []);

  return null;
}

// This tells React Router this is a special route
export function getStaticProps() {
  return { props: {} };
}