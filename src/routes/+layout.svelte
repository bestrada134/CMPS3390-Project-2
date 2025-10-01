<!-- src/routes/+layout.svelte -->
<script>
	/**
	 * Root layout: no header here.
	 * It only renders the current route via the Svelte 5 children snippet.
	 * The (app) layout will add the Header for private pages.
	 */
	/** @type {{ data: any, children: import('svelte').Snippet }} */
	let { data, children } = $props();
</script>

<svelte:head>
	<title>Library Tracker</title>
	<!-- fallback; overridden by child pages -->
</svelte:head>

{@render children()}
