// Import Cookie tools, Cookie UID generator, DB instance
import { db } from '$lib/db'
import cuid from 'cuid'
import { page } from '$app/stores';
import * as cookie from 'cookie'

// Server get function (log out user)
export const load = async ({ locals, setHeaders }) => {

    if (!locals.user) {
        return { status: 400, error: 'Not logged in' }
    }

    // Update cookie token in DB
    const newToken = cuid()
    const updateUser = await db.user.update({
        where: {
            username: locals.user,
        },
        data: {
            userAuthToken: newToken,
        },
    })

    // Destroy cookie on client
		setHeaders({
			'Set-Cookie': cookie.serialize('session', 'loggedOut', {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
			})
		}); 


    return { status: 200 }
}