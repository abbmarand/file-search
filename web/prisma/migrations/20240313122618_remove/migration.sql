/*
  Warnings:

  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Test";

-- CreateTable
CREATE TABLE "embedtest" (
    "id" TEXT NOT NULL,
    "embedding" vector(384) NOT NULL,

    CONSTRAINT "embedtest_pkey" PRIMARY KEY ("id")
);
