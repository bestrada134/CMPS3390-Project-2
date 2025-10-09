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
