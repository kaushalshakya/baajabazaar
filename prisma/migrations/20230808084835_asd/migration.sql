/*
  Warnings:

  - You are about to drop the column `shipping_address` on the `order_details` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `order_details` DROP COLUMN `shipping_address`;
