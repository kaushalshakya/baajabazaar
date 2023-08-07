/*
  Warnings:

  - You are about to drop the `cart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `cart_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `cart_user_id_fkey`;

-- DropTable
DROP TABLE `cart`;

-- CreateTable
CREATE TABLE `cart_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 1,
    `product_id` INTEGER NOT NULL,
    `total_amount` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cart_details` ADD CONSTRAINT `cart_details_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart_details` ADD CONSTRAINT `cart_details_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
