// Import Cookie tools, DB instance
import { db } from '$lib/db'
import cuid from 'cuid'
import * as cookie from 'cookie'


// Server get function (log out user)
export const load = async ({ locals, setHeaders }) => {

    // If not logged in, just redirect to login page
    if (!locals.user) {
        return { status: 401, error: 'Not logged in' }
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