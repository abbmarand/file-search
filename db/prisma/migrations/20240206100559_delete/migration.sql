/*
  Warnings:

  - The primary key for the `files` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `orgs` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "vector";

-- DropIndex
DROP INDEX "files_fileid_key";

-- DropIndex
DROP INDEX "orgs_orgid_key";

-- AlterTable
ALTER TABLE "files" DROP CONSTRAINT "files_pkey",
ADD COLUMN     "summary" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "fileid" DROP DEFAULT,
ALTER COLUMN "fileid" SET DATA TYPE TEXT,
ADD CONSTRAINT "files_pkey" PRIMARY KEY ("fileid");
DROP SEQUENCE "files_fileid_seq";

-- AlterTable
ALTER TABLE "orgs" DROP CONSTRAINT "orgs_pkey",
ALTER COLUMN "orgid" DROP DEFAULT,
ALTER COLUMN "orgid" SET DATA TYPE TEXT,
ADD CONSTRAINT "orgs_pkey" PRIMARY KEY ("orgid");
DROP SEQUENCE "orgs_orgid_seq";
