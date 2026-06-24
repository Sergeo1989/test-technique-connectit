-- The seed migration inserted DateTime columns as TEXT (ISO strings), but Prisma
-- stores SQLite DateTime as INTEGER (epoch ms). Comparing TEXT against the INTEGER
-- bound Prisma generates breaks range filters and mixes types when sorting once
-- rows are created through Prisma. Convert existing rows to the native integer
-- format. The `typeof = 'text'` guard keeps it idempotent and skips NULLs.

UPDATE "Framework"
SET "releasedAt" = CAST(strftime('%s', replace(replace("releasedAt", 'T', ' '), 'Z', '')) AS INTEGER) * 1000
WHERE typeof("releasedAt") = 'text';

UPDATE "Framework"
SET "createdAt" = CAST(strftime('%s', replace(replace("createdAt", 'T', ' '), 'Z', '')) AS INTEGER) * 1000
WHERE typeof("createdAt") = 'text';

UPDATE "Framework"
SET "updatedAt" = CAST(strftime('%s', replace(replace("updatedAt", 'T', ' '), 'Z', '')) AS INTEGER) * 1000
WHERE typeof("updatedAt") = 'text';

UPDATE "CodingLanguage"
SET "createdAt" = CAST(strftime('%s', replace(replace("createdAt", 'T', ' '), 'Z', '')) AS INTEGER) * 1000
WHERE typeof("createdAt") = 'text';

UPDATE "CodingLanguage"
SET "updatedAt" = CAST(strftime('%s', replace(replace("updatedAt", 'T', ' '), 'Z', '')) AS INTEGER) * 1000
WHERE typeof("updatedAt") = 'text';
