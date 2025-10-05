// src/controllers/auth.controller.js
import bcrypt from 'bcryptjs';
import {
    insertUser, findByUsername, findByEmail, findWithHashByIdentifier
} from '../models/user.model.js';

export function signup({ Username, Email, Password }) {
    if (!Username || !Email || (Password || '').length < 6) {
        throw new Error('Username, Email, and password (≥ 6) are required.');
    }
    const uname = Username.trim();
    const email = Email.trim().toLowerCase();

    if (findByUsername(uname))
        throw new Error('Username is already taken.');
    if (findByEmail(email))
        throw new Error('Email is already registered.');

    const PasswordHash = bcrypt.hashSync(Password, 10);
    const userID = insertUser({
        Username: uname,
        Email: email,
        PasswordHash
    });

    return {
        userID,
        Username: uname,
        Email: email
    };
}

export function login({ identifier, password }) {
    const row = findWithHashByIdentifier(identifier);
    if (!row) return null;
    const ok = bcrypt.compareSync(password, row.Password);
    return ok ? {
        userID: row.userID,
        Username: row.Username,
        Email: row.Email
    } : null;
}
