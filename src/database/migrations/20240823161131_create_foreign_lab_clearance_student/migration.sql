/*
  Warnings:

  - You are about to alter the column `created_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updated_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `created_at` TIMESTAMP NULL,
    MODIFY `updated_at` TIMESTAMP NULL;

-- CreateIndex
CREATE INDEX `lab_clearance_nim_idx` ON `lab_clearance`(`nim`);

-- CreateIndex
CREATE INDEX `lab_clearance_status_idx` ON `lab_clearance`(`status`);

-- AddForeignKey
ALTER TABLE `lab_clearance` ADD CONSTRAINT `lab_clearance_nim_fkey` FOREIGN KEY (`nim`) REFERENCES `Students`(`nim`) ON DELETE RESTRICT ON UPDATE CASCADE;
