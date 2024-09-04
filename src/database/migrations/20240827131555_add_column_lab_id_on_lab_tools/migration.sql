/*
  Warnings:

  - You are about to alter the column `created_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updated_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - A unique constraint covering the columns `[name]` on the table `labs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `lab_name` to the `lab_tools` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `lab_tools` ADD COLUMN `lab_name` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `created_at` TIMESTAMP NULL,
    MODIFY `updated_at` TIMESTAMP NULL;

-- CreateIndex
CREATE UNIQUE INDEX `labs_name_key` ON `labs`(`name`);

-- AddForeignKey
ALTER TABLE `lab_tools` ADD CONSTRAINT `lab_tools_lab_name_fkey` FOREIGN KEY (`lab_name`) REFERENCES `labs`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
