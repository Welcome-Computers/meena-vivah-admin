ALTER TABLE `admin_sessions` ADD `session_id` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `admin_sessions` ADD CONSTRAINT `session_id_idx` UNIQUE(`session_id`);--> statement-breakpoint
CREATE INDEX `admin_id_idx` ON `admin_sessions` (`admin_id`);--> statement-breakpoint
ALTER TABLE `admin_sessions` DROP COLUMN `access_token_hash`;--> statement-breakpoint
ALTER TABLE `admin_sessions` DROP COLUMN `refresh_token_hash`;