import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * bodies — the 3,000–5,000 word page bodies (M1), matched to a data row by `route`.
 * Routes stand up first from src/data; content is poured in in waves without the site
 * ever being broken. A route with no body renders as a noindex draft (plan 7.2).
 *
 * Frontmatter is validated at build time, so bad writer output fails fast.
 */
const bodies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/bodies' }),
  schema: z.object({
    route: z.string().startsWith('/').endsWith('/'),
    title: z.string().max(60, 'Title must be <= 60 characters (M5)'),
    description: z.string().min(110).max(165, 'Meta description must be 110–165 characters (M5)'),
    /** The AEO Quick Answer — 40–60 words, reused as meta, first FAQ answer and speakable target. */
    answer: z.string(),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).min(6).max(12),
    heroImage: z.string().optional(),
    heroAlt: z.string().max(125).optional(),
    dateModified: z.string(),
    /** Set true only once the word-count auditor confirms the M1 floor is met. */
    depthVerified: z.boolean().default(false),
  }),
});

export const collections = { bodies };
