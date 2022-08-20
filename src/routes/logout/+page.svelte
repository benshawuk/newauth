<script>
import { goto } from '$app/navigation'
import { onMount } from 'svelte';

// Destroy cookie (server?)

// Destroy user session, redirect to login page
onMount(async () => {
    goto('/login')
});
</script>