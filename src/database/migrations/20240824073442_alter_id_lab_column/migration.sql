/*
  Warnings:

  - You are about to alter the column `lab_id` on the `lab_reservations` table. The data in that column could be lost. The data in that column will be cast from `VarChar(10)` to `Int`.
  - The primary key for the `labs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id_labs` on the `labs` table. The data in that column could be lost. The data in that column will be cast from `VarChar(10)` to `Int`.
  - You are about to alter the column `created_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updated_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- DropForeignKey
ALTER TABLE `lab_reservations` DROP FOREIGN KEY `lab_reservations_lab_id_fkey`;

-- AlterTable
ALTER TABLE `lab_reservations` MODIFY `lab_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `labs` DROP PRIMARY KEY,
    MODIFY `id_labs` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id_labs`);

-- AlterTable
ALTER TABLE `users` MODIFY `created_at` TIMESTAMP NULL,
    MODIFY `updated_at` TIMESTAMP NULL;

-- AddForeignKey
ALTER TABLE `lab_reservations` ADD CONSTRAINT `lab_reservations_lab_id_fkey` FOREIGN KEY (`lab_id`) REFERENCES `labs`(`id_labs`) ON DELETE RESTRICT ON UPDATE CASCADE;
