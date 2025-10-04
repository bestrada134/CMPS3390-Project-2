import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'; // ✅ correct import

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(), // <-- helpful with PostCSS/Tailwind
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),


		// ✅ Add your aliases here — paths are relative to the project root
		alias: {
			// $lib is built-in → 'src/lib' (no need to redefine)
			$components: 'src/lib/components',
			$utils: 'src/lib/utils',
			$styles: 'src/lib/styles',
			$logos: 'src/lib/logos'
			// Do NOT alias $app/* — those are provided by SvelteKit
		}
	}
};

export default config;
