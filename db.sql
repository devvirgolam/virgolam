-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               9.2.0 - MySQL Community Server - GPL
-- Server OS:                    Win64
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


-- Dumping database structure for virgo
CREATE DATABASE IF NOT EXISTS `virgo` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `virgo`;

-- Dumping structure for table virgo.addresses
CREATE TABLE IF NOT EXISTS `addresses` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `owner_type` enum('user','store','dealer') NOT NULL,
  `owner_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `street` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `pincode` varchar(20) DEFAULT NULL,
  `lat` double DEFAULT NULL,
  `lng` double DEFAULT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `owner_id` (`owner_id`),
  CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table virgo.addresses: ~0 rows (approximately)

-- Dumping structure for table virgo.catalogues
CREATE TABLE IF NOT EXISTS `catalogues` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `pdf_url` varchar(1024) DEFAULT NULL,
  `banner_image_url` varchar(1024) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `parent_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `parent_id` (`parent_id`),
  CONSTRAINT `catalogues_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `parent_categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table virgo.catalogues: ~37 rows (approximately)
INSERT INTO `catalogues` (`id`, `name`, `pdf_url`, `banner_image_url`, `created_at`, `updated_at`, `parent_id`) VALUES
	('089db224-ea86-41a0-aa6e-f570ab58fe6f', '3MM PVC', '/catalogue/3mm-pvc.pdf/', '/assets/images/catalogue/3mm-pvc.png', '2025-10-03 09:50:36', '2025-10-03 09:50:36', '5ecc88ba-a03c-11f0-b1b4-f875a42d8cde'),
	('0bc52b21-27fb-42c7-8e06-717f5ce22f57', 'Virgo Blinco', '/catalogue/virgo-blinco.pdf', '/assets/images/catalogue/virgo-blinco.png', '2025-10-03 09:50:36', '2025-10-03 09:50:36', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde'),
	('1672f9d9-1cc0-4f5f-830c-7ac3d333824a', 'Virgo Looks', '/catalogue/virgo-looks-plus.pdf', '/assets/images/catalogue/virgo-looks-plus.png', '2025-10-03 09:50:36', '2025-10-03 09:50:36', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde'),
	('168ea12f-4071-406d-ae84-6795ff1924f3', 'Virgo Abco Mica 2024-25', '/catalogue/virgo-abco-mica-2024-25.pdf/', '/assets/images/catalogue/virgo-abco-mica-2024-25.png', '2025-10-03 09:50:36', '2025-10-03 09:50:36', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde'),
	('1cfe065f-16bd-4eb8-8589-139978af3ea1', 'Verona', '/catalogue/verona.pdf/', '/assets/images/catalogue/cladding.png', '2025-10-03 09:50:36', '2025-10-03 09:50:36', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde'),
	('1eefdeaa-b311-4136-9175-13012f9b4f59', 'Evergreen Door Skin', 'https://www.virgolam.com/catalogue/door-skin/pdf/door-skin.pdf', '/assets/images/catalogue/virgo-evergreen-door%20cover.png', '2025-10-03 09:50:36', '2025-10-03 09:50:36', '5ecc84f2-a03c-11f0-b1b4-f875a42d8cde'),
	('20d0a89a-7433-4d5a-b0fe-bc0f13b2b7fb', 'Virgo ABCO Lam', '/catalogue/virgo-abco-lam.pdf', '/assets/images/catalogue/virgo-abco-lam.png', '2025-10-03 09:50:36', '2025-10-03 09:50:36', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde'),
	('312e8e08-482e-470b-94ef-f895df2da5c8', 'Chroma 1MM', '#', 'https://virgolam.com/wp-content/uploads/2025/09/2.png', '2025-10-03 09:50:36', '2025-10-03 09:50:36', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde'),
	('32e9b88d-f0c2-4a04-acf6-e854a499eadb', 'Virgo ACP', '/catalogue/virgo-acp.pdf/', '/assets/images/catalogue/virgo-acp.png', '2025-10-03 09:50:36', '2025-10-03 09:50:36', '5ecb2d5f-a03c-11f0-b1b4-f875a42d8cde'),
	('3946beb9-39e1-41f4-b6d6-9b4782129e8c', 'Virgo Croma Laminates 2023', '/catalogue/virgo-croma-laminates-2023.pdf/', '/assets/images/catalogue/virgo-croma-pvc.png', '2025-10-03 09:50:36', '2025-10-03 09:50:36', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde'),
	('402ea362-0069-4a56-b1e0-0a34ff879f0c', 'Virgo Croma PVC', '#', '/assets/images/catalogue/virgo-croma-pvc.png', '2025-10-03 09:50:36', '2025-10-03 09:50:36', '5ecc88ba-a03c-11f0-b1b4-f875a42d8cde'),
	('47559be0-899c-423b-8ee5-a277f2a0b833', 'Virgo Abco Lam New', '/catalogue/virgo-abco-lam-new', '/assets/images/catalogue/virgo-abco-lam-new.png', '2025-10-03 09:50:36', '2025-10-03 09:50:36', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde'),
	('54990eef-5895-45e5-a5f1-5ab0c6144a65', 'Chroma Doordecor 1MM', '/catalogue/chroma-doordecor-1mm.pdf/', 'https://virgolam.com/wp-content/uploads/2025/09/2.png', '2025-10-03 09:50:36', '2025-10-03 09:50:36', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde'),
	('549e42e6-f399-43be-8358-daf12611f084', 'Sleek Broucher', 'https://www.virgolam.com/products/sleek-broucher.pdf/', 'https://www.virgolam.com/products/aluminium.pdf/', '2025-10-03 09:50:36', '2025-10-03 09:50:36', '5ecb2d5f-a03c-11f0-b1b4-f875a42d8cde'),
	('5d34afee-db72-42dd-9acc-50561cf98860', 'Virgolam Plus 2', '#', '/assets/images/catalogue/virgolam-plus-2.png', '2025-10-03 09:50:36', '2025-10-03 09:50:36', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde'),
	('69d5df3d-1691-4378-9a3b-ae3ecf3f6ac6', 'Virgo Corby 0.8mm', '#', '/assets/images/catalogue/virgo-corby-pvc laminates.png', '2025-10-03 09:50:36', '2025-10-03 09:50:36', '5ecc88ba-a03c-11f0-b1b4-f875a42d8cde'),
	('72a25896-6e10-4bf6-838a-f4dae3405f30', 'Virgo Blinco Premium Laminates Catlog 0.92MM', '/catalogue/Virgo Blinco Premium Lamintes Catlog 0.92 MM.pdf/', 'https://virgolam.com/wp-content/uploads/2025/09/1-2.png', '2025-10-03 09:50:36', '2025-10-03 09:50:36', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde'),
	('7c45f559-b12b-4a9a-b860-b69e7c3c70e6', 'Virgo Croma E-Catalogue', '/catalogue/virgo-croma-ecatalogue', '/assets/images/catalogue/virgo-chroma-ecatalogue.png', '2025-10-03 09:50:36', '2025-10-03 09:50:36', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde'),
	('7c68060d-a1e9-45c6-84d7-2fb1694d2637', 'ALUMINIUM', 'https://www.virgolam.com/products/aluminium.pdf/', '', '2025-10-03 09:50:36', '2025-10-03 09:50:36', '5ecc8c2d-a03c-11f0-b1b4-f875a42d8cde'),
	('819938e7-0c6d-4eba-ac61-0fd7f44fe718', 'Virgo Croma', '/catalogue/virgo-croma.pdf/', '/assets/images/catalogue/virgo-croma-pvc.png', '2025-10-03 09:50:36', '2025-10-03 09:50:36', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde'),
	('82b07a7c-a6f0-414d-8886-8d574de2eda5', 'Croma 1mm', '/catalogue/croma-1mm', '/assets/images/catalogue/croma-1mm-new.png', '2025-10-03 09:50:36', '2025-10-03 09:50:36', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde'),
	('891a354d-b707-431e-8956-8328e93dc44c', 'Virgo Mica', '/catalogue/virgo-mica.pdf', '/assets/images/catalogue/virgo-mica.png', '2025-10-03 09:50:36', '2025-10-03 09:50:36', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde'),
	('8950c4dc-aaaf-46e2-9c6a-21485023d18c', 'Virgo Corby PVC Laminates', '#', '/assets/images/catalogue/virgo-corby-pvc laminates.png', '2025-10-03 09:50:36', '2025-10-03 09:50:36', '5ecc88ba-a03c-11f0-b1b4-f875a42d8cde'),
	('9ca14386-c07e-447d-99ba-9cf7900a82b2', 'Virgo Studio', '/catalogue/virgo-studio.pdf/', '/assets/images/catalogue/virgo-croma-pvc.png', '2025-10-03 09:50:36', '2025-10-03 09:50:36', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde'),
	('a0557b3d-47b3-4277-ab06-561467e76db4', 'Virgo The House of Wood', 'pdf/virgo-the-house-of-wood.pdf', '/assets/images/catalogue/virgo-corby-pvc laminates.png', '2025-10-03 09:50:36', '2025-10-03 09:50:36', '5ecc88ba-a03c-11f0-b1b4-f875a42d8cde'),
	('a6e25b1d-da47-4ca2-b6d5-1f6774c50562', 'Hanger', '/catalogue/hanger.pdf/', 'https://virgolam.com/wp-content/uploads/2025/09/2.png', '2025-10-03 09:50:36', '2025-10-03 09:50:36', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde'),
	('ab3d0e42-e710-4e0e-97c4-c3c76b2922be', 'Virgo Doordecor 0.92MM', '/catalogue/VIRGO_DOORDECOR 0.92 MM.pdf/', 'https://virgolam.com/wp-content/uploads/2025/09/virgo-doordecor-0.92mm-2.png', '2025-10-03 09:50:36', '2025-10-03 09:50:36', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde'),
	('bcc1449b-63f5-427f-9b51-8f948bb2208f', 'Virgo Craft New', '#', '/assets/images/catalogue/virgo-abco-lam-new.png', '2025-10-03 09:50:36', '2025-10-03 09:50:36', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde'),
	('c14fc5b8-b86c-4fe4-b384-7a6fc46c0779', 'Virgo Next Liner 0.7MM', '/catalogue/VIRGO NEXT LINER 0.7 MM.pdf/', 'https://virgolam.com/wp-content/uploads/2025/09/virgo-doordecor-0.92mm-2.png', '2025-10-03 09:50:36', '2025-10-03 09:50:36', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde'),
	('ca2de65c-8c0c-4dab-87cb-b80f5edc5808', 'Virgo Corby 15x15', '#', 'https://virgolam.com/wp-content/uploads/2025/09/4-1.png', '2025-10-03 09:50:36', '2025-10-03 09:50:36', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde'),
	('ca78038f-6e2d-4ded-bf3c-4e826dd58cae', 'Moments PVC', '/catalogue/moments-pvc.pdf/', '/assets/images/catalogue/moments-pvc.png', '2025-10-03 09:50:36', '2025-10-03 09:50:36', '5ecc88ba-a03c-11f0-b1b4-f875a42d8cde'),
	('cea49c3a-f5c4-4ccc-8d47-b13f45c17fb7', 'Virgo XHPL', 'https://www.virgolam.com/products/virgo-xhpl.pdf/', 'https://www.virgolam.com/products/aluminium.pdf/', '2025-10-03 09:50:36', '2025-10-03 09:50:36', '5ecb2d5f-a03c-11f0-b1b4-f875a42d8cde'),
	('d0dfde7a-defe-46a1-b8b0-cfbd0b9ffb7e', 'Cubico', '/catalogue/cubico.pdf/', 'https://virgolam.com/wp-content/uploads/2025/09/2.png', '2025-10-03 09:50:36', '2025-10-03 09:50:36', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde'),
	('d2c80a9b-1e28-4e37-bb68-8ea5cab6aadc', 'Virgo The Game', '/catalogue/virgo-the-game.pdf', '/assets/images/catalogue/virgo-the-game.png', '2025-10-03 09:50:36', '2025-10-03 09:50:36', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde'),
	('e4fce1cf-6df4-41e6-8054-7226e4be971f', 'Virgo Cladding', '/catalogue/cladding.pdf/', '/assets/images/catalogue/cladding.png', '2025-10-03 09:50:36', '2025-10-03 09:50:36', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde'),
	('e9768b89-5230-424a-81a7-57b86af7ccf5', 'Virgo Corby', '/catalogue/virgo-corby.pdf', '/assets/images/catalogue/virgo-corby.png', '2025-10-03 09:50:36', '2025-10-03 09:50:36', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde'),
	('fb882ed5-0e78-4662-9bd6-ec181881c695', 'Virgo Corby 15x15 1MM', '/catalogue/virgo-corby-15x15-1mm.pdf/', 'https://virgolam.com/wp-content/uploads/2025/09/4-1.png', '2025-10-03 09:50:36', '2025-10-03 09:50:36', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde');

-- Dumping structure for table virgo.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(200) NOT NULL,
  `slug` varchar(200) DEFAULT NULL,
  `parent_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `parentCategoryId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  UNIQUE KEY `slug_2` (`slug`),
  UNIQUE KEY `slug_3` (`slug`),
  UNIQUE KEY `slug_4` (`slug`),
  UNIQUE KEY `slug_5` (`slug`),
  UNIQUE KEY `slug_6` (`slug`),
  UNIQUE KEY `slug_7` (`slug`),
  UNIQUE KEY `slug_8` (`slug`),
  UNIQUE KEY `slug_9` (`slug`),
  UNIQUE KEY `slug_10` (`slug`),
  UNIQUE KEY `slug_11` (`slug`),
  UNIQUE KEY `slug_12` (`slug`),
  UNIQUE KEY `slug_13` (`slug`),
  UNIQUE KEY `slug_14` (`slug`),
  UNIQUE KEY `slug_15` (`slug`),
  UNIQUE KEY `slug_16` (`slug`),
  UNIQUE KEY `slug_17` (`slug`),
  UNIQUE KEY `slug_18` (`slug`),
  UNIQUE KEY `slug_19` (`slug`),
  UNIQUE KEY `slug_20` (`slug`),
  UNIQUE KEY `slug_21` (`slug`),
  UNIQUE KEY `slug_22` (`slug`),
  UNIQUE KEY `slug_23` (`slug`),
  UNIQUE KEY `slug_24` (`slug`),
  UNIQUE KEY `slug_25` (`slug`),
  UNIQUE KEY `slug_26` (`slug`),
  UNIQUE KEY `slug_27` (`slug`),
  UNIQUE KEY `slug_28` (`slug`),
  KEY `parent_id` (`parent_id`),
  KEY `parentCategoryId` (`parentCategoryId`),
  CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `categories_ibfk_2` FOREIGN KEY (`parentCategoryId`) REFERENCES `parent_categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table virgo.categories: ~0 rows (approximately)

-- Dumping structure for table virgo.contents
CREATE TABLE IF NOT EXISTS `contents` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `type` enum('csr','event','certification','coverage') NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` text,
  `image_url` varchar(1024) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table virgo.contents: ~0 rows (approximately)

-- Dumping structure for table virgo.dealers
CREATE TABLE IF NOT EXISTS `dealers` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(200) NOT NULL,
  `slug` varchar(200) DEFAULT NULL,
  `company_name` varchar(200) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  UNIQUE KEY `slug_2` (`slug`),
  UNIQUE KEY `slug_3` (`slug`),
  UNIQUE KEY `slug_4` (`slug`),
  UNIQUE KEY `slug_5` (`slug`),
  UNIQUE KEY `slug_6` (`slug`),
  UNIQUE KEY `slug_7` (`slug`),
  UNIQUE KEY `slug_8` (`slug`),
  UNIQUE KEY `slug_9` (`slug`),
  UNIQUE KEY `slug_10` (`slug`),
  UNIQUE KEY `slug_11` (`slug`),
  UNIQUE KEY `slug_12` (`slug`),
  UNIQUE KEY `slug_13` (`slug`),
  UNIQUE KEY `slug_14` (`slug`),
  UNIQUE KEY `slug_15` (`slug`),
  UNIQUE KEY `slug_16` (`slug`),
  UNIQUE KEY `slug_17` (`slug`),
  UNIQUE KEY `slug_18` (`slug`),
  UNIQUE KEY `slug_19` (`slug`),
  UNIQUE KEY `slug_20` (`slug`),
  UNIQUE KEY `slug_21` (`slug`),
  UNIQUE KEY `slug_22` (`slug`),
  UNIQUE KEY `slug_23` (`slug`),
  UNIQUE KEY `slug_24` (`slug`),
  UNIQUE KEY `slug_25` (`slug`),
  UNIQUE KEY `slug_26` (`slug`),
  UNIQUE KEY `slug_27` (`slug`),
  UNIQUE KEY `slug_28` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table virgo.dealers: ~0 rows (approximately)

-- Dumping structure for table virgo.leads
CREATE TABLE IF NOT EXISTS `leads` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(150) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `message` text,
  `source` enum('website','landing_page','ad','newsletter','referral','other') DEFAULT 'website',
  `status` enum('new','contacted','qualified','converted','lost') DEFAULT 'new',
  `assigned_to` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `assigned_to` (`assigned_to`),
  CONSTRAINT `leads_ibfk_1` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table virgo.leads: ~0 rows (approximately)

-- Dumping structure for table virgo.lead_activities
CREATE TABLE IF NOT EXISTS `lead_activities` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `lead_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `activity_type` enum('call','email','meeting','followup','other') NOT NULL,
  `description` text,
  `scheduled_at` datetime DEFAULT NULL,
  `completed` tinyint(1) DEFAULT '0',
  `created_by` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `lead_id` (`lead_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `lead_activities_ibfk_51` FOREIGN KEY (`lead_id`) REFERENCES `leads` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `lead_activities_ibfk_52` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table virgo.lead_activities: ~0 rows (approximately)

-- Dumping structure for table virgo.lead_notes
CREATE TABLE IF NOT EXISTS `lead_notes` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `lead_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `note` text,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `lead_id` (`lead_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `lead_notes_ibfk_51` FOREIGN KEY (`lead_id`) REFERENCES `leads` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `lead_notes_ibfk_52` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table virgo.lead_notes: ~0 rows (approximately)

-- Dumping structure for table virgo.parent_categories
CREATE TABLE IF NOT EXISTS `parent_categories` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
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
  UNIQUE KEY `slug_6` (`slug`),
  UNIQUE KEY `slug_7` (`slug`),
  UNIQUE KEY `slug_8` (`slug`),
  UNIQUE KEY `slug_9` (`slug`),
  UNIQUE KEY `slug_10` (`slug`),
  UNIQUE KEY `slug_11` (`slug`),
  UNIQUE KEY `slug_12` (`slug`),
  UNIQUE KEY `slug_13` (`slug`),
  UNIQUE KEY `slug_14` (`slug`),
  UNIQUE KEY `slug_15` (`slug`),
  UNIQUE KEY `slug_16` (`slug`),
  UNIQUE KEY `slug_17` (`slug`),
  UNIQUE KEY `slug_18` (`slug`),
  UNIQUE KEY `slug_19` (`slug`),
  UNIQUE KEY `slug_20` (`slug`),
  UNIQUE KEY `slug_21` (`slug`),
  UNIQUE KEY `slug_22` (`slug`),
  UNIQUE KEY `slug_23` (`slug`),
  UNIQUE KEY `slug_24` (`slug`),
  UNIQUE KEY `slug_25` (`slug`),
  UNIQUE KEY `slug_26` (`slug`),
  UNIQUE KEY `slug_27` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table virgo.parent_categories: ~5 rows (approximately)
INSERT INTO `parent_categories` (`id`, `name`, `slug`, `created_at`, `updated_at`) VALUES
	('5ecb2d5f-a03c-11f0-b1b4-f875a42d8cde', 'ACP', 'acp', '2025-10-03 15:05:59', '2025-10-03 15:05:59'),
	('5ecc600d-a03c-11f0-b1b4-f875a42d8cde', 'Laminates', 'laminates', '2025-10-03 15:05:59', '2025-10-03 15:05:59'),
	('5ecc84f2-a03c-11f0-b1b4-f875a42d8cde', 'Doorskin', 'doorskin', '2025-10-03 15:05:59', '2025-10-03 15:05:59'),
	('5ecc88ba-a03c-11f0-b1b4-f875a42d8cde', 'PVC', 'pvc', '2025-10-03 15:05:59', '2025-10-03 15:05:59'),
	('5ecc8c2d-a03c-11f0-b1b4-f875a42d8cde', 'ALuminium', 'aluminium', '2025-10-03 15:05:59', '2025-10-03 15:05:59');

-- Dumping structure for table virgo.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `sku` varchar(100) DEFAULT NULL,
  `category_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
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
  UNIQUE KEY `slug_25` (`slug`),
  UNIQUE KEY `sku_25` (`sku`),
  UNIQUE KEY `slug_26` (`slug`),
  UNIQUE KEY `sku_26` (`sku`),
  UNIQUE KEY `slug_27` (`slug`),
  UNIQUE KEY `sku_27` (`sku`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table virgo.products: ~0 rows (approximately)

-- Dumping structure for table virgo.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `name_2` (`name`),
  UNIQUE KEY `name_3` (`name`),
  UNIQUE KEY `name_4` (`name`),
  UNIQUE KEY `name_5` (`name`),
  UNIQUE KEY `name_6` (`name`),
  UNIQUE KEY `name_7` (`name`),
  UNIQUE KEY `name_8` (`name`),
  UNIQUE KEY `name_9` (`name`),
  UNIQUE KEY `name_10` (`name`),
  UNIQUE KEY `name_11` (`name`),
  UNIQUE KEY `name_12` (`name`),
  UNIQUE KEY `name_13` (`name`),
  UNIQUE KEY `name_14` (`name`),
  UNIQUE KEY `name_15` (`name`),
  UNIQUE KEY `name_16` (`name`),
  UNIQUE KEY `name_17` (`name`),
  UNIQUE KEY `name_18` (`name`),
  UNIQUE KEY `name_19` (`name`),
  UNIQUE KEY `name_20` (`name`),
  UNIQUE KEY `name_21` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table virgo.roles: ~3 rows (approximately)
INSERT INTO `roles` (`id`, `name`) VALUES
	('c63cdbd4-a0d9-11f0-b1b4-f875a42d8cde', 'ADMIN'),
	('c63dfa76-a0d9-11f0-b1b4-f875a42d8cde', 'SUPER_ADMIN'),
	('c63e0074-a0d9-11f0-b1b4-f875a42d8cde', 'USERS');

-- Dumping structure for table virgo.stores
CREATE TABLE IF NOT EXISTS `stores` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `dealer_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `address_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `dealer_id` (`dealer_id`),
  KEY `address_id` (`address_id`),
  CONSTRAINT `stores_ibfk_55` FOREIGN KEY (`dealer_id`) REFERENCES `dealers` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `stores_ibfk_56` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table virgo.stores: ~0 rows (approximately)

-- Dumping structure for table virgo.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `username` varchar(80) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `name` varchar(150) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `role_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username_2` (`username`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `username_3` (`username`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `username_4` (`username`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `username_5` (`username`),
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `username_6` (`username`),
  UNIQUE KEY `email_6` (`email`),
  UNIQUE KEY `username_7` (`username`),
  UNIQUE KEY `email_7` (`email`),
  UNIQUE KEY `username_8` (`username`),
  UNIQUE KEY `email_8` (`email`),
  UNIQUE KEY `username_9` (`username`),
  UNIQUE KEY `email_9` (`email`),
  UNIQUE KEY `username_10` (`username`),
  UNIQUE KEY `email_10` (`email`),
  UNIQUE KEY `username_11` (`username`),
  UNIQUE KEY `email_11` (`email`),
  UNIQUE KEY `username_12` (`username`),
  UNIQUE KEY `email_12` (`email`),
  UNIQUE KEY `username_13` (`username`),
  UNIQUE KEY `email_13` (`email`),
  UNIQUE KEY `username_14` (`username`),
  UNIQUE KEY `email_14` (`email`),
  UNIQUE KEY `username_15` (`username`),
  UNIQUE KEY `email_15` (`email`),
  UNIQUE KEY `username_16` (`username`),
  UNIQUE KEY `email_16` (`email`),
  UNIQUE KEY `username_17` (`username`),
  UNIQUE KEY `email_17` (`email`),
  UNIQUE KEY `username_18` (`username`),
  UNIQUE KEY `email_18` (`email`),
  UNIQUE KEY `username_19` (`username`),
  UNIQUE KEY `email_19` (`email`),
  UNIQUE KEY `username_20` (`username`),
  UNIQUE KEY `email_20` (`email`),
  UNIQUE KEY `username_21` (`username`),
  UNIQUE KEY `email_21` (`email`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table virgo.users: ~2 rows (approximately)
INSERT INTO `users` (`id`, `username`, `email`, `password_hash`, `name`, `phone`, `role_id`, `is_active`, `created_at`, `updated_at`) VALUES
	('1f07df61-a0da-11f0-b1b4-f875a42d8cde', 'admin_user', 'admin@example.com', '$2b$12$aTChETQDYUSVvbBgmlGqk.cTHUrb3eWzrJDoSuzFZWv2Rwr4F3w6u', 'Admin Name', '9999999999', 'c63cdbd4-a0d9-11f0-b1b4-f875a42d8cde', 1, '2025-10-04 09:55:13', '2025-10-04 09:55:13'),
	('1f0a18b6-a0da-11f0-b1b4-f875a42d8cde', 'superadmin_user', 'superadmin@example.com', '$2b$12$aTChETQDYUSVvbBgmlGqk.cTHUrb3eWzrJDoSuzFZWv2Rwr4F3w6u', 'Super Admin Name', '8888888888', 'c63dfa76-a0d9-11f0-b1b4-f875a42d8cde', 1, '2025-10-04 09:55:13', '2025-10-04 09:55:13');

-- Dumping structure for table virgo.variants
CREATE TABLE IF NOT EXISTS `variants` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `product_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(150) DEFAULT NULL,
  `sku` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `attributes` text,
  `images` text,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sku` (`sku`),
  UNIQUE KEY `sku_2` (`sku`),
  UNIQUE KEY `sku_3` (`sku`),
  UNIQUE KEY `sku_4` (`sku`),
  UNIQUE KEY `sku_5` (`sku`),
  UNIQUE KEY `sku_6` (`sku`),
  UNIQUE KEY `sku_7` (`sku`),
  UNIQUE KEY `sku_8` (`sku`),
  UNIQUE KEY `sku_9` (`sku`),
  UNIQUE KEY `sku_10` (`sku`),
  UNIQUE KEY `sku_11` (`sku`),
  UNIQUE KEY `sku_12` (`sku`),
  UNIQUE KEY `sku_13` (`sku`),
  UNIQUE KEY `sku_14` (`sku`),
  UNIQUE KEY `sku_15` (`sku`),
  UNIQUE KEY `sku_16` (`sku`),
  UNIQUE KEY `sku_17` (`sku`),
  UNIQUE KEY `sku_18` (`sku`),
  UNIQUE KEY `sku_19` (`sku`),
  UNIQUE KEY `sku_20` (`sku`),
  UNIQUE KEY `sku_21` (`sku`),
  UNIQUE KEY `sku_22` (`sku`),
  UNIQUE KEY `sku_23` (`sku`),
  UNIQUE KEY `sku_24` (`sku`),
  UNIQUE KEY `sku_25` (`sku`),
  UNIQUE KEY `sku_26` (`sku`),
  UNIQUE KEY `sku_27` (`sku`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `variants_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table virgo.variants: ~0 rows (approximately)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
