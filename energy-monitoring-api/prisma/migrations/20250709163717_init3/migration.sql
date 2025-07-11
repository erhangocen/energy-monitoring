/*
  Warnings:

  - You are about to drop the column `assignedAt` on the `UserMeter` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `MeterReading` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MeterReading" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "UserMeter" DROP COLUMN "assignedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
