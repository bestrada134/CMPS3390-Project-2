<!-- START OF NEW DOCUMENTATION -->
# Library Inventory Tracker — Project 2 Documentation
**Course:** CMPS 3390 • **Term:** Fall 2025  
**Front end:** Svelte (SvelteKit) + Tailwind CSS  
**Language:** **JavaScript** (JSDoc with TypeScript-style annotations for params/returns)  
**Database:** SQLite (better-sqlite3)  
**Repo:** `CMPS3390-Project-2`  
**Purpose:** Complements `README.md` with planning, team decisions, and assignment alignment.

---

# Part 1 — Research & Information Gathering

## 1.1 Goals / Success Criteria
- Deliver a simple, secure library app with 3–5 views: **Auth**, **Dashboard**, **Books**, **Book Detail**, **Settings**.
- Core tasks: **login/signup → browse/filter books → view details → check out/return → update profile**.
- Provide clear errors, empty states, and responsive UI.
- Persist data in SQLite with first-run seed data for easy demos.

## 1.2 Users & Scenarios
- **Member (student)** — log in, search/filter books, check out, return.  
- **Returning member** — see current loans on Dashboard, jump to details/return.  
- **Admin (stretch)** — add/edit/delete books (never delete if currently loaned).

**Happy paths**
- Auth → Dashboard (my loans) → Book Detail → Return  
- Auth → Books → Filter by Title/Author/Genres → Book Detail → Check Out  
- Auth → Settings → Update username/email/password

## 1.3 MVP Requirements (high level)
- **Auth:** login, signup, logout; secure session cookie; server-side validation.  
- **Books:** list + filters (title, author, genres), detail page, check out/return.  
- **Dashboard:** show current user’s loans and quick navigation.  
- **Settings:** update username/email/password with duplicate checks.  
- **Persistence:** SQLite; foreign keys enforced; seed data.

---

# Part 2 — Environment Setup

## 2.1 Final Technical Decisions
- **Framework:** SvelteKit (Vite), Tailwind CSS.  
- **Language:** **JavaScript** with JSDoc for TS-style types.  
- **DB:** SQLite created on first run; **foreign_keys = ON**; seed script in `src/lib/db.js`.  
- **Architecture:** Controllers (auth/book/loan) call Models (user/book/loan); routes use server actions for mutations.

## 2.2 Developer Environment
- **Node:** LTS (≥ 18).  
- **Install & run:** `npm install` → `npm run dev`.  
- DB auto-creates and auto-seeds on first run for parity.

## 2.3 Team Collaboration
- **Communication:** Discord, with **a few touchpoints each week**.  
- **Version control:** feature **branches → merge to `main` only when bug-free** (small, focused commits; pull often).

---

# Part 3 — Develop Your Application

## 3.1 Assignment Compliance (checklist)
- **3–5 Views:** Auth, Dashboard, Books, Book Detail, Settings.  
- **≥ 2 Models:** `User`, `Book` (+ `Loaned` relation and `Genre` table).  
- **Persistent storage:** SQLite with seed data.  
- **CRUD for ≥ 1 model:** target **Book** (Read implemented; Create/Update/Delete planned as admin-only; see §3.4).  
- **Usability & Validation:** clear flows, server-side checks, helpful errors.

## 3.2 Data Model (matches `src/lib/db.js`)
**Tables & key fields**
- **User**  
  `userID (INTEGER PK AUTOINCREMENT)`, `Username`, `Email`, `Password` *(bcrypt hash)*
- **Book**  
  `bookID (INTEGER PK AUTOINCREMENT)`, `Author`, `Title`, `Abstract?`, `CoverUrl?`
- **Genre** *(multi-valued genres per book; cascades on book delete)*  
  `genreID (INTEGER PK AUTOINCREMENT)`, `bookID (FK → Book.bookID)`, `genre`
- **Loaned** *(active loans; cascades on user/book delete)*  
  `loanID (INTEGER PK AUTOINCREMENT)`, `userID (FK → User.userID)`, `bookID (FK → Book.bookID)`

**Notes**
- **Foreign keys** enforced via PRAGMA.  
- **Admin seed:** `admin / admin@admin.com / admin!` (hashed).  
- **Books/Genres** seeded **once** when `Book` is empty.  
- **Return** = delete the matching row from **Loaned** (no `returnedAt` column).

## 3.3 Controllers, Models, Routes (map)
- **Controllers (`src/controllers`)**  
  - `auth.controller.js` — **handles login & signup used by the `/auth` page**, hashing, session cookie.  
  - `book.controller.js` — list/filter all books; get by `bookID`; (admin CRUD endpoints).  
  - `loan.controller.js` — check out (insert `Loaned`), return (delete `Loaned`), list loans by user.
- **Models (`src/models`)**  
  - `user.model.js` — create user, fetch by id/username/email, verify credentials.  
  - `book.model.js` — get all, filter by title/author/genres, get by id; (create/update/delete).  
  - `loan.model.js` — check active loan, create loan, delete loan (return), list loans for user.
