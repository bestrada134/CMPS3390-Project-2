<!-- src/routes/(app)/book/[id]/+page.svelte -->
<script>
    // when you load real book data, bind its Title here
    export let data; // { book: { Title: string, ... } }
</script>

<svelte:head>
    <title>{data?.book?.Title ?? "Book"} | Library Tracker</title>
</svelte:head>

<h1>{data?.book?.Title ?? "Book"}</h1>
