/**
 * assets.ts — build-time existence checks for files in public/.
 *
 * Same honesty gate as the pending-field pattern in business.ts, applied to images:
 * a referenced asset that is not actually on disk should render as nothing, not as a
 * broken image. Astro components run on the server during a static build, so this is
 * resolved once at build time and costs nothing at runtime.
 *
 * When the real file lands in public/img/, every reference to it starts rendering on the
 * next build. Nothing else has to change.
 */

import fs from 'node:fs';
import path from 'node:path';

/** `assetPath` is a site-absolute path such as '/img/guardian-k9-logo.png'. */
export function publicAssetExists(assetPath: string | null | undefined): boolean {
  if (!assetPath || !assetPath.startsWith('/')) return false;
  try {
    return fs.existsSync(path.join('public', assetPath.replace(/^\//, '')));
  } catch {
    return false;
  }
}
