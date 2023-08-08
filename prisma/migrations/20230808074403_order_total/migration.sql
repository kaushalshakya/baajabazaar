/*
  Warnings:

  - You are about to drop the column `total_amount` on the `orders` table. All the data in the column will be lost.
  - Added the required column `total_amount` to the `order_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order_details` ADD COLUMN `total_amount` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `orders` DROP COLUMN `total_amount`;
