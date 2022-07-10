-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mock_project
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `username` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `image` text COLLATE utf8_unicode_ci,
  `fullname` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(11) COLLATE utf8_unicode_ci DEFAULT NULL,
  `birth` date DEFAULT NULL,
  `address` text COLLATE utf8_unicode_ci,
  `gender` bit(1) DEFAULT NULL,
  `status` int DEFAULT NULL,
  `code` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `address_detail` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (2,'2021-11-18 17:14:33','2021-12-09 10:30:05','hungvkjh1','$2a$10$CeEOvzQBnZIumM4sF/IyZeWh0.iG9XOddR2X.PJ8SByAeS9amOWmq',NULL,'Nguyễn Trọng Hưng','0971547825','2001-12-16','{\"province\":{\"value\":1,\"label\":\"Thành phố Hà Nội\"},\"district\":{\"value\":1,\"label\":\"Quận Ba Đình\"},\"ward\":{\"value\":4,\"label\":\"Phường Trúc Bạch\"}}',_binary '',1,'ACC00000','266 Đội cấn'),(3,'2021-11-18 07:00:00','2021-12-09 10:27:38','hlong123','$2a$10$.FIl6HJobjFGY6xzxNyUhO2QV.EuisIfQQPw6tfc1yZreYO.oHvyK',NULL,'Nguyễn Hoàng Long','0969307637','2000-07-16','{\"province\":{\"value\":1,\"label\":\"Thành phố Hà Nội\"},\"district\":{\"value\":1,\"label\":\"Quận Ba Đình\"},\"ward\":{\"value\":1,\"label\":\"Phường Phúc Xá\"}}',_binary '',1,'ACC00001','Thành Phố Hà Nội'),(6,'2021-12-09 09:23:54','2021-12-15 09:59:38','longph123','$2a$10$Mc6Q1v3GtwUqvIkrMu53V.1jE8mXwsATMEZl1PPw0E3fyvB3GJF5W',NULL,'Phạm Hoàng Long','0810340156','2000-07-16','{\"province\":{\"value\":1,\"label\":\"Thành phố Hà Nội\"},\"district\":{\"value\":2,\"label\":\"Quận Hoàn Kiếm\"},\"ward\":{\"value\":46,\"label\":\"Phường Hàng Buồm\"}}',_binary '',1,'ACC00002','266 Đội cấn'),(7,'2021-12-09 09:24:37','2021-12-15 09:59:47','doct1234','$2a$10$XEk9tfEDrHxCQcUXWLOvweV9EotplbAQJnfxdsyDwItUNRa3zG7KS',NULL,'Cao Thành Đô','0810310484','2000-07-16',NULL,_binary '\0',0,'ACC00003','Thành phố Hà Nội, Đội Cấn'),(8,'2021-12-09 21:48:44','2021-12-13 11:13:43','dmc12345','$2a$10$Mnz5E6F1kAxpK/j9hkW9XeC2wCAvxAEi5TdliKceQ8FKq2U13989u','','Đỗ Mạnh Cường','0810310531','2000-01-01','{\"province\":{\"value\":4,\"label\":\"Tỉnh Cao Bằng\"},\"district\":{\"value\":42,\"label\":\"Huyện Bảo Lâm\"},\"ward\":{\"value\":0,\"label\":\"Chọn phường/xã\"}}',_binary '',1,'ACC00004','Số 1 Trần Quốc Toản'),(9,'2021-12-09 21:57:24','2021-12-15 09:58:32','btle1234','$2a$10$UeuakIlLwC3pBvdf3xMSQuemOuqm27XcsUrRznmfPmbhByp4PdJ7K','https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20170928.jpg?alt=media&token=5da22c78-2e13-492e-9794-dc3034263d9b','Bùi Thị Lan Em','0810310388','2000-01-01',NULL,_binary '\0',1,'ACC00005','Thành phố Hạ Long'),(10,'2021-12-13 11:14:43','2021-12-14 10:29:49','dmc123456','$2a$10$K/pNu6vqkRzSnDL09ESffe6gAwQ0EIgUTXpQ0glHAo8OXJNzJfNPi','https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20165107.jpg?alt=media&token=c326f7dd-f02f-4be2-86cd-dc19e1b58cc1','ĐỖ MẠNH CƯỜNG','0810310515','2000-01-01',NULL,_binary '',1,'ACC00006','Thành phố Hồ Chí Minh');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_role`
--

DROP TABLE IF EXISTS `account_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_role` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `role_id` bigint NOT NULL,
  `account_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_role_TO_account_role` (`role_id`),
  CONSTRAINT `FK_role_TO_account_role` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_role`
--

