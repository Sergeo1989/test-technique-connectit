-- CreateTable
CREATE TABLE "Framework" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "codingLanguageId" INTEGER NOT NULL,
    "frameworkTypeId" INTEGER NOT NULL,
    "releasedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    CONSTRAINT "Framework_frameworkTypeId_fkey" FOREIGN KEY ("frameworkTypeId") REFERENCES "FrameworkType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Framework_codingLanguageId_fkey" FOREIGN KEY ("codingLanguageId") REFERENCES "CodingLanguage" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CodingLanguage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME
);

-- CreateTable
CREATE TABLE "FrameworkType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
