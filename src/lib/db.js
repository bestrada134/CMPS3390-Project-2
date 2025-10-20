// src/lib/db.js
/**
 * SQLite (better-sqlite3) — zero CLI required.
 * - Creates db/library.db and tables on first import
 * - Enables foreign keys
 * - Seeds an Admin account (username: admin / password: admin)
 * - Seeds the Book + Genre tables ONE TIME (only if Book is empty)
 *
 * You can delete db/library.db anytime to recreate a fresh dev database.
 */

// Node core modules for file paths + directory creation
import fs from "node:fs";
import path from "node:path";

// Database driver (sync, simple)
import Database from "better-sqlite3";
// Only for hashing the admin password (never store plaintext)
import bcrypt from "bcryptjs";

// Ensure ./db directory exists (where library.db will live)
const dbDir = path.resolve("db");
fs.mkdirSync(dbDir, { recursive: true });
const dbFile = path.join(dbDir, "library.db");

// Open the database (creates if missing)
export const db = new Database(dbFile);

// Enforce foreign key constraints
db.pragma("foreign_keys = ON");

/* ------------------------------------------------------------------ */
/* Schema                                                             */
/* ------------------------------------------------------------------ */
db.exec(`
  /* Users */
  CREATE TABLE IF NOT EXISTS User (
    userID   INTEGER PRIMARY KEY AUTOINCREMENT,
    Username VARCHAR NOT NULL,
    Email    VARCHAR NOT NULL,
    Password VARCHAR NOT NULL
  );

  /* Books (Abstract + CoverUrl are optional) */
  CREATE TABLE IF NOT EXISTS Book (
    bookID   INTEGER PRIMARY KEY AUTOINCREMENT,
    Author   VARCHAR NOT NULL,
    Title    VARCHAR NOT NULL,
    Abstract TEXT,
    CoverUrl TEXT
  );

  /* Multi-valued genres (one book can have many) */
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

/* ------------------------------------------------------------------ */
/* Ensure an Admin user exists                                         */
/*  - Username: admin                                                  */
/*  - Email:    admin@admin.com                                        */
/*  - Password: admin!  (stored as bcrypt hash)                         */
/*  - Tries to assign userID = 1 on an empty DB                        */
/* ------------------------------------------------------------------ */
(function ensureAdminUser() {
  try {
    const exists = db
      .prepare("SELECT userID FROM User WHERE Username = ?")
      .get("admin");
    if (exists) return; // already have admin

    const pwdHash = bcrypt.hashSync("admin!", 10);
    const { n } = db.prepare("SELECT COUNT(*) AS n FROM User").get();

    if (n === 0) {
      // Fresh DB → explicitly claim id 1
      db.prepare(
        "INSERT INTO User (userID, Username, Email, Password) VALUES (?, ?, ?, ?)"
      ).run(1, "admin", "admin@admin.com", pwdHash);
      console.log("Admin user created with userID=1");
      return;
    }

    // DB already has users → attempt id=1 if free, else let SQLite assign
    const id1 = db.prepare("SELECT userID FROM User WHERE userID = 1").get();
    if (!id1) {
      db.prepare(
        "INSERT INTO User (userID, Username, Email, Password) VALUES (?, ?, ?, ?)"
      ).run(1, "admin", "admin@admin.com", pwdHash);
      console.log("Admin user created with userID=1");
    } else {
      const info = db
        .prepare(
          "INSERT INTO User (Username, Email, Password) VALUES (?, ?, ?)"
        )
        .run("admin", "admin@admin.com", pwdHash);
      console.warn(
        `⚠️ Admin created but not userID=1 (new id=${Number(
          info.lastInsertRowid
        )}).`
      );
    }
  } catch (e) {
    console.error("❌ Failed to ensure admin user:", e?.message || e);
  }
})();

/* --------------------------------------------------------------------*/
/* Seed data (Books + Genres) — runs ONLY IF Book table is empty       */
/*  - Abstract and CoverUrl are optional                               */
/*  - Genres must include at least one non-empty string                */
/*  - Seed Book+Genre only if Book is empty                            */
/*  - IIFE(Immediately Invoked Function Expression)                    */
/*      is just a function you define and call right away              */
/*  -  docs: https://developer.mozilla.org/en-US/docs/Glossary/IIFE    */
/* --------------------------------------------------------------------*/
const seedBooks = [
  {
    Title: "Dune",
    Author: "Frank Herbert",
    Abstract: `On the desert planet Arrakis, a young heir is thrown into a struggle over a priceless spice and the future of an empire. Amid prophecy and political betrayal, he learns the ways of the Fremen and faces the cost of power.`,
    CoverUrl: null,
    Genres: ["Science Fiction", "Adventure"],
  },
  {
    Title: "The Hobbit",
    Author: "J.R.R. Tolkien",
    Abstract: `Comfort-loving Bilbo Baggins is swept into a quest with dwarves to reclaim a lost mountain kingdom. On the road, he discovers courage, wit, and a ring that will matter far beyond this journey.`,
    CoverUrl: null,
    Genres: ["Fantasy", "Adventure"],
  },
  {
    Title: "1984",
    Author: "George Orwell",
    Abstract: `Winston Smith lives under a regime that rewrites truth and watches every citizen. As he reaches for love and memory, he confronts the terrifying machinery of a state that demands absolute obedience.`,
    CoverUrl: null,
    Genres: ["Dystopian", "Political Fiction"],
  },
  {
    Title: "Pride and Prejudice",
    Author: "Jane Austen",
    Abstract: `Elizabeth Bennet meets the proud Mr. Darcy and misjudgment sparks between them. Through sharp social comedy and family pressures, both must confront their own pride and prejudice before love can grow.`,
    CoverUrl: null,
    Genres: ["Classic", "Romance"],
  },
  {
    Title: "The Great Gatsby",
    Author: "F. Scott Fitzgerald",
    Abstract: `Nick Carraway observes Jay Gatsby’s glittering parties and stubborn dream of winning Daisy back. Beneath the Jazz Age glamour, desire and illusion collide with class and tragedy.`,
    CoverUrl: null,
    Genres: ["Classic", "Tragedy"],
  },
  {
    Title: "Frankenstein",
    Author: "Mary Shelley",
    Abstract: `Victor Frankenstein assembles life from death and recoils from his creation. The being he made seeks recognition and revenge, raising haunting questions about responsibility, loneliness, and what makes us human.`,
    CoverUrl: null,
    Genres: ["Gothic", "Science Fiction"],
  },
  {
    Title: "Dracula",
    Author: "Bram Stoker",
    Abstract: `A Transylvanian count brings ancient hunger to modern England. Through journals and letters, a small band races to understand the threat and confront a predator who thrives in shadow and superstition.`,
    CoverUrl: null,
    Genres: ["Gothic", "Horror"],
  },
  {
    Title: "Moby-Dick",
    Author: "Herman Melville",
    Abstract: `Ishmael signs aboard the Pequod and meets the obsessed Captain Ahab, who hunts a great white whale. The voyage becomes a meditation on fate, nature, and the consuming power of vengeance.`,
    CoverUrl: null,
    Genres: ["Classic", "Sea Story"],
  },
  {
    Title: "The Odyssey",
    Author: "Homer",
    Abstract: `After the Trojan War, Odysseus struggles for years to sail home, facing monsters, temptresses, and the anger of gods. His family fights to keep hope alive as suitors swarm his hall.`,
    CoverUrl: null,
    Genres: ["Classic", "Epic"],
  },
  {
    Title: "The Catcher in the Rye",
    Author: "J.D. Salinger",
    Abstract: `Holden Caulfield wanders New York after leaving school, chasing honesty in a world he finds phony. His voice is raw, rebellious, and fragile as he reaches for connection and meaning.`,
    CoverUrl: null,
    Genres: ["Coming-of-Age", "Literary Fiction"],
  },
  {
    Title: "To Kill a Mockingbird",
    Author: "Harper Lee",
    Abstract: `In a small Southern town, Scout Finch watches her father defend a Black man falsely accused. Through a child’s eyes, the story explores conscience, prejudice, and the courage to stand firm.`,
    CoverUrl: null,
    Genres: ["Classic", "Historical Fiction"],
  },
  {
    Title: "The Fellowship of the Ring",
    Author: "J.R.R. Tolkien",
    Abstract: `A hobbit inherits a ring of terrible power and joins a fellowship to destroy it. Dark forces stir across Middle-earth as friendship and resolve are tested on a perilous road.`,
    CoverUrl: null,
    Genres: ["Fantasy", "Epic"],
  },
  {
    Title: "The Two Towers",
    Author: "J.R.R. Tolkien",
    Abstract: `The fellowship is broken but the quest continues: battles rise in the West while Frodo and Sam cross cursed lands with a treacherous guide. Hope hangs on fragile choices in a widening war.`,
    CoverUrl: null,
    Genres: ["Fantasy", "Epic"],
  },
  {
    Title: "The Return of the King",
    Author: "J.R.R. Tolkien",
    Abstract: `Armies clash as the shadow gathers, and Frodo nears the heart of the enemy with the Ring’s burden. The fate of kingdoms turns on loyalty, sacrifice, and a final, costly decision.`,
    CoverUrl: null,
    Genres: ["Fantasy", "Epic"],
  },
  {
    Title: "Harry Potter and the Sorcerer's Stone",
    Author: "J.K. Rowling",
    Abstract: `An orphan learns he is a wizard and enters a hidden world of classes, friends, and secrets. A mystery unfolds at school, pointing to a dark figure and a stone that promises immortality.`,
    CoverUrl: null,
    Genres: ["Fantasy", "Young Adult"],
  },
  {
    Title: "The Lion, the Witch and the Wardrobe",
    Author: "C.S. Lewis",
    Abstract: `Four siblings step through a wardrobe into Narnia, a land trapped in winter. With a great lion’s help, they face betrayal and bravery as an old magic begins to break.`,
    CoverUrl: null,
    Genres: ["Fantasy", "Children"],
  },
  {
    Title: "Brave New World",
    Author: "Aldous Huxley",
    Abstract: `In a society engineered for pleasure and stability, a “savage” outsider exposes what has been traded away. The novel probes freedom, conditioning, and the cost of a painless world.`,
    CoverUrl: null,
    Genres: ["Dystopian", "Science Fiction"],
  },
  {
    Title: "Fahrenheit 451",
    Author: "Ray Bradbury",
    Abstract: `Guy Montag burns books for a living until curiosity and a neighbor’s questions unsettle him. As screens drown out thought, he must decide what knowledge is worth risking everything for.`,
    CoverUrl: null,
    Genres: ["Dystopian", "Science Fiction"],
  },
  {
    Title: "The Handmaid’s Tale",
    Author: "Margaret Atwood",
    Abstract: `In a theocratic state, Offred is forced to bear children for the ruling class. She remembers a lost life, navigates danger, and weighs the risks of speaking or surviving in silence.`,
    CoverUrl: null,
    Genres: ["Dystopian", "Speculative Fiction"],
  },
  {
    Title: "The Road",
    Author: "Cormac McCarthy",
    Abstract: `A father and son push a cart through a burned America, scavenging for food and safety. Their bond and a small fire of hope guide them through a landscape of ash and fear.`,
    CoverUrl: null,
    Genres: ["Post-apocalyptic", "Literary Fiction"],
  },
  {
    Title: "The Kite Runner",
    Author: "Khaled Hosseini",
    Abstract: `A betrayal in childhood shadows two Afghan boys across war and exile. Years later, the past calls one man back to seek forgiveness and a chance to make things right.`,
    CoverUrl: null,
    Genres: ["Literary Fiction", "Historical Fiction"],
  },
  {
    Title: "The Alchemist",
    Author: "Paulo Coelho",
    Abstract: `A shepherd dreams of treasure and follows omens across the desert. His journey becomes a fable about purpose, perseverance, and listening to the heart’s quiet language.`,
    CoverUrl: null,
    Genres: ["Fable", "Philosophical Fiction"],
  },
  {
    Title: "One Hundred Years of Solitude",
    Author: "Gabriel García Márquez",
    Abstract: `The Buendía family’s fortunes and follies unfold in the town of Macondo. Love, memory, and history twist through generations in a tapestry where the magical feels everyday.`,
    CoverUrl: null,
    Genres: ["Magical Realism", "Literary Fiction"],
  },
  {
    Title: "Crime and Punishment",
    Author: "Fyodor Dostoevsky",
    Abstract: `Raskolnikov commits a murder to test a theory and spirals into guilt and feverish doubt. The path to confession runs through philosophy, suffering, and a fragile promise of redemption.`,
    CoverUrl: null,
    Genres: ["Classic", "Psychological Fiction"],
  },
  {
    Title: "War and Peace",
    Author: "Leo Tolstoy",
    Abstract: `Aristocratic lives intersect with the tides of the Napoleonic wars. Love, loss, and the sweep of history reveal both the grand and intimate patterns of human change.`,
    CoverUrl: null,
    Genres: ["Classic", "Historical Fiction"],
  },
  {
    Title: "Anna Karenina",
    Author: "Leo Tolstoy",
    Abstract: `A dazzling woman defies convention and pursues a forbidden love, while another couple seeks steadier happiness. The novel weighs individual desire against social judgment with piercing clarity.`,
    CoverUrl: null,
    Genres: ["Classic", "Literary Fiction"],
  },
  {
    Title: "The Brothers Karamazov",
    Author: "Fyodor Dostoevsky",
    Abstract: `Three very different brothers confront faith, doubt, and patricide. The investigation becomes a deeper inquiry into freedom, morality, and the aching need to believe or refuse.`,
    CoverUrl: null,
    Genres: ["Classic", "Philosophical Fiction"],
  },
  {
    Title: "Jane Eyre",
    Author: "Charlotte Brontë",
    Abstract: `An orphaned governess forges a life of work and principle. Love with Mr. Rochester awakens joy and a secret that forces her to choose self-respect over ease.`,
    CoverUrl: null,
    Genres: ["Classic", "Gothic Romance"],
  },
  {
    Title: "Wuthering Heights",
    Author: "Emily Brontë",
    Abstract: `On the moors, a fierce bond between Catherine and Heathcliff curdles into obsession. The legacy of love and spite twists through two generations in a storm of passion.`,
    CoverUrl: null,
    Genres: ["Classic", "Gothic"],
  },
  {
    Title: "The Picture of Dorian Gray",
    Author: "Oscar Wilde",
    Abstract: `A beautiful young man keeps his looks while a hidden portrait bears his sins. Wit and decadence darken into horror as he learns what a bargain with vanity can cost.`,
    CoverUrl: null,
    Genres: ["Gothic", "Philosophical Fiction"],
  },
  {
    Title: "The Stranger",
    Author: "Albert Camus",
    Abstract: `Meursault lives with unsettling detachment until an impulsive act shatters his routine. Confronted by law and society, he faces the absurd emptiness behind familiar meanings.`,
    CoverUrl: null,
    Genres: ["Philosophical Fiction", "Existentialism"],
  },
  {
    Title: "The Metamorphosis",
    Author: "Franz Kafka",
    Abstract: `Gregor Samsa wakes transformed into a monstrous insect. As he and his family cope, the story exposes alienation, duty, and the quiet cruelty of indifference.`,
    CoverUrl: null,
    Genres: ["Absurdist", "Novella"],
  },
  {
    Title: "The Name of the Rose",
    Author: "Umberto Eco",
    Abstract: `In a medieval abbey, a monk and his novice investigate a string of deaths tied to a forbidden book. Scholarship, faith, and reason collide in a labyrinth of clues.`,
    CoverUrl: null,
    Genres: ["Historical Mystery", "Literary Fiction"],
  },
  {
    Title: "The Da Vinci Code",
    Author: "Dan Brown",
    Abstract: `A professor and a cryptologist race through clues hidden in art and history after a murder in the Louvre. Secrets about a religious mystery set off a global chase.`,
    CoverUrl: null,
    Genres: ["Thriller", "Mystery"],
  },
  {
    Title: "The Girl with the Dragon Tattoo",
    Author: "Stieg Larsson",
    Abstract: `A disgraced journalist and a brilliant hacker dig into a wealthy family’s cold case. Their partnership uncovers violence, corruption, and the price of the truth.`,
    CoverUrl: null,
    Genres: ["Thriller", "Crime"],
  },
  {
    Title: "The Shining",
    Author: "Stephen King",
    Abstract: `A family winters in an isolated hotel where the father’s demons meet something far worse. The building itself seems to breathe malice as reality frays.`,
    CoverUrl: null,
    Genres: ["Horror", "Psychological Fiction"],
  },
  {
    Title: "It",
    Author: "Stephen King",
    Abstract: `Children in a small town face a shape-shifting terror that returns every generation. Bonded by trauma, they reunite as adults to confront the nightmare again.`,
    CoverUrl: null,
    Genres: ["Horror", "Supernatural"],
  },
  {
    Title: "A Game of Thrones",
    Author: "George R.R. Martin",
    Abstract: `Noble houses scheme for a throne while an ancient threat gathers in the cold North. Politics, prophecy, and shifting loyalties unravel certainties in a brutal world.`,
    CoverUrl: null,
    Genres: ["Fantasy", "Epic"],
  },
  {
    Title: "The Color Purple",
    Author: "Alice Walker",
    Abstract: `Told through letters, Celie’s voice traces abuse, resilience, and unexpected love. Her circle of women offers strength as she claims her own life and worth.`,
    CoverUrl: null,
    Genres: ["Literary Fiction", "Historical Fiction"],
  },
  {
    Title: "Beloved",
    Author: "Toni Morrison",
    Abstract: `Sethe, once enslaved, is haunted by a past that takes on flesh. Memory, motherhood, and haunting braid into a story about freedom’s cost and the need to tell what happened.`,
    CoverUrl: null,
    Genres: ["Literary Fiction", "Historical Fiction"],
  },
  {
    Title: "The Book Thief",
    Author: "Markus Zusak",
    Abstract: `In Nazi Germany, Death narrates the life of a girl who steals books and learns the power of words. Her found family shelters a secret that makes courage intimate.`,
    CoverUrl: null,
    Genres: ["Historical Fiction", "Young Adult"],
  },
  {
    Title: "The Giver",
    Author: "Lois Lowry",
    Abstract: `Jonas is chosen to receive memories of a world before sameness. What he learns about pain, love, and choice forces him to question the rules that promise safety.`,
    CoverUrl: null,
    Genres: ["Dystopian", "Young Adult"],
  },
  {
    Title: "Life of Pi",
    Author: "Yann Martel",
    Abstract: `After a shipwreck, a boy drifts in a lifeboat with a Bengal tiger. His tale tests the borders of belief, survival, and the stories we choose to live by.`,
    CoverUrl: null,
    Genres: ["Adventure", "Literary Fiction"],
  },
  {
    Title: "The Hitchhiker's Guide to the Galaxy",
    Author: "Douglas Adams",
    Abstract: `Seconds before Earth is demolished, Arthur Dent hitches a ride on a spaceship. Absurd adventures follow as he learns the universe is both ridiculous and oddly comforting.`,
    CoverUrl: null,
    Genres: ["Science Fiction", "Humor"],
  },
  {
    Title: "Ender's Game",
    Author: "Orson Scott Card",
    Abstract: `A gifted child trains through ruthless games to prepare for an alien war. The victories he earns hide a devastating truth about the cost of winning.`,
    CoverUrl: null,
    Genres: ["Science Fiction", "Military SF"],
  },
  {
    Title: "The Left Hand of Darkness",
    Author: "Ursula K. Le Guin",
    Abstract: `A diplomat on an icy world must build trust in a culture with fluid gender. Friendship becomes a bridge between worlds in a story of politics and survival.`,
    CoverUrl: null,
    Genres: ["Science Fiction", "Social SF"],
  },
  {
    Title: "The Martian",
    Author: "Andy Weir",
    Abstract: `Stranded on Mars, Mark Watney survives with engineering hacks, grim humor, and careful math. While Earth works a rescue, he fights to make the planet briefly human.`,
    CoverUrl: null,
    Genres: ["Science Fiction", "Survival"],
  },
  {
    Title: "Foundation",
    Author: "Isaac Asimov",
    Abstract: `A scientist predicts galactic collapse and founds a plan to shorten the dark age. Politics, trade, and ideas become the tools to steer history.`,
    CoverUrl: null,
    Genres: ["Science Fiction", "Space Opera"],
  },
  {
    Title: "Neuromancer",
    Author: "William Gibson",
    Abstract: `A washed-up hacker is hired for an impossible job in a world of AIs and data thieves. The heist unspools across neon cities and cyberspace with cold style.`,
    CoverUrl: null,
    Genres: ["Science Fiction", "Cyberpunk"],
  },
  {
    Title: "The Wind-Up Bird Chronicle",
    Author: "Haruki Murakami",
    Abstract: `A quiet man searches for his missing wife and slips into strange undercurrents of Tokyo. War memories, dreams, and hidden rooms braid into a mystery of identity.`,
    CoverUrl: null,
    Genres: ["Literary Fiction", "Magical Realism"],
  },
  {
    Title: "The Name of the Wind",
    Author: "Patrick Rothfuss",
    Abstract: `Kvothe tells how he rose from orphaned street performer to a legend pursued by shadowy foes. His account mixes music, magic, and the price of knowledge.`,
    CoverUrl: null,
    Genres: ["Fantasy", "Epic"],
  },
  {
    Title: "American Gods",
    Author: "Neil Gaiman",
    Abstract: `Out of prison and adrift, Shadow is hired by a grifter who is more than he seems. Old gods and new do battle across a mythic American landscape.`,
    CoverUrl: null,
    Genres: ["Fantasy", "Mythic"],
  },
  {
    Title: "The Shadow of the Wind",
    Author: "Carlos Ruiz Zafón",
    Abstract: `A boy in postwar Barcelona discovers a forgotten novel and a mystery swallowing its author’s life. As he seeks answers, the city’s secrets tighten around him.`,
    CoverUrl: null,
    Genres: ["Literary Mystery", "Historical Fiction"],
  },
  {
    Title: "A Tale of Two Cities",
    Author: "Charles Dickens",
    Abstract: `Lives entwine between London and Paris as revolution erupts. Love and sacrifice play out against crowds hungry for justice and blood.`,
    CoverUrl: null,
    Genres: ["Classic", "Historical Fiction"],
  },
];

/* Seed runner — only runs when Book is empty */
(function seedBooksIfEmpty() {
  try {
    const { n } = db.prepare("SELECT COUNT(*) AS n FROM Book").get();
    if (n > 0) return; // already seeded

    const insertBook = db.prepare(
      "INSERT INTO Book (Title, Author, Abstract, CoverUrl) VALUES (?, ?, ?, ?)"
    );
    const insertGenre = db.prepare(
      "INSERT INTO Genre (bookID, genre) VALUES (?, ?)"
    );

    // simple per-book transaction; clear and safe
    const tx = db.transaction((b) => {
      const title = String(b.Title || "").trim();
      const author = String(b.Author || "").trim();
      if (!title || !author) throw new Error("Seed book missing Title/Author");

      const info = insertBook.run(
        title,
        author,
        b.Abstract ?? null,
        b.CoverUrl ?? null
      );
      const bookID = Number(info.lastInsertRowid);

      const list = Array.isArray(b.Genres) ? b.Genres : [];
      for (const g of list) {
        const tag = String(g || "").trim();
        if (tag) insertGenre.run(bookID, tag);
      }
    });

    for (const b of seedBooks) tx(b);
    console.log(`✅ Seeded ${seedBooks.length} books (first run only).`);
  } catch (e) {
    console.error("❌ Seeding failed:", e?.message || e);
  }
})();
