// src/models/book.model.js
// Two simple, MySQL-style functions for the Library page:
//
//   getLibrary()                                           -> all books + Genres[]
//   getFilteredLibrary({ Title, Author, Genres, GenresMode }) -> same, but filtered
//
// We collect all genres with GROUP_CONCAT and then turn that CSV into
// the array your UI expects: Genres: ["Fantasy", "Adventure"].

import { db } from '../lib/db.js';

/**
 * @typedef {Object} Book
 * @property {number}       bookID
 * @property {string}       Title
 * @property {string}       Author
 * @property {string|null}  Abstract
 * @property {string|null}  CoverUrl
 * @property {string[]}     Genres
 */

/**
 * Turn a CSV like "Fantasy, Adventure,Fantasy" into a clean array.
 *
 * csv: " Fantasy, Adventure , ,Fantasy " → ["Fantasy","Adventure"]
 * - trims spaces
 * - removes empty values
 * - keeps only unique items
 * @param   {string|null|undefined}  csv
 * @returns {string[]}
 */
function csvToArray(csv) {
  if (!csv) return [];

  const parts = String(csv).split(',');
  const genres = [];

  // Loop over each CSV part:
  for (let i = 0; i < parts.length; i += 1) {
    const g = parts[i].trim();                         // 1) trim spaces
    if (g && genres.indexOf(g) === -1) genres.push(g); // 2) skip empty, 3) keep unique
  }

  return genres;
}

/**
 * Convert a SQL row to the exact shape your UI uses (like your mockBooks).
 * @param   {{ bookID:number, Title:string, Author:string, Abstract:string|null, CoverUrl:string|null, GenresCSV:string|null }} row
 * @returns {Book}
 */
function rowToBook(row) {
  return {
    bookID: row.bookID,
    Title: row.Title,
    Author: row.Author,
    Abstract: row.Abstract,
    CoverUrl: row.CoverUrl,
    Genres: csvToArray(row.GenresCSV)
  };
}

/**
 * Select ALL books + their genres (no filters).  
 * Returns an ARRAY of books.
 * @returns {Book[]}
 */
export function getLibrary() {
  const sql = `
    SELECT
      b.bookID,
      b.Title,
      b.Author,
      b.Abstract,
      b.CoverUrl,
      GROUP_CONCAT(g.genre, ',') AS GenresCSV
    FROM Book AS b
    LEFT JOIN Genre AS g
      ON g.bookID = b.bookID
    GROUP BY b.bookID
    ORDER BY b.Title COLLATE NOCASE ASC
  `;

  const rows = db.prepare(sql).all(); // .all() => ARRAY of results
  const books = [];

  for (let i = 0; i < rows.length; i += 1) {
    books.push(rowToBook(rows[i]));
  }

  return books;
}

/**
 * @typedef  {Object} FilterParams
 * @property {string}               [Title]       // optional title substring
 * @property {string}               [Author]      // optional author substring
 * @property {string|null}          [Genres]      // CSV string or array (both OK)
 * @property {'contain'|'has'}      [GenresMode]  // "contain" = OR (any), "has" = AND (all)
 */

/**
 * Filtered query using simple CTE (common table expression) subqueries:
 *  - Title/Author: case-insensitive substring (LIKE)
 *  - Genres: “contain” = OR (any match), “has” = AND (all must match)
 *
 *  - ids_genre : by genres (ANY for "contain", ALL for "has")
 *  - ids_ta    : by Title/Author (LIKE)
 * Then we return full book rows (with ALL their genres) for matched bookIDs.
 *
 * NOTE: If no filters are provided, this throws an Error.
 *       Use getLibrary() when you want everything.
 *
 * @param   {FilterParams}  params
 * @returns {Book[]}
 */
export function getFilteredLibrary({ Title, Author, Genres, GenresMode = 'contain' }) {
  // Normalize Title/Author (lower + trim for LIKE)
  const title = Title ? String(Title).trim().toLowerCase() : '';
  const author = Author ? String(Author).trim().toLowerCase() : '';

  // Normalize Genres (CSV string from the form) -> array of lowercased unique strings
  let genreList = [];
  if (typeof Genres === 'string' && Genres.trim() !== '') {
    genreList = csvToArray(Genres).map((s) => s.toLowerCase());
  }

  // Require at least one filter for this function
  if (!title && !author && genreList.length === 0) {
    throw new Error('At least one filter is required (Title, Author, or Genres).');
  }

  /** @type {string[]} */ const cteClauses = [];
  /** @type {any[]}    */ const params = [];

  // A) Genres CTE (ids_genre)
  if (genreList.length > 0) {
    const placeholders = genreList.map(() => '?').join(', ');
    if (GenresMode === 'has') {
      // ALL genres must be present on the same book
      cteClauses.push(`
        ids_genre AS (
          SELECT g.bookID
          FROM Genre AS g
          WHERE LOWER(g.genre) IN (${placeholders})
          GROUP BY g.bookID
          HAVING COUNT(DISTINCT LOWER(g.genre)) = ?
        )
      `);
      params.push(...genreList, genreList.length);
    } else {
      // ANY genre is enough
      cteClauses.push(`
        ids_genre AS (
          SELECT DISTINCT g.bookID
          FROM Genre AS g
          WHERE LOWER(g.genre) IN (${placeholders})
        )
      `);
      params.push(...genreList);
    }
  }

  // B) Title/Author CTE (ids_ta)
  if (title || author) {
    const taConds = [];
    if (title) { taConds.push('LOWER(b.Title)  LIKE ?'); params.push('%' + title + '%'); }
    if (author) { taConds.push('LOWER(b.Author) LIKE ?'); params.push('%' + author + '%'); }

    cteClauses.push(`
      ids_ta AS (
        SELECT DISTINCT b.bookID
        FROM Book AS b
        WHERE ${taConds.join(' AND ')}
      )
    `);
  }

  // WITH … (include 1 or 2 CTEs, joined by a comma)
  let sql = '';
  if (cteClauses.length > 0) {
    sql += 'WITH ' + cteClauses.join(',\n') + '\n';
  }

  // Main query — return full rows, with all genres concatenated, for matching IDs
  sql += `
    SELECT
      b.bookID,
      b.Title,
      b.Author,
      b.Abstract,
      b.CoverUrl,
      GROUP_CONCAT(g2.genre, ',') AS GenresCSV
    FROM Book AS b
    LEFT JOIN Genre AS g2 ON g2.bookID = b.bookID
    WHERE 1 = 1
  `;

  if (genreList.length > 0) sql += ` AND b.bookID IN (SELECT bookID FROM ids_genre)`;
  if (title || author) sql += ` AND b.bookID IN (SELECT bookID FROM ids_ta)`;

  sql += `
    GROUP BY b.bookID
    ORDER BY b.Title COLLATE NOCASE ASC
  `;

  const rows = db.prepare(sql).all(...params);
  const books = rows.map(rowToBook);

  if (books.length === 0) {
    throw new Error('No books found for the selected filters.');
  }

  return books;
}