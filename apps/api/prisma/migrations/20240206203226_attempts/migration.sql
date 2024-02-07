-- AlterTable
ALTER TABLE "activationCodes" ADD COLUMN     "attempts" INTEGER NOT NULL DEFAULT 3;
