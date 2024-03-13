/*
  Warnings:

  - You are about to drop the column `orgOwner` on the `Subfile` table. All the data in the column will be lost.
  - Added the required column `ownerOrg` to the `Subfile` table without a default value. This is not possible if the table is not empty.
  - Made the column `embedding` on table `Subfile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Subfile" DROP COLUMN "orgOwner",
ADD COLUMN     "ownerOrg" TEXT NOT NULL,
ALTER COLUMN "embedding" SET NOT NULL;
