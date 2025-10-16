// src/routes/(app)/book/[id]/+page.server.js
// Reads the route param (:id), loads the book, and computes button flags:
// - canCheckout = book is not loaned by anyone
// - canCheckIn  = this user currently has the book
//
// Also exposes POST actions (?/checkout and ?/checkIn).

import { fail } from '@sveltejs/kit';
import { getBook } from '$controllers/book.controller.js';
import { isBookLoaned, isBookLoanedByUser } from '$models/loan.model.js';
import { checkout, checkIn } from '$controllers/loan.controller.js';

/** @type {import('./$types').PageServerLoad} */
export function load({ params, locals }) {
    // Get the id from the route params (easier than splitting pathname)
    const bookID = Number(params.id);
    if (!Number.isFinite(bookID) || bookID <= 0) return { error: 'Invalid book id.' };

    // Controller returns { book } or { error }
    const { book, error } = getBook(bookID);
    if (error) return { error };
    if (!book) return { error: 'Book not found.' };

    const userID = locals.user?.userID ?? null;

    // Compute flags for the UI buttons
    const loanedByAnyone = isBookLoaned(bookID);
    const loanedByUser = userID ? isBookLoanedByUser(userID, bookID) : false;

    return {
        book,
        canCheckout: !loanedByAnyone,
        canCheckIn: loanedByUser
    };
}

/** @type {import('./$types').Actions} */
export const actions = {
    /**
     * loan functionality
     * The actions object exposes functions that match your <form action="?/name">.
     * Example:
     *   <form method="POST" action="?/checkout"> → calls actions.checkout
     *   <form method="POST" action="?/checkIn">  → calls actions.checkIn
     */
    checkout: async ({ request, locals }) => {
        const userID = locals.user?.userID;
        if (!userID) return fail(401, { error: 'Please log in to check out books.' });

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
        if (!userID) return fail(401, { error: 'Please log in to return books.' });

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
