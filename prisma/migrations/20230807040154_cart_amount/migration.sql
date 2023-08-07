/*
  Warnings:

  - Added the required column `total_amount` to the `cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cart` ADD COLUMN `total_amount` INTEGER NOT NULL;
