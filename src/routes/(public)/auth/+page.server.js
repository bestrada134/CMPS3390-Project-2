// src/routes/(public)/auth/+page.server.js

/**
 * Auth Page (Server)
 * ------------------
 * SvelteKit "page server" file for the /auth screen.
 * Here we define **form actions** that handle signup and login.
 *
 * IMPORTANT:
 * - Actions run on the server.
 * - We read the <form> fields with `request.formData()`.
 * - We call our controller functions (signup/login) to do the real work.
 * - We set or clear cookies here (controller doesn't touch cookies).
 */

import { redirect, fail } from '@sveltejs/kit';
import { signup, login } from '$controllers/auth.controller.js';

// Cookie helper: a tiny function to set the "uid" cookie
// so our hooks.server.js can recognize the logged-in user later.
const ONE_DAY = 60 * 60 * 24;
/**
 * Save the user's id in a cookie.
 * In production, `secure: true` ensures cookies only go over HTTPS.
 */
function setUidCookie(cookies, userID) {
    cookies.set('uid', String(userID), {
        path: '/',                // cookie is valid for the whole site
        httpOnly: true,           // not readable by client JS
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: ONE_DAY
    });
}

/**
 * The actions object exposes functions that match your <form action="?/name">.
 * Example:
 *   <form method="POST" action="?/signup"> → calls actions.signup
 *   <form method="POST" action="?/login">  → calls actions.login
 */
export const actions = {
    /**
     * Create a new account.
     * Reads fields from the signup form, calls controller.signup,
     * and returns a small payload the page can use (e.g., show success).
     */
    signup: async ({ request }) => {
        // 1) Read form fields by their "name" attributes
        const fd = await request.formData();
        const Username = String(fd.get('username') || '').trim();
        const Email = String(fd.get('email') || '').trim();
        const Password = String(fd.get('pw') || '');

        try {
            // 2) Run business logic (validates, hashes, inserts)
            const user = signup({ Username, Email, Password });
            // stay on /auth and show success message
            return {
                where: 'login',         // tells +page.svelte which form to show
                created: true,          // true → show a green success box
            };
        } catch (e) {
            return fail(400, {
                where: 'signup',
                error: e?.message || 'Sign up failed',
                values: { username: Username, email: Email }
            });
        }
    },

    /**
     * Log in with either username or email (identifier) + password.
     * On success, we set the cookie and redirect to the dashboard.
     */
    login: async ({ request, cookies }) => {
        const fd = await request.formData();

        const identifier = String(fd.get('user') || '').trim();
        const password = String(fd.get('pw') || '');

        // Basic guard to help the user
        if (!identifier || !password) {
            return fail(400, {
                where: 'login',
                error: 'Enter username/email and password.',
                values: { user: identifier }
            });
        }

        // Ask the controller to verify credentials
        const user = login({ identifier, password });
        if (!user) {
            return fail(400, {
                where: 'login',
                error: 'Invalid credentials',
                values: { user: identifier }
            });
        }

        // Save session as a simple cookie and go to dashboard
        setUidCookie(cookies, user.userID);
        throw redirect(302, '/dashboard');
    }
};
