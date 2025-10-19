// src/routes/(app)/books/+page.server.js
// Reads query params from the URL (?title=...&author=...&genres=...&genresMode=has)
// and returns { books, error, filters } to +page.svelte.
//
// Computes button flags per book so the list can show the right button(s).

import {
        listLibrary,
        listLibraryFiltered
        } from '$controllers/book.controller.js';

import {
        getAllActiveLoanedBookIDs,
        getActiveLoansByUser
        } from '$models/loan.model.js';

import {
        checkout,
        checkIn
        } from '$controllers/loan.controller.js';

import {fail} from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export function load({ url, locals }) {
    const title = url.searchParams.get('title') || '';
    const author = url.searchParams.get('author') || '';
    const genres = url.searchParams.get('genres');      // may be null
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

    // Compute flags per book for the UI buttons
    const loanedSet = getAllActiveLoanedBookIDs(); // Set of bookIDs loaned by anyone
    const mySet = locals.user
        ? new Set(getActiveLoansByUser(locals.user.userID).map(x => x.bookID))
        : new Set();

    const books = (result.books || []).map(b => ({
        ...b,
        canCheckout: !loanedSet.has(b.bookID),
        canCheckIn: mySet.has(b.bookID)
    }));

    // Whatever we got (books[] + error|null), return it to the page.
    return {
        ...result,
        books,
        filters: {
            title,
            author,
            genres: genres || '',
            genresMode
        }
    };
}

/** @type {import('./$types').Actions} */
export const actions = {
    checkout: async ({ request, locals }) => {
        const userID = locals.user?.userID;
        if (!userID) return fail(401, { error: 'Please log in.' });

        const fd = await request.formData();
        const bookID = Number(fd.get('bookID'));
        try {
            const result = checkout({ userID, bookID });
            return { ok: true, loanID: result.loanID };
        } catch (e) {
            return fail(400, { error: e?.message || 'Checkout failed.' });
        }
    },

    checkIn: async ({ request, locals }) => {
        const userID = locals.user?.userID;
        if (!userID) return fail(401, { error: 'Please log in.' });

        const fd = await request.formData();
        const bookID = Number(fd.get('bookID'));
        try {
            checkIn({ userID, bookID });
            return { ok: true };
        } catch (e) {
            return fail(400, { error: e?.message || 'Check-in failed.' });
        }
    }
};
