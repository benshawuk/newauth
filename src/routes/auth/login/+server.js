// Import DB instance
import { db } from '$lib/db'

// Import cookie tools and bcrypt
import cuid from 'cuid'
import * as cookie from 'cookie'
import * as bcrypt from 'bcrypt'


// Login post request
export async function POST({ request, setHeaders }) {
	
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
	let userobj
	const passwordMatch = dbuser && await bcrypt.compare(form.password, dbuser.passwordHash)
	
	if (!dbuser || !passwordMatch) {

		// Login failed, user not found or password doesn't match
		userobj = JSON.stringify({
			"success": false,
			"error": "Please enter valid credentials"
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


		// Update cookie token in DB
		const newToken = cuid()
		const updateUser = await db.user.update({
			where: {
				username: form.username,
			},
			data: {
				userAuthToken: newToken,
			},
		})


		// Set cookie on client
		setHeaders({
			'Set-Cookie': cookie.serialize('session', newToken, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
			})
		});  



	}

	// Return the JSON response
	setHeaders({ 'Content-Type': 'application/json' })
	return new Response(userobj);
}