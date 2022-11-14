-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('Mascotero', 'Profesional');

-- CreateEnum
CREATE TYPE "PetType" AS ENUM ('Felino', 'Canino', 'Ave', 'Artropodo', 'Reptil', 'Otro');

-- CreateEnum
CREATE TYPE "AddressType" AS ENUM ('Domicilio', 'Oficina');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "type" "UserType" NOT NULL DEFAULT 'Mascotero';

-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL,
    "mascoteroId" TEXT NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mascotero" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Mascotero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profesional" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "profesionalVerified" TIMESTAMP(3),
    "isOnline" BOOLEAN NOT NULL,

    CONSTRAINT "Profesional_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Mascotero_userId_key" ON "Mascotero"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Profesional_userId_key" ON "Profesional"("userId");

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_mascoteroId_fkey" FOREIGN KEY ("mascoteroId") REFERENCES "Mascotero"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mascotero" ADD CONSTRAINT "Mascotero_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profesional" ADD CONSTRAINT "Profesional_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
