<!-- src/lib/components/Footer.svelte -->
<script>
  import github from '$logos/github.svg';
</script>

<!-- Remove role="contentinfo" (redundant); Tailwind layout -->
<footer class="border-t bg-white/70 backdrop-blur">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
    <!-- Left: GitHub -->
    <a
      href="https://github.com/bestrada134/CMPS3390-Project-2"
      aria-label="GitHub repository"
      rel="noreferrer"
      target="_blank"
      class="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
    >
      <img src={github} alt="GitHub" class="size-5" />
      <span class="hidden sm:inline">GitHub</span>
    </a>

    <!-- Right: Logout -->
    <form method="POST" action="/logout">
      <button
        type="submit"
        aria-label="Log out"
        title="Log out"
        class="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="1.5" class="size-5">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
        </svg>
        <span class="hidden sm:inline">Log out</span>
      </button>
    </form>
  </div>
</footer>
