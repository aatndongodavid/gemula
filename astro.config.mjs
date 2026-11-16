import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://gemula.org',
  trailingSlash: 'ignore',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap({
      // La page 404 et le portfolio statique ne sont pas des pages à référencer
      filter: (page) => !page.includes('/404') && !page.endsWith('.html'),
      changefreq: 'monthly',
      lastmod: new Date()
    })
  ],
  markdown: {
    shikiConfig: { theme: 'github-dark' }
  },
  build: {
    inlineStylesheets: 'auto'
  }
});