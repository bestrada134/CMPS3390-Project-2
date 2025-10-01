<script>
	/**
	 * (app) layout: this is the “private” shell.
	 * We render the Header here so all pages under /dashboard, /books, /settings, etc.
	 * get the navbar — but /auth (in the public group) does not.
	 */
	import Header from "$components/Header.svelte";

	/** @type {{ data: { user: any }, children: import('svelte').Snippet }} */
	let { data, children } = $props();
</script>

<Header user={data.user} />

<main style="padding: 1rem;">
	{@render children()}
</main>
