// Import DB instance
import { db } from '$lib/db'

// Import cookie tools and bcrypt
import cuid from 'cuid'
import * as cookie from 'cookie'
import * as bcrypt from 'bcrypt'


// Register post request
export async function POST({ request, setHeaders }) {
	
	// Get form data
	const form = await request.json()

	// Basic validation (fields aren't empty)
	if (!form.username || !form.password) {
		return new Response(JSON.stringify({ "success": false, error: 'Please fill out all fields' }))
	}

	// Look for match on user in DB
	let userobj
	const dbuser = await db.user.findUnique({
		where: { username: form.username }
	})

	// Don't allow duplicate users
	if(dbuser) {
		userobj = JSON.stringify({
			"success": false,
			"error": "User already exists"
		})

	} else {

		// Registration successful, return user object
		userobj = JSON.stringify({
			username: form.username,
			success: true
		})

		// Create new user record and cookie token in DB
		const newToken = cuid()
		const updateUser = await db.user.create({
			data: {
				username: form.username,
                passwordHash: await bcrypt.hash(form.password, 10),
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
		})

	}

	// Return the JSON response
	setHeaders({ 'Content-Type': 'application/json' })
	return new Response(userobj);
}