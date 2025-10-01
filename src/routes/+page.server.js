import { redirect } from '@sveltejs/kit';

/**
 * Redirect "/" to "/auth" so you land on the button screen first.
 * Later, when auth exists, you can redirect to "/dashboard" if logged in.
 */
export const load = async () => {
    throw redirect(302, '/auth');
};
