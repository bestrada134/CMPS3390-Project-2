<!-- src/routes/(app)/dashboard/+page.svelte -->
<script>

    export let data;
    let visible = false;
    function togglelist(){
        visible = !visible;
    }

</script>

<svelte:head>
    <title>Dashboard | Library Tracker</title>
</svelte:head>


<h1 class="text-4xl font-bold mb-3">Dashboard</h1>
<h1 class="font-bold text-3xl mb-4">
    Welcome, {data.user.Username}!
</h1>

<div class="grid grid-cols-3 md:grid-cols-3 gap-4">
    <div>
        <button class="card-dashboard" onclick={togglelist}>
        <h5>Loans</h5>
        <p>Click me to see your current loans</p>
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
        <p>Make changes to your email/password.</p>
        </a>
    </div>
</div>


<!-- Dropdown menu -->
{#if visible}
<!--Working list where it displays all the users loans-->
<div class="loanlist-dashboard">
    <table>
        <thead>
            <tr>
                <th scope="col" class="px-6 py-3">
                    Title
                </th>
                <th scope="col" class="px-6 py-3">
                    Author
                </th>
            </tr>
        </thead>
        <tbody>
        {#each  data.result.items as b}
            <tr>
                <th scope="row">
                    <a href={"/book/"+b.bookID} ><u>{b.Title}</u></a>
                </th>
                <td class="px-6 py-4">
                  {b.Author}
                </td>
            </tr>
            {/each}
        </tbody>
    </table>
</div>
{/if}
