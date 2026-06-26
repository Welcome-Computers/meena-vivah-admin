CREATE TABLE `audit_logs` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`admin_id` bigint NOT NULL,
	`action` varchar(50) NOT NULL,
	`module` varchar(100) NOT NULL,
	`record_id` bigint,
	`old_data` longtext,
	`new_data` longtext,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `audit_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `admins` ADD `name` varchar(100);--> statement-breakpoint
ALTER TABLE `admins` ADD `role` varchar(50) DEFAULT 'admin';