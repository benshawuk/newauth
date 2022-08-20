<script>
import { page } from '$app/stores';
</script>



<h1>Success!</h1>


{#if $page.data.user}
  <p>Welcome back {$page.data.user}!</p>
{:else}
  <p class="error">Something went wrong...</p>
{/if}




<style>
    h1 {
        color: green;
    }

    .error {
        color: tomato;
    }
</style>