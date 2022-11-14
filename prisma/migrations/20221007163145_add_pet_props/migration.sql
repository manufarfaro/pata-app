/*
  Warnings:

  - Added the required column `birthDate` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `details` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `race` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "birthDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "details" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "race" TEXT NOT NULL,
ADD COLUMN     "type" "PetType" NOT NULL;
