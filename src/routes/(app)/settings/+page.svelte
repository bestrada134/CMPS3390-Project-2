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
        <label for="name">Name:</label><br>
        <input type="text" name="name" id="name" value="{data?.user?.Username ?? ''}" /><br>

        <label for="email">Email:</label><br>
        <input type="email" name="email" id="email" value="{data?.user?.Email ?? ''}" /><br>

        <label for="password">Password:</label><br>
        <input type="text" name="password" id="password"><br><br>

        <button type="submit">Save</button>
    </form>
</div>

