-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "vector";

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

    CONSTRAINT "File_pkey" PRIMARY KEY ("fileId")
);

-- CreateTable
CREATE TABLE "Subfile" (
    "subfileId" TEXT NOT NULL,
    "ownerFileId" TEXT NOT NULL,
    "ownerOrg" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "embedding" vector(384) NOT NULL,

    CONSTRAINT "Subfile_pkey" PRIMARY KEY ("subfileId")
);
