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

-- Dumping structure for table virgolam_dashboard.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `name` varchar(200) NOT NULL,
  `slug` varchar(200) DEFAULT NULL,
  `parent_id` char(36) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  UNIQUE KEY `slug_2` (`slug`),
  UNIQUE KEY `slug_3` (`slug`),
  UNIQUE KEY `slug_4` (`slug`),
  UNIQUE KEY `slug_5` (`slug`),
  UNIQUE KEY `slug_6` (`slug`),
  KEY `parent_id` (`parent_id`),
  CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `parent_categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table virgolam_dashboard.categories: ~2 rows (approximately)
INSERT INTO `categories` (`id`, `name`, `slug`, `parent_id`, `created_at`, `updated_at`) VALUES
	('1b07c60e-47b0-4e8b-94cb-33a61d72a122', 'Stone', 'stone', NULL, '2025-10-07 00:00:00', '2025-10-07 00:00:00'),
	('32e1e7f5-934b-4b55-98ef-0f76bb2da106', 'GA', 'ga', NULL, '2025-10-07 00:00:00', '2025-10-07 00:00:00'),
	('3df9c84a-89ad-48c1-8f1d-f9d2c5b1a109', 'GLX1', 'glx1', NULL, '2025-10-07 00:00:00', '2025-10-07 00:00:00'),
	('42c1e2ad-6f92-4929-b59d-0ad53b6da118', 'SMT', 'smt', NULL, '2025-10-07 00:00:00', '2025-10-07 00:00:00'),
	('44f118e1-3b33-4a25-a9a1-8f52ad6b2c02', 'CSE', 'cse', NULL, '2025-10-07 00:00:00', '2025-10-07 00:00:00'),
	('5ce82b14-bbd1-4b53-84a8-7d1f17b3a125', 'TL', 'tl', NULL, '2025-10-07 00:00:00', '2025-10-07 00:00:00'),
	('66c2a91a-2b63-4c26-bd58-37a32b6da119', 'Solid', 'solid', NULL, '2025-10-07 00:00:00', '2025-10-07 00:00:00'),
	('6e39c75f-5c88-4f65-8a34-9a5baf21a117', 'SHG', 'shg', NULL, '2025-10-07 00:00:00', '2025-10-07 00:00:00'),
	('7a08e97a-3d69-40a4-b5d9-23112c12a121', 'ST', 'st', NULL, '2025-10-07 00:00:00', '2025-10-07 00:00:00'),
	('7f3b9b23-524f-4f49-bc64-02cf82b7a124', 'TG', 'tg', NULL, '2025-10-07 00:00:00', '2025-10-07 00:00:00'),
	('97b6cfb1-23f3-41cd-bf0a-64c37fd6a108', 'GL', 'gl', NULL, '2025-10-07 00:00:00', '2025-10-07 00:00:00'),
	('9a4bc621-ff1f-44cc-96a0-97e9b5e4a127', 'WS', 'ws', NULL, '2025-10-07 00:00:00', '2025-10-07 00:00:00'),
	('a9e21f8c-41d1-4a93-a1c7-cc0a2105a105', 'FH', 'fh', NULL, '2025-10-07 00:00:00', '2025-10-07 00:00:00'),
	('ab32f3de-12da-4b1c-b88d-0ff26f4da114', 'RNS', 'rns', NULL, '2025-10-07 00:00:00', '2025-10-07 00:00:00'),
	('b8b1c3e2-97a4-4e3d-b3c2-1cf8f3a12101', 'CBK', 'cbk', NULL, '2025-10-07 00:00:00', '2025-10-07 00:00:00'),
	('b92d1587-2a79-4d66-9bb5-47cc9e47a111', 'HG', 'hg', NULL, '2025-10-07 00:00:00', '2025-10-07 00:00:00'),
	('c4e124a2-9a13-47de-bb76-5a23f4bda115', 'SF', 'sf', NULL, '2025-10-07 00:00:00', '2025-10-07 00:00:00'),
	('c7d618b4-5a99-4e21-b7f0-3d9b22f9a103', 'DC', 'dc', NULL, '2025-10-07 00:00:00', '2025-10-07 00:00:00'),
	('c9e3f7a9-1f18-4c44-8a2b-3e72d9b2a126', 'Wooden', 'wooden', NULL, '2025-10-07 00:00:00', '2025-10-07 00:00:00'),
	('d15eaf7a-4983-476e-9a6d-19253a4ea107', 'GH', 'gh', NULL, '2025-10-07 00:00:00', '2025-10-07 00:00:00'),
	('d2e85a19-7a71-482d-bc55-2f68dcb3a110', 'GLX3', 'glx3', NULL, '2025-10-07 00:00:00', '2025-10-07 00:00:00'),
	('db94e75f-87e9-4f38-b7cd-ff6b92c2a120', 'Sparkel', 'sparkel', NULL, '2025-10-07 00:00:00', '2025-10-07 00:00:00'),
	('e57f90a5-607a-4f0d-b3df-0c631f08a104', 'DG', 'dg', NULL, '2025-10-07 00:00:00', '2025-10-07 00:00:00'),
	('e71a63e3-26ac-4d2a-9c2b-d6abcf2da112', 'MF', 'mf', NULL, '2025-10-07 00:00:00', '2025-10-07 00:00:00'),
	('f4cbd1e9-8a09-4aef-a4d5-721f2177a123', 'TA', 'ta', NULL, '2025-10-07 00:00:00', '2025-10-07 00:00:00'),
	('fdc7b561-01ad-4cda-81e3-cddcd2bba113', 'OAK', 'oak', NULL, '2025-10-07 00:00:00', '2025-10-07 00:00:00'),
	('ff23b86e-117a-4743-bd2c-c621f47ba116', 'SGL', 'sgl', NULL, '2025-10-07 00:00:00', '2025-10-07 00:00:00');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
