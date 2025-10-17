// src/hooks.server.js
import { findUserById } from '$models/user.model.js';

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
    const id = Number(event.cookies.get('uid'));
    event.locals.user = Number.isFinite(id) ? (findUserById(id) ?? null) : null;
    return resolve(event);
};
