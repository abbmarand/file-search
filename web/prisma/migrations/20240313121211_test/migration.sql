/*
  Warnings:

  - Added the required column `text` to the `Test` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Test" ADD COLUMN     "text" TEXT NOT NULL;
