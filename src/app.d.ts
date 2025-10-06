// src/app.d.ts

/**
 * See https://svelte.dev/docs/kit/types#app.d.ts 
 * for information about these interfaces
 * 
 * SvelteKit global type definitions (TypeScript "declaration file")
 * ----------------------------------------------------------------
 * Even though our project is JavaScript, SvelteKit uses the TypeScript
 * type checker to improve editor help. This file tells the checker
 * what lives on `event.locals` and `data` so we get nice IntelliSense
 * and no red squiggles.
 * 
 * Extend SvelteKit's built-in types so `locals.user` is recognized.
 *
 * NOTE: This file is **types-only**. It does not run at runtime.
 * Put it at: src/app.d.ts
 *
 * - App.Locals: what we attach on the server in hooks.server.js
 * - App.PageData: what our load functions return for pages/layouts
 */

declare global {
	namespace App {
		// Attached in src/hooks.server.js (server-side only)
		interface Locals {
			user: {
				userID: number;
				Username: string;
				Email: string;
			} | null;
		}

		// Optional: if our +layout/+page load returns { user }
		// then Svelte files can read it as `export let data; data.user`
		interface PageData {
			user?: {
				userID: number;
				Username: string;
				Email: string;
			} | null;
		}

		// (Other SvelteKit types could go here if needed later)
		// interface Error {}
		// interface PageState {}
		// interface Platform {}
	}
}

export { };
