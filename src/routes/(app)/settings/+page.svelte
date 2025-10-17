<!-- src/routes/(app)/settings/+page.svelte -->

 <script>
    import { nonpassive } from 'svelte/legacy';

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

    <style>
        form label {
            display: inline-block;
            width: 110px;
            font-weight: 600;
            margin-top: .35rem;
        }
        form input {
            margin: .25rem 0 .6rem;
            padding: .45rem .55rem;
            border: 1px solid #d0d7de;
            border-radius: 8px;
            font: inherit;
        }
        form input: focus {
            outline: none;
            border-color: #6f9cf6;
            box-shadow: 0 0 0 2px rgba(111,156,246,.2);
        }
        form button[type="submit"]{
            margin top: .25rem;
            padding: .55rem .9rem;
            border: 0;
            border-radius: 8px;
            background: #111;
            color: #fff;
            cursor: pointer;
        }
    </style>
</div>

