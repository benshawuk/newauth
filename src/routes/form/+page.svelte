<script>
// Send form data to a PAGE Endpoint, then redirect based on it's "location" response
// The page endpoint is unable to return any data, but can pass back errors or a "location" response for client side redirecting here..

// Import goto from svelte navigation tools.   Goto redirects without a page refresh
import { goto } from '$app/navigation';

let name
let email
export let errors
export let data


    const handleSubmit = async (e) => {

        // Form element
        const form = e.target

        // Post data using the Fetch API
        const result = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        });
        
        console.log(result)

        // Redirect, if endpoint specifies this
        if (result.redirected) {
        goto(result.url);
        }

    }


</script>



<h1>Form</h1>


<form method="POST" on:submit|preventDefault={handleSubmit}>
    Name: <input type="text" name="name" bind:value={name}><br><br>
    Email: <input type="text" name="email" bind:value={email}><br><br><br>

    <button type="submit">Submit Form</button>

</form>

{#if data}
    {data}
{/if}

{#if errors}
        <p class="error">{errors}</p>
    {/if}



<style>
    input {
        font-size: 20px;
    }

    button {
        font-size: 15px;
        padding: 10px;
    }
</style>
