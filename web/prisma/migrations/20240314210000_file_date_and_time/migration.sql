/*
  Warnings:

  - Added the required column `date` to the `file` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `file` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "file" ADD COLUMN     "date" INTEGER NOT NULL,
ADD COLUMN     "time" INTEGER NOT NULL;
