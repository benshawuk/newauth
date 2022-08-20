<script>
import { page } from '$app/stores';
</script>


<h1>Admin Area</h1>

{#if $page.data.user}
  <p class="loggedin">You are logged in as <b>{$page.data.user}!</b></p>
{:else}
  <p class="error">Something went wrong...</p>
{/if}


<style>
    h1 {
        color: darkorchid;
    }

    p.loggedin
    {
        color: darkgreen;
    }

    .error {
        color: tomato;
    }
</style>