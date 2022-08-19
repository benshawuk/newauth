// Import DB instance
import { db } from '$lib/db'

// Bcrypt library
import * as bcrypt from 'bcrypt'


/** @type {import('./$types').Action} */
export async function POST({ request, setHeaders, url, location, error }) {
	
	// Define user object
	let userobj
	
	// Set content type to JSON 
	setHeaders({ 'Content-Type': 'application/json' })

	// Get form data
	const form = await request.json()

	// Basic validation (fields aren't empty)
	if (!form.username || !form.password) {
		return new Response(JSON.stringify({ "success": false, error: 'Please fill out all fields' }))
	}

	// Look for match on user in DB
	const dbuser = await db.user.findUnique({
		where: { username: form.username }
	})

	// Check if typed password matches the bcrypt password hash
	const passwordMatch = dbuser && await bcrypt.compare(form.password, dbuser.passwordHash)

	if (!dbuser || !passwordMatch) {

		// Login failed, user not found or password doesn't match
		userobj = JSON.stringify({
			"success": false,
			"error": "Please enter a valid username and password"
		})

	} else {

		// Login success, user found and password matches
		userobj = JSON.stringify({
			id: dbuser.id,
			username: dbuser.username,
			fullname: dbuser.fullname,
			client: dbuser.client,
			token: dbuser.userAuthToken,
			success: true
		})
	}

	// Return the JSON response
	return new Response(userobj);
}
