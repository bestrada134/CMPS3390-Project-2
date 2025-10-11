// src/controllers/book.controller.js
// Controller = thin layer that:
//  - normalizes inputs (e.g., from query params),
//  - picks the right model function,
//  - wraps errors into { error: string } so pages can show messages.

import {
  getLibrary,
  getFilteredLibrary,
  getBookById
} from '$models/book.model.js';

/**
 * List all books (no filters).
 * @returns {{ 
 *            books: import('$models/book.model.js').Book[],
 *            error: string|null 
 *          }}
 */
export function listLibrary() {
  try {
    const books = getLibrary();
    return {
      books,
      error: null
    };
  } catch (e) {
    return {
      books: [],
      error: e?.message || 'Failed to load library.'
    };
  }
}

/**
 * List books using optional filters.
 * - Accepts either UPPER (Title) or lower (title) keys; both are fine.
 * - Genres can be a CSV string (from your form).
 * - GenresMode: "contain" (OR) or "has" (AND). Defaults to "contain".
 *
 * @typedef  {Object} FilterArgs
 * @property {string}  [Title]                 // optional title substring (case-insensitive)
 * @property {string}  [Author]                // optional author substring (case-insensitive)
 * @property {string}  [Genres]                // CSV string from the form, e.g. "Fantasy, Adventure"
 * @property {'contain'|'has'} [GenresMode]    // "contain" = any genre matches, "has" = all genres must match
 *
 * @param   {FilterArgs & {
 *          title?:string,
 *          author?:string,
 *          genres?:string,
 *          genresMode?:'contain'|'has'
 *          }} args
 * 
 * @returns {{ 
 *            books: import('$models/book.model.js').Book[],
 *            error: string|null
 *          }}
 */
export function listLibraryFiltered(args = {}) {
  try {
    // Accept both camelCase (from our model) and lowercase (from URLSearchParams)
    const Title = (args.Title ?? args.title ?? '').toString();
    const Author = (args.Author ?? args.author ?? '').toString();
    const Genres = (args.Genres ?? args.genres ?? null);
    const rawMode = (args.GenresMode ?? args.genresMode ?? 'contain');
    const GenresMode = rawMode === 'has' ? 'has' : 'contain';

    // If no filters were provided, the model will throw; that’s OK.
    const books = getFilteredLibrary({
      Title,
      Author,
      Genres,       // CSV string is OK; model will normalize
      GenresMode
    });

    return {
      books,
      error: null
    };
  } catch (e) {
    // Example errors:
    // - "At least one filter is required..."
    // - "No books found for the selected filters."
    return {
      books: [],
      error: e?.message || 'Failed to filter library.'
    };
  }
}
/**
 * Get a single book by its ID.
 * @param {string} BookID
 * @returns {{
 *   book: import('$models/book.model.js').Book|null,
 *   error: string|null
 * }}
 */
export function getBook(BookID) {
  try {
    const book = getBookById(BookID);
    return {
      book,
      error: null
    };
  } catch (e) {
    return {
      book: null,
      error: e?.message || 'Failed to load book.'
    };
  }
}