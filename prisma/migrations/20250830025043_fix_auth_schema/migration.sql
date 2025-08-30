/*
  Warnings:

  - You are about to drop the column `age` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `availableForWork` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `bio` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `company` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `education` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `experience` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `github` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `interests` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `jobTitle` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `linkedin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `occupation` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `preferredContact` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profileImage` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `twitter` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `auth_users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Session" DROP CONSTRAINT "Session_userId_fkey";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "age",
DROP COLUMN "availableForWork",
DROP COLUMN "bio",
DROP COLUMN "company",
DROP COLUMN "createdAt",
DROP COLUMN "education",
DROP COLUMN "experience",
DROP COLUMN "github",
DROP COLUMN "interests",
DROP COLUMN "jobTitle",
DROP COLUMN "linkedin",
DROP COLUMN "location",
DROP COLUMN "occupation",
DROP COLUMN "phone",
DROP COLUMN "preferredContact",
DROP COLUMN "profileImage",
DROP COLUMN "skills",
DROP COLUMN "twitter",
DROP COLUMN "updatedAt",
DROP COLUMN "website",
ADD COLUMN     "emailVerified" TIMESTAMP(3),
ADD COLUMN     "image" TEXT,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;

-- DropTable
DROP TABLE "public"."auth_users";

-- CreateTable
CREATE TABLE "public"."Person" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "age" INTEGER,
    "bio" TEXT,
    "location" TEXT,
    "occupation" TEXT,
    "interests" TEXT[],
    "website" TEXT,
    "linkedin" TEXT,
    "twitter" TEXT,
    "github" TEXT,
    "experience" TEXT,
    "education" TEXT,
    "skills" TEXT[],
    "availableForWork" BOOLEAN NOT NULL DEFAULT false,
    "preferredContact" TEXT NOT NULL DEFAULT 'email',
    "profileImage" TEXT,
    "phone" TEXT,
    "company" TEXT,
    "jobTitle" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Person_email_key" ON "public"."Person"("email");

-- AddForeignKey
ALTER TABLE "public"."Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
