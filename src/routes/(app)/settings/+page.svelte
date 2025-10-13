<!-- src/routes/(app)/settings/+page.svelte -->
<svelte:head>
    <title>Settings | Library Tracker</title>
</svelte:head>

<h1>Settings</h1>

<div>
    <form action="">
        <label for="username">Username:</label><br>
        <input id="username" type="text">
        <label for="password">Password:</label><br>
        <input id="password" type="text">
        <label for="email">Email:</label><br>
        <input id="email" type="email">
        <input id="submit" type="submit">
    </form>
</div>

