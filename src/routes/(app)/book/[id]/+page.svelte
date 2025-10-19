<!-- src/routes/(app)/book/[id]/+page.svelte -->
<script>
// when you load real book data, bind its Title here
/** @type {{ book?: any, error?: string, canCheckout?: boolean, canCheckIn?: boolean }} */
export let data; // { book: { Title: string, ... }, canCheckout, canCheckIn }

import { enhance } from '$app/forms';

let errorMsg = '';

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

/** Show genres as a comma-separated line */
/**
 *
 * @param {string[]} arr
 */
function genresText(arr) {
    if (!arr || arr.length === 0) return '';
    return arr.join(', ');
}

// Flip flags locally after enhance succeeds
function afterCheckout() {
    errorMsg = '';
    data = { ...data, canCheckout: false, canCheckIn: true };
}
function afterCheckIn() {
    errorMsg = '';
    data = { ...data, canCheckout: true, canCheckIn: false };
}

function enhanceCheckout() {
    return enhance(() => {
    return async ({ result }) => {
        if (result.type === 'success') afterCheckout();
        else if (result.type === 'failure') errorMsg = result.data?.error || 'Checkout failed.';
    };
    });
}

function enhanceCheckIn() {
    return enhance(() => {
    return async ({ result }) => {
        if (result.type === 'success') afterCheckIn();
        else if (result.type === 'failure') errorMsg = result.data?.error || 'Check-in failed.';
    };
    });
}
</script>

<svelte:head>
    <title>{data?.book?.Title ?? "Book"} | Library Tracker</title>
</svelte:head>

<section class="app-container">
    <div class="stage">
        {#if data?.error}
        <div class="state-center">
            <div class="w-full max-w-md rounded-lg border border-red-200 bg-red-50 p-4 text-center shadow-sm">
            <p class="text-red-700 font-medium">{data.error}</p>
            </div>
        </div>
        {:else}
        <div class="card">
            <div class="grid gap-6 sm:grid-cols-[10rem,1fr] sm:items-start">
            <div class="mx-auto sm:mx-0">
                {#if data.book.CoverUrl}
                <div class="relative h-52 w-40 rounded-lg border border-zinc-200 bg-zinc-50 p-1 shadow-sm">
                    <img
                    src={data.book.CoverUrl}
                    alt={"Cover of " + (data.book.Title ?? "the book")}
                    class="absolute inset-0 h-full w-full object-contain"
                    loading="eager"
                    />
                </div>
                {:else}
                <div
                    class="h-52 w-40 rounded-lg border border-zinc-200 bg-zinc-50 shadow-sm
                        flex items-center justify-center"
                    aria-label="No cover available"
                >
                    <span class="text-5xl font-bold text-zinc-500">{initial(data.book.Title)}</span>
                </div>
                {/if}
            </div>

            <div>
                <h2 class="text-xl font-bold text-zinc-900">{data.book.Title}</h2>

                {#if data.book.Author}
                <p class="mt-1 text-sm text-zinc-600">by {data.book.Author}</p>
                {/if}

                {#if data.book.Genres && data.book.Genres.length > 0}
                <p class="mt-2 text-sm text-zinc-700">
                    {genresText(data.book.Genres)}
                </p>
                {/if}

                {#if data.book.Abstract}
                <p class="mt-4 whitespace-pre-line text-zinc-800 leading-relaxed">
                    {data.book.Abstract}
                </p>
                {/if}

                <div class="mt-4 flex gap-3 items-center">
                {#if data.canCheckout}
                    <form method="POST" use:enhance={enhanceCheckout()}>
                    <input type="hidden" name="bookID" value={data.book.bookID} />
                    <button formaction="?/checkout" class="btn">Check out</button>
                    </form>
                {:else if data.canCheckIn}
                    <form method="POST" use:enhance={enhanceCheckIn()}>
                    <input type="hidden" name="bookID" value={data.book.bookID} />
                    <button formaction="?/checkIn" class="btn-outline">Check in</button>
                    </form>
                {/if}

                {#if errorMsg}
                    <p class="text-sm text-red-600" aria-live="polite">{errorMsg}</p>
                {/if}
                </div>
            </div>
            </div>
        </div>
        {/if}
    </div>
</section>
