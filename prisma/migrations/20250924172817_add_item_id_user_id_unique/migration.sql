/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `Item` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `price` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Item` ADD COLUMN `imageUrl` VARCHAR(191) NULL,
    ADD COLUMN `price` DOUBLE NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Item_id_userId_key` ON `Item`(`id`, `userId`);
