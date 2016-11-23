CREATE TABLE `gantt_links` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `source` int(11) NOT NULL,
  `target` int(11) NOT NULL,
  `type` varchar(1) NOT NULL,
  PRIMARY KEY (`id`)
)

CREATE TABLE `gantt_tasks` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`text` VARCHAR(255) NOT NULL COLLATE 'utf8_bin',
	`start_date` DATETIME NOT NULL,
	`duration` INT(11) NOT NULL,
	`parent` INT(11) NOT NULL,
	`project_id` INT(11) NOT NULL,
	`deadline` DATETIME NULL DEFAULT NULL,
	`type` VARCHAR(64) NOT NULL DEFAULT 'task' COLLATE 'utf8_bin',
	`resource_type` VARCHAR(64) NOT NULL COLLATE 'utf8_bin',
	`resource_amount` FLOAT NOT NULL,
	`hours` FLOAT NOT NULL,
	`manhours` FLOAT NOT NULL,
	`mancount` FLOAT NOT NULL,
	`description` TEXT NOT NULL COLLATE 'utf8_bin',
	`progress` FLOAT NOT NULL,
	`sortorder` DOUBLE NOT NULL DEFAULT '0',
	`priority` INT(11) NOT NULL,
	PRIMARY KEY (`id`)
)
COLLATE='utf8_bin'
ENGINE=InnoDB
AUTO_INCREMENT=1
;