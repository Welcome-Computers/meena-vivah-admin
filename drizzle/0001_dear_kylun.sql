CREATE TABLE `otp_verifications` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`mobile` varchar(20) NOT NULL,
	`otp_hash` varchar(255) NOT NULL,
	`attempts` int NOT NULL DEFAULT 0,
	`expires_at` datetime NOT NULL,
	`verified_at` datetime,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `otp_verifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `admins` MODIFY COLUMN `role` enum('admin','profile','executive') NOT NULL DEFAULT 'admin';--> statement-breakpoint
CREATE INDEX `idx_mobile` ON `otp_verifications` (`mobile`);--> statement-breakpoint
CREATE INDEX `idx_expires` ON `otp_verifications` (`expires_at`);