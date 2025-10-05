/**
 * Runs on every request; passes data to +layout.svelte.
 * We'll wire real auth later; for now, keep user = null.
 */
export const load = async ({ locals }) => {
    return { user: locals.user };
};

