// src/routes/(app)/books/+page.server.js
// Reads query params from the URL (?title=...&author=...&genres=...&genresMode=has)
// and returns { books, error, filters } to +page.svelte.

import {
    listLibrary,
    listLibraryFiltered
} from '$controllers/book.controller.js';

/** @type {import('./$types').PageServerLoad} */
export function load({ url }) {
    const title = url.searchParams.get('title') || '';
    const author = url.searchParams.get('author') || '';
    const genres = url.searchParams.get('genres');         // may be null
    const genresMode = url.searchParams.get('genresMode') || 'contain';

    const hasAnyFilter =
        (title.trim() !== '') ||
        (author.trim() !== '') ||
        (genres && genres.trim() !== '');

    const result = hasAnyFilter
        ? listLibraryFiltered({
            title,
            author,
            genres,       // CSV string like "Fantasy, Adventure"
            genresMode    // "contain" or "has"
        })
        : listLibrary();

    // Whatever we got (books[] + error|null), return it to the page.
    return {
        ...result,
        filters: {
            title,
            author,
            genres: genres || '',
            genresMode
        }
    };
}
