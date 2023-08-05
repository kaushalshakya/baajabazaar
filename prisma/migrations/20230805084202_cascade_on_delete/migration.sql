-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_vendor_id_fkey`;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_vendor_id_fkey` FOREIGN KEY (`vendor_id`) REFERENCES `vendors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
