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
    $: signupOk = form?.where === "login" ? !!form?.created : false;

    // Sticky inputs (keep what user typed on errors)
    $: loginIdValue = form?.where === "login" ? (form?.values?.user ?? "") : "";
    $: suUsername = form?.where === "signup" ? (form?.values?.username ?? "") : "";
    $: suEmail = form?.where === "signup" ? (form?.values?.email ?? "") : "";
</script>

<svelte:head>
    <title>{mode === "login" ? "Log in" : "Sign up"} | Library Tracker</title>
</svelte:head>

<!-- Layout wrapper -->
<div class="auth-shell">
    <div class="auth-brand">
        <img src={logo} alt="Logo" class="auth-brand__img" />
    </div>

    <div class="auth-hero">
        <div class="auth-panel">
            <h1 class="auth-title">
                {mode === "login" ? "Log in" : "Create your account"}
            </h1>

            {#if mode === "login"}
                <!-- LOGIN MESSAGES -->
                {#if signupOk}
                    <div class="auth-alert auth-alert--ok">
                        Account created! You can now log in.
                    </div>
                {/if}
                {#if loginError}
                    <div class="auth-alert auth-alert--error">
                        {loginError}
                    </div>
                {/if}

                <form method="POST" action="?/login" class="auth-form">
                    <label class="auth-label">
                        Username or Email
                        <input
                            name="user"
                            autocomplete="username"
                            required
                            class="auth-input"
                            value={loginIdValue}
                            aria-invalid={loginError ? "true" : undefined}
                            aria-describedby={loginError ? "login-error" : undefined}
                        />
                    </label>
                    <label class="auth-label">
                        Password
                        <input
                            type="password"
                            name="pw"
                            autocomplete="current-password"
                            required
                            minlength="6"
                            class="auth-input"
                            aria-invalid={loginError ? "true" : undefined}
                        />
                    </label>

                    <button type="submit" class="auth-submit">Sign In</button>
                </form>

                <button
                    type="button"
                    on:click={() => (mode = "signup")}
                    disabled={mode === "signup"}
                    aria-pressed={mode === "signup"}
                    class="auth-tab"
                >
                    <svg
                        viewBox="0 0 24 24"
                        class="auth-icon-sm"
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
                {#if signupError}
                    <div id="signup-error" class="auth-alert auth-alert--error">
                        {signupError}
                    </div>
                {/if}

                <form
                    method="POST"
                    action="?/signup"
                    class="auth-form"
                    aria-describedby={signupError ? "signup-error" : undefined}
                >
                    <label class="auth-label">
                        Username
                        <input
                            name="username"
                            autocomplete="username"
                            required
                            class="auth-input"
                            value={suUsername}
                            aria-invalid={signupError ? "true" : undefined}
                        />
                    </label>
                    <label class="auth-label">
                        Email
                        <input
                            type="email"
                            name="email"
                            autocomplete="email"
                            required
                            class="auth-input"
                            value={suEmail}
                            aria-invalid={signupError ? "true" : undefined}
                        />
                    </label>
                    <label class="auth-label">
                        Password
                        <input
                            type="password"
                            name="pw"
                            autocomplete="new-password"
                            required
                            minlength="6"
                            class="auth-input"
                            aria-invalid={signupError ? "true" : undefined}
                        />
                    </label>

                    <button type="submit" class="auth-submit">Create account</button>
                </form>

                <button
                    type="button"
                    on:click={() => (mode = "login")}
                    disabled={mode === "login"}
                    aria-pressed={mode === "login"}
                    class="auth-tab"
                >
                    <svg
                        viewBox="0 0 24 24"
                        class="auth-icon-sm"
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
