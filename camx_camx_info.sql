-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: camx
-- ------------------------------------------------------
-- Server version	5.7.17-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `camx_info`
--

DROP TABLE IF EXISTS `camx_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `camx_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sender` varchar(255) DEFAULT NULL,
  `destination` varchar(255) DEFAULT NULL,
  `dateTime` text,
  `messageSchema` text,
  `messageId` text,
  `currentState` varchar(255) DEFAULT NULL,
  `previousState` varchar(255) DEFAULT NULL,
  `eventID` varchar(255) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `camx_info`
--

LOCK TABLES `camx_info` WRITE;
/*!40000 ALTER TABLE `camx_info` DISABLE KEYS */;
INSERT INTO `camx_info` VALUES (1,'SimCNV8','MSB','2017-04-05T17:00:15.180Z','http://webstds.ipc.org/2541/EquipmentChangeState.xsd','SimCNV8|2017-04-05T17:00:15.180Z','Z2','Z1','Z2_Changed','2017-04-05 17:00:16'),(2,'SimCNV8','MSB','2017-04-05T17:00:19.119Z','http://webstds.ipc.org/2541/EquipmentChangeState.xsd','SimCNV8|2017-04-05T17:00:19.119Z','Z3','Z2','Z3_Changed','2017-04-05 17:00:19'),(3,'SimCNV8','MSB','2017-04-05T17:00:23.904Z','http://webstds.ipc.org/2541/EquipmentChangeState.xsd','SimCNV8|2017-04-05T17:00:23.904Z','Z5','Z3','Z5_Changed','2017-04-05 17:00:24'),(4,'SimCNV8','MSB','2017-04-05T17:00:40.294Z','http://webstds.ipc.org/2541/EquipmentChangeState.xsd','SimCNV8|2017-04-05T17:00:40.294Z','Z4','Z1','Z4_Changed','2017-04-05 17:00:41'),(5,'SimCNV8','MSB','2017-04-05T17:00:44.902Z','http://webstds.ipc.org/2541/EquipmentChangeState.xsd','SimCNV8|2017-04-05T17:00:44.902Z','Z5','Z4','Z5_Changed','2017-04-05 17:00:45'),(6,'SimCNV8','MSB','2017-04-05T17:00:54.076Z','http://webstds.ipc.org/2541/EquipmentChangeState.xsd','SimCNV8|2017-04-05T17:00:54.076Z','Z2','Z1','Z2_Changed','2017-04-05 17:00:54'),(7,'SimCNV8','MSB','2017-04-05T17:00:58.126Z','http://webstds.ipc.org/2541/EquipmentChangeState.xsd','SimCNV8|2017-04-05T17:00:58.126Z','Z3','Z2','Z3_Changed','2017-04-05 17:00:58'),(8,'SimROB8','MSB','2017-04-05T17:01:01.612Z','http://webstds.ipc.org/2541/EquipmentChangeState.xsd','SimROB8|2017-04-05T17:01:01.612Z','processing','idle','DrawStartE','2017-04-05 17:01:02'),(9,'SimROB8','MSB','2017-04-05T17:01:13.019Z','http://webstds.ipc.org/2541/EquipmentChangeState.xsd','SimROB8|2017-04-05T17:01:13.019Z','processing','idle','DrawStartE','2017-04-05 17:01:14'),(10,'SimROB8','MSB','2017-04-05T17:01:17.027Z','http://webstds.ipc.org/2541/EquipmentChangeState.xsd','SimROB8|2017-04-05T17:01:17.027Z','idle','processing','DrawEndExe','2017-04-05 17:01:17'),(11,'SimROB8','MSB','2017-04-05T17:01:22.670Z','http://webstds.ipc.org/2541/EquipmentChangeState.xsd','SimROB8|2017-04-05T17:01:22.670Z','processing','idle','DrawStartE','2017-04-05 17:01:23'),(12,'SimROB8','MSB','2017-04-05T17:01:26.679Z','http://webstds.ipc.org/2541/EquipmentChangeState.xsd','SimROB8|2017-04-05T17:01:26.679Z','idle','processing','DrawEndExe','2017-04-05 17:01:27'),(13,'SimCNV8','MSB','2017-04-05T17:01:41.287Z','http://webstds.ipc.org/2541/EquipmentChangeState.xsd','SimCNV8|2017-04-05T17:01:41.287Z','Z5','Z4','Z5_Changed','2017-04-05 17:01:42');
/*!40000 ALTER TABLE `camx_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-04-05 20:07:29
