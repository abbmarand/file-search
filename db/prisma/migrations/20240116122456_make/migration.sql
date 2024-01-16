/*
  Warnings:

  - You are about to drop the column `ownerid` on the `files` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "files" DROP CONSTRAINT "files_ownerid_fkey";

-- AlterTable
ALTER TABLE "files" DROP COLUMN "ownerid";
