<script>
  /**
   * Modular header used by the root layout.
   * Uses Svelte 5's `$app/state` to read the active URL.
   * We accept a `user` prop for later (real auth); unused for now.
   */
  import { page } from "$app/state";
  import logo from "$logos/bookLogo.png";

  let isOpen = false;
  const toggle = () => (isOpen = !isOpen);
  const close = () => (isOpen = false);
  const onKey = (e) => {
    if (e.key === "Escape") close();
  };
</script>

<svelte:window on:keydown={onKey} />

<header class="c-header">
  <!-- Logo -->
  <div class="c-corner">
    <a href="/dashboard" aria-label="Home">
      <img src={logo} alt="Library Tracker" class="c-corner-img" />
    </a>
  </div>

  <!-- Desktop nav -->
  <nav class="c-nav-desktop" aria-label="Primary">
    <ul class="c-links">
      <li
        aria-current={page.url.pathname.startsWith("/dashboard")
          ? "page"
          : undefined}
      >
        <a href="/dashboard" class="c-link">Home</a>
      </li>
      <li
        aria-current={page.url.pathname.startsWith("/books")
          ? "page"
          : undefined}
      >
        <a href="/books" class="c-link">Library</a>
      </li>
      <li
        aria-current={page.url.pathname.startsWith("/settings")
          ? "page"
          : undefined}
      >
        <a href="/settings" class="c-link">Settings</a>
      </li>
    </ul>
  </nav>

  <!-- Mobile hamburger -->
  <button
    class="c-hamburger"
    aria-controls="mobile-menu"
    aria-expanded={isOpen}
    aria-label={isOpen ? "Close menu" : "Open menu"}
    on:click={toggle}
  >
    {#if !isOpen}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.75"
        class="c-icon"
      >
        <path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" />
      </svg>
    {:else}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.75"
        class="c-icon"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 6l12 12M18 6l-12 12"
        />
      </svg>
    {/if}
    <span class="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
  </button>

  <!-- Mobile dropdown -->
  <div
    id="mobile-menu"
    class="c-mobile-menu"
    class:c-mobile-menu--open={isOpen}
  >
    <ul class="c-mobile-links" on:click={close}>
      <li
        aria-current={page.url.pathname.startsWith("/dashboard")
          ? "page"
          : undefined}
      >
        <a href="/dashboard" class="c-mobile-link">Home</a>
      </li>
      <li
        aria-current={page.url.pathname.startsWith("/books")
          ? "page"
          : undefined}
      >
        <a href="/books" class="c-mobile-link">Library</a>
      </li>
      <li
        aria-current={page.url.pathname.startsWith("/settings")
          ? "page"
          : undefined}
      >
        <a href="/settings" class="c-mobile-link">Settings</a>
      </li>
    </ul>
  </div>
</header>
