import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * Routes whose body has passed the M1 word-count audit.
 *
 * The sitemap integration only ever sees a URL, so it cannot ask the rendered page
 * whether it carries `noindex`. We read the frontmatter directly instead, which keeps
 * the sitemap and the robots meta driven by the same single fact: `depthVerified`.
 *
 * Set `depthVerified: true` and a page becomes indexable AND enters the sitemap in the
 * same build. Leave it false and it does neither. There is no third state.
 */
function verifiedRoutes() {
  const dir = './src/content/bodies';
  if (!fs.existsSync(dir)) return new Set();
  const routes = new Set();
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith('.md')) continue;
    const frontmatter = fs
      .readFileSync(path.join(dir, file), 'utf8')
      .match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!frontmatter) continue;
    if (!/^depthVerified:\s*true\s*$/m.test(frontmatter[1])) continue;
    const route = frontmatter[1].match(/^route:\s*['"]?([^'"\r\n]+?)['"]?\s*$/m);
    if (route) routes.add(route[1].trim());
  }
  return routes;
}

/**
 * Utility pages exempt from the M1 depth floor (harness check 4) and therefore
 * indexable without a body. Keep in step with M1_EXEMPT in scripts/run-harness.mjs.
 */
const ALWAYS_INDEXABLE = new Set(['/contact/', '/privacy/', '/terms/', '/accessibility/']);

const VERIFIED = verifiedRoutes();

export default defineConfig({
  site: 'https://guardiank9company.com',
  trailingSlash: 'always',
  output: 'static',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      // Drafts are never submitted. A page that has not met M1 stays out of the sitemap.
      // Submitting a noindex URL asks a search engine to fetch a page we have already
      // told it to ignore, which is the opposite of the honesty gate this build runs on.
      filter: (page) => {
        const route = new URL(page).pathname;
        if (route.includes('/thank-you')) return false;
        return ALWAYS_INDEXABLE.has(route) || VERIFIED.has(route);
      },
    }),
  ],
});
