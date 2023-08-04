/*
  Warnings:

  - You are about to drop the column `customer_image` on the `vendors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `vendors` DROP COLUMN `customer_image`,
    ADD COLUMN `vendor_image` VARCHAR(191) NULL;
