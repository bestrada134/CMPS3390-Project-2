<!-- src/routes/(public)/auth/+page.svelte -->
<script>
    // SvelteKit injects the last action result into `form` after you submit
    // Example: { where: 'login', error: 'Invalid credentials', values: { id: 'alice' } }
    export let form;

    import logo from "$logos/bookLogo.png";

    // Toggle which form is visible
    let mode = "login"; // 'login' | 'signup'

    // If the last action was signup (success or error), keep us on "signup" tab after reload
    $: if (form?.where === "signup") mode = "signup";

    // Derived helpers for clean markup
    $: loginError = form?.where === "login" ? form?.error : null;
    $: signupError = form?.where === "signup" ? form?.error : null;
    $: signupOk = form?.where === "signup" ? !!form?.created : false;

    // Sticky inputs (keep what user typed on errors)
    $: loginIdValue = form?.where === "login" ? (form?.values?.id ?? "") : "";
    $: suUsername =
        form?.where === "signup" ? (form?.values?.username ?? "") : "";
    $: suEmail = form?.where === "signup" ? (form?.values?.email ?? "") : "";
</script>

<svelte:head>
    <title>{mode === "login" ? "Log in" : "Sign up"} | Library Tracker</title>
</svelte:head>

<!-- Layout wrapper -->
<div class="flex flex-wrap lg:flex-nowrap">
    <div
        class="bg-zinc-600 h-12 lg:h-svh w-full lg:w-[calc(15vw)] px-4 py-2 flex lg:items-center lg:justify-end"
    >
        <img
            src={logo}
            alt="Logo"
            class="h-8 w-auto lg:h-auto lg:w-48 object-contain"
        />
    </div>

    <div
        class="h-[calc(100vh-48px)] lg:h-svh w-full p-4 bg-[url('/library.png')] bg-no-repeat bg-center bg-cover flex lg:justify-center lg:items-start flex-col items-center"
    >
        <div
            class="w-full md:w-[380px] rounded-md bg-zinc-100 p-4 min-h-32 flex flex-col gap-2"
        >
            <h1 class="text-xl">
                {mode === "login" ? "Log in" : "Create your account"}
            </h1>

            {#if mode === "login"}
                <!-- ✅ LOGIN MESSAGES -->
                {#if loginError}
                    <div
                        class="rounded-md border border-red-300 bg-red-50 p-3 text-red-800"
                    >
                        {loginError}
                    </div>
                {/if}

                <form method="POST" action="?/login" class="space-y-3">
                    <label class="tf-label">
                        Username or Email
                        <input
                            name="user"
                            autocomplete="username"
                            required
                            class="tf-input mt-1"
                            value={loginIdValue}
                            aria-invalid={loginError ? "true" : undefined}
                            aria-describedby={loginError
                                ? "login-error"
                                : undefined}
                        />
                    </label>
                    <label class="tf-label">
                        Password
                        <input
                            type="password"
                            name="pw"
                            autocomplete="current-password"
                            required
                            minlength="6"
                            class="tf-input mt-1"
                            aria-invalid={loginError ? "true" : undefined}
                        />
                    </label>

                    <button type="submit" class="f-submit hover:brightness-110"
                        >Sign In</button
                    >
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
                    </svg>
                    create an account
                </button>
            {:else}
                <!-- SIGNUP MESSAGES -->
                {#if signupOk}
                    <div
                        class="rounded-md border border-emerald-300 bg-emerald-50 p-3 text-emerald-800"
                    >
                        Account created! You can now log in.
                    </div>
                {/if}
                {#if signupError}
                    <div
                        id="signup-error"
                        class="rounded-md border border-red-300 bg-red-50 p-3 text-red-800"
                    >
                        {signupError}
                    </div>
                {/if}

                <form
                    method="POST"
                    action="?/signup"
                    class="space-y-3"
                    aria-describedby={signupError ? "signup-error" : undefined}
                >
                    <label class="tf-label">
                        Username
                        <input
                            name="username"
                            autocomplete="username"
                            required
                            class="tf-input mt-1"
                            value={suUsername}
                            aria-invalid={signupError ? "true" : undefined}
                        />
                    </label>
                    <label class="tf-label">
                        Email
                        <input
                            type="email"
                            name="email"
                            autocomplete="email"
                            required
                            class="tf-input mt-1"
                            value={suEmail}
                            aria-invalid={signupError ? "true" : undefined}
                        />
                    </label>
                    <label class="tf-label">
                        Password
                        <input
                            type="password"
                            name="pw"
                            autocomplete="new-password"
                            required
                            minlength="6"
                            class="tf-input mt-1"
                            aria-invalid={signupError ? "true" : undefined}
                        />
                    </label>

                    <button type="submit" class="f-submit hover:brightness-110"
                        >Create account</button
                    >
                </form>

                <button
                    type="button"
                    on:click={() => (mode = "login")}
                    disabled={mode === "login"}
                    aria-pressed={mode === "login"}
                    class="mode-switch mx-auto mt-2"
                >
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
        </div>
    </div>
</div>
