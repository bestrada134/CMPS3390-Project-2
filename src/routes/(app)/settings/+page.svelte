<!-- src/routes/(app)/settings/+page.svelte -->

 <script>
    export let data;
 </script>

<svelte:head>
    <title>Settings | Library Tracker</title>
</svelte:head>

<h1>Settings</h1>

<div>
    <form action="?/update" method="post">
        <input type="text" name="name" id="name" value="{data?.user?.Username ?? ''}" />
        <input type="email" name="email" id="email" value="{data?.user?.Email ?? ''}" />
    </form>
</div>

