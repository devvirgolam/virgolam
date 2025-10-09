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

-- Dumping structure for table virgolam_dashboard.catalogues
CREATE TABLE IF NOT EXISTS `catalogues` (
  `id` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `pdf_url` varchar(1024) DEFAULT NULL,
  `banner_image_url` varchar(1024) DEFAULT NULL,
  `parent_id` char(36) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `parent_id` (`parent_id`),
  CONSTRAINT `catalogues_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `parent_categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table virgolam_dashboard.catalogues: ~37 rows (approximately)
INSERT INTO `catalogues` (`id`, `name`, `pdf_url`, `banner_image_url`, `parent_id`, `created_at`, `updated_at`) VALUES
	('0be1f0ba-cdaf-4bd3-bf2e-d690d892ec3a', 'Virgo Corby 0.8mm', 'https://media.virgolam.com/assets/catalogues_pdf/VIRGO_CORBY_2025 - 0.8 MM.pdf', 'https://media.virgolam.com/assets/catalogue/virgo-corby-pvc laminates.png', '5ecc88ba-a03c-11f0-b1b4-f875a42d8cde', '2025-10-08 05:07:48', '2025-10-08 05:07:48'),
	('10c4976a-4ece-4f23-af7a-362a85a06805', 'Virgo ABCO Lam', 'https://media.virgolam.com/assets/catalogues_pdf/virgo-abco-mica-2023.pdf', 'https://media.virgolam.com/assets/catalogue/virgo-abco-lam.png', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde', '2025-10-08 05:07:48', '2025-10-08 05:07:48'),
	('18045680-b4d3-410b-af52-2d47cc02d04d', 'Virgo Blinco Premium Laminates Catlog 0.92MM', 'https://media.virgolam.com/assets/catalogues_pdf/Virgo Blinco Premium Lamintes Catlog 0.92 MM.pdf', 'https://media.virgolam.com/assets/catalogue/1-2.png', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde', '2025-10-08 05:07:48', '2025-10-08 05:07:48'),
	('1b14ed19-3627-4da5-93e9-2efc5781b58b', 'Virgo Blinco', 'https://media.virgolam.com/assets/catalogues_pdf/virgo-blinco.pdf', 'https://media.virgolam.com/assets/catalogue/virgo-blinco.png', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde', '2025-10-08 05:07:48', '2025-10-08 05:07:48'),
	('30f18f72-e687-4a91-a8c0-ff3519542e60', 'Virgo Croma PVC', 'https://media.virgolam.com/assets/catalogues_pdf/virgo-croma.pdf', 'https://media.virgolam.com/assets/catalogue/virgo-croma-pvc.png', '5ecc88ba-a03c-11f0-b1b4-f875a42d8cde', '2025-10-08 05:07:48', '2025-10-08 05:07:48'),
	('3df82a36-e79a-4dea-acbb-ad12f6ada87b', 'Virgo Cladding', 'https://media.virgolam.com/assets/catalogues_pdf/cladding.pdf', 'https://media.virgolam.com/assets/catalogue/cladding.png', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde', '2025-10-08 05:07:48', '2025-10-08 05:07:48'),
	('3f90da5b-2ace-4633-850d-38ce032d17b5', 'Virgo Next Liner 0.7MM', 'https://media.virgolam.com/assets/catalogues_pdf/VIRGO NEXT LINER 0.7 MM.pdf', 'https://media.virgolam.com/assets/catalogue/virgo-doordecor-0.92mm-2.png', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde', '2025-10-08 05:07:48', '2025-10-08 05:07:48'),
	('3fc1c06c-b4e0-4d99-8baa-79579be39d0c', 'Virgo The House of Wood', NULL, 'https://media.virgolam.com/assets/catalogue/virgo-corby-pvc laminates.png', '5ecc88ba-a03c-11f0-b1b4-f875a42d8cde', '2025-10-08 05:07:48', '2025-10-08 05:07:48'),
	('425d7f9f-ece3-4f71-91e3-7284e92bfac0', 'Virgo Studio', 'https://media.virgolam.com/assets/catalogues_pdf/virgo-studio.pdf', 'https://media.virgolam.com/assets/catalogue/virgo-croma-pvc.png', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde', '2025-10-08 05:07:48', '2025-10-08 05:07:48'),
	('44e47d22-3458-4ad6-a027-64bbadc52b29', 'Virgo XHPL', 'https://media.virgolam.com/assets/catalogues_pdf/virgo-xhpl.pdf', 'https://www.virgolam.com/products/aluminium.pdf', '5ecb2d5f-a03c-11f0-b1b4-f875a42d8cde', '2025-10-08 05:07:48', '2025-10-08 05:07:48'),
	('4f2dc3cd-6554-4410-a760-bde6af875412', 'Virgo Corby 15x15', 'https://media.virgolam.com/assets/catalogues_pdf/Virgo Corby 15 x 15 - 1 MM.pdf', 'https://media.virgolam.com/assets/catalogue/4-1.png', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde', '2025-10-08 05:07:48', '2025-10-08 05:07:48'),
	('561263bc-1ed8-4a56-80c3-4fe523f87f2b', 'Virgo Corby', 'https://media.virgolam.com/assets/catalogues_pdf/virgo-corby.pdf', 'https://media.virgolam.com/assets/catalogue/virgo-corby.png', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde', '2025-10-08 05:07:48', '2025-10-08 05:07:48'),
	('5b0cc009-488a-47e0-a587-0379a0cc71a7', 'Virgo Croma Laminates 2023', 'https://media.virgolam.com/assets/catalogues_pdf/virgo-croma-laminates-2023.pdf', 'https://media.virgolam.com/assets/catalogue/virgo-croma-pvc.png', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde', '2025-10-08 05:07:48', '2025-10-08 05:07:48'),
	('6155717c-97e7-4f6f-8c7e-843772239557', 'Chroma Doordecor 1MM', 'https://media.virgolam.com/assets/catalogues_pdf/chroma-doordecor-1mm.pdf', 'https://media.virgolam.com/assets/catalogue/2.png', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde', '2025-10-08 05:07:48', '2025-10-08 05:07:48'),
	('645dcf82-7008-43a4-bea2-6bb1989b7d4c', 'Evergreen Door Skin', 'https://media.virgolam.com/assets/catalogues_pdf/Virgo-Evergreen-Door.pdf', 'https://media.virgolam.com/assets/catalogue/virgo-evergreen-door%20cover.png', '5ecc84f2-a03c-11f0-b1b4-f875a42d8cde', '2025-10-08 05:07:48', '2025-10-08 05:07:48'),
	('66f73b7f-894f-43b7-b2d6-100199f51acb', 'Virgo ACP', 'https://media.virgolam.com/assets/catalogues_pdf/virgo-acp.pdf', 'https://media.virgolam.com/assets/catalogue/virgo-acp.png', '5ecb2d5f-a03c-11f0-b1b4-f875a42d8cde', '2025-10-08 05:07:48', '2025-10-08 05:07:48'),
	('68584bfe-385c-4cdd-963f-9066a05c3a3d', 'Cubico', 'https://media.virgolam.com/assets/catalogues_pdf/cubico.pdf', 'https://media.virgolam.com/assets/catalogue/2.png', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde', '2025-10-08 05:07:48', '2025-10-08 05:07:48'),
	('7201e23b-5764-4148-9831-64577580270c', 'Virgo Abco Mica 2024-25', 'https://media.virgolam.com/assets/img/virgo-abco-mica-2024-25.pdf', 'https://media.virgolam.com/assets/catalogue/virgo-abco-mica-2024-25.png', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde', '2025-10-08 05:07:48', '2025-10-08 05:07:48'),
	('77bafb54-3a6b-491c-a567-2cab41f002bf', 'Virgo Abco Lam New', 'https://media.virgolam.com/assets/catalogues_pdf/abcolamplus 0.8 MM.pdf', 'https://media.virgolam.com/assets/catalogue/virgo-abco-lam-new.png', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde', '2025-10-08 05:07:48', '2025-10-08 05:07:48'),
	('8552eaba-125f-4358-a381-ee77d4c424eb', 'Virgo Croma', 'https://media.virgolam.com/assets/catalogues_pdf/virgo-croma.pdf', 'https://media.virgolam.com/assets/catalogue/virgo-croma-pvc.png', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde', '2025-10-08 05:07:48', '2025-10-08 05:07:48'),
	('85940cb7-502b-4a59-877e-aa324e541d4b', 'Virgo The Game', 'https://media.virgolam.com/assets/catalogues_pdf/virgo-the-game.pdf', 'https://media.virgolam.com/assets/catalogue/virgo-the-game.png', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde', '2025-10-08 05:07:48', '2025-10-08 05:07:48'),
	('86713bc6-7bc1-408c-a52e-f9f45cd948b5', 'Virgo Croma E-Catalogue', 'https://media.virgolam.com/assets/catalogues_pdf/virgo-croma-laminates-2023.pdf', 'https://media.virgolam.com/assets/catalogue/virgo-chroma-ecatalogue.png', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde', '2025-10-08 05:07:48', '2025-10-08 05:07:48'),
	('8e096aa0-1a97-4ff1-87b5-c617776b0e25', 'Virgo Corby 15x15 1MM', 'https://media.virgolam.com/assets/catalogues_pdf/virgo-corby-15x15-1mm.pdf', 'https://media.virgolam.com/assets/catalogue/4-1.png', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde', '2025-10-08 05:07:48', '2025-10-08 05:07:48'),
	('95a7c29c-a73b-47b4-800d-95140c9dd80d', 'Virgo Looks', 'https://media.virgolam.com/assets/catalogues_pdf/virgo-looks-plus.pdf', 'https://media.virgolam.com/assets/catalogue/virgo-looks-plus.png', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde', '2025-10-08 05:07:48', '2025-10-08 05:07:48'),
	('9cb6b681-efb4-4625-ad25-64cdde2c0501', 'Croma 1mm', 'https://media.virgolam.com/assets/catalogues_pdf/croma1_mm.pdf', 'https://media.virgolam.com/assets/catalogue/croma-1mm-new.png', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde', '2025-10-08 05:07:48', '2025-10-08 05:07:48'),
	('a106bcb1-7254-49fc-aadc-16abb1f6408d', 'Virgo Doordecor 0.92MM', 'https://media.virgolam.com/assets/catalogues_pdf/VIRGO_DOORDECOR 0.92 MM.pdf', 'https://media.virgolam.com/assets/catalogue/virgo-doordecor-0.92mm-2.png', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde', '2025-10-08 05:07:48', '2025-10-08 05:07:48'),
	('a1b2a374-a697-4a45-b6b2-08a27f4a369d', 'Verona', 'https://media.virgolam.com/assets/catalogues_pdf/verona.pdf', 'https://media.virgolam.com/assets/catalogue/cladding.png', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde', '2025-10-08 05:07:48', '2025-10-08 05:07:48'),
	('b052a38b-37f6-4077-b885-306891fb6c41', 'Sleek Broucher', 'https://media.virgolam.com/assets/catalogues_pdf/sleek-broucher.pdf', 'https://www.virgolam.com/products/aluminium.pdf', '5ecb2d5f-a03c-11f0-b1b4-f875a42d8cde', '2025-10-08 05:07:48', '2025-10-08 05:07:48'),
	('b21d9243-6cda-4268-b815-e5ec396228b9', 'Moments PVC', 'https://media.virgolam.com/assets/catalogues_pdf/moments-pvc.pdf', 'https://media.virgolam.com/assets/catalogue/moments-pvc.png', '5ecc88ba-a03c-11f0-b1b4-f875a42d8cde', '2025-10-08 05:07:48', '2025-10-08 05:07:48'),
	('baafecf0-a3ab-4b52-a9d6-d54d353a6f9e', '3MM PVC', 'https://media.virgolam.com/assets/catalogues_pdf/3mm-pvc.pdf', 'https://media.virgolam.com/assets/catalogue/3mm-pvc.png', '5ecc88ba-a03c-11f0-b1b4-f875a42d8cde', '2025-10-08 05:07:48', '2025-10-08 05:07:48'),
	('cf86e648-d2cf-474f-bb7c-e0befb337c94', 'Virgo Mica', 'https://media.virgolam.com/assets/catalogues_pdf/virgo-mica.pdf', 'https://media.virgolam.com/assets/catalogue/virgo-mica.png', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde', '2025-10-08 05:07:48', '2025-10-08 05:07:48'),
	('d639f7af-80d6-4ad0-9d70-cd200c8b9ee4', 'Hanger', 'https://media.virgolam.com/assets/catalogues_pdf/hanger.pdf', 'https://media.virgolam.com/assets/catalogue/2.png', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde', '2025-10-08 05:07:48', '2025-10-08 05:07:48'),
	('d6765051-b251-4d04-8bfa-03fd5a5df81c', 'Virgo Corby PVC Laminates', 'https://media.virgolam.com/assets/catalogues_pdf/Virgo Corby 15 x 15 - 1 MM.pdf', 'https://media.virgolam.com/assets/catalogue/virgo-corby-pvc laminates.png', '5ecc88ba-a03c-11f0-b1b4-f875a42d8cde', '2025-10-08 05:07:48', '2025-10-08 05:07:48'),
	('e33e3a47-b8e5-437c-98bc-3890474ddcfc', 'Chroma 1MM', 'https://media.virgolam.com/assets/catalogues_pdf/croma1_mm.pdf', 'https://media.virgolam.com/assets/catalogue/2.png', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde', '2025-10-08 05:07:48', '2025-10-08 05:07:48'),
	('e57dbd0a-18a6-46a2-9161-93362d5b40f4', 'ALUMINIUM', 'https://media.virgolam.com/assets/catalogues_pdf/sample.pdf', '[object Object]', NULL, '2025-10-08 05:07:48', '2025-10-08 05:59:01'),
	('f8971e67-3859-4e23-ad1a-0a0aa1e9b891', 'Virgolam Plus 2', 'https://media.virgolam.com/assets/catalogues_pdf/virgolam_Plus_2025 (Vedge) 0.8 MM.pdf', 'https://media.virgolam.com/assets/catalogue/virgolam-plus-2.png', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde', '2025-10-08 05:07:48', '2025-10-08 05:07:48'),
	('fe6651b8-f5b2-434d-b7f0-5294e15ecb66', 'Virgo Craft New', 'https://media.virgolam.com/assets/catalogues_pdf/virgo-abco-mica-1mm.pdf', 'https://media.virgolam.com/assets/catalogue/virgo-abco-lam-new.png', '5ecc600d-a03c-11f0-b1b4-f875a42d8cde', '2025-10-08 05:07:48', '2025-10-08 05:07:48');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
