<script>
import { goto } from '$app/navigation'

// Set form variables for binding
let username
let password

// Result and error variables (based on what we get back from the endpoint)
let error = null

// Async function for passing the form data to the endpoint as JSON
async function handleSubmit () {
    const res = await fetch('/auth/register', {
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
    if(result.success) { goto('/admin') }
}

</script>

<h1>Register</h1><br>

<div class="card">
    <form on:submit|preventDefault={handleSubmit}>
        
        Username:<br>
        <input type="text" name="username" bind:value={username}>
        Password:
        <input type="password" name="password" bind:value={password}>

        <button type="submit">Register</button>

    <!-- Display errors -->
    <br><br>
    {#if error}
    <p class="error">{error}</p>
    {:else}
    <p> </p>
    {/if}

    </form>
</div>



<style>
    h1 {
        color: darkblue;
    }
</style>