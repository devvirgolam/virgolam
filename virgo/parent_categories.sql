-- --------------------------------------------------------
-- Host:                         103.50.161.16
-- Server version:               5.7.44 - MySQL Community Server (GPL)
-- Server OS:                    Linux
-- HeidiSQL Version:             12.11.0.7065
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table virgolam_dashboard.parent_categories
CREATE TABLE IF NOT EXISTS `parent_categories` (
  `id` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `name` varchar(200) NOT NULL,
  `slug` varchar(200) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  UNIQUE KEY `slug_2` (`slug`),
  UNIQUE KEY `slug_3` (`slug`),
  UNIQUE KEY `slug_4` (`slug`),
  UNIQUE KEY `slug_5` (`slug`),
  UNIQUE KEY `slug_6` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table virgolam_dashboard.parent_categories: ~10 rows (approximately)
INSERT INTO `parent_categories` (`id`, `name`, `slug`, `created_at`, `updated_at`) VALUES
	('33707e91-a336-11f0-927a-fa163e2a6007', 'Digital', 'digital', '2025-10-03 15:05:59', '2025-10-03 15:05:59'),
	('337147c5-a336-11f0-927a-fa163e2a6007', 'Mica', 'mica', '2025-10-03 15:05:59', '2025-10-03 15:05:59'),
	('33714b78-a336-11f0-927a-fa163e2a6007', 'Lam', 'lam', '2025-10-03 15:05:59', '2025-10-03 15:05:59'),
	('33714fa4-a336-11f0-927a-fa163e2a6007', 'Sparkling Solids', 'sparkling-solids', '2025-10-03 15:05:59', '2025-10-03 15:05:59'),
	('337152bb-a336-11f0-927a-fa163e2a6007', 'Patterns', 'patterns', '2025-10-03 15:05:59', '2025-10-03 15:05:59'),
	('5ecb2d5f-a03c-11f0-b1b4-f875a42d8cde', 'ACP', 'acp', '2025-10-03 15:05:59', '2025-10-03 15:05:59'),
	('5ecc600d-a03c-11f0-b1b4-f875a42d8cde', 'Laminates', 'laminates', '2025-10-03 15:05:59', '2025-10-03 15:05:59'),
	('5ecc84f2-a03c-11f0-b1b4-f875a42d8cde', 'Doorskin', 'doorskin', '2025-10-03 15:05:59', '2025-10-03 15:05:59'),
	('5ecc88ba-a03c-11f0-b1b4-f875a42d8cde', 'PVC', 'pvc', '2025-10-03 15:05:59', '2025-10-03 15:05:59'),
	('5ecc8c2d-a03c-11f0-b1b4-f875a42d8cde', 'ALuminium', 'aluminium', '2025-10-03 15:05:59', '2025-10-03 15:05:59');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
