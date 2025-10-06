// src/models/user.model.js
/**
 * User Model
 * ----------
 * This is the **only place** that talks directly to the database for user data.
 * We keep SQL here and return plain JS objects so controllers/routes stay simple.
 *
 * Why we "rebuild" row objects:
 * - The DB driver (.get()) returns an object of unknown shape to the type checker.
 * - TypeScript (even in JS projects) thinks it's `{}` which causes errors.
 * - By returning a new object with the exact fields we declare in JSDoc,
 *   the type checker is happy and beginners get predictable shapes.
 */

import { db } from '../lib/db.js';

/**
 * Insert a new user row.
 * Controller **must** pass a hashed password (never store raw!).
 *
 * @param {{ Username:string, Email:string, PasswordHash:string }} params
 * @returns {number} Newly created user id (userID)
 */
export function insertUser({ Username, Email, PasswordHash }) {
    const info = db
        .prepare('INSERT INTO User (Username, Email, Password) VALUES (?, ?, ?)')
        .run(Username, Email, PasswordHash);

    // lastInsertRowid is a BigInt-like value; convert to a simple number for convenience.
    return Number(info.lastInsertRowid);
}

/**
 * Find a user's **public** info by id (no password included).
 *
 * @param {number} userID
 * @returns {{ userID:number, Username:string, Email:string } | null}
 */
export function findUserById(userID) {
    const row = db
        .prepare('SELECT userID, Username, Email FROM User WHERE userID = ?')
        .get(userID);

    // Rebuild the object to match JSDoc exactly (avoid "{}" inference):
    return row
        ? { userID: row.userID, Username: row.Username, Email: row.Email }
        : null;
}

/**
 * Check if a username exists.
 *
 * @param {string} username
 * @returns {{ userID:number } | null}
 */
export function findByUsername(username) {
    const row = db
        .prepare('SELECT userID FROM User WHERE Username = ?')
        .get(username);

    // Return a consistent shape (or null)
    return row ? { userID: row.userID } : null;
}

/**
 * Check if an email exists.
 *
 * @param {string} email
 * @returns {{ userID:number } | null}
 */
export function findByEmail(email) {
    const row = db
        .prepare('SELECT userID FROM User WHERE Email = ?')
        .get(email);

    return row ? { userID: row.userID } : null;
}

/**
 * Find a user by **username OR email**, including the password hash (for login).
 * Controllers use this to verify passwords via bcrypt.
 *
 * @param {string} identifier - either the Username or the Email
 * @returns {{ userID:number, Username:string, Email:string, Password:string } | null}
 */
export function findWithHashByIdentifier(identifier) {
    const row = db
        .prepare(
            `SELECT userID, Username, Email, Password
       FROM User
       WHERE Username = ? OR Email = ?`
        )
        .get(identifier, identifier);

    // Important: return the exact shape we declare in JSDoc, or null.
    return row
        ? {
            userID: row.userID,
            Username: row.Username,
            Email: row.Email,
            Password: row.Password
        }
        : null;
}
