CREATE TABLE `address` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`address` text,
	`tehsil` varchar(255),
	`state` varchar(255),
	`city` varchar(255),
	`pincode` varchar(20),
	`type` varchar(50),
	CONSTRAINT `address_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `admins` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(100),
	`mobile` varchar(10) NOT NULL,
	`password` varchar(255) NOT NULL,
	`role` varchar(50) DEFAULT 'admin',
	`is_active` boolean DEFAULT true,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `admins_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
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
CREATE TABLE `imported_profile` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(150),
	`gender` varchar(20),
	`mobile` varchar(20),
	`dob` varchar(50),
	`fathersname` varchar(150),
	`self_gotra` varchar(50),
	`m_gotra` varchar(50),
	`gm_gotra` varchar(50),
	`mat_gm_gotra` varchar(50),
	`otherinfo` text,
	`status` enum('draft','reviewed','deleted','moved','rejected') NOT NULL DEFAULT 'draft',
	`remarks` text,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `imported_profile_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `master_gotra` (
	`id` int AUTO_INCREMENT NOT NULL,
	`code` varchar(20) NOT NULL,
	`name` varchar(100) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `master_gotra_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `master_occupation` (
	`id` int AUTO_INCREMENT NOT NULL,
	`code` varchar(20) NOT NULL,
	`name` varchar(100) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `master_occupation_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `other_gotra` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`other_gotra_relation` varchar(255),
	`other_gotra_name` varchar(255),
	CONSTRAINT `other_gotra_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `profile` (
	`id` int AUTO_INCREMENT NOT NULL,
	`mobile` varchar(20) NOT NULL,
	`gender` varchar(20),
	`name` varchar(255) NOT NULL,
	`dob` date,
	`height` int,
	`education` varchar(255),
	`occupation` varchar(255),
	`occupation_details` varchar(255),
	`fathersname` varchar(255),
	`mothersname` varchar(255),
	`fathersoccupation` varchar(255),
	`mothersoccupation` varchar(255),
	`self_gotra` varchar(255),
	`m_gotra` varchar(255),
	`gm_gotra` varchar(255),
	`mat_gm_gotra` varchar(255),
	`preferences` text,
	`otherinfo` text,
	`is_suspended` boolean DEFAULT false,
	`created_at` timestamp DEFAULT (now()),
	`status` enum('draft','approved','rejected','suspended') NOT NULL DEFAULT 'draft',
	CONSTRAINT `profile_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_tokens` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`user_id` bigint NOT NULL,
	`user_type` enum('admin','profile','executive') NOT NULL,
	`refresh_token_hash` varchar(255) NOT NULL,
	`token_version` int NOT NULL DEFAULT 0,
	`device_name` varchar(150),
	`ip_address` varchar(45),
	`user_agent` varchar(500),
	`last_used_at` datetime,
	`expires_at` datetime NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `user_tokens_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `idx_user` ON `user_tokens` (`user_id`,`user_type`);--> statement-breakpoint
CREATE INDEX `idx_refresh_token` ON `user_tokens` (`refresh_token_hash`);--> statement-breakpoint
CREATE INDEX `idx_expires` ON `user_tokens` (`expires_at`);