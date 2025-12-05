-- CreateTable
CREATE TABLE `Safekeeping` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `units` VARCHAR(191) NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `gok` DOUBLE NOT NULL,
    `order` DOUBLE NOT NULL,
    `ferro` DOUBLE NOT NULL,

    UNIQUE INDEX `Safekeeping_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
