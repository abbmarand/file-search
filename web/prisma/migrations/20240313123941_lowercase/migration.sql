/*
  Warnings:

  - The primary key for the `file` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `fileId` on the `file` table. All the data in the column will be lost.
  - The primary key for the `org` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `orgId` on the `org` table. All the data in the column will be lost.
  - You are about to drop the column `orgName` on the `org` table. All the data in the column will be lost.
  - You are about to drop the column `orgUrl` on the `org` table. All the data in the column will be lost.
  - You are about to drop the column `orgWeb` on the `org` table. All the data in the column will be lost.
  - The primary key for the `subfile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ownerFileId` on the `subfile` table. All the data in the column will be lost.
  - You are about to drop the column `subfileId` on the `subfile` table. All the data in the column will be lost.
  - The required column `fileid` was added to the `file` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `orgid` was added to the `org` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `ownerfileid` to the `subfile` table without a default value. This is not possible if the table is not empty.
  - The required column `subfileid` was added to the `subfile` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "file" DROP CONSTRAINT "file_pkey",
DROP COLUMN "fileId",
ADD COLUMN     "fileid" TEXT NOT NULL,
ADD CONSTRAINT "file_pkey" PRIMARY KEY ("fileid");

-- AlterTable
ALTER TABLE "org" DROP CONSTRAINT "org_pkey",
DROP COLUMN "orgId",
DROP COLUMN "orgName",
DROP COLUMN "orgUrl",
DROP COLUMN "orgWeb",
ADD COLUMN     "orgid" TEXT NOT NULL,
ADD COLUMN     "orgname" TEXT NOT NULL DEFAULT 'org',
ADD COLUMN     "orgurl" TEXT NOT NULL DEFAULT 'https://rustalytics.com',
ADD COLUMN     "orgweb" TEXT NOT NULL DEFAULT 'https://rustalytics.com',
ADD CONSTRAINT "org_pkey" PRIMARY KEY ("orgid");

-- AlterTable
ALTER TABLE "subfile" DROP CONSTRAINT "subfile_pkey",
DROP COLUMN "ownerFileId",
DROP COLUMN "subfileId",
ADD COLUMN     "ownerfileid" TEXT NOT NULL,
ADD COLUMN     "subfileid" TEXT NOT NULL,
ADD CONSTRAINT "subfile_pkey" PRIMARY KEY ("subfileid");
