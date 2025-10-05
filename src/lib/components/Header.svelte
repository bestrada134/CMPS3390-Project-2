<script>
    /**
     * Modular header used by the root layout.
     * Uses Svelte 5's `$app/state` to read the active URL.
     * We accept a `user` prop for later (real auth); unused for now.
     */
    import { page } from "$app/state";
    // export let user = null;

    // Optional images (put any SVGs you like here)
    import logo from "$logos/bookLogo.png";
    import github from "$logos/github.svg";
</script>

<header>
    <div class="corner">
        <a href="/dashboard">
            <img src={logo} alt="Library Tracker" />
        </a>
    </div>

    <nav class="nav">
        <!-- Brand / Home -->
        <!-- <a class="brand" href="/dashboard">Library Tracker</a> -->

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

        <!-- Right side: link to /auth (acts as Log in / Log out placeholder)
        <a class="auth" href="/auth">Auth</a> -->
    </nav>

    <div class="corner">
        <!-- Simple, accessible POST that hits /auth?logout=1 -->
        <form method="POST" action="/logout">
            <label
                for="logout"
                class="mode-switch bg-white text-sky-600 hover:bg-sky-600 hover:text-white"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6 stroke-current"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                    />
                </svg></label
            >
            <button id="logout"> </button>
        </form>
    </div>

    <div class="corner">
        <a
            href="https://github.com/bestrada134/CMPS3390-Project-2"
            aria-label="GitHub"
            rel="noreferrer"
            target="_blank"
        >
            <img src={github} alt="GitHub" />
        </a>
    </div>
</header>

<style>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .corner {
        width: 3em;
        height: 3em;
    }
    .corner a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
    .corner img {
        width: 2em;
        height: 2em;
        object-fit: contain;
    }

    .nav {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.75rem 1rem;
        border-bottom: 1px solid #ddd;
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
    a:hover {
        color: #0070f3;
    }
</style>
