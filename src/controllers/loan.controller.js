// src/controllers/loan.controller.js
// PURPOSE: Minimal validation + delegate to the model.
// - Controller does *light* input checks (IDs must be positive numbers).
// - Model owns the business rules (e.g., “book already loaned”).
// - Pages (+page.server.js actions) catch errors and show messages.

/**
 * @typedef {Object} LoanedItem
 * @property {number} loanID
 * @property {number} bookID
 * @property {string} Title
 * @property {string|null} Author
 * @property {string|null} CoverUrl
 */

import {
    checkoutBook,             // model: creates a loan row -> { loanID, userID, bookID }
    returnBook,               // model: deletes a loan row -> boolean
    getActiveLoansByUser,     // model: returns LoanedItem[]
    countActiveLoansForUser   // model: returns number
} from '$models/loan.model.js';

/**
 * Small helper: ensure an ID is a positive number.
 * Converts strings from forms (e.g., "12") into Numbers (12).
 * Throws if invalid so pages can show a friendly error.
 * @param {any} n
 * @returns {number}
 */
function asId(n) {
    const v = Number(n);
    if (!Number.isFinite(v) || v <= 0) {
        throw new Error('Invalid id.');
    }
    return v;
}

/**
 * Check OUT a book for the current user.
 * - Validates inputs
 * - Delegates to the model (which enforces “already loaned” rules)
 *
 * @param   {{ userID:any, bookID:any }} input
 * @returns {{ loanID:number, userID:number, bookID:number }}
 *
 * @example
 * // In a +page.server.js action:
 * const fd = await request.formData();
 * const bookID = fd.get('bookID');
 * const userID = locals.user.userID;
 * const loan = checkout({ userID, bookID });
 */
export function checkout({ userID, bookID }) {
    const uid = asId(userID);
    const bid = asId(bookID);
    return checkoutBook(uid, bid);
}

/**
 * Check IN (return) a book for the current user.
 * - Validates inputs
 * - Calls model; if nothing was returned, throws so the page can show a message
 *
 * @param   {{ userID:any, bookID:any }} input
 * @returns {{ ok:true }}
 *
 * @example
 * const ok = checkIn({ userID: locals.user.userID, bookID: fd.get('bookID') });
 */
export function checkIn({ userID, bookID }) {
    const uid = asId(userID);
    const bid = asId(bookID);

    const removed = returnBook(uid, bid); // boolean
    if (!removed) {
        // Nothing matched this (userID, bookID) pair
        throw new Error('Nothing to return.');
    }
    return { ok: true };
}

/**
 * Load a user’s current loans (for dashboard/sidebar).
 *
 * @param   {any} userID
 * @returns {{ items: LoanedItem[], count: number }}
 *
 * @example
 * const { items, count } = loadUserLoans(data.user.userID);
 */
export function loadUserLoans(userID) {
    const uid = asId(userID);
    return {
        items: getActiveLoansByUser(uid),
        count: countActiveLoansForUser(uid)
    };
}
