<!-- src/lib/components/books/Library.svelte -->
<script>
/**
 * Library (UI only for now)
 * -------------------------
 * This component receives a list of books as a prop named `books`
 * and renders a simple, responsive grid of "book cards".
 *
 * Expected shape for each book:
 * { bookID, Title, Author, Genres: string[], Abstract?, CoverUrl? }
 */

/** Accept a `books` prop from the parent page. Default to [] if missing. */
let { books = [] } = $props();

/** First letter fallback (used when there is no CoverUrl) */
/**
 * 
 * @param {String} t
 */
function initial(t) {
    if (!t) return "?";
        const s = String(t).trim();
    if (s.length === 0) return "?";
        return s.charAt(0).toUpperCase();
}

/** Keep abstracts short so the card stays compact */
/**
 * 
 * @param {String} s
 * @param {Number} max
 */
function clip(s, max) {
if (!s) return "";
const txt = String(s);
if (txt.length <= max) return txt;
return txt.slice(0, max - 1).trimEnd() + "…";
}

/** Show genres as a comma-separated line */
/**
 * 
 * @param arr
 */
function genresText(arr) {
if (!arr || arr.length === 0) return "";
return arr.join(", ");
}
</script>

<!-- Books grid (responsive columns at sm and lg breakpoints) -->
{#if books.length === 0}
<p class="text-sm text-zinc-600">No books to show.</p>
{:else}
<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {#each books as b}
    <!-- Each card links to /book/[id] -->
    <a
        href={"/book/" + b.bookID}
        class="block border rounded p-3 bg-white hover:shadow transition"
    >
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
        <h2 class="text-lg font-semibold">{b.Title}</h2>
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
    </a>
    {/each}
</div>
{/if}