LOCK TABLES `account_role` WRITE;
/*!40000 ALTER TABLE `account_role` DISABLE KEYS */;
INSERT INTO `account_role` VALUES (50,'2021-12-09 21:52:13','2021-12-09 21:52:13',1,2),(59,'2021-12-10 09:10:35','2021-12-10 09:10:35',1,3),(63,'2021-12-13 11:13:43','2021-12-13 11:13:43',2,8),(68,'2021-12-14 10:29:49','2021-12-14 10:29:49',2,10),(69,'2021-12-15 09:58:32','2021-12-15 09:58:32',2,9),(70,'2021-12-15 09:58:32','2021-12-15 09:58:32',4,9),(72,'2021-12-15 09:59:38','2021-12-15 09:59:38',3,6),(73,'2021-12-15 09:59:47','2021-12-15 09:59:47',4,7);
/*!40000 ALTER TABLE `account_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authoriry`
--

DROP TABLE IF EXISTS `authoriry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authoriry` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `role_id` bigint NOT NULL,
  `name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_role_TO_authoriry` (`role_id`),
  CONSTRAINT `FK_role_TO_authoriry` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authoriry`
--

LOCK TABLES `authoriry` WRITE;
/*!40000 ALTER TABLE `authoriry` DISABLE KEYS */;
INSERT INTO `authoriry` VALUES (1,NULL,NULL,1,'full'),(2,NULL,NULL,2,'dashboard'),(3,NULL,NULL,3,'dashboard'),(4,NULL,NULL,4,'dashboard'),(5,NULL,NULL,2,'product_list'),(13,NULL,NULL,2,'sale_create'),(14,NULL,NULL,2,'sale_bill_list'),(15,NULL,NULL,2,'sale_bill_detail'),(16,NULL,NULL,2,'product_detail'),(17,NULL,NULL,3,'storage_list'),(18,NULL,NULL,3,'product_detail'),(19,NULL,NULL,3,'product_list'),(20,NULL,NULL,3,'import_bill_list'),(21,NULL,NULL,4,'customer_list'),(22,NULL,NULL,4,'customer_detail'),(23,NULL,NULL,4,'storage_list'),(24,NULL,NULL,3,'import_bill_create'),(25,NULL,NULL,3,'import_bill_detail'),(26,NULL,NULL,3,'import_bill_update'),(27,NULL,NULL,3,'bill_list'),(28,NULL,NULL,2,'bill_list');
/*!40000 ALTER TABLE `authoriry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `code` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (3,'2021-12-09 15:44:28','2021-12-15 08:59:42','Áo sơ mi',NULL,''),(4,'2021-12-15 08:47:42','2021-12-15 08:56:17','Quần bò',NULL,''),(5,'2021-12-14 14:25:18','2021-12-14 14:32:38','Váy',NULL,'sản phẩm mới'),(6,'2021-12-09 15:44:28','2021-12-15 08:57:13','Quần nỉ',NULL,''),(7,'2021-12-09 15:55:47','2021-12-13 13:44:29','Quần đùi',NULL,''),(8,'2021-12-09 17:18:24','2021-12-14 17:31:15','Áo phông',NULL,'Áo có nhiều phiên bản\n');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `image` text COLLATE utf8_unicode_ci,
  `phone` varchar(11) COLLATE utf8_unicode_ci DEFAULT NULL,
  `gender` tinyint DEFAULT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `birth` date DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `address_detail` tinytext COLLATE utf8_unicode_ci,
  `code` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `address` tinytext COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (38,'2021-12-09 16:21:11','2021-12-09 21:27:51',NULL,'0900000001',1,'Khách lẻ','1999-04-08','khachhang@gmail.com','266 Đội cấn','CUS00000','{\"province\":{\"value\":1,\"label\":\"Thành phố Hà Nội\"},\"district\":{\"value\":1,\"label\":\"Quận Ba Đình\"},\"ward\":{\"value\":1,\"label\":\"Phường Phúc Xá\"}}'),(39,'2021-12-09 21:32:02','2021-12-09 21:32:02',NULL,'0987641231',1,'Chu Việt Anh','1999-04-08','cva@gmail.com','266 Đội cấn','CUS00001',NULL),(40,'2021-12-09 21:33:44','2021-12-09 21:33:44',NULL,'0910310421',1,'NGUYỄN NAM ANH','1999-04-08','nna@gmail.com','Thành phố Hải phòng','CUS00002',NULL),(41,'2021-12-09 21:34:15','2021-12-09 21:34:15',NULL,'0810320089',1,'NGUYỄN QUỐC TÙNG ANH','1999-04-08','aab@gmail.com','Thành phố Hải Dương','CUS00003',NULL),(42,'2021-12-09 21:34:40','2021-12-09 21:34:40',NULL,'0810310515',1,'NGUYỄN TUẤN ANH','1999-04-08','abc@gmail.com','Thành phố Sapa','CUS00004',NULL),(43,'2021-12-11 08:24:52','2021-12-11 08:24:52',NULL,'0810310494',1,'NGUYỄN MẠNH TÙNG','1999-04-08','nmt@gmail.com','Số 2 Hoàng Hoa Thám','CUS00005',NULL),(44,'2021-12-11 08:26:59','2021-12-11 08:26:59',NULL,'0810310487',1,'ĐẶNG MINH TUẤN','1999-04-08','dmt@gmail.com','Số 2 Đội Cấn','CUS00006',NULL),(45,'2021-12-11 08:28:24','2021-12-11 08:28:24',NULL,'0981310177',1,'ĐẶNG NGỌC TÚ','1999-04-08','dnt@gmail.com','Số 3 Ngọc Hà','CUS00007',NULL),(46,'2021-12-11 08:32:59','2021-12-11 08:32:59',NULL,'0810310508',1,'NGUYỄN ĐÌNH PHI','1999-04-08','ndp@gmail.com','173 Hoàng Quốc Việt','CUS00008',NULL),(47,'2021-12-13 17:36:09','2021-12-13 17:36:09',NULL,'0904234234',1,'NGUYỄN NAM ANH','1999-04-08','longeu100@gmail.com','Số 1 Trần Quốc Toản','CUS00009','{\"province\":{\"value\":1,\"label\":\"Thành phố Hà Nội\"},\"district\":{\"value\":1,\"label\":\"Quận Ba Đình\"},\"ward\":{\"value\":4,\"label\":\"Phường Trúc Bạch\"}}');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_detail` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `order_id` bigint NOT NULL,
  `product_detail_id` bigint NOT NULL,
  `discount` decimal(10,0) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detail`
--

LOCK TABLES `order_detail` WRITE;
/*!40000 ALTER TABLE `order_detail` DISABLE KEYS */;
INSERT INTO `order_detail` VALUES (6,'2021-12-09 16:21:56','2021-12-09 16:21:56',1,699000,131,239,139800),(7,'2021-12-09 16:21:56','2021-12-09 16:21:56',1,449000,131,230,22450),(8,'2021-12-09 16:21:56','2021-12-09 16:21:56',1,449000,131,228,22450),(9,'2021-12-09 21:32:17','2021-12-09 21:32:17',1,499000,132,242,149700),(10,'2021-12-09 21:32:17','2021-12-09 21:32:17',1,350000,132,248,0),(11,'2021-12-09 21:32:17','2021-12-09 21:32:17',1,350000,132,251,105000),(12,'2021-12-09 21:36:26','2021-12-09 21:36:26',1,350000,133,249,0),(13,'2021-12-09 21:36:26','2021-12-09 21:36:26',1,549000,133,238,109800),(14,'2021-12-09 21:36:26','2021-12-09 21:36:26',1,499000,133,242,149700),(15,'2021-12-09 21:36:42','2021-12-09 21:36:42',1,350000,134,248,0),(16,'2021-12-09 21:36:52','2021-12-09 21:36:52',1,699000,135,239,139800),(17,'2021-12-10 08:14:45','2021-12-10 08:14:45',2,399000,136,234,79800),(18,'2021-12-10 08:19:48','2021-12-10 08:19:48',1,399000,137,234,39900),(19,'2021-12-10 08:27:34','2021-12-10 08:27:34',1,350000,138,249,0),(20,'2021-12-10 08:44:10','2021-12-10 08:44:10',1,399000,139,234,39900),(21,'2021-12-10 08:44:41','2021-12-10 08:44:41',2,350000,140,249,0),(22,'2021-12-10 09:09:55','2021-12-10 09:09:55',3,350000,141,252,315000),(23,'2021-12-10 15:13:07','2021-12-10 15:13:07',1,350000,142,249,0),(24,'2021-12-10 16:08:53','2021-12-10 16:08:53',2,350000,143,248,0),(25,'2021-12-11 08:25:10','2021-12-11 08:25:10',2,350000,144,250,210000),(26,'2021-12-11 08:25:10','2021-12-11 08:25:10',2,699000,144,247,279600),(27,'2021-12-11 08:27:10','2021-12-11 08:27:10',1,350000,145,250,105000),(28,'2021-12-11 08:27:10','2021-12-11 08:27:10',1,350000,145,251,105000),(29,'2021-12-11 08:27:13','2021-12-11 08:27:13',1,350000,146,250,105000),(30,'2021-12-11 08:27:13','2021-12-11 08:27:13',1,350000,146,251,105000),(31,'2021-12-11 08:28:29','2021-12-11 08:28:29',1,299000,147,253,59800),(32,'2021-12-11 08:28:29','2021-12-11 08:28:29',1,350000,147,269,35000),(33,'2021-12-11 08:30:00','2021-12-11 08:30:00',5,249000,148,266,0),(34,'2021-12-11 08:33:06','2021-12-11 08:33:06',1,399000,149,211,39900),(35,'2021-12-11 08:33:06','2021-12-11 08:33:06',1,399000,149,213,39900),(36,'2021-12-11 08:33:06','2021-12-11 08:33:06',1,399000,149,209,39900),(37,'2021-12-11 08:33:06','2021-12-11 08:33:06',1,350000,149,248,0),(38,'2021-12-11 08:33:06','2021-12-11 08:33:06',1,299000,149,253,59800),(39,'2021-12-13 17:39:32','2021-12-13 17:39:32',1,350000,150,249,0),(43,'2021-12-13 17:42:48','2021-12-13 17:42:48',1,350000,153,248,0),(45,'2021-12-14 08:37:24','2021-12-14 08:37:24',1,299000,155,253,59800),(46,'2021-12-15 09:02:08','2021-12-15 09:02:08',1,350000,156,249,0),(47,'2021-12-15 09:02:08','2021-12-15 09:02:08',2,299000,156,253,119600),(48,'2021-12-15 09:03:33','2021-12-15 09:03:33',1,350000,157,249,0),(49,'2021-12-15 09:03:33','2021-12-15 09:03:33',1,350000,157,248,0),(50,'2021-12-15 09:04:12','2021-12-15 09:04:12',1,350000,158,249,0);
/*!40000 ALTER TABLE `order_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  `total_price` decimal(10,0) DEFAULT NULL,
  `total_quantity` int DEFAULT NULL,
  `customer_id` bigint NOT NULL,
  `money` decimal(10,0) DEFAULT NULL,
  `note` text COLLATE utf8_unicode_ci,
  `account_id` bigint NOT NULL,
  `code` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `discount` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_customer_TO_orders` (`customer_id`),
  CONSTRAINT `FK_customer_TO_orders` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=159 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (131,'2021-12-01 16:21:56','2021-12-01 16:21:56',1,1597000,3,38,1212300,'khai trương cửa hàng',3,'ORD00000',200000),(132,'2021-12-02 21:32:17','2021-12-02 21:32:17',1,1199000,3,39,944300,'',3,'ORD00001',0),(133,'2021-12-03 21:36:26','2021-12-03 21:36:26',1,1398000,3,40,1138500,'',3,'ORD00002',0),(134,'2021-12-01 21:36:42','2021-12-01 21:36:42',1,350000,1,41,350000,'',3,'ORD00003',0),(135,'2021-12-01 21:36:52','2021-12-01 21:36:52',1,699000,1,42,559200,'',3,'ORD00004',0),(136,'2021-12-04 08:14:45','2021-12-04 08:14:45',1,798000,2,42,718200,'',3,'ORD00005',0),(137,'2021-12-05 08:17:41','2021-12-10 08:17:41',1,399000,1,42,359100,'',3,'ORD00006',0),(138,'2021-12-06 08:19:59','2021-12-10 08:19:59',1,350000,1,40,350000,'',3,'ORD00007',0),(139,'2021-12-06 08:36:10','2021-12-10 08:36:10',1,399000,1,38,359100,'',3,'ORD00008',0),(140,'2021-12-05 08:44:35','2021-12-10 08:44:35',1,700000,2,38,700000,'',3,'ORD00009',0),(141,'2021-12-05 09:09:55','2021-12-10 09:09:55',1,1050000,3,39,735000,'',3,'ORD00010',0),(142,'2021-12-05 15:13:07','2021-12-10 15:13:07',1,350000,1,41,350000,'',3,'ORD00011',0),(143,'2021-12-07 16:08:53','2021-12-13 13:43:32',1,700000,2,39,560000,'Khách vip giảm 20%',3,'ORD00012',140000),(144,'2021-12-08 08:25:10','2021-12-11 08:25:10',1,2098000,4,43,1408400,'',8,'ORD00013',200000),(145,'2021-12-09 08:27:10','2021-12-11 08:27:10',1,700000,2,44,490000,'',8,'ORD00014',0),(146,'2021-12-10 08:27:13','2021-12-11 08:27:13',1,700000,2,44,490000,'',8,'ORD00015',0),(147,'2021-12-11 08:28:29','2021-12-11 08:28:29',1,649000,2,45,554200,'',8,'ORD00016',0),(148,'2021-12-11 08:30:00','2021-12-11 08:30:00',1,1245000,5,38,996000,'',8,'ORD00017',249000),(149,'2021-12-11 08:33:06','2021-12-11 08:33:06',1,1846000,5,46,1333200,'Khách vip',8,'ORD00018',333300),(153,'2021-12-13 17:42:48','2021-12-13 17:42:48',1,350000,1,38,350000,'',3,'ORD00022',0),(155,'2021-12-14 08:37:24','2021-12-14 08:37:24',1,299000,1,38,239200,'',3,'ORD00024',0),(156,'2021-12-15 09:02:08','2021-12-15 09:02:08',1,948000,3,47,828400,'',3,'ORD00021',0),(157,'2021-12-15 09:03:33','2021-12-15 09:03:33',1,700000,2,38,700000,'',3,'ORD00022',0),(158,'2021-12-15 09:04:12','2021-12-15 09:04:12',1,350000,1,44,350000,'',3,'ORD00023',0);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8_unicode_ci,
  `image` text COLLATE utf8_unicode_ci,
  `quantity` int DEFAULT NULL,
  `quantity_sell` int DEFAULT NULL,
  `category_id` bigint NOT NULL,
  `status` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (3,'2021-12-09 11:31:23','2021-12-09 16:08:37','ÁO SƠ MI BIRD','',' https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20112447.jpg?alt=media&token=79893411-c0a5-4160-a9c6-361c3d15c747 https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20112544.jpg?alt=media&token=6e3f79fd-fbe6-4ae5-aec1-0567165a2619 https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20112613.jpg?alt=media&token=af364468-1312-4764-a51e-ffe47cd0d3f3',NULL,NULL,3,1),(4,'2021-12-09 14:56:38','2021-12-09 16:08:24','ÁO SƠ MI LUX','',' https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20145330.jpg?alt=media&token=b56a56e5-e6e0-413b-8789-1ab897b3eef7 https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20145315.jpg?alt=media&token=d6dee054-929b-4c09-851a-1d2046202955',NULL,NULL,3,1),(5,'2021-12-09 15:02:24','2021-12-15 10:06:15','ÁO SƠ MI NOBLE','Áo mới',' https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20145100.jpg?alt=media&token=a231b93e-ee5c-43ec-8d8a-2996ad190bec https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20145139.jpg?alt=media&token=68b173bd-f546-47e2-8bc4-ec9a74b20d00 https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20145207.jpg?alt=media&token=58ae1161-37d3-44bd-b134-f17091c7b2ef https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20145241.jpg?alt=media&token=eeeb514d-eae9-488b-8625-6b3b5776b983 https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20145232.jpg?alt=media&token=868a3bf6-9456-4b7f-a6c4-fbb18fee5f84',NULL,NULL,3,1),(6,'2021-12-09 15:15:39','2021-12-09 16:07:42','QUẦN BÒ FLARED ','',' https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20150742.jpg?alt=media&token=9de0aafb-d4ee-45de-8650-e787bc7939c1 https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20150653.jpg?alt=media&token=ee89be6e-0e9f-464b-8d94-904d70115ed0',NULL,NULL,4,1),(7,'2021-12-09 15:18:44','2021-12-09 16:07:16','QUẦN JEANS ỐNG XUÔNG','',' https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20151712.jpg?alt=media&token=04d7f0bb-029e-4aff-a5bc-9ef54fb69239 https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20151648.jpg?alt=media&token=d89f2399-ee32-4cf9-8d0b-f9f634cc1300',NULL,NULL,4,1),(8,'2021-12-09 15:22:51','2021-12-09 16:06:45','QUẦN TÚI CARGO/ HER','',' https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20151956.jpg?alt=media&token=8d73c9e5-82ab-4554-8fac-2265b548325b https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20152015.jpg?alt=media&token=574cd8da-f256-479c-ac5c-30c462758018 https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20152031.jpg?alt=media&token=6feb1c4e-9d3e-42ea-96db-58ed4e22dccd',NULL,NULL,4,1),(9,'2021-12-09 15:26:26','2021-12-09 16:05:51','QUẦN BÒ BOOT CUT ','',' https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20152456.jpg?alt=media&token=8f514dc6-1ef1-4f91-bfc9-d832a18336a1 https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20152412.jpg?alt=media&token=b9a301f8-7880-431f-8014-66a0ee8df3fc https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20152425.jpg?alt=media&token=7abef353-ca52-4a28-acb8-3d3e8ce55f25',NULL,NULL,4,1),(10,'2021-12-09 15:28:38','2021-12-09 15:28:38','POCKET JEANS','',' https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20152701.jpg?alt=media&token=74de9e1e-d12b-42ab-bdd1-6de55ed6403d https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20152718.jpg?alt=media&token=082899b9-85e9-474d-9f27-b59160ef66a5',NULL,NULL,4,2),(11,'2021-12-09 15:31:11','2021-12-09 15:31:11','POCKET JEANS','',' https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20152701.jpg?alt=media&token=54f3ab81-9610-4e77-bf5f-738135e0f41c https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20152718.jpg?alt=media&token=320f5803-2949-478f-abe0-7a8027b5f3a2',NULL,NULL,4,2),(12,'2021-12-09 15:39:30','2021-12-09 16:05:31','QUẦN VÁY ODALIS','',' https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20153208.jpg?alt=media&token=71985b52-93ee-4328-99f8-676143589688 https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20153258.jpg?alt=media&token=19834e1a-b357-4cb1-a01d-c7b40cb350c1 https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20153240.jpg?alt=media&token=0f5f3699-4947-480b-90fd-8cb8696dc071',NULL,NULL,5,1),(13,'2021-12-09 15:44:28','2021-12-15 09:01:32','QUẦN VÁY NỮ A-LINE NẮP TÚI','',' https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20154206.jpg?alt=media&token=4aed2fac-f74c-4ce9-87d8-e07eb1259009 https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20154229.jpg?alt=media&token=72e1d7e1-6b49-416d-872d-67a31fc3c837',NULL,NULL,5,1),(14,'2021-12-09 15:48:20','2021-12-09 15:48:20','QUẦN JOGGER NỮ JOGGER DENIM','',' https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20154554.jpg?alt=media&token=6a7d5db4-eb65-4cec-a95a-ca8708b3b5f5 https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20154621.jpg?alt=media&token=0ba0f7cd-dcdc-4aa6-9462-db77b7bd1bd3',NULL,NULL,6,1),(15,'2021-12-09 15:55:47','2021-12-13 13:44:29','QUẦN SHORTS GIÓ REGULAR UN MARVEL ','',' https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20155349.jpg?alt=media&token=3cb274be-662a-4a2b-b76a-25fcfc47de55 https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20155408.jpg?alt=media&token=13208beb-c4f6-44ab-a3d2-e0e568e59e21',NULL,NULL,7,1),(16,'2021-12-09 16:00:17','2021-12-09 16:00:17','QUẦN DÀI NỮ BAGGY KẺ XẾP LY','',' https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20155739.jpg?alt=media&token=5624b871-24ff-477b-abcc-3b4189d52d2b https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20155803.jpg?alt=media&token=4ab13ca7-e41e-4b0b-bd8c-fffb566bf18a',NULL,NULL,6,1),(17,'2021-12-09 16:34:00','2021-12-09 16:34:00','QUẦN JEANS NỮ SLOUCHY THÊU LỬA','',' https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20160338.jpg?alt=media&token=7ef555fe-eccd-4cab-a05e-ab33ede5a00f https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20160305.jpg?alt=media&token=de59ecdb-f4b6-45c0-9d84-f06b82111abe',NULL,NULL,4,1),(18,'2021-12-09 16:56:55','2021-12-09 16:56:55','ÁO NỮ CROP-TOP MARVEL','','https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20165107.jpg?alt=media&token=c8323768-fd0a-4179-9601-f68c5d9749f5 https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20165509.jpg?alt=media&token=31995762-6bfe-48d6-aa1b-4f2627882f16',NULL,NULL,8,1),(19,'2021-12-09 17:04:42','2021-12-13 17:24:38','ÁO PHÔNG O MANDALORIAN','',' https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20165844.jpg?alt=media&token=d8165b3b-e399-4929-bb27-47ba2f4e9e3f https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20165947.jpg?alt=media&token=e9389260-9e60-47d3-af53-6cb86f5e2525 https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20165923.jpg?alt=media&token=c33c88e3-3147-449c-9bd0-bf0e17abe7f8',NULL,NULL,8,2),(20,'2021-12-09 17:07:42','2021-12-09 17:07:42','ÁO PHÔNG FE BSC Oversized Tay Lửng','',' https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20170600.jpg?alt=media&token=ff5ff23f-5063-4b97-91c7-d36363126cc1 https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20170536.jpg?alt=media&token=fc46b967-d8f4-44bf-8961-b9e2bbbb1f4d https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20170545.jpg?alt=media&token=a3a29a31-b765-458c-944f-0dee2d0dde16',NULL,NULL,8,1),(21,'2021-12-09 17:12:27','2021-12-09 17:12:27','ÁO PHÔNG FE BSC Crop Fit Trễ Vai','',' https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20170910.jpg?alt=media&token=2a0f74e2-2372-4507-9b98-72c7f1027697 https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20170918.jpg?alt=media&token=ff40e8c6-0293-4501-be1f-c6341ef5cf96 https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20170928.jpg?alt=media&token=13be56aa-d241-4add-8564-d6f0c07b3ddb https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20170939.jpg?alt=media&token=a141beb3-7928-4dba-99dc-3fa14bcc30a1 https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20170956.jpg?alt=media&token=b449028f-02e7-431b-b813-6ae4554e6f91 https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20171005.jpg?alt=media&token=f1ff197c-880b-407c-8a62-2e432257b1ab',NULL,NULL,8,1),(22,'2021-12-09 17:15:50','2021-12-09 17:15:50','ÁO PHÔNG NỮ FITTED ĐÍNH PATCH','',' https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20171307.jpg?alt=media&token=1a7c5b21-5be8-445e-8fee-463ce97a9327 https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20171336.jpg?alt=media&token=d2ae14d3-d776-4b45-af1a-97189d7db4fb https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20171315.jpg?alt=media&token=70253ace-2b58-47c7-9ca0-dd879a8a8453',NULL,NULL,8,1),(23,'2021-12-09 17:18:24','2021-12-14 14:09:27','ÁO PHÔNG NỮ CROP FIT CUỐN BÈO','Áo có nhiều phiên bản\n','https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20171645.jpg?alt=media&token=62ff0e5f-49d3-4eb3-92ef-74e769e2505a https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20171634.jpg?alt=media&token=be481d9c-ccfb-4b33-ac61-2eaa2ebb50c4 https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20171620.jpg?alt=media&token=cb4d0ec6-631d-4226-9829-17076cc72fd5',NULL,NULL,8,1),(29,'2021-12-14 15:40:52','2021-12-14 15:58:00','chân váy Noble ','','',NULL,NULL,3,3),(36,'2021-12-14 15:51:23','2021-12-14 15:58:00','chân váy Noble ','','',NULL,NULL,3,3),(37,'2021-12-14 15:52:47','2021-12-14 15:58:00','chân váy Noble ','','',NULL,NULL,4,3),(38,'2021-12-14 15:53:22','2021-12-14 15:58:00','aaa','','',NULL,NULL,5,3),(40,'2021-12-14 15:56:32','2021-12-14 15:58:00','jfthg','','',NULL,NULL,6,3),(41,'2021-12-15 08:47:42','2021-12-15 08:56:17','QUẦN JOGGER NỈ NỮ MICKEY GO','',' https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-15%20084025.jpg?alt=media&token=7148816c-9a19-4137-84e6-8259b091a9bd https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-15%20084047.jpg?alt=media&token=571f9f9f-34d6-403b-9dd2-8498a3fb8644',NULL,NULL,4,1),(42,'2021-12-15 09:41:45','2021-12-15 09:41:57','chân váy Noble ','',' https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20153258.jpg?alt=media&token=961f0ee1-c98a-41b2-acb0-a90c75acd8fa',NULL,NULL,5,2);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_detail`
--

DROP TABLE IF EXISTS `product_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_detail` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `product_id` bigint NOT NULL,
  `image` text COLLATE utf8_unicode_ci,
  `price` decimal(10,0) DEFAULT NULL,
  `quantity_sell` int DEFAULT '0',
  `quantity` int DEFAULT NULL,
  `code` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `barcode` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `color` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `size` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` int DEFAULT NULL,
  `price_sell` decimal(10,0) DEFAULT NULL,
  `discount` float DEFAULT NULL,
  `discount_sell` float DEFAULT NULL,
  `description` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_product_TO_product_detail` (`product_id`),
  CONSTRAINT `FK_product_TO_product_detail` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=294 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_detail`
--

LOCK TABLES `product_detail` WRITE;
/*!40000 ALTER TABLE `product_detail` DISABLE KEYS */;
INSERT INTO `product_detail` VALUES (203,'2021-12-09 11:31:23','2021-12-09 15:05:58',3,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20112544.jpg?alt=media&token=6e3f79fd-fbe6-4ae5-aec1-0567165a2619',250000,0,40,'P0000','0P0000DGH12','Trắng','M',1,499000,0,0,''),(204,'2021-12-09 11:31:23','2021-12-09 15:05:53',3,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20112613.jpg?alt=media&token=6f916933-39fb-49bd-a0b8-a6dd44c02783,https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20112544.jpg?alt=media&token=11bd5ec2-9778-441f-8a89-6901dcec17f0,https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20112447.jpg?alt=media&token=b7e4e967-0b0b-4384-acf6-52e9ca41663e',250000,0,40,'P0001','0P0001DGH12','Trắng','L',1,499000,0,0,''),(205,'2021-12-09 11:31:23','2021-12-09 15:05:45',3,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20112544.jpg?alt=media&token=6e3f79fd-fbe6-4ae5-aec1-0567165a2619',250000,0,30,'P0002','0P0002DGH12','Trắng','XL',1,499000,0,0,''),(206,'2021-12-09 14:56:38','2021-12-09 15:05:38',4,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20145330.jpg?alt=media&token=8db81db4-3a63-4c9f-97c7-6b2bd78f8f3e',200000,0,40,'P0003','0P0003DGH12','Trắng','M',1,399000,0,0,''),(207,'2021-12-09 14:56:38','2021-12-09 15:04:54',4,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20145330.jpg?alt=media&token=daf4673a-4cae-48df-8fef-8af6d3badb0d',2000000,0,40,'P0004','0P0004DGH12','Trắng','L',1,399000,0,0,''),(208,'2021-12-09 15:02:24','2021-12-15 10:06:10',5,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20145100.jpg?alt=media&token=a231b93e-ee5c-43ec-8d8a-2996ad190bec',200000,0,30,'P0005','0P0005DGH12','Trắng','M',1,399000,0,10,''),(209,'2021-12-09 15:02:24','2021-12-15 10:06:10',5,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20145241.jpg?alt=media&token=eeeb514d-eae9-488b-8625-6b3b5776b983',200000,1,29,'P0006','0P0006DGH12','Đen','M',1,399000,0,10,''),(210,'2021-12-09 15:02:24','2021-12-15 10:06:10',5,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20145241.jpg?alt=media&token=eeeb514d-eae9-488b-8625-6b3b5776b983',200000,0,30,'P0007','0P0007DGH12','Đen','XL',1,399000,0,10,''),(211,'2021-12-09 15:02:24','2021-12-15 10:06:10',5,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20145232.jpg?alt=media&token=868a3bf6-9456-4b7f-a6c4-fbb18fee5f84',200000,1,29,'P0008','0P0008DGH12','Đen','L',1,399000,0,10,''),(212,'2021-12-09 15:02:24','2021-12-15 10:06:10',5,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20145207.jpg?alt=media&token=58ae1161-37d3-44bd-b134-f17091c7b2ef',200000,0,30,'P0009','0P0009DGH12','Trắng','XL',1,399000,0,10,''),(213,'2021-12-09 15:02:24','2021-12-15 10:06:10',5,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20145139.jpg?alt=media&token=68b173bd-f546-47e2-8bc4-ec9a74b20d00',200000,1,29,'P0010','0P0010DGH12','Trắng','L',1,399000,0,10,''),(214,'2021-12-09 15:15:39','2021-12-09 15:15:39',6,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20150742.jpg?alt=media&token=9de0aafb-d4ee-45de-8650-e787bc7939c1',200000,0,20,'P0011','0P0011DGH12','Đen','L',1,419000,0,5,''),(215,'2021-12-09 15:15:39','2021-12-09 15:15:39',6,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20150653.jpg?alt=media&token=ee89be6e-0e9f-464b-8d94-904d70115ed0',200000,0,20,'P0012','0P0012DGH12','Đen','M',1,419000,0,5,''),(216,'2021-12-09 15:15:40','2021-12-09 15:15:40',6,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20150653.jpg?alt=media&token=ee89be6e-0e9f-464b-8d94-904d70115ed0',200000,0,20,'P0013','0P0013DGH12','Đen','XL',1,419000,0,5,''),(217,'2021-12-09 15:18:44','2021-12-09 15:18:44',7,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20151648.jpg?alt=media&token=d89f2399-ee32-4cf9-8d0b-f9f634cc1300',200000,0,20,'P0014','0P0014DGH12','Xanh','M',1,449000,0,5,''),(218,'2021-12-09 15:18:44','2021-12-09 15:18:44',7,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20151648.jpg?alt=media&token=d89f2399-ee32-4cf9-8d0b-f9f634cc1300',200000,0,20,'P0015','0P0015DGH12','Xanh','XL',1,449000,0,5,''),(219,'2021-12-09 15:18:44','2021-12-09 15:18:44',7,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20151712.jpg?alt=media&token=04d7f0bb-029e-4aff-a5bc-9ef54fb69239',200000,0,20,'P0016','0P0016DGH12','Xanh','L',1,449000,0,5,''),(220,'2021-12-09 15:22:51','2021-12-09 15:39:59',8,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20152015.jpg?alt=media&token=8263e3cc-e981-412f-9989-d820853f0a58',180000,0,30,'P0017','0P0017DGH12','Nâu','M',1,399000,0,10,''),(221,'2021-12-09 15:22:51','2021-12-09 15:39:59',8,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20152031.jpg?alt=media&token=fec6dfb6-236e-4773-81e1-1a34690ae3a7',180000,0,30,'P0018','0P0018DGH12','Nâu','L',1,399000,0,10,''),(222,'2021-12-09 15:26:26','2021-12-09 15:29:45',9,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20152412.jpg?alt=media&token=ffeba2a5-8792-47eb-87a6-2e2fee01af2a',180000,0,20,'P0019','0P0019DGH12','Xanh đậm','M',1,399000,0,5,''),(223,'2021-12-09 15:26:26','2021-12-09 15:29:22',9,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20152425.jpg?alt=media&token=1c21edaa-2602-411b-a3d9-dfd3a91b01a7',180000,0,20,'P0020','0P0020DGH12','Xanh đậm','L',1,399000,0,5,''),(224,'2021-12-09 15:26:26','2021-12-09 15:29:15',9,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20152456.jpg?alt=media&token=1f7db4c4-cbdb-4187-a866-2ea3f20038c4',180000,0,20,'P0021','0P0021DGH12','Xanh đậm','XL',1,399000,0,5,''),(225,'2021-12-09 15:28:38','2021-12-09 16:41:56',10,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20152701.jpg?alt=media&token=74de9e1e-d12b-42ab-bdd1-6de55ed6403d',200000,0,20,'P0022','0P0022DGH12','Xanh nhạt','XL',1,449000,0,5,''),(226,'2021-12-09 15:28:38','2021-12-09 16:41:56',10,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20152701.jpg?alt=media&token=74de9e1e-d12b-42ab-bdd1-6de55ed6403d',200000,0,20,'P0023','0P0023DGH12','Xanh nhạt','M',1,449000,0,5,''),(227,'2021-12-09 15:28:38','2021-12-09 16:41:56',10,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20152701.jpg?alt=media&token=74de9e1e-d12b-42ab-bdd1-6de55ed6403d',200000,0,20,'P0024','0P0024DGH12','Xanh nhạt','L',1,449000,0,5,''),(228,'2021-12-09 15:31:11','2021-12-09 15:31:11',11,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20152701.jpg?alt=media&token=54f3ab81-9610-4e77-bf5f-738135e0f41c',180000,0,20,'P0025','0P0025DGH12','Xanh nhạt','L',1,449000,0,5,''),(229,'2021-12-09 15:31:11','2021-12-09 15:31:11',11,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20152701.jpg?alt=media&token=54f3ab81-9610-4e77-bf5f-738135e0f41c',180000,0,20,'P0026','0P0026DGH12','Xanh nhạt','XL',1,449000,0,5,''),(230,'2021-12-09 15:31:11','2021-12-09 15:31:11',11,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20152718.jpg?alt=media&token=320f5803-2949-478f-abe0-7a8027b5f3a2',180000,0,20,'P0027','0P0027DGH12','Xanh nhạt','M',1,449000,0,5,''),(231,'2021-12-09 15:39:30','2021-12-09 15:52:01',12,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20153208.jpg?alt=media&token=dd92d3bb-af3c-48e4-890d-7d3df124b055',150000,0,10,'P0028','0P0028DGH12','Be','L',1,399000,0,0,''),(232,'2021-12-09 15:39:30','2021-12-09 16:04:46',12,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20153258.jpg?alt=media&token=19834e1a-b357-4cb1-a01d-c7b40cb350c1',150000,0,10,'P0029','0P0029DGH12','Be','XL',1,399000,0,0,''),(233,'2021-12-09 15:39:30','2021-12-09 16:04:46',12,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20153208.jpg?alt=media&token=71985b52-93ee-4328-99f8-676143589688',150000,0,10,'P0030','0P0030DGH12','Be','M',1,399000,0,0,''),(234,'2021-12-09 15:44:28','2021-12-09 15:44:28',13,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20154206.jpg?alt=media&token=4aed2fac-f74c-4ce9-87d8-e07eb1259009',150000,0,10,'P0031','0P0031DGH12','Đen','L',1,399000,0,10,''),(235,'2021-12-09 15:44:28','2021-12-09 15:44:28',13,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20154229.jpg?alt=media&token=72e1d7e1-6b49-416d-872d-67a31fc3c837',150000,0,10,'P0032','0P0032DGH12','Đen','M',1,399000,0,10,''),(236,'2021-12-09 15:48:20','2021-12-11 10:24:10',14,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20154554.jpg?alt=media&token=6a7d5db4-eb65-4cec-a95a-ca8708b3b5f5',200000,0,10,'P0033','0P0033DGH12','Xanh denim','XL',1,549000,0,0,''),(237,'2021-12-09 15:48:20','2021-12-09 15:48:20',14,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20154554.jpg?alt=media&token=6a7d5db4-eb65-4cec-a95a-ca8708b3b5f5',200000,0,20,'P0034','0P0034DGH12','Xanh denim','M',1,549000,0,20,''),(238,'2021-12-09 15:48:20','2021-12-11 10:25:08',14,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20154621.jpg?alt=media&token=0ba0f7cd-dcdc-4aa6-9462-db77b7bd1bd3',200000,0,20,'P0035','0P0035DGH12','Xanh denim','L',1,549000,0,20,''),(239,'2021-12-09 15:55:47','2021-12-13 11:31:21',15,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20155408.jpg?alt=media&token=13208beb-c4f6-44ab-a3d2-e0e568e59e21',200000,0,10,'P0036','0P0036DGH12','Đen','M',1,699000,0,20,''),(240,'2021-12-09 15:55:47','2021-12-13 11:30:56',15,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20155349.jpg?alt=media&token=3cb274be-662a-4a2b-b76a-25fcfc47de55',200000,0,10,'P0037','0P0037DGH12','Đen','XL',2,699000,0,20,''),(241,'2021-12-09 15:55:47','2021-12-13 11:30:28',15,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20155349.jpg?alt=media&token=3cb274be-662a-4a2b-b76a-25fcfc47de55',200000,0,0,'P0038','0P0038DGH12','Đen','L',2,699000,0,20,''),(242,'2021-12-09 16:00:17','2021-12-09 16:00:17',16,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20155739.jpg?alt=media&token=5624b871-24ff-477b-abcc-3b4189d52d2b',150000,0,10,'P0039','0P0039DGH12','Caro nâu','S',1,499000,0,30,''),(243,'2021-12-09 16:00:17','2021-12-09 16:04:16',16,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20155739.jpg?alt=media&token=b72781b8-17fa-424c-8109-baa6c0dcfc45',150000,0,10,'P0040','0P0040DGH12','Caro nâu','M',1,499000,0,30,''),(244,'2021-12-09 16:00:17','2021-12-09 16:00:17',16,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20155739.jpg?alt=media&token=5624b871-24ff-477b-abcc-3b4189d52d2b',150000,0,0,'P0041','0P0041DGH12','Caro nâu','L',1,499000,0,30,''),(245,'2021-12-09 16:34:00','2021-12-09 16:34:00',17,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20160338.jpg?alt=media&token=7ef555fe-eccd-4cab-a05e-ab33ede5a00f',200000,0,10,'P0042','0P0042DGH12','Đen','29',1,699000,0,20,''),(246,'2021-12-09 16:34:00','2021-12-09 16:34:00',17,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20160338.jpg?alt=media&token=7ef555fe-eccd-4cab-a05e-ab33ede5a00f',200000,0,0,'P0043','0P0043DGH12','Đen','30',1,699000,0,20,''),(247,'2021-12-09 16:34:00','2021-12-13 17:39:32',17,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20160338.jpg?alt=media&token=7ef555fe-eccd-4cab-a05e-ab33ede5a00f',200000,4,6,'P0044','0P0044DGH12','Đen','28',1,699000,0,20,''),(248,'2021-12-09 16:56:55','2021-12-15 09:03:33',18,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20165509.jpg?alt=media&token=df626723-e2b4-429b-b6ba-8503e5920c9e',150000,5,15,'P0045','0P0045DGH12','Đen','S',1,350000,0,0,''),(249,'2021-12-09 16:56:55','2021-12-15 09:04:12',18,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20165509.jpg?alt=media&token=31995762-6bfe-48d6-aa1b-4f2627882f16',150000,8,12,'P0046','0P0046DGH12','Đen','M',1,350000,0,0,''),(250,'2021-12-09 17:04:42','2021-12-14 15:08:49',19,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20165844.jpg?alt=media&token=d8165b3b-e399-4929-bb27-47ba2f4e9e3f',170000,4,21,'P0047','0P0047DGH12','Xám','S',1,350000,0,30,''),(251,'2021-12-09 17:04:42','2021-12-11 08:27:13',19,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20165844.jpg?alt=media&token=d8165b3b-e399-4929-bb27-47ba2f4e9e3f',170000,2,23,'P0048','0P0048DGH12','Xám','L',2,350000,0,30,''),(252,'2021-12-09 17:04:42','2021-12-10 09:09:55',19,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20165844.jpg?alt=media&token=d8165b3b-e399-4929-bb27-47ba2f4e9e3f',170000,3,22,'P0049','0P0049DGH12','Xám','M',2,350000,0,30,''),(253,'2021-12-09 17:07:42','2021-12-15 09:02:08',20,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20170600.jpg?alt=media&token=ff5ff23f-5063-4b97-91c7-d36363126cc1',150000,7,13,'P0050','0P0050DGH12','Xanh rêu','M',1,299000,0,20,''),(254,'2021-12-09 17:07:42','2021-12-13 16:47:51',20,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20170600.jpg?alt=media&token=ff5ff23f-5063-4b97-91c7-d36363126cc1',150000,0,20,'P0051','0P0051DGH12','Xanh rêu','S',1,299000,0,20,''),(255,'2021-12-09 17:12:27','2021-12-09 17:12:27',21,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20170910.jpg?alt=media&token=2a0f74e2-2372-4507-9b98-72c7f1027697',100000,0,20,'P0052','0P0052DGH12','Hồng','Freesize',1,299000,0,10,''),(256,'2021-12-09 17:12:27','2021-12-09 17:12:27',21,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20170928.jpg?alt=media&token=13be56aa-d241-4add-8564-d6f0c07b3ddb',100000,0,20,'P0053','0P0053DGH12','Xám','Freesize',1,299000,0,10,''),(257,'2021-12-09 17:12:27','2021-12-09 17:12:27',21,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20170956.jpg?alt=media&token=b449028f-02e7-431b-b813-6ae4554e6f91',100000,0,20,'P0054','0P0054DGH12','Xanh rêu','Freesize',1,299000,0,10,''),(258,'2021-12-09 17:15:50','2021-12-09 17:15:50',22,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20171307.jpg?alt=media&token=1a7c5b21-5be8-445e-8fee-463ce97a9327',90000,0,20,'P0055','0P0055DGH12','Xám','S',1,299000,0,20,''),(259,'2021-12-09 17:15:50','2021-12-09 17:15:50',22,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20171307.jpg?alt=media&token=1a7c5b21-5be8-445e-8fee-463ce97a9327',90000,0,20,'P0056','0P0056DGH12','Xám','XS',1,299000,0,20,''),(260,'2021-12-09 17:15:50','2021-12-09 17:15:50',22,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20171307.jpg?alt=media&token=1a7c5b21-5be8-445e-8fee-463ce97a9327',90000,0,20,'P0057','0P0057DGH12','Xám','M',1,299000,0,20,''),(261,'2021-12-09 17:18:24','2021-12-14 17:10:59',23,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20171634.jpg?alt=media&token=3bef805e-dbd2-4860-9e54-30d4eeb87478',120000,0,25,'P0058','0P0058DGH12','Trắng','S',1,249000,0,20,''),(262,'2021-12-09 17:18:24','2021-12-13 17:31:34',23,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20171634.jpg?alt=media&token=3bef805e-dbd2-4860-9e54-30d4eeb87478',120000,0,20,'P0059','0P0059DGH12','Trắng','XS',2,249000,0,20,''),(263,'2021-12-09 17:18:24','2021-12-14 13:43:22',23,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20171634.jpg?alt=media&token=3bef805e-dbd2-4860-9e54-30d4eeb87478,https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20171620.jpg?alt=media&token=8e9bbca8-8f4b-47a1-8bc7-c8c79baa30ee,https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20171645.jpg?alt=media&token=7714ca7d-b2f1-4f1a-b2a7-cf0d33f1dcd2',120000,0,20,'P0060','0P0060DGH12','Trắng','M',1,249000,0,20,''),(264,'2021-12-10 08:47:56','2021-12-14 16:13:57',23,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20171634.jpg?alt=media&token=3bef805e-dbd2-4860-9e54-30d4eeb87478',120000,0,21,'P0061','0P0061DGH12','Trắng','L',1,249000,0,20,''),(265,'2021-12-10 08:51:42','2021-12-13 17:31:34',23,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20171634.jpg?alt=media&token=3bef805e-dbd2-4860-9e54-30d4eeb87478',120000,0,20,'P0062','0P0062DGH12','Trắng','XL',2,249000,0,20,''),(266,'2021-12-10 08:55:05','2021-12-15 10:10:57',23,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20171634.jpg?alt=media&token=be481d9c-ccfb-4b33-ac61-2eaa2ebb50c4',120000,5,15,'P0063','0P0063DGH12','Trắng','XXL',2,249000,0,0,''),(267,'2021-12-10 08:58:31','2021-12-13 17:49:21',22,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20171336.jpg?alt=media&token=d2ae14d3-d776-4b45-af1a-97189d7db4fb',90000,0,21,'P0064','0P0064DGH12','Xám','XXS',1,299000,0,0,''),(268,'2021-12-10 09:03:02','2021-12-14 16:13:57',21,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20171005.jpg?alt=media&token=f1ff197c-880b-407c-8a62-2e432257b1ab',100000,0,28,'P0065','0P0065DGH12','Xanh Đậm','Freesize',1,299000,0,5,''),(269,'2021-12-10 09:05:21','2021-12-13 17:49:21',18,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-09%20165107.jpg?alt=media&token=c8323768-fd0a-4179-9601-f68c5d9749f5',150000,1,26,'P0066','0P0066DGH12','Đen','L',1,350000,0,10,''),(275,'2021-12-14 15:40:52','2021-12-14 15:40:52',29,'',0,0,0,'P0067','0P0067DGH12','Trắng','SL',2,0,0,0,''),(282,'2021-12-14 15:56:32','2021-12-14 15:56:32',40,'',0,0,0,'P0068','0P0068DGH12','Trắng','SL',2,0,0,0,''),(283,'2021-12-14 15:56:59','2021-12-14 15:56:59',40,'',0,0,0,'P0069','0P0069DGH12','Trắng','S',2,0,0,0,''),(284,'2021-12-14 16:44:18','2021-12-14 17:18:36',23,'',0,0,0,'P0070','0P0070DGH12','Trắng','SL',3,0,0,0,''),(285,'2021-12-14 17:03:15','2021-12-14 17:18:18',23,'',0,0,0,'P0071','0P0071DGH12','Trắng','u',3,0,0,0,''),(286,'2021-12-14 17:22:37','2021-12-14 17:22:42',23,'',0,0,0,'P0072','0P0072DGH12','Trắng','g',3,0,0,0,''),(287,'2021-12-14 17:24:01','2021-12-14 17:31:23',23,'',0,0,0,'P0073','0P0073DGH12','Trắng','y',3,0,0,0,''),(288,'2021-12-14 17:31:15','2021-12-14 17:31:23',23,'',0,0,0,'P0074','0P0074DGH12','Trắng','h',3,0,0,0,''),(289,'2021-12-15 08:47:42','2021-12-15 08:48:21',41,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-15%20084047.jpg?alt=media&token=571f9f9f-34d6-403b-9dd2-8498a3fb8644',150000,0,20,'P0075','0P0075DGH12','Đen','XL',1,350000,0,10,''),(290,'2021-12-15 08:47:42','2021-12-15 09:38:11',41,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-15%20084025.jpg?alt=media&token=7148816c-9a19-4137-84e6-8259b091a9bd',150000,0,20,'P0076','0P0076DGH12','Đen','S',1,350000,0,10,''),(291,'2021-12-15 08:47:42','2021-12-15 08:47:42',41,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-15%20084025.jpg?alt=media&token=7148816c-9a19-4137-84e6-8259b091a9bd',150000,0,20,'P0077','0P0077DGH12','Đen','L',1,350000,0,10,''),(292,'2021-12-15 08:55:34','2021-12-15 09:40:42',41,'https://firebasestorage.googleapis.com/v0/b/upload-file-sapo.appspot.com/o/files%2FScreenshot%202021-12-15%20084047.jpg?alt=media&token=2463b9d5-91a6-4da7-b32f-61ec73ffda87',150000,0,20,'P0078','0P0078DGH12','Đen','XS',1,350000,0,10,''),(293,'2021-12-15 09:41:45','2021-12-15 09:42:21',42,'',0,0,0,'P0079','0P0079DGH12','Đen','XS',2,0,0,0,'');
/*!40000 ALTER TABLE `product_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_order`
--

DROP TABLE IF EXISTS `purchase_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_order` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `account_id` int NOT NULL,
  `total_price` decimal(10,0) DEFAULT NULL,
  `total_quantity` int DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  `code` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` tinytext COLLATE utf8_unicode_ci,
  `discount` decimal(10,0) DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `supplier_id` bigint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_order`
--

LOCK TABLES `purchase_order` WRITE;
/*!40000 ALTER TABLE `purchase_order` DISABLE KEYS */;
INSERT INTO `purchase_order` VALUES (8,'2021-12-10 14:30:00','2021-12-10 15:37:06',3,1500000,12,1,'CLA00000','',0,1500000,2),(9,'2021-12-10 14:34:27','2021-12-10 16:55:34',3,450000,5,1,'CLA00001',NULL,0,450000,2),(10,'2021-12-10 16:51:44','2021-12-11 09:26:42',3,600000,5,1,'CLA00002','Ghi chú đơn hàng',0,600000,2),(11,'2021-12-11 10:23:37','2021-12-11 10:24:10',3,2000000,10,1,'CLA00003',NULL,0,2000000,1),(12,'2021-12-13 10:33:09','2021-12-13 17:49:21',3,340000,3,1,'CLA00004',NULL,0,340000,1),(13,'2021-12-13 17:49:50','2021-12-13 17:49:50',3,250000,2,0,'CLA00005',NULL,10,225000,3),(14,'2021-12-14 16:13:45','2021-12-14 16:13:57',3,186000,2,1,'CLA00006',NULL,18600,167400,1);
/*!40000 ALTER TABLE `purchase_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_order_detail`
--

DROP TABLE IF EXISTS `purchase_order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_order_detail` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `import_goods_id` bigint NOT NULL,
  `product_detail_id` bigint NOT NULL,
  `quantity` int DEFAULT NULL,
  `total_price` decimal(10,0) DEFAULT NULL,
  `discount` decimal(10,0) DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_import_goods_TO_import_goods_detail` (`import_goods_id`),
  KEY `FK_product_TO_import_goods_detail` (`product_detail_id`),
  CONSTRAINT `FK_import_goods_TO_import_goods_detail` FOREIGN KEY (`import_goods_id`) REFERENCES `purchase_order` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_order_detail`
--

LOCK TABLES `purchase_order_detail` WRITE;
/*!40000 ALTER TABLE `purchase_order_detail` DISABLE KEYS */;
INSERT INTO `purchase_order_detail` VALUES (5,'2021-12-10 15:37:06','2021-12-10 15:37:06',8,269,6,900000,0,150000),(6,'2021-12-10 15:37:06','2021-12-10 15:37:06',8,268,6,400000,0,100000),(9,'2021-12-10 16:55:34','2021-12-10 16:55:34',9,268,5,450000,10,100000),(10,'2021-12-11 09:26:42','2021-12-11 09:26:42',10,261,5,NULL,0,120000),(13,'2021-12-11 10:24:10','2021-12-11 10:24:10',11,236,10,200000,0,200000),(17,'2021-12-13 17:49:21','2021-12-13 17:49:21',12,268,1,NULL,0,100000),(18,'2021-12-13 17:49:21','2021-12-13 17:49:21',12,269,1,NULL,0,150000),(19,'2021-12-13 17:49:21','2021-12-13 17:49:21',12,267,1,NULL,0,90000),(20,'2021-12-13 17:49:50','2021-12-13 17:49:50',13,268,1,NULL,0,100000),(21,'2021-12-13 17:49:50','2021-12-13 17:49:50',13,269,1,NULL,0,150000),(24,'2021-12-14 16:13:57','2021-12-14 16:13:57',14,264,1,96000,24000,120000),(25,'2021-12-14 16:13:57','2021-12-14 16:13:57',14,268,1,90000,10000,100000);
/*!40000 ALTER TABLE `purchase_order_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,NULL,NULL,'ROLE_ADMIN'),(2,NULL,NULL,'ROLE_STAFFSALE'),(3,NULL,NULL,'ROLE_STAFFINVENTORY'),(4,NULL,NULL,'ROLE_STAFFCARE');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplier` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(11) COLLATE utf8_unicode_ci DEFAULT NULL,
  `address` tinytext COLLATE utf8_unicode_ci,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `debt` decimal(10,0) DEFAULT NULL,
  `tax_code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bank_account` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bank_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `person_in_charge` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `person_in_charge_phone` varchar(11) COLLATE utf8_unicode_ci DEFAULT NULL,
  `person_in_charge_email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8_unicode_ci,
  `address_detail` tinytext COLLATE utf8_unicode_ci,
  `status` tinyint DEFAULT NULL,
  `website` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier`
--

LOCK TABLES `supplier` WRITE;
/*!40000 ALTER TABLE `supplier` DISABLE KEYS */;
INSERT INTO `supplier` VALUES (1,'2021-12-10 09:19:40','2021-12-15 08:39:31','SUP00001','Xưởng may Sapo','0810310286','{\"province\":{\"value\":1,\"label\":\"Thành phố Hà Nội\"},\"district\":{\"value\":1,\"label\":\"Quận Ba Đình\"},\"ward\":{\"value\":22,\"label\":\"Phường Đội Cấn\"}}',NULL,NULL,NULL,NULL,NULL,'Anh Tuân','0810310286','',NULL,'266 Đội Cấn, Ba Đình, Hà Nội',1,NULL),(2,'2021-12-10 09:20:12','2021-12-15 08:38:56','SUP00002','Xưởng may Minh Anh','0810312386','{\"province\":{\"value\":1,\"label\":\"Thành phố Hà Nội\"},\"district\":{\"value\":7,\"label\":\"Quận Hai Bà Trưng\"},\"ward\":{\"value\":241,\"label\":\"Phường Nguyễn Du\"}}',NULL,NULL,NULL,NULL,NULL,'Chị Minh Anh','0810312386',NULL,NULL,'Số 1 Trần Quốc Toản',0,NULL),(3,'2021-12-13 09:44:24','2021-12-15 08:37:38','SUP00003','Nhà may Trọng Hưng','0981310177','{\"province\":{\"value\":1,\"label\":\"Thành phố Hà Nội\"},\"district\":{\"value\":1,\"label\":\"Quận Ba Đình\"},\"ward\":{\"value\":16,\"label\":\"Phường Ngọc Hà\"}}',NULL,NULL,NULL,NULL,NULL,'Anh Hưng','0981310177',NULL,NULL,'Số 10 Hoàng Hoa Thám',1,NULL);
/*!40000 ALTER TABLE `supplier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'mock_project'
--

--
-- Dumping routines for database 'mock_project'
--
/*!50003 DROP PROCEDURE IF EXISTS `CountAllAccounts` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `CountAllAccounts`(status tinyint , roleId bigint , search varchar(255),fromDate timestamp,
                                toDate timestamp)
BEGIN
	SELECT distinct count(a.id) FROM mock_project.account a join account_role ac on ac.account_id=a.id
where ( a.status =status or  status=2) 
and (ac.role_id=roleId or roleId=0)
and (date_format(a.created_at,'%Y-%m-%d') >= fromDate or fromDate ="2000-01-01")
and (date_format(a.created_at,'%Y-%m-%d') <= toDate or toDate ="2000-01-01")
and (a.code like CONCAT('%', search , '%') or a.fullname like CONCAT('%', search , '%') or a.phone like CONCAT('%', search , '%') or a.address like CONCAT('%', search , '%') or a.username like CONCAT('%', search , '%'));
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CountAllOrders` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `CountAllOrders`(status tinyint , accountId bigint,customerId bigint , search varchar(255),
                                fromDate timestamp,
                                toDate timestamp )
BEGIN
	SELECT count(o.id) FROM mock_project.orders o join account a on o.account_id=a.id join customer c on o.customer_id=c.id
where ( o.status =status or  status=2) and 
(a.id=accountId or accountId=0)
and 
(c.id=customerId or customerId=0)
and (o.code like CONCAT('%', search , '%') or a.fullname like CONCAT('%', search , '%') or a.phone like CONCAT('%', search , '%') or c.phone like CONCAT('%', search , '%') or c.name like CONCAT('%', search , '%'))
and (date_format(o.created_at,'%Y-%m-%d') >= fromDate or fromDate ="2000-01-01")
and (date_format(o.created_at,'%Y-%m-%d') <= toDate or toDate ="2000-01-01");
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CountProductDetails` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `CountProductDetails`(search varchar(100) ,
								categoryId  bigint(20) ,
                                pdStatus tinyint(4),
                                fromDate timestamp,
                                toDate timestamp
                                )
begin
	select count(product_detail.id) from product_detail
    inner join product on product_detail.product_id = product.id
    where (product.name like CONCAT('%', search, '%') 
			or barcode  like CONCAT('%', search, '%')
			or code like CONCAT('%', search, '%')
            or color like CONCAT('%', search, '%')
            or size like CONCAT('%', search, '%'))
		and (product.category_id = categoryId or categoryId = 0 )
		and (product_detail.status = pdStatus or pdStatus = 0)
		and (product_detail.created_at >= fromDate or fromDate = '2000-01-01')
		and (product_detail.created_at <= toDate or toDate = '2000-01-01');
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CountProducts` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `CountProducts`(productName varchar(100) ,
								categoryId  bigint(20) ,
                                productStatus tinyint(4),
                                fromDate timestamp,
                                toDate timestamp
                               )
BEGIN
	select count(p.id) from product p
    where (p.name like concat('%', productName, '%') or productName = '')
    and (p.category_id = categoryId or categoryId = 0 )
    and (p.status = productStatus or productStatus = 0)
   and (p.created_at >= fromDate or fromDate = "2000-01-01")
    and (p.created_at <= toDate or toDate = "2000-01-01")
    
    ;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetAllAccounts` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `GetAllAccounts`(status tinyint , roleId bigint , search varchar(255),pageNumber int,size int,fromDate timestamp,
                                toDate timestamp)
BEGIN
	SELECT distinct a.* FROM mock_project.account a join account_role ac on ac.account_id=a.id
where ( a.status =status or  status=2) 
and (ac.role_id=roleId or roleId=0)
and (date_format(a.created_at,'%Y-%m-%d') >= fromDate or fromDate ="2000-01-01")
and (date_format(a.created_at,'%Y-%m-%d') <= toDate or toDate ="2000-01-01")
and (a.code like CONCAT('%', search , '%') or a.fullname like CONCAT('%', search , '%') or a.phone like CONCAT('%', search , '%') or a.address like CONCAT('%', search , '%') or a.username like CONCAT('%', search , '%'))
order by id desc
limit pageNumber, size;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetAllOrders` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `GetAllOrders`(status tinyint , accountId bigint,customerId bigint , search varchar(255), pageNumber int,
                                size int,
                                fromDate timestamp,
                                toDate timestamp )
BEGIN
	SELECT o.* FROM mock_project.orders o join account a on o.account_id=a.id join customer c on o.customer_id=c.id
where ( o.status =status or  status=2) and 
(a.id=accountId or accountId=0)
and 
(c.id=customerId or customerId=0)
and (o.code like CONCAT('%', search , '%') or a.fullname like CONCAT('%', search , '%') or a.phone like CONCAT('%', search , '%') or c.phone like CONCAT('%', search , '%') or c.name like CONCAT('%', search , '%'))
and (date_format(o.created_at,'%Y-%m-%d') >= fromDate or fromDate ="2000-01-01")
and (date_format(o.created_at,'%Y-%m-%d') <= toDate or toDate ="2000-01-01")
order by id desc
limit pageNumber, size;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetAllProducts` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `GetAllProducts`(productName varchar(100) ,
								categoryId  bigint(20) ,
                                productStatus tinyint(4),
                                pageNumber int,
                                size int,
                                fromDate timestamp,
                                toDate timestamp,
                                sort varchar(20),
                                orderProduct  varchar(20)
                               )
BEGIN
	select * from product p
    where (p.name like concat('%', productName, '%') or productName = '')
    and (p.category_id = categoryId or categoryId = 0 )
    and (p.status = productStatus or productStatus = 0)
    and (p.created_at >= fromDate or fromDate = '2000-01-01')
    and (p.created_at <= toDate or toDate = '2000-01-01')
    order by 
		case when orderProduct = 'asc' then
			case sort when 'name' then p.name
						when 'createdAt' then p.created_at
			end
		end asc,
        case when orderProduct = 'desc' then
			case sort when 'name' then p.name
						when 'createdAt' then p.created_at
			end
		end desc
    limit pageNumber, size

    ;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetProductDetails` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `GetProductDetails`(search varchar(100) ,
								categoryId  bigint(20) ,
                                pdStatus tinyint(4),
                                pageNumber int,
                                size int,
                                fromDate timestamp,
                                toDate timestamp,
                                orderProductDetail  varchar(20)
                                )
begin
	select product_detail.* from product_detail
    inner join product on product_detail.product_id = product.id
    where (product.name like CONCAT('%', search, '%') 
			or barcode  like CONCAT('%', search, '%')
			or code like CONCAT('%', search, '%')
            or color like CONCAT('%', search, '%')
            or size like CONCAT('%', search, '%'))
		and (product.category_id = categoryId or categoryId = 0 )
		and (product_detail.status = pdStatus or pdStatus = 0)
		and (product_detail.created_at >= fromDate or fromDate = '2000-01-01')
		and (product_detail.created_at <= toDate or toDate = '2000-01-01')
		order by 
			case when orderProductDetail = 'asc' then product_detail.created_at 
			end asc,
			case when orderProductDetail = 'desc' then product_detail.created_at
			end desc
		limit pageNumber, size;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-15 10:15:50
