/*
  Warnings:

  - You are about to drop the column `text` on the `Subfile` table. All the data in the column will be lost.
  - Added the required column `textdata` to the `Subfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subfile" DROP COLUMN "text",
ADD COLUMN     "textdata" TEXT NOT NULL;
