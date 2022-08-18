// Handle is basically middleware, intercepting the request..
export const handle = async ({
    event,
    resolve,
}) => {
    
    
    console.log('Handle triggered.....')
    
    
    
    // Continue and load page as normal
    return await resolve(event)
}

