/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."users";

-- CreateTable
CREATE TABLE "public"."User" (
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

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");
