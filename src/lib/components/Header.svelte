<script>
    /**
     * Modular header used by the root layout.
     * Uses Svelte 5's `$app/state` to read the active URL.
     * We accept a `user` prop for later (real auth); unused for now.
     */
    import { page } from "$app/state";
    export let user = null;
</script>

<header>
    <nav class="nav">
        <!-- Brand / Home -->
        <a class="brand" href="/dashboard">Library Tracker</a>

        <!-- Main nav -->
        <ul class="links">
            <li
                aria-current={page.url.pathname.startsWith("/dashboard")
                    ? "page"
                    : undefined}
            >
                <a href="/dashboard">Dashboard</a>
            </li>
            <li
                aria-current={page.url.pathname.startsWith("/books")
                    ? "page"
                    : undefined}
            >
                <a href="/books">Books</a>
            </li>
            <li
                aria-current={page.url.pathname.startsWith("/settings")
                    ? "page"
                    : undefined}
            >
                <a href="/settings">Settings</a>
            </li>
        </ul>

        <!-- Right side: link to /auth (acts as Log in / Log out placeholder) -->
        <a class="auth" href="/auth">Auth</a>
    </nav>
</header>

<style>
    .nav {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.75rem 1rem;
        border-bottom: 1px solid #ddd;
    }
    .brand {
        font-weight: 700;
        text-decoration: none;
        color: inherit;
    }
    .links {
        display: flex;
        gap: 0.5rem;
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .links a {
        text-decoration: none;
        color: #333;
        padding: 0.25rem 0.5rem;
    }
    .links li[aria-current="page"] a {
        border-bottom: 2px solid #333;
    }
    .auth {
        margin-left: auto;
        text-decoration: none;
        color: #333;
    }
    a:hover {
        color: #0070f3;
    }
</style>
