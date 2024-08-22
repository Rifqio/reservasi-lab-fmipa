/*
  Warnings:

  - You are about to alter the column `created_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updated_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to drop the `labreservations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `labreservations` DROP FOREIGN KEY `LabReservations_lab_id_fkey`;

-- DropForeignKey
ALTER TABLE `labreservations` DROP FOREIGN KEY `LabReservations_nim_fkey`;

-- AlterTable
ALTER TABLE `users` MODIFY `created_at` TIMESTAMP NULL,
    MODIFY `updated_at` TIMESTAMP NULL;

-- DropTable
DROP TABLE `labreservations`;

-- CreateTable
CREATE TABLE `lab_reservations` (
    `id_reservation` VARCHAR(30) NOT NULL,
    `lab_id` VARCHAR(10) NOT NULL,
    `lab_tools_name` JSON NOT NULL,
    `nim` VARCHAR(10) NOT NULL,
    `reason` TEXT NOT NULL,
    `status` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL,
    `approval_letter_url` TEXT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `start_time` TIME NOT NULL,
    `end_time` TIME NOT NULL,

    INDEX `lab_reservations_nim_idx`(`nim`),
    INDEX `lab_reservations_status_idx`(`status`),
    INDEX `lab_reservations_start_date_idx`(`start_date`),
    INDEX `lab_reservations_end_date_idx`(`end_date`),
    INDEX `fk_lab_reservations_lab_id`(`lab_id`),
    PRIMARY KEY (`id_reservation`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `lab_reservations` ADD CONSTRAINT `lab_reservations_lab_id_fkey` FOREIGN KEY (`lab_id`) REFERENCES `labs`(`id_labs`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lab_reservations` ADD CONSTRAINT `lab_reservations_nim_fkey` FOREIGN KEY (`nim`) REFERENCES `Students`(`nim`) ON DELETE RESTRICT ON UPDATE CASCADE;
