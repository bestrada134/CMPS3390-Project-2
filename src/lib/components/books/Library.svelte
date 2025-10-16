<!-- src/lib/components/books/Library.svelte -->
<script>
/**
 * Library (UI)
 * ------------
 * Receives `books` and shows each book as a card.
 * Each card can submit Checkout / Check-in without reloading the page:
 * we use `use:enhance` and flip the flags locally.
 *
 * Expected shape per book:
 * { bookID, Title, Author, Genres: string[], Abstract?, CoverUrl?,
 *   canCheckout?: boolean, canCheckIn?: boolean }
 */
import { enhance } from '$app/forms';

/** Accept a `books` prop from the parent page. Default to [] if missing. */
let { books = [] } = $props();

// Local, mutable copy used for optimistic UI updates
let items = books.map((b) => ({ ...b }));

// Per-card error messages
/** @type {Record<number, string>} */
let errors = {};

/** First letter fallback (used when there is no CoverUrl) */
/**
 *
 * @param {String} t
 */
function initial(t) {
    if (!t) return '?';
    const s = String(t).trim();
    if (s.length === 0) return '?';
    return s.charAt(0).toUpperCase();
}

/** Keep abstracts short so the card stays compact */
/**
 *
 * @param {String} s
 * @param {Number} max
 */
function clip(s, max) {
    if (!s) return '';
    const txt = String(s);
    if (txt.length <= max) return txt;
    return txt.slice(0, max - 1).trimEnd() + '…';
}

/** Show genres as a comma-separated line */
/**
 *
 * @param arr
 */
function genresText(arr) {
    if (!arr || arr.length === 0) return '';
    return arr.join(', ');
}

/** Helper: flip flags locally after a successful result */
function markAsCheckedOut(bookID) {
    const i = items.findIndex((x) => x.bookID === bookID);
    if (i !== -1) {
    items[i] = { ...items[i], canCheckout: false, canCheckIn: true };
    items = items; // trigger Svelte reactivity
    }
}
function markAsReturned(bookID) {
    const i = items.findIndex((x) => x.bookID === bookID);
    if (i !== -1) {
    items[i] = { ...items[i], canCheckout: true, canCheckIn: false };
    items = items;
    }
}

/**
 * Build an enhance action for a specific card.
 * - On success: update the local flags
 * - On failure: show a small error under the buttons
 */
function enhanceCheckout(bookID) {
    return enhance(() => {
    return async ({ result }) => {
        if (result.type === 'success') {
        errors[bookID] = '';
        markAsCheckedOut(bookID);
        } else if (result.type === 'failure') {
        errors[bookID] = result.data?.error || 'Checkout failed.';
        }
    };
    });
}
function enhanceCheckIn(bookID) {
    return enhance(() => {
    return async ({ result }) => {
        if (result.type === 'success') {
        errors[bookID] = '';
        markAsReturned(bookID);
        } else if (result.type === 'failure') {
        errors[bookID] = result.data?.error || 'Check-in failed.';
        }
    };
    });
}
</script>

{#if items.length === 0}
    <p class="text-sm text-zinc-600">No books to show.</p>
{:else}
    <!-- Books grid (responsive columns at sm and lg breakpoints) -->
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {#each items as b}
        <!-- Card -->
        <div class="border rounded p-3 bg-white">
            <!-- Cover image or fallback initial -->
            {#if b.CoverUrl}
            <img
                src={b.CoverUrl}
                alt={"Cover of " + b.Title}
                class="w-full h-40 object-contain bg-zinc-50 rounded mb-3"
            />
            {:else}
            <div
                class="w-full h-40 bg-zinc-100 rounded mb-3 flex items-center justify-center text-4xl font-bold"
                aria-label={"No cover available for " + b.Title}
                title={"No cover available"}
            >
                {initial(b.Title)}
            </div>
            {/if}

            <!-- Title + Author -->
            <a href={"/book/" + b.bookID} class="block hover:underline">
            <h2 class="text-lg font-semibold">{b.Title}</h2>
            </a>
            <p class="text-sm text-zinc-700">by {b.Author}</p>

            <!-- Genres (if any) -->
            {#if b.Genres && b.Genres.length > 0}
            <p class="mt-1 text-xs text-zinc-600">
                Genres: {genresText(b.Genres)}
            </p>
            {/if}

            <!-- Short abstract preview -->
            {#if b.Abstract}
            <p class="mt-2 text-sm text-zinc-800">
                {clip(b.Abstract, 160)}
            </p>
            {/if}

            <!-- Buttons (AJAX-submit via `use:enhance`) -->
            <div class="mt-3 flex gap-3 items-center">
            {#if b.canCheckout}
                <form method="POST" use:enhance={enhanceCheckout(b.bookID)}>
                <input type="hidden" name="bookID" value={b.bookID} />
                <button formaction="?/checkout" class="btn">Check out</button>
                </form>
            {:else if b.canCheckIn}
                <form method="POST" use:enhance={enhanceCheckIn(b.bookID)}>
                <input type="hidden" name="bookID" value={b.bookID} />
                <button formaction="?/checkIn" class="btn-outline">Check in</button>
                </form>
            {/if}

            <!-- Per-card error (ARIA live for quick feedback) -->
            {#if errors[b.bookID]}
                <p class="text-sm text-red-600" aria-live="polite">{errors[b.bookID]}</p>
            {/if}
            </div>
        </div>
        {/each}
    </div>
{/if}