- **Routes (`src/routes`)**  
  - `(public)/auth` — login/signup UI + server actions.  
  - `(app)/dashboard`, `(app)/books`, `(app)/book/[id]`, `(app)/settings`.  
  - `logout/+server.js` — clears cookie and redirects to `/auth`.  
  - `(app)/+layout.server.js` — guard: redirect unauthenticated users to `/auth`.

## 3.4 CRUD Target — **Book** (admin-only)
- **Create** → `book.model.create({ Title, Author, Abstract?, CoverUrl? })` + genres list → insert into `Genre`  
  *Validate required fields; trim; sane lengths.*
- **Update** → `book.model.update(bookID, fields)`  
  *Allow partial updates; prevent invalid fields.*
- **Delete** → `book.model.delete(bookID)`  
  *Only if no active row in `Loaned` for that `bookID`.*

## 3.5 Page Brainstorm — simple checklists

### Auth — `/auth` (public)
- Toggle between **Login** and **Signup**.  
- On success → **redirect to `/dashboard`**.  
- Show validation errors; set secure session cookie; provide **Logout** later.  
- **Backed by `auth.controller.js`.**

### Dashboard — `/dashboard`
- Show **books the current user has checked out**.  
- Show **count** of active loans.  
- **Buttons** to go to **Library** (`/books`) and **Settings** (`/settings`).  
- Clicking a **title** → **`/book/[id]`** (pass `bookID`).  
- Empty state when no loans.

### Books — `/books`
- **Filters:** Title, Author, Genres (any/all).  
- Grid of **book cards**: cover, title, author, genres, abstract preview.  
- Actions: **Check Out** (available) / **Return** (if I have it) / **Unavailable**.  
- Clicking a card/title → **`/book/[id]`**.  
- **Admin (stretch):** Add / Edit / Delete (delete only if not loaned).

### Book Detail — `/book/[id]`
- Show cover, title, author, genres, **full abstract**.  
- One action visible: **Check Out**, **Return**, or **Unavailable**.  
- **Back to Library** button.  
- Graceful error for invalid `bookID`.

### Settings — `/settings`
- Show current **Username** and **Email**.  
- Update username/email (duplicate checks).  
- Change password (current + new).  
- Show success/error messages.

### Logout — `/logout`
- Clear auth cookie; redirect to `/auth`.

## 3.6 Validation, Security, UX
- **Passwords:** `bcryptjs` hashing.  
- **Sessions:** HttpOnly cookie (read in `hooks.server.js`).  
- **Validation:** required fields, length checks, normalized input.  
- **Guards:** deny deleting books with active loans; deny invalid IDs.  
- **UX:** empty states, clear errors, disabled buttons when invalid.

## 3.7 Testing & QA
- Manual passes on happy paths and edge cases: bad credentials, duplicate usernames/emails, invalid IDs, double checkout, return not owned.  
- Verify redirects, cookie lifecycle, and DB mutations.  
- Optional: `svelte-check` can type-check JSDoc annotations.

## 3.8 Presentation Plan
- **Part 1:** goals, scenarios, MVP.  
- **Part 2:** environment, team workflow (Discord + branches/merges).  
- **Part 3:** demo flows (auth → books → loan/return → settings), quick code tour.

---

