/*
  Warnings:

  - You are about to drop the column `unitId` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `unitId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_unitId_fkey`;

-- DropIndex
DROP INDEX `Product_unitId_fkey` ON `Product`;

-- AlterTable
ALTER TABLE `Order` ADD COLUMN `notes` VARCHAR(191) NULL,
    ADD COLUMN `unitId` VARCHAR(191) NOT NULL,
    MODIFY `ordered` DATE NULL,
    MODIFY `invoiced` DATE NULL,
    MODIFY `payed` DATE NULL,
    MODIFY `shipped` DATE NULL,
    MODIFY `received` DATE NULL;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `unitId`;

-- CreateIndex
CREATE UNIQUE INDEX `Product_title_key` ON `Product`(`title`);

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `Unit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
