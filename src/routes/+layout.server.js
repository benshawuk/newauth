// Get locals.user and pass it to page store
export async function load({ locals }) {
  return {
    user: locals.user
  };
}