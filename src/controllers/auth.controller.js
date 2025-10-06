/**
 * Auth Controller
 * ----------------
 * This file holds the **business logic** for authentication.
 * - It does NOT talk to HTTP or cookies directly (that's the route's job).
 * - It DOES validate inputs, hash/check passwords, and call the model.
 *
 * How teammates use it:
 * - From a SvelteKit action (e.g. in +page.server.js), call `signup(...)` or `login(...)`
 *   and handle the result (set cookie, redirect, show message).
 */

import bcrypt from 'bcryptjs';
import {
    insertUser,
    findByUsername,
    findByEmail,
    findWithHashByIdentifier
} from '$models/user.model.js';

/**
 * Create a new user account.
 *
 * @param {{ Username:string, Email:string, Password:string }} params
 *   - Username: required (string)
 *   - Email:    required (string), we normalize to lowercase
 *   - Password: required (string), must be at least 6 chars
 *
 * @returns {{ userID:number, Username:string, Email:string }}
 *   The newly created user's public info (no password).
 *
 * Throws:
 *   - Error if validation fails or username/email already exists
 *
 * Callers:
 *   - SvelteKit action in routes/(public)/auth/+page.server.js → actions.signup
 */
export function signup({ Username, Email, Password }) {
    // 1) Basic validation (keep it simple and clear)
    if (!Username || !Email || (Password || '').length < 6) {
        throw new Error('Username, Email, and password (≥ 6) are required.');
    }

    // 2) Normalize user input a bit
    const uname = Username.trim();
    const email = Email.trim().toLowerCase();

    // 3) Soft duplicate checks (we could also enforce UNIQUE at DB level later)
    if (findByUsername(uname)) throw new Error('Username is already taken.');
    if (findByEmail(email)) throw new Error('Email is already registered.');

    // 4) Hash the password before storing it (never store raw passwords!)
    const PasswordHash = bcrypt.hashSync(Password, 10);

    // 5) Create user in DB (model returns new id)
    const userID = insertUser({ Username: uname, Email: email, PasswordHash });

    // 6) Return public profile (NO password)
    return { userID, Username: uname, Email: email };
}

/**
 * Attempt to log a user in.
 *
 * @param {{ identifier:string, password:string }} params
 *   - identifier: username OR email (we accept either)
 *   - password:   the user's password (raw), will be checked against hash
 *
 * @returns {{ userID:number, Username:string, Email:string } | null}
 *   - Returns a user object on success, or null if credentials are invalid.
 *
 * Callers:
 *   - SvelteKit action in routes/(public)/auth/+page.server.js → actions.login
 */
export function login({ identifier, password }) {
    // 1) Load the row including the password hash, matching either Username OR Email
    const row = findWithHashByIdentifier(identifier);
    if (!row) return null;

    // 2) Compare raw password to stored bcrypt hash (true if matches)
    const ok = bcrypt.compareSync(password, row.Password);

    // 3) Return a public user shape (or null on failure)
    return ok
        ? { userID: row.userID, Username: row.Username, Email: row.Email }
        : null;
}
