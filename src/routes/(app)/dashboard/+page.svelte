<!-- src/routes/(app)/dashboard/+page.svelte -->
<script>
    export let data;
</script>

<svelte:head>
    <title>Dashboard | Library Tracker</title>
</svelte:head>

<h1 class="text-2xl font-bold mb-3">Dashboard</h1>
<p>
    Welcome, {data.user.Username}! Use the navbar above to visit Books and
    Settings.
</p>
