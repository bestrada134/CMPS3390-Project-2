<!-- src/routes/(app)/books/+page.svelte -->
<script>
/**
* Books List (UI only)
* --------------------
* This page shows:
* - A simple filter row (Title, Author, Genres) — not wired yet.
* - A responsive grid of "book cards".
* - Each card: cover (or fallback initial), title, author, genres, short abstract preview.
*
* In the next step we will:
* - Replace mockBooks with real data from the server.
* - Make the filters actually filter by using +page.server.js and query params.
*/

import Filter from "$components/books/Filter.svelte";
import Library from "$components/books/Library.svelte";

/** @type {import('./$types').PageData} */
export let data;

</script>

<svelte:head>
<title>Books | Library Tracker</title>
</svelte:head>
<!-- Page title -->
<h1 class="text-2xl font-bold mb-4">Library</h1>

{#if data.error}
    <p class="mb-4 rounded bg-red-50 text-red-700 p-3">{data.error}</p>
{/if}

<Filter/>
<Library books={data.books} />
