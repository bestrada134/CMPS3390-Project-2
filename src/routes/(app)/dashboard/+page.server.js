import { loadUserLoans } from '$controllers/loan.controller';

/** @type {import('./$types').PageServerLoad} */
export async function load({locals}) {
    const userID = locals.user.userID;
    const result = loadUserLoans(userID)

    console.log(result);
    return {result};
};