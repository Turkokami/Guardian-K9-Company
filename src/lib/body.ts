/**
 * body.ts — resolves a route to its markdown body if one exists.
 *
 * The route renders the deep body when it exists and a generated scaffold when it does
 * not, with the scaffold marked noindex (plan 7.2). This lets every route stand up first
 * and content be poured in in waves, without the site ever being broken and without a
 * thin page ever being indexed.
 */

import { getCollection, type CollectionEntry } from 'astro:content';

export type Body = CollectionEntry<'bodies'>;

let cache: Body[] | null = null;

async function all(): Promise<Body[]> {
  if (!cache) {
    try {
      cache = await getCollection('bodies');
    } catch {
      cache = [];
    }
  }
  return cache;
}

export async function bodyFor(route: string): Promise<Body | undefined> {
  const entries = await all();
  return entries.find(e => e.data.route === route);
}

export interface Resolved {
  body?: Body;
  /** True when there is no body, or the body has not passed the M1 word-count audit. */
  draft: boolean;
  answer: string;
  faqs: Array<{ q: string; a: string }>;
  dateModified?: string;
}

export async function resolve(
  route: string,
  fallback: { answer: string; faqs: Array<{ q: string; a: string }> },
): Promise<Resolved> {
  const body = await bodyFor(route);
  if (!body) {
    return { draft: true, answer: fallback.answer, faqs: fallback.faqs };
  }
  return {
    body,
    draft: !body.data.depthVerified,
    answer: body.data.answer,
    faqs: body.data.faqs,
    dateModified: body.data.dateModified,
  };
}
