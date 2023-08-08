/*
  Warnings:

  - Added the required column `contact_no` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shipping_address` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order_details` MODIFY `total_amount` INTEGER NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `orders` ADD COLUMN `contact_no` INTEGER NOT NULL,
    ADD COLUMN `shipping_address` VARCHAR(191) NOT NULL;
