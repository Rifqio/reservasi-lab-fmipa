-- CreateTable
CREATE TABLE `LabReservations` (
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

-- CreateTable
CREATE TABLE `lab_tools` (
    `id_lab_tools` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id_lab_tools`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `labs` (
    `id_labs` VARCHAR(10) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `location` VARCHAR(100) NULL,

    INDEX `labs_name_idx`(`name`),
    PRIMARY KEY (`id_labs`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lecturers` (
    `user_email` VARCHAR(100) NOT NULL,
    `nip` VARCHAR(30) NOT NULL,

    UNIQUE INDEX `lecturers_user_email_key`(`user_email`),
    PRIMARY KEY (`user_email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Students` (
    `user_email` VARCHAR(100) NOT NULL,
    `nim` VARCHAR(15) NOT NULL,
    `study_program` VARCHAR(100) NULL,
    `batch` INTEGER NULL,
    `phone_number` VARCHAR(15) NULL,

    UNIQUE INDEX `Students_nim_key`(`nim`),
    INDEX `student_email_idx`(`user_email`),
    INDEX `fk_students_study_program`(`study_program`),
    INDEX `nim`(`nim`),
    UNIQUE INDEX `Students_user_email_key`(`user_email`),
    PRIMARY KEY (`user_email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `study_programs` (
    `id_study_program` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `study_programs_name_key`(`name`),
    INDEX `study_programs_name_idx`(`name`),
    PRIMARY KEY (`id_study_program`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id_user` CHAR(36) NOT NULL,
    `full_name` VARCHAR(200) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(150) NOT NULL,
    `is_email_verified` BOOLEAN NOT NULL,
    `role` ENUM('STUDENT', 'LECTURER', 'ADMIN') NOT NULL,
    `created_at` TIMESTAMP NULL,
    `updated_at` TIMESTAMP NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    INDEX `users_email_idx`(`email`),
    INDEX `users_role_idx`(`role`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LabReservations` ADD CONSTRAINT `LabReservations_lab_id_fkey` FOREIGN KEY (`lab_id`) REFERENCES `labs`(`id_labs`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LabReservations` ADD CONSTRAINT `LabReservations_nim_fkey` FOREIGN KEY (`nim`) REFERENCES `Students`(`nim`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Students` ADD CONSTRAINT `Students_study_program_fkey` FOREIGN KEY (`study_program`) REFERENCES `study_programs`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;
