<script>
import { goto } from '$app/navigation'
import { onMount } from 'svelte';

// Redirect to login page
onMount(async () => {
    goto('/login')
});
</script>