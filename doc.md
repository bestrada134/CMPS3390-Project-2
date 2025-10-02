# Library Inventory Tracker

## 1) Project summary

* Build a small web app to track library books.
* **Users must be logged in** to use the app.
* Core flows: log in → see library → view a book → loan/check out a book → edit user settings.

## 2) Team & tooling

* **Framework:** SvelteKit (Vite-powered)
* **Language:** Svelte
    * Link to docs [https://svelte.dev/docs/kit/introduction]
* **Environment:** Node.js
* **Version control:** Git
* **Communication:** Discord

# Folder layout (public vs. private)

Move pages into **route groups** so only `(public)` is open:

```
src/
├─ lib/
│  └─ components/
│     └─ Header.svelte                 # Modular navbar component (only used in (app) layout)
└─ routes/
   ├─ +layout.svelte                   # Root layout: NO header here; renders children only
   ├─ +layout.server.js                # Expose { user } to the root layout (no guard)
   ├─ +page.server.js                  # "/" -> redirect to /dashboard if logged in, else /auth
   ├─ +page.svelte                     # Used to avoid run error it will auto redirect to /auth
   ├─ (public)/
   │  └─ auth/
   │     └─ +page.svelte               # /auth view: toggles Login/Signup, sets title reactively
   └─ (app)/                           # 🔒 Signed-in section (navbar visible here)
      ├─ +layout.svelte                # Renders <Header /> and wraps all private pages
      ├─ +layout.server.js             # Auth guard: if (!locals.user) redirect to /auth
      ├─ dashboard/
      │  └─ +page.svelte               # /dashboard (sets <title>Dashboard | …)
      ├─ books/
      │  └─ +page.svelte               # /books (sets <title>Books | …)
      ├─ book/
      │  └─ [id]/
      │     └─ +page.svelte            # /book/[id] (sets <title>{bookTitle} | … when you load data)
      └─ settings/
         └─ +page.svelte               # /settings (optional; include if you want a 5th view)

```

## 3) Views (pages) & behaviors

* **Log-in**

  * Form to authenticate the user.
  * On success → redirect to Library Overview.
* **Library Overview**

  * Displays all books from persistent storage (SQLite).
  * Alphabetized by **Title**.
  * Click a book → Book Details.
* **Book Details**

  * Shows **Title, Author, Genre, Abstract**.
  * Button to **Loan/Check out** the book.
* **User Settings**

  * Update **username** and **password**.

## 4) Data model (pseudo; convert to SQLite later)

**Primary:** Users, Books

**Relation:** Loaned (Users ↔ Books)

**Persistent data:** SQLite

```npm
npm i better-sqlite3 bcryptjs uuid
```
* better-sqlite3 — A tiny, fast Node driver that lets us run raw SQL (no ORM). It’s synchronous, which keeps the app code simple.

* bcryptjs — Hashes passwords so we never store them in plaintext.

* uuid — Generates random session tokens for logged-in users.

<br>

* **Book**

  ```sql
  bookID   (int, not null, auto increment, Primary Key)
  Author   (varchar, not null)
  Genre    (varchar, not null)
  Title    (varchar, not null)
  Abstract (text)
  ```
* **User**

  ```sql
  userID   (int, not null, auto increment, Primary Key)
  Username (varchar, not null)
  Email    (varchar, not null)
  Password (varchar, not null)
  ```
* **Loaned** (User ↔ Book)

  ```sql
  loanID (int, not null, Primary Key)
  userID (int, not null)
  bookID (int, not null)
  FOREIGN KEY (userID) REFERENCES User(userID)
  FOREIGN KEY (bookID) REFERENCES Book(bookID)
  ```

**Book details users can add:** Title, Author, Genre

## 5) Stretch goals

* **Roles/Permissions** (e.g., Admin vs. Member).
* **Live search**: search bar to find books.
* **Favorites**: mark a book as favorite from Book Details.
* **Overdue status**: indicate when a checked-out book is overdue.
* **Sort by Author’s last name** within sections.

## 6) Development plan

* Initialize repo and project (**SvelteKit**).
* Set up SvelteKit routes/pages for: Log-in, Library Overview, Book Details, User Settings.
* **Mock data**: create and load sample rows for the **Books** table.
* Implement Log-in (require authentication before accessing app routes).
* Build Library Overview (Title-sorted list).
* Build Book Details + **Loan/Check out** action (writes to `Loaned`).
* Build User Settings (update username/password).
* Connect to SQLite for persistence (convert pseudo SQL to real DDL later).
* QA pass and small UI polish.

## 7) Open questions

* **Login identifier**: Sign in with **Username**, **Email**, or either?
* **Author last name sorting** (stretch): parse last name vs. store separately?