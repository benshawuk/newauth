// Import DB instance
import { db } from '$lib/db'

// Import cookie library
import * as cookie from 'cookie'

// Handle function (runs on each request)
export async function handle({ event, resolve }) {

    // Get any current cookies from the client browser
    const cookies = cookie.parse(event.request.headers.get('cookie') || '');

     // Declare redirect response
    const Redirect = () => new Response('', {
        status: 303,
        headers: {
            location: '/'
        }
    })

   
    // Default action, if no cookies present
    if (!cookies.session) {

        // Serverside force redirect on protected route
        if (event.url.pathname === '/success') {
            return await Redirect()
        }
        
        // ..otherwise continue and load page as normal
        return await resolve(event)
    }

    // Cookies found, so check against unique auth tokens in DB
    const dbuser = await db.user.findUnique({
	    where: { userAuthToken: cookies.session }
    })
    
    // Match found in DB, so pass username into 'events.local', which will then get passed into 'session'
    if (dbuser) {
        event.locals.user = dbuser.username
    } else {
        
        // Cookie isn't valid, or has been tampered with etc.
        // ** Serverside force redirect on protected routes **
        if (event.url.pathname === '/success') {
            return await Redirect()
        }
    }

    // Continue and load page as normal
    return await resolve(event)
}