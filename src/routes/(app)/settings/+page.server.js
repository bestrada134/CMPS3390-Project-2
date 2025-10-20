/** @type {import('./$types').PageServerLoad} */
import {fail} from '@sveltejs/kit';
import { update } from '$controllers/settings.controller.js';

export const actions = {

    update: async ({ request, locals }) => {
        // Read form fields by their "name" attributes
        const fd = await request.formData();

        const userID = Number(locals.user?.userID);
        const column = String(fd.get('column') || '').trim();
        const value = String(fd.get('newValue') || '').trim();

        try {
            const user = update( userID, column, value );
            
            /* validation debugger */
            // console.log(user);
    
            return {
                user,
                where: 'update'
            };
        } catch (e) {
            return fail(400, {
                where: 'update',
                error: e?.message || 'Update failed'
            });
        }
    }
};