DROP TABLE `sibling_details`;--> statement-breakpoint
ALTER TABLE `profile` ADD `status` enum('draft','approved','rejected','suspended') DEFAULT 'draft' NOT NULL;