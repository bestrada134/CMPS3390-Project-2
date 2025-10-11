<!-- Filter row (adds a Genres mode select: "contain" vs "has") -->
<form method="GET" class="mb-6 grid gap-3 sm:grid-cols-4">
    <label class="flex flex-col">
        <span class="text-sm font-medium">Title</span>
        <input
        name="title"
        class="border rounded p-2"
        placeholder="e.g., Dune"
        aria-label="Filter by title"
        />
    </label>

    <label class="flex flex-col">
        <span class="text-sm font-medium">Author</span>
        <input
        name="author"
        class="border rounded p-2"
        placeholder="e.g., Tolkien"
        aria-label="Filter by author"
        />
    </label>

    <label class="flex flex-col">
        <span class="text-sm font-medium">Genres (comma separated)</span>
        <input
        name="genres"
        class="border rounded p-2"
        placeholder="e.g., Fantasy, Adventure"
        aria-label="Filter by genres"
        />
    </label>

    <label class="flex flex-col">
        <span class="text-sm font-medium">Genre match</span>
        <select
        name="gmode"
        class="border rounded p-2"
        aria-label="How genres are matched"
        >
        <option value="contain" selected>Contain any</option>
        <option value="has">Has all</option>
        </select>
    </label>

    <div class="sm:col-span-4">
        <button type="submit" class="rounded bg-sky-600 text-white px-4 py-2">
        Filter
        </button>
    </div>
</form>
