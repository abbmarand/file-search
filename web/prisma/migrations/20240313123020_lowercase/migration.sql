/*
  Warnings:

  - You are about to drop the `File` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Org` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "File";

-- DropTable
DROP TABLE "Org";

-- DropTable
DROP TABLE "Subfile";

-- CreateTable
CREATE TABLE "org" (
    "orgId" TEXT NOT NULL,
    "orgName" TEXT NOT NULL DEFAULT 'org',
    "orgUrl" TEXT NOT NULL DEFAULT 'https://rustalytics.com',
    "orgWeb" TEXT NOT NULL DEFAULT 'https://rustalytics.com',

    CONSTRAINT "org_pkey" PRIMARY KEY ("orgId")
);

-- CreateTable
CREATE TABLE "file" (
    "fileId" TEXT NOT NULL,
    "filename" TEXT NOT NULL DEFAULT 'file',
    "data" TEXT NOT NULL,

    CONSTRAINT "file_pkey" PRIMARY KEY ("fileId")
);

-- CreateTable
CREATE TABLE "subfile" (
    "subfileId" TEXT NOT NULL,
    "ownerFileId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "embedding" vector(384) NOT NULL,

    CONSTRAINT "subfile_pkey" PRIMARY KEY ("subfileId")
);
