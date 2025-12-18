/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Unit` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Unit_title_key` ON `Unit`(`title`);
