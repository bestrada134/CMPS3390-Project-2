<!-- src/routes/(public)/auth/+page.svelte -->
<script>
    import { goto } from "$app/navigation";
    import logo from "$logos/bookLogo.png";
    // Toggle which form is visible
    let mode = "login"; // 'login' | 'signup'
</script>

<!-- The title reacts to `mode` -->
<svelte:head>
    <title>{mode === "login" ? "Log in" : "Sign up"} | Library Tracker</title>
</svelte:head>

<!-- Center div -->
<div class="flex flex-wrap lg:flex-nowrap">
    <!-- side bar (desktop) top bar (mobile) -->
    <div
        class="bg-zinc-600 h-12 lg:h-svh w-full lg:w-[calc(15vw)] px-4 py-2
        flex lg:items-center lg:justify-end"
    >
        <img
            src={logo}
            alt="Logo"
            class="h-8 w-auto lg:h-auto lg:w-48 object-contain"
        />
    </div>

    <!-- Main Window -->
    <div
        class="h-[calc(100vh-48px)] lg:h-svh w-full p-4
        bg-[url('/library.png')] bg-no-repeat bg-center bg-cover
        flex lg:justify-center lg:items-start flex-col items-center"
    >
        <!-- login box -->
        <div
            class="w-full md:w-[380px] rounded-md bg-zinc-100 p-4 min-h-32
            flex flex-col gap-2"
        >
            <h1 class="text-xl">
                {mode === "login" ? "Log in" : "Create your account"}
            </h1>
            {#if mode === "login"}
                <form method="POST" action="?/login" class="space-y-3">
                    <label class="tf-label"
                        >Username or Email
                        <input
                            name="user"
                            autocomplete="username"
                            required
                            class="tf-input mt-1"
                        />
                    </label>
                    <label class="tf-label"
                        >Password
                        <input
                            type="password"
                            name="pw"
                            autocomplete="current-password"
                            required
                            minlength="6"
                            class="tf-input mt-1"
                        />
                    </label>
                    <br />
                    <button type="submit" class="f-submit hover:brightness-110">
                        Sign In
                    </button>
                </form>

                <button
                    type="button"
                    on:click={() => (mode = "signup")}
                    disabled={mode === "signup"}
                    aria-pressed={mode === "signup"}
                    class="mode-switch mx-auto mt-2"
                >
                    <!-- optional icon -->
                    <svg
                        viewBox="0 0 24 24"
                        class="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path d="M12 5v14M5 12h14" />
                    </svg>create an account
                </button>
            {:else}
                <form method="POST" action="?/signup" class="space-y-3">
                    <label class="tf-label"
                        >Username
                        <input
                            name="username"
                            autocomplete="username"
                            required
                            class="tf-input mt-1"
                        />
                    </label>
                    <label class="tf-label"
                        >Email
                        <input
                            type="email"
                            name="email"
                            autocomplete="email"
                            required
                            class="tf-input mt-1"
                        />
                    </label>
                    <label class="tf-label"
                        >Password
                        <input
                            type="password"
                            name="pw"
                            autocomplete="new-password"
                            required
                            minlength="6"
                            class="tf-input mt-1"
                        />
                    </label>
                    <br />
                    <button type="submit" class="f-submit hover:brightness-110">
                        Create account
                    </button>
                </form>

                <button
                    type="button"
                    on:click={() => (mode = "login")}
                    disabled={mode === "login"}
                    aria-pressed={mode === "login"}
                    class="mode-switch mx-auto mt-2"
                >
                    <!-- optional icon -->
                    <svg
                        viewBox="0 0 24 24"
                        class="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                    Log in
                </button>
            {/if}

            <br />
            <br />
            <!-- You can keep your placeholder button or real forms here -->
            <p>Temporary: click to go to dashboard.</p>
            <button class="mode-switch" on:click={() => goto("/dashboard")}
                >Go to Dashboard</button
            >
        </div>
    </div>
</div>
