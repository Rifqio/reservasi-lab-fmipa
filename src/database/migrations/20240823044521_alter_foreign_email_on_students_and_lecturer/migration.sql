/*
  Warnings:

  - You are about to alter the column `created_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updated_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `created_at` TIMESTAMP NULL,
    MODIFY `updated_at` TIMESTAMP NULL;

-- AddForeignKey
ALTER TABLE `lecturers` ADD CONSTRAINT `lecturers_user_email_fkey` FOREIGN KEY (`user_email`) REFERENCES `users`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Students` ADD CONSTRAINT `Students_user_email_fkey` FOREIGN KEY (`user_email`) REFERENCES `users`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
