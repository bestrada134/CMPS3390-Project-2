<!-- src/routes/(public)/auth/+page.svelte -->
<script>
    import { goto } from "$app/navigation";

    // Toggle which form is visible
    let mode = "login"; // 'login' | 'signup'
</script>

<!-- ✅ The title reacts to `mode` -->
<svelte:head>
    <title>{mode === "login" ? "Log in" : "Sign up"} | Library Tracker</title>
</svelte:head>

<h1>{mode === "login" ? "Log in" : "Sign up"}</h1>

<div style="margin-bottom:1rem;">
    <button on:click={() => (mode = "login")} disabled={mode === "login"}
        >Log in</button
    >
    <button on:click={() => (mode = "signup")} disabled={mode === "signup"}
        >Sign up</button
    >
</div>

<!-- You can keep your placeholder button or real forms here -->
<p>Temporary: click to go to dashboard.</p>
<button on:click={() => goto("/dashboard")}>Go to Dashboard</button>
