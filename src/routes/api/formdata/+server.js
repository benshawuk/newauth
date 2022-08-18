// API to process FormData and return it as JSON
// (not used by page examples, but can be tested in Postman)

import { error } from '@sveltejs/kit';

/** @type {import('./$types').Action} */
export async function POST({ request, setHeaders, url, location, error }) {
  
  // Get form data
  const formData = await request.formData();
 
  // Set values from form
  const name = (formData.get('name'));
  const email = (formData.get('email'));

  // Create a new JSON object (after imaginary server processing of some sort)
  const anotherJson = JSON.stringify({
    "name": "server_changed_name",
    "age": "34",
    "realname": name
  })

// set headers to JSON
setHeaders({      
  'Content-Type': 'application/json'
})

// Return a response
return new Response(anotherJson);
 
}




// **** GET Request example (nothing to do with above code) ****

/** @type {import('./$types').RequestHandler} */
export function GET({ url }) {
  const min = Number(url.searchParams.get('min') ?? '0');
  const max = Number(url.searchParams.get('max') ?? '1');
 
  const d = max - min;
 
  if (isNaN(d) || d < 0) {
    throw error(400, 'min and max must be numbers, and min must be less than max');
  }
 
  const random = min + Math.random() * d;
 
  return new Response(String(random));
}