## Appendix A — Commands
```sh
npm install
npm run dev
npm run build
npm run preview
````

## Appendix B — Collaboration Summary

* **Communication:** Discord, **a few times per week**.
* **Git workflow:** feature **branches → merge to `main` after verifying no bugs**.

## Appendix C — Directory Pointers

* Config: `svelte.config.js`, `vite.config.js`, `jsconfig.json`
* DB init & seed: `src/lib/db.js`
* Controllers: `src/controllers/*`
* Models: `src/models/*`
* Routes: `src/routes/*`
* Components: `src/lib/components/*`
---
<!-- END OF NEW DOCUMENTATION -->

<br><br><br><br>
---
---
<!-- START OF OLD DOCUMENTATION -->
# Library Inventory Tracker

## 1) Project summary

- Build a small web app to track library books.
- **Users must be logged in** to use the app.
- Core flows: log in → see library → view a book → loan/check out a book → edit user settings.

## 2) Team & tooling

- **Framework:** SvelteKit (Vite-powered)
- **Language:** Svelte
  - Link to docs [https://svelte.dev/docs/kit/introduction]
- **Environment:** Node.js
- **Version control:** Git
- **Communication:** Discord
- **Styling:** Tailwind
- **Persistent Data:** SQLite
# Folder layout (public vs. private)

Move pages into **route groups** so only `(public)` is open:

```
src/
├─ lib/
│  └─ components/
│     └─ Header.svelte
└─ routes/
   ├─ +layout.svelte                 # Root shell (no header here)
   ├─ +layout.server.js              # Puts { user } on every page
   ├─ +page.server.js                # "/" redirects to /dashboard or /auth
   ├─ +page.svelte                   # Empty shell, never used for UI
   ├─ (public)/
   │  └─ auth/+page.svelte           # Login and Signup
   └─ (app)/                         # Signed-in area (header visible here)
      ├─ +layout.svelte              # Renders <Header/> then page content
      ├─ +layout.server.js           # Guard: redirect to /auth when not logged in
      ├─ dashboard/+page.server.js   # Dashboard data (see usage at bottom)
      ├─ books/+page.server.js       # Books list data (see usage at bottom)
      ├─ book/[id]/+page.server.js   # Book detail data + loan/return actions
      └─ settings/+page.server.js    # Update username, email, password


```

## 3) Views (pages) & behaviors

- **Log-in**

  - Form to authenticate the user.
  - On success → redirect to Library Overview.

- **Library Overview**

  - Displays all books from persistent storage (SQLite).
  - Alphabetized by **Title**.
  - Click a book → Book Details.

- **Book Details**

  - Shows **Title, Author, Genre, Abstract**.
  - Button to **Loan/Check out** the book.

- **User Settings**

  - Update **username** and **password**.

### What each page should do and might have (and how that affects code)

**Auth (/auth)**

- Show Login and Signup.
- On success, redirect to `/dashboard`.
- Already handled by your existing auth controller.

**Dashboard (/dashboard)**

- Greeting to the user.
- Loaned section:

  - Show user’s loaned books as small cards with CoverUrl and Title.
  - Filters on the loaned list: by Title, by Author, by Genres.
  - Show count of how many books are currently loaned.

- Stretch:

  - Favorites table (not implemented here, ready to add later).
  - Most loaned genre pie chart (only show if user has at least 3 loans).

- Impact:

  - We add **loan.model** and **loan.controller** with:

    - `listLoansByUser(userID, filters)`
    - `countLoansByUser(userID)`
    - `loanBook(userID, bookID)` and `returnBook(userID, bookID)`

**Books (/books)**

- Show the library as “book cards”.
- Abstract should be a preview (truncated).
- Filters: by Title, by Author, by Genres.
- Each card is clickable and links to `/book/[id]`.
- Admin only:

  - Create a new book.
  - Update a book.
  - Delete a book, but **only if not loaned**.

- Impact:

  - We add a **filtered list** to the book model and controller.
  - We update delete logic to prevent delete when a book is loaned.

**Book Detail (/book/[id])**

- Show larger view: Cover image, Title, Author, Genres, full Abstract.
- Action:

  - If not loaned → show Loan button.
  - If loaned by this user → show Return button.
  - If loaned by someone else → show Unavailable.

- Impact:

  - Loan controller functions are used by actions on this page.

**Settings (/settings)**

- Show current profile values.
- Update username and email with duplicate checks.
- Update password (enter current and new).
- Impact:

  - We add `updateUserProfile` and `updateUserPassword` in the model
  - And `updateProfile` and `changePassword` in the controller.

## 4) Data model (pseudo; convert to SQLite later)

**Primary:** Users, Books

**Relation:** Loaned (Users ↔ Books)

**Persistent data:** SQLite

```npm
npm i better-sqlite3 bcryptjs uuid
```

- better-sqlite3 — A tiny, fast Node driver that lets us run raw SQL (no ORM). It’s synchronous, which keeps the app code simple.

- bcryptjs — Hashes passwords so we never store them in plaintext.

- uuid — Generates random session tokens for logged-in users.

<br>

- **Book**

  ```sql
  bookID   (int, not null, auto increment, Primary Key)
  Author   (varchar, not null)
  Genre    (varchar, not null)
  Title    (varchar, not null)
  Abstract (text)
  ```

- **User**

  ```sql
  userID   (int, not null, auto increment, Primary Key)
  Username (varchar, not null)
  Email    (varchar, not null)
  Password (varchar, not null)
  ```

- **Loaned** (User ↔ Book)

  ```sql
  loanID (int, not null, Primary Key)
  userID (int, not null)
  bookID (int, not null)
  FOREIGN KEY (userID) REFERENCES User(userID)
  FOREIGN KEY (bookID) REFERENCES Book(bookID)
  ```

**Book details users can add:** Title, Author, Genre

## 5) Stretch goals

- **Roles/Permissions** (e.g., Admin vs. Member).
- **Live search**: search bar to find books.
- **Favorites**: mark a book as favorite from Book Details.
- **Overdue status**: indicate when a checked-out book is overdue.
- **Sort by Author’s last name** within sections.

## 6) Development plan

- Initialize repo and project (**SvelteKit**).
- Set up SvelteKit routes/pages for: Log-in, Library Overview, Book Details, User Settings.
- **Mock data**: create and load sample rows for the **Books** table.
- Implement Log-in (require authentication before accessing app routes).
- Build Library Overview (Title-sorted list).
- Build Book Details + **Loan/Check out** action (writes to `Loaned`).
- Build User Settings (update username/password).
- Connect to SQLite for persistence (convert pseudo SQL to real DDL later).
- QA pass and small UI polish.

## 7) Open questions

- **Login identifier**: Sign in with **Username**, **Email**, or either?
- **Author last name sorting** (stretch): parse last name vs. store separately?
