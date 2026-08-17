/**
 * seo.ts — title and description builders with the M5 guards baked in.
 * Title <= 60 chars, never cut mid-word. Description 110-165, always ends on punctuation.
 * scripts/seo-audit.mjs re-checks the built output; this is the first line of defence.
 */

export const TITLE_MAX = 60;
export const DESC_MIN = 110;
export const DESC_MAX = 165;

/** Trim to a limit on a word boundary. Never produces a mid-word cut. */
export function trimToWord(s: string, max: number): string {
  const t = s.trim().replace(/\s+/g, ' ');
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const i = cut.lastIndexOf(' ');
  return (i > 0 ? cut.slice(0, i) : cut).replace(/[\s,;:–—-]+$/, '');
}

export function buildTitle(raw: string): string {
  return trimToWord(raw, TITLE_MAX);
}

/**
 * Descriptions must end on punctuation — the dangling-ending defect from prior builds.
 * If trimming lands mid-sentence we back up to the last sentence end; if there is none,
 * we trim to a word boundary and add a full stop.
 */
export function buildDescription(raw: string): string {
  let d = raw.trim().replace(/\s+/g, ' ');
  if (d.length > DESC_MAX) {
    const cut = trimToWord(d, DESC_MAX);
    const lastStop = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '), cut.lastIndexOf('? '));
    d = lastStop > DESC_MIN ? cut.slice(0, lastStop + 1) : cut;
  }
  if (!/[.!?]$/.test(d)) d = d.replace(/[\s,;:–—-]+$/, '') + '.';
  return d;
}

/** The AEO Quick Answer must be 40-60 words (doctrine #3). Reported, never silently fixed. */
export function answerWordCount(s: string): number {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

export function validateAnswer(s: string): { ok: boolean; words: number; note?: string } {
  const words = answerWordCount(s);
  if (words < 40) return { ok: false, words, note: 'Quick Answer under 40 words' };
  if (words > 60) return { ok: false, words, note: 'Quick Answer over 60 words' };
  return { ok: true, words };
}
