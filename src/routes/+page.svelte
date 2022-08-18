<script>
// Posts a form to an separate (non-page) Endpoint as JSON data
// Endpoint returns JSON data, and the result is then available in this page component!

// Set form variables for binding
let name
let email

// Result variable (what we get back from the endpoint)
let result

// Async function for passing the form data to the endpoint as JSON
async function doPost () {
    const res = await fetch('/api/json', {
        method: 'POST',
        body: JSON.stringify({
            name,
            email
        })
    })

    let json = await res.json()
    console.log(json)
    result = JSON.stringify(json)
}

</script>

<h1>Form</h1>

<form on:submit|preventDefault={doPost}>
    Name: <input type="text" name="name" bind:value={name}><br><br>
    Email: <input type="text" name="email" bind:value={email}><br><br><br>

    <button type="submit">Submit Form</button>

</form>

<!-- Display API server results on page -->
{#if result}
    {result}
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
