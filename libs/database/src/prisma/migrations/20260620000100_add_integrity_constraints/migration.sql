-- Enforce framework-name uniqueness at the database level (replaces an
-- application-side check that was subject to a check-then-insert race), and add
-- indexes on the foreign-key columns used by the list filters.

CREATE UNIQUE INDEX "Framework_name_key" ON "Framework"("name");

CREATE INDEX "Framework_codingLanguageId_idx" ON "Framework"("codingLanguageId");

CREATE INDEX "Framework_frameworkTypeId_idx" ON "Framework"("frameworkTypeId");
