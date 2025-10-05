// src/lib/db.js
/**
 * SQLite, zero-CLI:
 * - Creates db/library.db and tables on first import
 * - Uses better-sqlite3 (sync, simple)
 * - We now use a User table (renamed from Student)
 */
import fs from 'node:fs';
import path from 'node:path';
import Database from 'better-sqlite3';

const dbDir = path.resolve('db');
fs.mkdirSync(dbDir, { recursive: true });
const dbFile = path.join(dbDir, 'library.db');

export const db = new Database(dbFile);
db.pragma('foreign_keys = ON');

/* ---- Schema ---- */
db.exec(`
  /* Users */
  CREATE TABLE IF NOT EXISTS User (
    userID   INTEGER PRIMARY KEY AUTOINCREMENT,
    Username VARCHAR NOT NULL,
    Email    VARCHAR NOT NULL,
    Password VARCHAR NOT NULL
  );

  /* Books */
  CREATE TABLE IF NOT EXISTS Book (
    bookID   INTEGER PRIMARY KEY AUTOINCREMENT,
    Author   VARCHAR NOT NULL,
    Title    VARCHAR NOT NULL,
    Abstract TEXT
  );

  /* Multi-valued genres for each book */
  CREATE TABLE IF NOT EXISTS Genre (
    genreID INTEGER PRIMARY KEY AUTOINCREMENT,
    bookID  INTEGER NOT NULL,
    genre   VARCHAR NOT NULL,
    FOREIGN KEY (bookID) REFERENCES Book(bookID) ON DELETE CASCADE
  );

  /* Loans */
  CREATE TABLE IF NOT EXISTS Loaned (
    loanID INTEGER PRIMARY KEY AUTOINCREMENT,
    userID INTEGER NOT NULL,
    bookID INTEGER NOT NULL,
    FOREIGN KEY (userID) REFERENCES User(userID) ON DELETE CASCADE,
    FOREIGN KEY (bookID) REFERENCES Book(bookID) ON DELETE CASCADE
  );

`);
