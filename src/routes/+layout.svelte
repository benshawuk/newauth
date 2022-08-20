<script>
    import { page } from '$app/stores';
</script>


{#if $page.data.user}
  <p>Hi, {$page.data.user}!</p>
  {:else}
  <p>You are not logged in.  Please <a href="/login">Log In</a></p>
{/if}

<slot></slot>