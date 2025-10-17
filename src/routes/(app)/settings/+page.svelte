<!-- src/routes/(app)/settings/+page.svelte -->

<script>
export let data;
</script>

<svelte:head>
    <title>Settings | Library Tracker</title>
</svelte:head>

<h1>Settings</h1>

<div>
    <form class="max-w-sm mx-auto">
        <label for="options" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose what to change</label>
        <select id="options" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 darl:placeholder-gray-400 dark:texxt-white dark:focus:ring-blue-500  dark:focus:border-blue-500">
            <option value="Username">Username</option>
            <option value="Email">Email</option>
            <option value="Password">Password</option>
        </select>
        <input type="text" name="newValue" placeholder="New Value">
        <button type="submit">Save</button>

    </form>
</div>

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
        form input:focus {
            outline: none;
            border-color: #6f9cf6;
            box-shadow: 0 0 0 2px rgba(111,156,246,.2);
        }
        form button[type="submit"]{
            margin-top: .25rem;
            padding: .55rem .9rem;
            border: 0;
            border-radius: 8px;
            background: #111;
            color: #fff;
            cursor: pointer;
        }
    </style>
