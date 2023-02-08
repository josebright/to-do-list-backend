-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "ListItem" (
    "id" TEXT NOT NULL,
    "item" TEXT NOT NULL,
    "hasClickedTranslate" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "TranslatedItem" (
    "id" TEXT NOT NULL,
    "translatedItem" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ListItem_id_key" ON "ListItem"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ListItem_userId_key" ON "ListItem"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "TranslatedItem_id_key" ON "TranslatedItem"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TranslatedItem_itemId_key" ON "TranslatedItem"("itemId");

-- AddForeignKey
ALTER TABLE "ListItem" ADD CONSTRAINT "ListItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TranslatedItem" ADD CONSTRAINT "TranslatedItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "ListItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
