/*
  Warnings:

  - You are about to alter the column `created_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updated_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- DropForeignKey
ALTER TABLE `lab_reservations` DROP FOREIGN KEY `lab_reservations_nim_fkey`;

-- AlterTable
ALTER TABLE `lab_reservations` MODIFY `nim` VARCHAR(15) NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `created_at` TIMESTAMP NULL,
    MODIFY `updated_at` TIMESTAMP NULL;

-- AddForeignKey
ALTER TABLE `lab_reservations` ADD CONSTRAINT `lab_reservations_nim_fkey` FOREIGN KEY (`nim`) REFERENCES `Students`(`nim`) ON DELETE RESTRICT ON UPDATE CASCADE;
