// src/models/user.model.js
import { db } from '../lib/db.js';

export function insertUser({ Username, Email, PasswordHash }) {
    const info = db.prepare(
        'INSERT INTO User (Username, Email, Password) VALUES (?, ?, ?)'
    ).run(Username, Email, PasswordHash);
    return Number(info.lastInsertRowid);
}

export function findUserById(userID) {
    return db.prepare(
        'SELECT userID, Username, Email FROM User WHERE userID = ?'
    ).get(userID) ?? null; // ← important: null, not {}
}

export function findByUsername(username) {
    return db.prepare('SELECT userID FROM User WHERE Username = ?').get(username) ?? null;
}

export function findByEmail(email) {
    return db.prepare('SELECT userID FROM User WHERE Email = ?').get(email) ?? null;
}

export function findWithHashByIdentifier(identifier) {
    return db.prepare(
        `SELECT userID, Username, Email, Password
     FROM User
     WHERE Username = ? OR Email = ?`
    ).get(identifier, identifier) ?? null;
}
