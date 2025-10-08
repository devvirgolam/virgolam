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

-- Dumping structure for table virgolam_dashboard.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `sku` varchar(100) DEFAULT NULL,
  `category_id` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `description` text,
  `images` text,
  `seo` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  UNIQUE KEY `sku` (`sku`),
  UNIQUE KEY `slug_2` (`slug`),
  UNIQUE KEY `sku_2` (`sku`),
  UNIQUE KEY `slug_3` (`slug`),
  UNIQUE KEY `sku_3` (`sku`),
  UNIQUE KEY `slug_4` (`slug`),
  UNIQUE KEY `sku_4` (`sku`),
  UNIQUE KEY `slug_5` (`slug`),
  UNIQUE KEY `sku_5` (`sku`),
  UNIQUE KEY `slug_6` (`slug`),
  UNIQUE KEY `sku_6` (`sku`),
  UNIQUE KEY `slug_7` (`slug`),
  UNIQUE KEY `sku_7` (`sku`),
  UNIQUE KEY `slug_8` (`slug`),
  UNIQUE KEY `sku_8` (`sku`),
  UNIQUE KEY `slug_9` (`slug`),
  UNIQUE KEY `sku_9` (`sku`),
  UNIQUE KEY `slug_10` (`slug`),
  UNIQUE KEY `sku_10` (`sku`),
  UNIQUE KEY `slug_11` (`slug`),
  UNIQUE KEY `sku_11` (`sku`),
  UNIQUE KEY `slug_12` (`slug`),
  UNIQUE KEY `sku_12` (`sku`),
  UNIQUE KEY `slug_13` (`slug`),
  UNIQUE KEY `sku_13` (`sku`),
  UNIQUE KEY `slug_14` (`slug`),
  UNIQUE KEY `sku_14` (`sku`),
  UNIQUE KEY `slug_15` (`slug`),
  UNIQUE KEY `sku_15` (`sku`),
  UNIQUE KEY `slug_16` (`slug`),
  UNIQUE KEY `sku_16` (`sku`),
  UNIQUE KEY `slug_17` (`slug`),
  UNIQUE KEY `sku_17` (`sku`),
  UNIQUE KEY `slug_18` (`slug`),
  UNIQUE KEY `sku_18` (`sku`),
  UNIQUE KEY `slug_19` (`slug`),
  UNIQUE KEY `sku_19` (`sku`),
  UNIQUE KEY `slug_20` (`slug`),
  UNIQUE KEY `sku_20` (`sku`),
  UNIQUE KEY `slug_21` (`slug`),
  UNIQUE KEY `sku_21` (`sku`),
  UNIQUE KEY `slug_22` (`slug`),
  UNIQUE KEY `sku_22` (`sku`),
  UNIQUE KEY `slug_23` (`slug`),
  UNIQUE KEY `sku_23` (`sku`),
  UNIQUE KEY `slug_24` (`slug`),
  UNIQUE KEY `sku_24` (`sku`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table virgolam_dashboard.products: ~0 rows (approximately)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
