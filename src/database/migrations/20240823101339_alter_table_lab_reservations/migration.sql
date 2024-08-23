/*
  Warnings:

  - You are about to drop the column `end_time` on the `lab_reservations` table. All the data in the column will be lost.
  - You are about to drop the column `reason` on the `lab_reservations` table. All the data in the column will be lost.
  - You are about to drop the column `start_time` on the `lab_reservations` table. All the data in the column will be lost.
  - You are about to alter the column `created_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updated_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - Added the required column `letter_number` to the `lab_reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `research_title` to the `lab_reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reservation_purpose` to the `lab_reservations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `lab_reservations` DROP COLUMN `end_time`,
    DROP COLUMN `reason`,
    DROP COLUMN `start_time`,
    ADD COLUMN `letter_number` VARCHAR(30) NOT NULL,
    ADD COLUMN `research_title` TEXT NOT NULL,
    ADD COLUMN `reservation_purpose` ENUM('PRAKTIKUM', 'PENELITIAN', 'TUGAS_AKHIR', 'LAINNYA') NOT NULL,
    ADD COLUMN `source_of_funding` ENUM('BEASISWA', 'HIBAH', 'LAINNYA') NOT NULL DEFAULT 'LAINNYA',
    MODIFY `status` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `users` MODIFY `created_at` TIMESTAMP NULL,
    MODIFY `updated_at` TIMESTAMP NULL;
