<script>
import { page } from '$app/stores';
</script>
     
<h1>Public Area</h1>
     
{#if $page.data.user}
    <p class="loggedin">You are logged in as <b>{$page.data.user}!</b></p>
{:else}
    <p class="loggedout">You are not currently logged in.</p><br>
{/if}
    
    
<style>
h1 {
    color: darkblue;
}

p.loggedin
{
    color: darkgreen;
}
p.loggedout {
    color: tomato;
}
</style>