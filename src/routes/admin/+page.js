// Get user and pass it to page store
export async function load({ parent }) {
    const { user } = await parent();
}