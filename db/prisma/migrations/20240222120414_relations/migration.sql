/*
  Warnings:

  - You are about to drop the `files` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orgs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "files";

-- DropTable
DROP TABLE "orgs";

-- CreateTable
CREATE TABLE "Org" (
    "orgId" TEXT NOT NULL,
    "orgName" TEXT NOT NULL DEFAULT 'org',
    "orgUrl" TEXT NOT NULL DEFAULT 'https://rustalytics.com',
    "orgWeb" TEXT NOT NULL DEFAULT 'https://rustalytics.com',

    CONSTRAINT "Org_pkey" PRIMARY KEY ("orgId")
);

-- CreateTable
CREATE TABLE "File" (
    "fileId" TEXT NOT NULL,
    "filename" TEXT NOT NULL DEFAULT 'file',
    "data" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("fileId")
);

-- CreateTable
CREATE TABLE "Subfile" (
    "subfileId" TEXT NOT NULL,
    "ownerFileId" TEXT NOT NULL,
    "orgOwner" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "embedding" vector(384),

    CONSTRAINT "Subfile_pkey" PRIMARY KEY ("subfileId")
);

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org"("orgId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subfile" ADD CONSTRAINT "Subfile_ownerFileId_fkey" FOREIGN KEY ("ownerFileId") REFERENCES "File"("fileId") ON DELETE RESTRICT ON UPDATE CASCADE;
