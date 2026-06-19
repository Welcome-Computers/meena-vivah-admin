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
	`mobile` varchar(10) NOT NULL,
	`password` varchar(255) NOT NULL,
	`is_active` boolean DEFAULT true,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `admins_id` PRIMARY KEY(`id`)
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
	CONSTRAINT `profile_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sibling_details` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`relation` varchar(50),
	`name` varchar(255),
	`education` varchar(255),
	`occupation` varchar(255),
	CONSTRAINT `sibling_details_id` PRIMARY KEY(`id`)
);
