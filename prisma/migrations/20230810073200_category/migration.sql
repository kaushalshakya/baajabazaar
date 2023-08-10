/*
  Warnings:

  - Made the column `total_amount` on table `order_details` required. This step will fail if there are existing NULL values in that column.
  - Made the column `product_category` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_product_category_fkey`;

-- AlterTable
ALTER TABLE `order_details` MODIFY `total_amount` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `products` MODIFY `product_category` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_product_category_fkey` FOREIGN KEY (`product_category`) REFERENCES `categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
