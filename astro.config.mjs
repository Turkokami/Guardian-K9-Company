import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://guardiank9company.com',
  trailingSlash: 'always',
  output: 'static',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      // Drafts are never submitted. A page that has not met M1 stays out of the sitemap.
      filter: (page) => !page.includes('/thank-you'),
    }),
  ],
});
