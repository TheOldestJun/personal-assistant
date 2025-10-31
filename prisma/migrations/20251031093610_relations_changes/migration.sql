/*
  Warnings:

  - You are about to drop the column `userId` on the `Permission` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Permission` DROP FOREIGN KEY `Permission_userId_fkey`;

-- DropIndex
DROP INDEX `Permission_userId_fkey` ON `Permission`;

-- AlterTable
ALTER TABLE `Permission` DROP COLUMN `userId`;

-- CreateTable
CREATE TABLE `_PermissionToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_PermissionToUser_AB_unique`(`A`, `B`),
    INDEX `_PermissionToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_PermissionToUser` ADD CONSTRAINT `_PermissionToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Permission`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PermissionToUser` ADD CONSTRAINT `_PermissionToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
