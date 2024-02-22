-- CreateTable
CREATE TABLE "orgs" (
    "orgid" SERIAL NOT NULL,
    "orgname" TEXT NOT NULL DEFAULT 'org',
    "orgurl" TEXT NOT NULL DEFAULT 'https://rustalytics.com',
    "orgweb" TEXT NOT NULL DEFAULT 'https://rustalytics.com',

    CONSTRAINT "orgs_pkey" PRIMARY KEY ("orgid")
);

-- CreateTable
CREATE TABLE "files" (
    "fileid" SERIAL NOT NULL,
    "ownerid" INTEGER NOT NULL,
    "data" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "files_pkey" PRIMARY KEY ("fileid")
);

-- CreateIndex
CREATE UNIQUE INDEX "orgs_orgid_key" ON "orgs"("orgid");

-- CreateIndex
CREATE UNIQUE INDEX "files_fileid_key" ON "files"("fileid");

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_ownerid_fkey" FOREIGN KEY ("ownerid") REFERENCES "orgs"("orgid") ON DELETE RESTRICT ON UPDATE CASCADE;
