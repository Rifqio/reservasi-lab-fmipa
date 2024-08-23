/*
  Warnings:

  - The values [PRAKTIKUM,PENELITIAN] on the enum `lab_reservations_reservation_purpose` will be removed. If these variants are still used in the database, this will fail.
  - The values [BEASISWA] on the enum `lab_reservations_source_of_funding` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `created_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updated_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `lab_reservations` MODIFY `reservation_purpose` ENUM('MBKM', 'PKM', 'TUGAS_AKHIR', 'LAINNYA') NOT NULL,
    MODIFY `source_of_funding` ENUM('MANDIRI', 'HIBAH', 'LAINNYA') NOT NULL DEFAULT 'LAINNYA';

-- AlterTable
ALTER TABLE `users` MODIFY `created_at` TIMESTAMP NULL,
    MODIFY `updated_at` TIMESTAMP NULL;

-- CreateTable
CREATE TABLE `lab_clearance` (
    `id_clearance` VARCHAR(30) NOT NULL,
    `nim` VARCHAR(10) NOT NULL,
    `letter_number` VARCHAR(30) NOT NULL,
    `purpose` ENUM('YUDISIUM', 'LAINNYA') NOT NULL,
    `status` VARCHAR(50) NOT NULL DEFAULT 'Belum Aktif',
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`id_clearance`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
