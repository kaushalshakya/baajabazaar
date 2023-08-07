/*
  Warnings:

  - Added the required column `user_id` to the `cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cart` ADD COLUMN `user_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `cart` ADD CONSTRAINT `cart_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
