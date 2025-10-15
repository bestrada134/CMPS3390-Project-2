<script>
  import github from "$logos/github.svg";
</script>

<footer class="c-footer" role="contentinfo">

  <!-- Bottom-left -->
  <a
    href="https://github.com/bestrada134/CMPS3390-Project-2"
    aria-label="GitHub repository"
    rel="noreferrer"
    target="_blank"
    class="c-github-link"
  >
    <img src={github} alt="GitHub" class="c-github-img" />
    <span class="sr-only">Open GitHub repository</span>
  </a>

  <!-- Bottom-right -->
  <form method="POST" action="/logout" class="c-logout-form">
    <button
      type="submit"
      aria-label="Log out"
      title="Log out"
      class="c-logout-btn"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        class="c-logout-icon"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
        />
      </svg>
      <span class="sr-only">Log out</span>
    </button>
  </form>
</footer>
