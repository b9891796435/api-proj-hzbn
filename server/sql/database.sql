-- Create user and database for API Manager
-- Because Node.js MySQL module does not support caching_sha2_password, we have to use mysql_native_password
-- FIXME: 
CREATE USER 'demouser'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';
CREATE USER 'demouser'@'%' IDENTIFIED WITH mysql_native_password BY '123456';
GRANT PROCESS ON *.* TO 'demouser'@'%';

CREATE DATABASE IF NOT EXISTS `api_manager` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

GRANT ALL PRIVILEGES ON `api_manager`.* TO 'demouser'@'localhost';
GRANT ALL PRIVILEGES ON `api_manager`.* TO 'demouser'@'%';

-- Change identity
FLUSH PRIVILEGES;

-- Create tables
USE `api_manager`;

CREATE TABLE IF NOT EXISTS `user` (
  `uid` bigint unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `salt` varchar(255) NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `project` (
  `pid` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `project_user` (
  `pid` bigint unsigned NOT NULL,
  `uid` bigint unsigned NOT NULL,
  `role` int DEFAULT '0',
  PRIMARY KEY (`pid`, `uid`),
  INDEX `projectuser_user` (`uid`) USING BTREE,
  CONSTRAINT `projectuser_project` FOREIGN KEY (`pid`) REFERENCES `project` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `projectuser_user` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `api` (
	`aid` bigint unsigned NOT NULL AUTO_INCREMENT,
	`pid` bigint unsigned NOT NULL,
	`deleted` tinyint(1) NOT NULL DEFAULT '0',
	PRIMARY KEY (`aid`),
	INDEX `api_project` (`pid`) USING BTREE,
	CONSTRAINT `api_project` FOREIGN KEY (`pid`) REFERENCES `project` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `api_history` (
	`hid` bigint unsigned NOT NULL AUTO_INCREMENT,
	`aid` bigint unsigned NOT NULL,
	`uid` bigint unsigned NOT NULL,
	`path` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	`method` varchar(10) NOT NULL,
	`time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`summary` TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	`parameters` json DEFAULT NULL,
	`responses` json DEFAULT NULL,
	PRIMARY KEY (`hid`),
	CONSTRAINT `history_api` FOREIGN KEY (`aid`) REFERENCES `api` (`aid`) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT `history_user` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
