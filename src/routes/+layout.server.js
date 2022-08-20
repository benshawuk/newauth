/** @type {import('./$types').Get} */
export async function load({ request, setHeaders, locals, event }) {
    return {
      user: locals.user
    };
  }



