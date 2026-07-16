CREATE TABLE `admin_sessions` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`admin_id` bigint NOT NULL,
	`access_token_hash` varchar(255) NOT NULL,
	`refresh_token_hash` varchar(255) NOT NULL,
	`is_active` boolean NOT NULL DEFAULT true,
	`expires_at` timestamp NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `admin_sessions_id` PRIMARY KEY(`id`)
);
