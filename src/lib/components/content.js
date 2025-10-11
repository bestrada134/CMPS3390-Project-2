// Simple stores describing the child container.
// JSDoc so your editor can help.
/** @typedef {{ height: number }} Size */

import { writable, derived } from "svelte/store";

/** @type {import('svelte/store').Writable<Size>} */
export const contentSize = writable({ height: 0 });

/** Text length helps when content changes without changing height (e.g., inline swaps). */
export const contentTextLength = writable(0);

/** True if there's visible content. */
export const hasContent = derived(
  [contentSize, contentTextLength],
  ([$size, $len]) => $size.height > 0 || $len > 0
);
