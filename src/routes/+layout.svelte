<script>
import { page } from '$app/stores';
</script>

<nav>
  {#if $page.data.user}
    <!-- User Logged In -->
    <a href="/">Public</a>
    <a href="/admin">Admin</a>
    <a href="/logout">Log out</a>
  {:else}
  <!-- Not Logged In -->
  <a href="/">Public</a>
  <a href="/register">Register</a>
   <a href="/login">Login</a>
  {/if}

</nav>

<main>
  <slot></slot>
</main>