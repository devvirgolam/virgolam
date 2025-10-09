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

-- Dumping structure for table virgolam_dashboard.variants
CREATE TABLE IF NOT EXISTS `variants` (
  `id` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `created_at` datetime NOT NULL,
  `parent_product_id` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `variant_product_id` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `group_label` varchar(100) DEFAULT NULL COMMENT 'Optional label or grouping name, e.g. ''color'', ''finish'', etc.',
  `position` int(11) DEFAULT NULL COMMENT 'Order of variant display within group',
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `parent_product_id` (`parent_product_id`),
  KEY `variant_product_id` (`variant_product_id`),
  CONSTRAINT `variants_ibfk_1` FOREIGN KEY (`parent_product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `variants_ibfk_2` FOREIGN KEY (`variant_product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table virgolam_dashboard.variants: ~0 rows (approximately)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
