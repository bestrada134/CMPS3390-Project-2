<!-- src/lib/components/Header.svelte -->
<script>
  /**
   * Tailwind Header (Svelte 5)
   * - Desktop: inline nav
   * - Mobile: hamburger toggles vertical menu
   * - Active link via aria-current + styles
   * - Closes on route change and Escape
   */
  import { onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation';
  import logo from '$logos/bookLogo.png';

  /** @type {{ user?: { Username?: string } }} */
  let { user = null } = $props();

  // Svelte 5 reactive locals (mutated below)
  let isOpen   = $state(false);
  let pathname = $state('/');

  const toggle = () => (isOpen = !isOpen);
  const close  = () => (isOpen = false);

  /** @param {KeyboardEvent} e */
  const onKey = (e) => { if (e.key === 'Escape') close(); };

  onMount(() => { pathname = window.location.pathname; });
  afterNavigate(() => { pathname = window.location.pathname; isOpen = false; });

  /** simple route config */
  const links = [
    { href: '/dashboard', label: 'Dashboard', match: '/dashboard' },
    { href: '/books',     label: 'Library',   match: '/books'     },
    { href: '/settings',  label: 'Settings',  match: '/settings'  }
  ];

  const isCurrent = (match) => pathname.startsWith(match);
  const clsDesktop = (active) =>
    'rounded-md px-3 py-2 text-sm font-medium ' +
    (active ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white');
  const clsMobile = (active) =>
    'block rounded-md px-3 py-2 text-base font-medium ' +
    (active ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white');
</script>

<!-- Svelte 5: use onkeydown (not on:keydown) -->
<svelte:window onkeydown={onKey} />

<nav class="bg-gray-800">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="flex h-16 items-center justify-between">
      <!-- Left: logo + desktop nav -->
      <div class="flex items-center gap-3">
        <a href="/dashboard" class="shrink-0 flex items-center gap-2" aria-label="Home">
          <img src={logo} alt="Library Tracker" class="size-8 rounded" />
          <span class="sr-only">Library Tracker</span>
        </a>

        <!-- desktop nav -->
        <div class="hidden md:block">
          <ul class="ml-6 flex items-baseline space-x-2">
            {#each links as l}
              <li aria-current={isCurrent(l.match) ? 'page' : undefined}>
                <a href={l.href} class={clsDesktop(isCurrent(l.match))}>{l.label}</a>
              </li>
            {/each}
          </ul>
        </div>
      </div>

      <!-- Right: greeting (md+) + mobile toggle -->
      <div class="flex items-center">
        {#if user?.Username}
          <span class="hidden md:inline text-sm text-gray-300 mr-3">Hi, {user.Username}</span>
        {/if}

        <!-- mobile menu button -->
        <button
          type="button"
          class="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          onclick={toggle}>
          {#if !isOpen}
            <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          {:else}
            <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          {/if}
        </button>
      </div>
    </div>
  </div>

  <!-- mobile menu -->
  <div id="mobile-menu" class={"md:hidden " + (isOpen ? 'block' : 'hidden')}>
    <ul class="space-y-1 px-2 pt-2 pb-3 sm:px-3">
      {#each links as l}
        <li aria-current={isCurrent(l.match) ? 'page' : undefined}>
          <a href={l.href} class={clsMobile(isCurrent(l.match))} onclick={close}>{l.label}</a>
        </li>
      {/each}
    </ul>
  </div>
</nav>
