/*
  Warnings:

  - You are about to alter the column `created_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updated_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `created_at` TIMESTAMP NULL,
    MODIFY `updated_at` TIMESTAMP NULL;

-- CreateTable
CREATE TABLE `sample_payments` (
    `id_sample_payments` INTEGER NOT NULL AUTO_INCREMENT,
    `sample_test_id` INTEGER NOT NULL,
    `payment_code` VARCHAR(100) NOT NULL,
    `payment_status` ENUM('PENDING', 'PAID', 'CANCELLED') NOT NULL,
    `payment_evidence_url` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `idx_sample_payment_status`(`payment_status`),
    PRIMARY KEY (`id_sample_payments`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sample_tests` (
    `id_sample_tests` INTEGER NOT NULL AUTO_INCREMENT,
    `user_email` VARCHAR(191) NOT NULL,
    `letter_number` VARCHAR(100) NOT NULL,
    `invoice_number` VARCHAR(100) NOT NULL,
    `research_title` VARCHAR(255) NOT NULL,
    `sample_name` VARCHAR(255) NOT NULL,
    `sample_quantity` INTEGER NOT NULL,
    `date_received` DATETIME(3) NOT NULL,
    `date_completed` DATETIME(3) NULL,
    `notes` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `idx_test_sample_user_email`(`user_email`),
    INDEX `idx_test_sample_date_received`(`date_received`),
    PRIMARY KEY (`id_sample_tests`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sample_payments` ADD CONSTRAINT `sample_payments_sample_test_id_fkey` FOREIGN KEY (`sample_test_id`) REFERENCES `sample_tests`(`id_sample_tests`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sample_tests` ADD CONSTRAINT `sample_tests_user_email_fkey` FOREIGN KEY (`user_email`) REFERENCES `users`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
