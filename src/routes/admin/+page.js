

/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
    const { user } = await parent();
}