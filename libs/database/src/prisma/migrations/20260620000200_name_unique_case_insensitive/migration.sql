-- SQLite's UNIQUE index defaults to the BINARY collation (case-sensitive), so
-- "Svelte" and "svelte" were considered distinct. Recreate the name uniqueness
-- index with COLLATE NOCASE so duplicates are rejected regardless of case
-- (ASCII), consistent with the case-insensitive `contains` filter.

DROP INDEX "Framework_name_key";

CREATE UNIQUE INDEX "Framework_name_key" ON "Framework"("name" COLLATE NOCASE);
