//  src/routes/logout/+server.js
import { redirect } from '@sveltejs/kit';

export const POST = async ({ cookies }) => {
    // path MUST match how you set it when logging in
    cookies.delete('uid', { path: '/' });
    throw redirect(302, '/auth');
};

/* Quick probe so you can visit /logout in the browser
   If you GET /logout and see this text, the route exists.
   Remove after you verify.
*/
// export const GET = () => new Response('logout endpoint OK', { status: 200 });
