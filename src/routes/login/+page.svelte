<script>
import { goto } from '$app/navigation'

// Set form variables for binding
let username
let password

// Result and error variables (based on what we get back from the endpoint)
let error = null

// Async function for passing the form data to the endpoint as JSON
async function handleSubmit () {
    const res = await fetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
            username,
            password
        })
    })

    // Get JSON result
    let result = await res.json()

    // Log results for debug
    console.log(JSON.stringify(result))

    // Error capture
    error = null; if(result.error) { error = result.error }

    // Smooth redirect on success
    if(result.success) { goto('/success') }
}

</script>

<h1>Log In</h1>

<form on:submit|preventDefault={handleSubmit}>
    
    Username:<br>
    <input type="text" name="username" bind:value={username}><br><br>
    Password:<br>
    <input type="password" name="password" bind:value={password}><br><br><br>

    <button type="submit">Submit Form</button>

</form>

<!-- Display errors -->
{#if error}
    <p class="error">{error}</p>
{/if}


<style>
    input {
        font-size: 20px;
    }

    button {
        font-size: 15px;
        padding: 10px;
    }

    .error {
        color: tomato
    }
</style>
