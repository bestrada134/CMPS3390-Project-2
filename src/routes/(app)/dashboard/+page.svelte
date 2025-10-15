<!-- src/routes/(app)/dashboard/+page.svelte -->
<script>
    export let data;
</script>

<svelte:head>
    <title>Dashboard | Library Tracker</title>
</svelte:head>


<h1 class="text-4xl font-bold mb-3">Dashboard</h1>
<h1 class="font-bold text-3xl mb-8">
    Welcome, {data.user.Username}!
</h1>


<div class="grid grid-cols-3 md:grid-cols-3 gap-4">
    <div>
        <a href="#" class="card-dashboard">
        <h5>Loans</h5>
        <p>Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        </a>
    </div>
    <div>
        <a href="#" class="card-dashboard">
        <h5>Library</h5>
        <p>Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        </a>
    </div>
    <div>
        <a href="#" class="card-dashboard">
        <h5>Settings</h5>
        <p>Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        </a>
    </div>
</div>
