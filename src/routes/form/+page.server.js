// PAGE Endpoint - cannot return data, but can set headers/cookies and specify a redirect location for client side redirection

import { error } from '@sveltejs/kit';
import * as cookie from 'cookie'

/** @type {import('./$types').Action} */
export async function POST({ request, setHeaders, url, location, error }) {
  
  // Get form data
  const formData = await request.formData();
  
  // Set form values into variables
  const name = (formData.get('name'));
  const email = (formData.get('email'));
 
// Example - If you need to convert it to JSON
let json = JSON.stringify(Object.fromEntries(formData));
console.log(json)

// Set headers example
setHeaders({
  'Set-Cookie': cookie.serialize('userId', 'newTokenValue', {
  path: '/',
  httpOnly: true,
  sameSite: 'strict',
  secure: process.env.NODE_ENV === 'production',
  })
})

// Success with location specified (for client side code to action the redirect)
   return {
    location: '/success'
  };


// Return an Error 403, or whatever, some issue..
  return {
    status: 403,
      errors: {
        username: 'No user with this username'
      },
  };


}