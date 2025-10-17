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
        <button id="loanbutton" class="card-dashboard">
        <h5>Loans</h5>
        <p>Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        </button>
    </div>
    <div>
        <a href="/books" class="card-dashboard">
        <h5>Library</h5>
        <p>Click me to see the libraries full catalog.</p>
        </a>
    </div>
    <div>
        <a href="/settings" class="card-dashboard">
        <h5>Settings</h5>
        <p>Click me to make any changes to your email/password.</p>
        </a>
    </div>
</div>


<!-- Dropdown menu -->
<div id="loanlist" class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
      </li>
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
      </li>
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
      </li>
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
      </li>
    </ul>
</div>
