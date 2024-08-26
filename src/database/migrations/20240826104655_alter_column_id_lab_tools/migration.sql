/*
  Warnings:

  - You are about to alter the column `created_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updated_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `lab_tools` MODIFY `id_lab_tools` INTEGER NOT NULL AUTO_INCREMENT;

-- AlterTable
ALTER TABLE `users` MODIFY `created_at` TIMESTAMP NULL,
    MODIFY `updated_at` TIMESTAMP NULL;
