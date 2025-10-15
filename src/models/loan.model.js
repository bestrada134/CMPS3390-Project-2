// src/models/loan.model.js
/**
 * Loan Model
 * ----------
 * This is the **only place** that talks directly to the database for loan data.
 * We keep SQL here and return plain JS objects so controllers/routes stay simple.
 *
 */

import { db } from '../lib/db.js';

/**
 * Is the book currently loaned by anyone?
 * @param {number} bookID - The ID of the book to check.
 * @returns {boolean} - True if the book is loaned, false otherwise.
 */
export function isBookLoaned(bookID) {
    const row = db
        .prepare("SELECT loanID FROM Loaned WHERE bookID = ? LIMIT 1")
        .get(bookID);
    return !!row;  // <- Convert to boolean (true if row exists, false if undefined)
}

/**
 * Is the book currently loaned by THIS user?
 * @param {number} userID - The ID of the user to check.
 * @param {number} bookID - The ID of the book to check.
 * @returns {boolean} - True if the book is loaned by this user, false otherwise.
 */
export function isBookLoanedByUser(userID, bookID) {
    const row = db
        .prepare("SELECT loanID FROM Loaned WHERE userID = ? AND bookID = ? LIMIT 1")
        .get(userID, bookID);
    return !!row;
}

/**
 * checkout a book to a user
 * @param {number} userID - The ID of the user checking out the book.
 * @param {number} bookID - The ID of the book to check out.
 * @returns {{ loanID:number, userID:number, bookID:number }} - The newly created loan record.
 */
export function checkoutBook(userID, bookID) {
    const alreadyLoaned = isBookLoaned(bookID);
    if (alreadyLoaned) {
        throw new Error("Book is currently loaned by someone else");
    }

    const alreadyLoanedByUser = isBookLoanedByUser(userID, bookID);
    if (alreadyLoanedByUser) {
        throw new Error("You have this book checked out already");
    }

    const result = db
        .prepare("INSERT INTO Loaned (userID, bookID) VALUES (?, ?)")
        .run(userID, bookID);

    return {
        loanID: Number(result.lastInsertRowid),
        userID,
        bookID
    };
}

/**
 * Return a book that was checked out by a user
 * @param {number} userID - The ID of the user returning the book.
 * @param {number} bookID - The ID of the book being returned.
 * @return {boolean} - True if the book was successfully returned, false otherwise.
 */
export function returnBook(userID, bookID) {
    const result = db
        .prepare("DELETE FROM Loaned WHERE userID = ? AND bookID = ?")
        .run(userID, bookID);
    return result.changes > 0;  // <- True if a row was deleted, false otherwise
}

/**
 * A single "loaned book" row for the dashboard list.
 * @typedef {Object} LoanedItem
 * @property {number} loanID
 * @property {number} bookID
 * @property {string} Title
 * @property {string|null} Author
 * @property {string|null} CoverUrl
 */

/**
 * Get all books currently loaned by a user
 * For the dashboard page
 * @param {number} userID - The ID of the user.
 * @returns {LoanedItem[]} - An array of loaned book records.
 */
export function getActiveLoansByUser(userID) {
    const id = Number(userID);
    if (Number.isNaN(id) || !Number.isInteger(id) || id <= 0) {
        throw new Error('Invalid userID.');
    }

    // Join Loaned with Book to get book details
    const sql = `
    SELECT 
      L.loanID,
      L.bookID,
      B.Title,
      B.Author,
      B.CoverUrl
    FROM Loaned AS L
    JOIN Book AS B ON L.bookID = B.bookID
    WHERE L.userID = ?
    ORDER BY B.Title COLLATE NOCASE ASC
  `;
    return db.prepare(sql).all(userID);
}

/**
 * Count of ACTIVE loans for a given user.
 * @param   {number} userID
 * @returns {number}
 */
export function countActiveLoansForUser(userID) {
    const row = db
        .prepare('SELECT COUNT(*) AS n FROM Loaned WHERE userID = ?')
        .get(userID);
    return Number(row.n);
}

/* functionality for list-page buttons */
/** All currently-loaned bookIDs (for the list page). */
export function getAllActiveLoanedBookIDs() {
    const rows = db.prepare('SELECT DISTINCT bookID FROM Loaned').all();
    return new Set(rows.map(r => Number(r.bookID)));
}
