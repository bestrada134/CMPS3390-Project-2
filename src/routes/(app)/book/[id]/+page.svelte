<!-- src/routes/(app)/book/[id]/+page.svelte -->
<script>
    // when you load real book data, bind its Title here
    export let data; // { book: { Title: string, ... } }

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


    /** Show genres as a comma-separated line */
    /**
     * 
     * @param {string[]} arr
     */
    function genresText(arr) {
        if (!arr || arr.length === 0) 
            return "";
        return arr.join(", ");
    }
</script>

<svelte:head>
    <title>{data?.book?.Title ?? "Book"} | Library Tracker</title>
</svelte:head>

<!-- Page shell (centered by your global .app-container) -->
<section class="app-container">
    <div class="stage">
        
        {#if data?.error}
        <!-- Centered error state -->
        <div class="state-center">
            <div class="w-full max-w-md rounded-lg border border-red-200 bg-red-50 p-4 text-center shadow-sm">
            <p class="text-red-700 font-medium">{data.error}</p>
            </div>
        </div>

        {:else if !data?.book}
        <!-- Centered loading skeleton -->
        <div class="state-center">
            <div class="w-full max-w-3xl animate-pulse">
            <div class="h-6 w-40 rounded bg-zinc-200 mb-4"></div>
            <div class="grid gap-6 sm:grid-cols-[10rem,1fr]">
                <div class="h-52 w-40 rounded bg-zinc-200"></div>
                <div class="space-y-3">
                <div class="h-6 w-2/3 rounded bg-zinc-200"></div>
                <div class="h-4 w-1/3 rounded bg-zinc-200"></div>
                <div class="h-4 w-1/2 rounded bg-zinc-200"></div>
                <div class="h-4 w-full rounded bg-zinc-200"></div>
                <div class="h-4 w-5/6 rounded bg-zinc-200"></div>
                </div>
            </div>
            </div>
        </div>

        {:else}
        <!-- Content card -->
        <div class="card">
            <!-- Two-column layout: cover left, details right -->
            <div class="grid gap-6 sm:grid-cols-[10rem,1fr] sm:items-start">
            <!-- Cover image OR initial fallback -->
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

            <!-- Book details -->
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
            </div>
            </div>
        </div>
        {/if}
    </div>
</section>