// src/routes/(public)/auth/+server.js
import { redirect } from '@sveltejs/kit';

/**
 * POST /auth?logout=1
 * Clears the "uid" cookie (we set it on login/signup) and sends you to /auth.
 * This lives in +server.js because HTTP method handlers go in +server.js,
 * not in +page.server.js.
 */
export const POST = async ({ url, cookies }) => {
    if (url.searchParams.get('logout')) {
        // IMPORTANT: path must match the one used when setting the cookie
        cookies.delete('uid', { path: '/' });
        throw redirect(302, '/auth');
    }
    return new Response('Bad request', { status: 400 });
};
