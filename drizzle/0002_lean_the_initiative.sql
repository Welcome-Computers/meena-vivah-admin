CREATE TABLE `imported_profile` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`gender` varchar(20),
	`mobile` varchar(20),
	`dob` varchar(50),
	`fathersname` varchar(255),
	`self_gotra` varchar(255),
	`m_gotra` varchar(255),
	`gm_gotra` varchar(255),
	`mat_gm_gotra` varchar(255),
	`otherinfo` text,
	`status` enum('draft','reviewed','moved','rejected') NOT NULL DEFAULT 'draft',
	`remarks` text,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `imported_profile_id` PRIMARY KEY(`id`)
);
