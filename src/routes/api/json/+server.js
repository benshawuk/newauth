// API to process JSON data, then return data back (as JSON)
 
/** @type {import('./$types').Action} */
export async function POST({ request, setHeaders, url, location, error }) {
  
  // Get form data
  const formData = await request.json()

  // Create a new JSON object (after imaginary server processing of some sort)
  const anotherJson = JSON.stringify({
    "name": "server_changed_name",
    "age": "34",
    "realname": formData.name
  })

  // Set content type to JSON 
  setHeaders({
    'Content-Type': 'application/json'
  })



// Return a JSON response
return new Response(anotherJson);
 
}
