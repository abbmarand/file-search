/*
  Warnings:

  - You are about to drop the column `text` on the `subfile` table. All the data in the column will be lost.
  - Added the required column `secdata` to the `subfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subfile" DROP COLUMN "text",
ADD COLUMN     "secdata" TEXT NOT NULL;
