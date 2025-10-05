// src/app.d.ts
// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
// Extend SvelteKit's built-in types so `locals.user` is recognized.

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: {
				userID: number;
				Username: string;
				Email: string
			} | null;
		}
		interface PageData {
			user?: {
				userID: number;
				Username: string;
				Email: string
			} | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}

	}
}
export { };
