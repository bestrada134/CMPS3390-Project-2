// src/routes/(public)/auth/+page.server.js
import { redirect, fail } from '@sveltejs/kit';
import { signup, login } from '../../../controllers/auth.controller.js';

const ONE_DAY = 60 * 60 * 24;
function setUidCookie(cookies, userID) {
    cookies.set('uid', String(userID), {
        path: '/', httpOnly: true, sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production', maxAge: ONE_DAY
    });
}

export const actions = {
    signup: async ({ request, cookies }) => {
        const fd = await request.formData();
        const Username = String(fd.get('username') || '').trim();
        const Email = String(fd.get('email') || '').trim();
        const Password = String(fd.get('pw') || '');

        try {
            const user = signup({ Username, Email, Password });
            // choose ONE behavior:

            // A) auto-login:
            // setUidCookie(cookies, user.userID);
            // throw redirect(302, '/auth');

            // B) or stay on /auth and show a notice:
            return { created: true, username: user.Username };
        } catch (e) {
            return fail(400, { error: e?.message || 'Sign up failed' });
        }
    },

    login: async ({ request, cookies }) => {
        const fd = await request.formData();
        const identifier = String(fd.get('id') ?? fd.get('user') ?? '').trim();
        const password = String(fd.get('pw') || '');
        if (!identifier || !password)
            return fail(400, { error: 'Enter username/email and password.' });

        const user = login({ identifier, password });
        if (!user)
            return fail(400, { error: 'Invalid credentials' });

        setUidCookie(cookies, user.userID);
        throw redirect(302, '/dashboard');
    }
};
