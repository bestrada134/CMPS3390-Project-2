// src/routes/(app)/books/+page.server.js
// Reads query params from the URL (?title=...&author=...&genres=...&genresMode=has)
// and returns { books, error, filters } to +page.svelte.


// model -> controller -> page.server -> page.svelte

import {
    getBook
} from '$controllers/book.controller.js';

/** @type {import('./$types').PageServerLoad} */
export function load({ url }) {
    // Grabs the path from url
    let pathname = url.pathname;
        // console.log(pathname);
    // Splits the path to get the id
    const id = pathname.split('/book/')[1];
        // console.log(id);
    const result = getBook(id);

    // Whatever we got (book + error|null), return it to the page.
    return {
        ...result
    };
}
