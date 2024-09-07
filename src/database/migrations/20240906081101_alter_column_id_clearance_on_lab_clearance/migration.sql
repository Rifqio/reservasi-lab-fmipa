/*
  Warnings:

  - The primary key for the `lab_clearance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `created_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updated_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `lab_clearance` DROP PRIMARY KEY,
    MODIFY `id_clearance` VARCHAR(50) NOT NULL,
    ADD PRIMARY KEY (`id_clearance`);

-- AlterTable
ALTER TABLE `users` MODIFY `created_at` TIMESTAMP NULL,
    MODIFY `updated_at` TIMESTAMP NULL;
