import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv, type Plugin } from 'vite';

/**
 * SEO files that depend on the production domain.
 * The domain is not known yet, so nothing is invented: when SITE_URL is unset the build only
 * emits a permissive robots.txt, and warns. Once SITE_URL is set it adds a canonical link,
 * absolute og:image/twitter:image URLs, sitemap.xml and a Sitemap line in robots.txt.
 * It also warns when the WhatsApp number (the primary conversion path) is missing.
 */
function seo(siteUrl: string, whatsapp: string): Plugin {
  const origin = siteUrl.replace(/\/+$/, '');
  return {
    name: 'nova-seo',
    apply: 'build',
    transformIndexHtml(html) {
      if (!origin) return html;
      return html
        .replace(/content="\/og-image\.png"/g, `content="${origin}/og-image.png"`)
        .replace(
          '</title>',
          `</title>\n    <link rel="canonical" href="${origin}/" />\n    <meta property="og:url" content="${origin}/" />`
        );
    },
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /'];
      if (origin) {
        robots.push('', `Sitemap: ${origin}/sitemap.xml`);
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${origin}/</loc>\n  </url>\n</urlset>\n`
        });
      } else {
        this.warn('SITE_URL is not set: skipping canonical URL and sitemap.xml; social image URLs stay relative.');
      }
      if (!whatsapp) {
        this.warn('VITE_WHATSAPP_NUMBER is not set: WhatsApp calls to action will fall back to the contact section.');
      }
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `${robots.join('\n')}\n` });
    }
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), seo(env.SITE_URL ?? '', env.VITE_WHATSAPP_NUMBER ?? '')]
  };
});
