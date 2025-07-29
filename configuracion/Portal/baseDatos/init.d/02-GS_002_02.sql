-- MySQL dump 10.13  Distrib 8.0.39, for Linux (x86_64)
--
-- Host: localhost    Database: GS_002_01
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `combo`
--

DROP TABLE IF EXISTS `combo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `combo` (
  `id_combo` int NOT NULL AUTO_INCREMENT,
  `id_module` int DEFAULT NULL COMMENT 'Id de modulo',
  `index_combo` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Indici con el que se conce al modulo de forma simplificada',
  `name` varchar(128) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT 'Nombre del indice',
  `status` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Estado del listado A=Activo, I=Inactivo y X=Eliminado',
  `uuid` varchar(64) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT 'UUID para indice unico de consulta',
  `user` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Usuario que realizo el cambio',
  `user_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de insercion del registro',
  `user_app` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Programa usado para el cambio',
  PRIMARY KEY (`id_combo`),
  KEY `combo_index_IDX` (`index_combo`),
  KEY `combo_FK` (`id_module`),
  KEY `combo_uuid_IDX` (`uuid`) USING BTREE,
  CONSTRAINT `combo_FK` FOREIGN KEY (`id_module`) REFERENCES `module` (`id_module`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `combo`
--

LOCK TABLES `combo` WRITE;
/*!40000 ALTER TABLE `combo` DISABLE KEYS */;
INSERT INTO `combo` VALUES (2,12,'nuevos datos ','nuevos datos datos super','A','d2769e92-3999-4428-aade-5ba236264ff0','<anonimo>','2025-06-10 01:34:46','nameApp-Combo'),(3,12,'sdlfkasl;dkf ',';LK;LKl;ska;lkfd ;lsakdf','A','0fb21256-4e38-4e92-b514-c788c51b5780','<anonimo>','2025-06-26 04:23:30','nameApp-Combo'),(4,12,'nuevos si','MAL PUESTO EN bnombre','E','49985ba1-ad68-46e4-8f8c-dd45ec2e1d4f','<anonimo>','2025-06-10 01:35:28','nameApp-Combo'),(6,12,'jkljklsjklj','kjlkjkljklj','A','f92f7e3a-69fd-4abd-b2d0-04f8429675ab','<anonimo>','2025-06-26 04:22:52','nameApp-Combo'),(7,12,'kjlkjkljkl','kljlkjkljkljklj','A','b377321e-bbba-4c47-be93-8aeb85d6ab36','<anonimo>','2025-06-26 04:23:14','nameApp-Combo'),(8,12,'kjlkjlkjkljkl','kjkljkljkljklj','E','dc7fb43d-3fd9-492b-aadb-3f9c90f1f068','<anonimo>','2025-06-10 01:36:28','nameApp-Combo'),(9,12,'kjkljkljklj','kljkljlkjkljkljiouiouiouiouuio','A','59f04370-62e8-4d5c-8d1c-730573af09bc','<anonimo>','2025-06-10 01:36:41','nameApp-Combo'),(10,12,'iuiouiouio','iuiouioui','A','73dc2c3e-1267-4867-b2f7-ff3a8afd00c4','<anonimo>','2025-06-26 04:22:21','nameApp-Combo'),(11,2,'hola mundo','hhhhhjsklfsdjalkfj askl','A','62402b83-d509-4381-9a8b-51402e3b03ed','<anonimo>','2025-06-12 02:37:47','nameApp-Combo');
/*!40000 ALTER TABLE `combo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `combo_item`
--

DROP TABLE IF EXISTS `combo_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `combo_item` (
  `id_combo_item` int NOT NULL AUTO_INCREMENT,
  `id_combo` int DEFAULT NULL COMMENT 'Id de modulo',
  `uuid` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'UUID para indice unico de consulta',
  `index_combo_item` varchar(128) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT 'Nombre del indice',
  `code_number` int NOT NULL DEFAULT '0' COMMENT 'Code de number que se usa en las listas de combos',
  `code_text` varchar(8) NOT NULL COMMENT 'Code de Text que se usa para las listas de combos',
  `label` varchar(64) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT 'Label de presentacion',
  `description` varchar(256) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT 'Descripcion de la opcion',
  `icon` varchar(128) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT 'TransparencyGridIcon' COMMENT 'Icono que usa la lista de valor',
  `color` varchar(64) NOT NULL DEFAULT 'none' COMMENT 'Color de la opcion',
  `orden` int NOT NULL DEFAULT '0' COMMENT 'Orden del label',
  `status` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Estado del listado A=Activo, I=Inactivo,(-) guion medio y X=Eliminado',
  `user` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Usuario que realizo el cambio',
  `user_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de insercion del registro',
  `user_app` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Programa usado para el cambio',
  PRIMARY KEY (`id_combo_item`),
  KEY `combo_item_FK` (`id_combo`),
  KEY `combo_item_uuid_IDX` (`uuid`) USING BTREE,
  KEY `combo_item_index_combo_item_IDX` (`index_combo_item`) USING BTREE,
  CONSTRAINT `combo_item_FK` FOREIGN KEY (`id_combo`) REFERENCES `combo` (`id_combo`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `combo_item`
--

LOCK TABLES `combo_item` WRITE;
/*!40000 ALTER TABLE `combo_item` DISABLE KEYS */;
INSERT INTO `combo_item` VALUES (1,11,'86470bc6-cb1d-433a-999b-04fd2289faf5','AC-001-01',0,'A','Activo','Registor activo ','CheckIcon','black',1,'A','root','2025-07-25 03:06:37','manuial-ComboItem'),(2,11,'86470bc6-cb1d-433a-999b-04fd2289fa34','AC-001-02',1,'B','Borrado','Resgistro Borrado','CancelIcon','Black',3,'A','root','2025-07-25 03:06:42','manual-ComboItem'),(3,11,'26470bc6-cb1d-433a-999b-04fd2289fa34','AC-001-04',9,'X','Inactivo','Registro Inactivo','CancelIcon','red',4,'A','root','2025-07-25 03:06:42','manual-ComboItem'),(4,11,'36470bc6-cb1d-433a-999b-04fd2289fa34','AC-001-03',90,'D','Super Eliminado','Eliminado','CancelIcon','RED',2,'A','root','2025-07-25 03:06:37','manual-ComboItem');
/*!40000 ALTER TABLE `combo_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `error`
--

DROP TABLE IF EXISTS `error`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `error` (
  `id_error` int NOT NULL AUTO_INCREMENT,
  `index_error` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Indici con el que se conce al modulo de forma simplificada',
  `message` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Mensaje de error',
  `description` varchar(4098) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'Descripcion del mensaje de error',
  `uuid` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'UUID para indice unico de consulta',
  `user` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Usuario que realizo el cambio',
  `user_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de insercion del registro',
  `user_app` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Programa usado para el cambio',
  PRIMARY KEY (`id_error`),
  KEY `error_index_IDX` (`index_error`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `error`
--

LOCK TABLES `error` WRITE;
/*!40000 ALTER TABLE `error` DISABLE KEYS */;
INSERT INTO `error` VALUES (58,'01 Super indice','Super indice','jsdalkf jasdlkfj askldjfkl ','62bbcc1b-157d-405b-9c6f-b6e257c993de','root','2025-05-03 17:51:47','gestor-Error'),(59,'908098908','kjsdlkfjasdklfj lkj','lkj lkasdjflk  sdjflk jsad flkjsaklj','acd37c87-e325-4c1e-a09e-968aba98b401','root','2025-04-06 22:57:15','gestor-Error'),(62,'1555665','l;ksl;fkl;sd kfl;ask l;','lsdkf; las kdf ;lask dfl; kas dl;f kasd l;f kasl;dkf ;lasdkf;l sakdf;l kas dl;fkasd;lf kas;ld fk;asl dk f;las dkf ;las kdf ;lask d;lfkas d;lf kasl;d kf ;asldkf;lasdkf ;laskd','f0a497bd-e203-40cc-ac38-6190d1b4f9bb','root','2025-04-06 22:57:59','gestor-Error'),(63,'9808098908','jiojsoidjfioasj d fkljasd klfj  askldjf lkas djfklj ','asjdlk  asjflks djf glkasdj f lkdsa j ','a3d897ec-3be5-422b-a868-98e436e153cc','root','2025-05-01 04:56:18','gestor-Error'),(64,'90909009','090-9-0n oiiujs io jfdasl k jfkl asj k','ljlkj  esedflkj asd lkfjs akldfj  kl','31884380-2701-4691-a388-90229970445a','root','2025-04-06 22:58:30','gestor-Error'),(65,'89098908','kjsdoakj  flkasd j f kljsadlkf j asdkl fj kl j','klj lksd ajfklasj  dlkfjasd kl  fj askldfj askldfjaskl d jfasdkl j fkldsj  lk','98e0be22-d3da-4662-bda5-cbdf98a69f9b','root','2025-04-06 22:58:43','gestor-Error'),(66,'89908098','jsdlkfjaskldjf lask jdflkj','lkjslk  dajf sdklafjg askldjf lkj','6c70b1c6-bc66-4786-9d9c-0983cce43727','root','2025-04-06 22:58:54','gestor-Error'),(67,'error','slkdjflaskj','kljlkadsfjlkasdjfkl','0169ba53-6e7f-412f-b4b2-a7685218d29b','root','2025-06-08 14:08:20','nameApp-Error');
/*!40000 ALTER TABLE `error` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `information`
--

DROP TABLE IF EXISTS `information`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `information` (
  `id_information` int NOT NULL AUTO_INCREMENT,
  `name` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Nombre de la información a relatar',
  `value_01` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Valor 01',
  `value_02` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'Valor 02',
  `uuid` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'UUID para indice unico de consulta',
  `user` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Usuario que realizo el cambio',
  `user_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de insercion del registro',
  `user_app` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Programa usado para el cambio',
  PRIMARY KEY (`id_information`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `information`
--

LOCK TABLES `information` WRITE;
/*!40000 ALTER TABLE `information` DISABLE KEYS */;
INSERT INTO `information` VALUES (2,'Descripción 001','General Setup version 001','..','5593489a-4078-479f-9f23-775953b10b8d','ovelez','2025-06-29 17:30:02','nameApp-Information'),(4,'mi nomre','super nombre','lkjsadlfkjasdlkfj ','089fb14d-176d-48e2-9fb7-6914af70ec01','<anonimo>','2025-05-23 04:14:58','nameApp-Information'),(5,'NuevoError','nuevo Error','super nuevo error','ba3eb82b-0c0d-43dd-bbff-66d0aaf2a69e','<anonimo>','2025-05-24 21:35:09','nameApp-Information');
/*!40000 ALTER TABLE `information` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu` (
  `id_menu` int NOT NULL AUTO_INCREMENT,
  `id_module` int DEFAULT NULL COMMENT 'Id de modulo',
  `type` varchar(8) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT 'Tipo de menu, P=principal, S=secundario, U=usuario y S=salir',
  `index_menu` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Indici con el que se conce al modulo de forma simplificada',
  `name` varchar(128) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT 'Nombre del indice',
  `task_flow` varchar(128) NOT NULL COMMENT 'Contexto del modulo',
  `status` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Estado del listado A=Activo, I=Inactivo y X=Eliminado',
  `orden` int NOT NULL DEFAULT '0' COMMENT 'Orden de presentacion',
  `statistics_query` varchar(4096) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL COMMENT 'Query para hacer las consultas SQL para la presentacion de estadisticas del dashboard',
  `user` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Usuario que realizo el cambio',
  `user_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de insercion del registro',
  `user_app` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Programa usado para el cambio',
  PRIMARY KEY (`id_menu`),
  KEY `menu_index_IDX` (`index_menu`),
  KEY `menu_FK` (`id_module`),
  CONSTRAINT `menu_FK` FOREIGN KEY (`id_module`) REFERENCES `module` (`id_module`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (3,1,'P','LG-US-001','Usuario','/WEB-INF/usuario-task-flow.xml#usuario-task-flow','A',1,NULL,'Pendiente','2021-07-09 00:39:01','SAFAdministrativo.ViewControllerAdministrativo.1.0-SNAPSHOT'),(6,2,'P','GS-RL-001','Roles','/WEB-INF/rol-task-flow.xml#rol-task-flow','A',3,NULL,'Pendiente','2021-07-09 05:02:06','SAFAdministrativo.ViewControllerAdministrativo.1.0-SNAPSHOT'),(9,2,'P','GS-MN-001','Menús','/WEB-INF/menu-task-flow.xml#menu-task-flow','A',2,NULL,'Pendiente','2021-07-09 05:19:24','SAFAdministrativo.ViewControllerAdministrativo.1.0-SNAPSHOT'),(10,2,'P','GS-CD-001','Códigos Definidos','/WEB-INF/cdu-task-flow.xml#cdu-task-flow','A',4,NULL,'Pendiente','2021-07-11 17:40:39','SAFAdministrativo.ViewControllerAdministrativo.1.0-SNAPSHOT'),(11,2,'P','GS-ER-001','Errores','/WEB-INF/error-task-flow.xml#error-task-flow','A',6,'select 1 as id_static, count(*) as value, \'Items\' as description, \'info\' as status from error e ','Pendiente','2022-01-04 15:53:49','manual'),(12,2,'P','GS-IN-001','Información','/WEB-INF/informacion-task-flow.xml#informacion-task-flow','A',7,NULL,'Pendiente','2022-01-04 16:28:04','manual'),(13,3,'P','IW-EN-001','Reportes','/WEB-INF/reporte-task-flow.xml#reporte-task-flow','A',1,NULL,'Pendiente','2022-01-05 04:54:14','manual'),(14,4,'P','CL_001','Cliente','/WEB-INF/cliente-task-flow#cliente-task-flow','A',2,NULL,'omar','2022-01-06 13:43:16','/ViewControllerAdministrativo'),(15,2,'P','GS-US-001','Usuarios','/WEB-INF/usuario-task-flow.xml#usuario-task-flow','A',5,NULL,'omar','2022-01-08 05:40:54','/ViewControllerAdministrativo'),(16,2,'P','GS-MD-001','Módulos','/WEB-INF/modulo-task-flow.xml#modulo-task-flow','A',1,'select  ROW_NUMBER() OVER (ORDER BY x.value) AS id_static, x.value,  x.description,  x.status  from ( select  count(*) as value,  status as st,  CASE WHEN status = \'A\' THEN \"Activos\" WHEN status = \'B\' THEN \"Backend\" WHEN status = \'I\' THEN \"Inactivos\" WHEN status = \'X\' THEN \"Borrados\" END as description,  CASE WHEN status = \'A\' THEN \"success\" WHEN status = \'B\' THEN \"info\" WHEN status = \'I\' THEN \"warning\" WHEN status = \'X\' THEN \"error\"   END as status   from module m group by m.status ) x    \n ','omar','2022-01-20 13:53:00','/ViewControllerAdministrativo'),(18,4,'P','CS_PR_001','Proyecto','/WEB-INF/proyecto-task-flow#proyecto-task-flow','A',1,NULL,'omar','2022-01-25 14:42:01','/Administrativo-001'),(19,4,'P','CS_CT_001','Contacto','/WEB-INF/contacto-task-flow#contacto-task-flow','A',3,NULL,'omar','2022-02-08 14:53:37','/Administrativo-001'),(20,6,'P','MV_RG_001','Cierre de Vuelo ADM','/WEB-INF/manifiesto-usuario-task-flow.xml#manifiesto-usuario-task-flow','A',1,NULL,'omar','2022-02-18 18:18:04','/Administrativo-001'),(21,6,'P','MV_AL_001','Cierre de Vuelo','/WEB-INF/manifiesto-usuario-task-flow.xml#manifiesto-usuario-task-flow','A',2,NULL,'omar','2022-02-18 20:10:46','/Administrativo-001'),(22,6,'P','MV_LD_001','Libro Direcciones','/WEB-INF/libro-direccion-task-flow.xml#libro-direccion-task-flow','A',5,NULL,'omar','2022-02-20 16:37:18','/Administrativo-001'),(23,6,'P','MV_TT_001','Tasas Timbres','/WEB-INF/tasa-task-flow.xml#tasa-task-flow','A',6,NULL,'admin','2022-03-15 18:03:26','/Administrativo-001'),(24,2,'P','GS-CC-001','Cambio Clave','/WEB-INF/clave-task-flow.xml#clave-task-flow','A',8,NULL,'root','2022-06-14 00:04:43','/Administrativo-001'),(25,6,'P','MV_ER_001','Envio Cierre Vuelo','/WEB-INF/error-rest-task-flow.xml#error-rest-task-flow','A',7,NULL,'admin','2022-03-15 18:03:26','/Administrativo-001'),(26,6,'P','MV_PL_001','Preliquidación','/WEB-INF/preliquidacion-task-flow.xml#preliquidacion-task-flow','A',4,NULL,'root','2023-02-16 23:53:55','/Administrativo-001'),(27,6,'P','MV_UP_001','Proceso Lotes','/WEB-INF/manifiesto-up-task-flow.xml#manifiesto-up-task-flow','A',3,NULL,'root','2023-02-23 12:36:54','/Administrativo-001'),(28,6,'P','FA_CL_001','Filiales','/WEB-INF/filial-task-flow.xml#filial-task-flow','A',3,NULL,'root','2023-02-23 12:36:54','/Administrativo-001');
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `module`
--

DROP TABLE IF EXISTS `module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `module` (
  `id_module` int NOT NULL AUTO_INCREMENT,
  `index_module` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Indici con el que se conce al modulo de forma simplificada',
  `name` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Nombre del indice',
  `context` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Contexto de aplicacion',
  `status` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Estado del listado A=Activo, I=Inactivo y X=Eliminado',
  `uuid` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'UUID para indice unico de consulta',
  `orden` int NOT NULL COMMENT 'Orden',
  `user` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Usuario que realizo el cambio',
  `user_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de insercion del registro',
  `user_app` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Programa usado para el cambio',
  PRIMARY KEY (`id_module`),
  KEY `module_index_IDX` (`index_module`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `module`
--

LOCK TABLES `module` WRITE;
/*!40000 ALTER TABLE `module` DISABLE KEYS */;
INSERT INTO `module` VALUES (1,'LG_001_00','Login','https://testtasasytimbres.aerocivil.gov.co/Login-001/faces/LOG001?server=GF5&?token=','A','0ca1c748-e1de-11ef-a71a-70a8d3365682',1,'<anonimo>','2025-06-10 00:44:39','nameApp-Module'),(2,'GS_001_00','Mi Configuración','https://testtasasytimbres.aerocivil.gov.co/Administrativo-001/faces/LOG001?server=GF5&?token=','A','0ca1cb4d-e1de-11ef-a71a-70a8d3365002',1000,'<anonimo>','2025-06-26 04:23:20','gestor-Module'),(3,'IW_001_00','Reportes Impresiones','ViewControllerReportes/faces/LOG001','I','0ca1cc08-e1de-11ef-a71a-70a8d3365682',2,'Pendiebnte','2022-01-05 04:52:13','manual'),(4,'CS_001_00','Cliente SAF','Cliente-001/faces/LOG001','A','0ca1cc51-e1de-11ef-a71a-70a8d3365682',3,'<anonimo>','2025-04-13 18:14:56','gestor-Module'),(6,'MV_001_00','Manifiesto','https://testtasasytimbres.aerocivil.gov.co/Manifiesto-001/faces/LOG001?server=GF5&?token=','A','0ca1cc95-e1de-11ef-a71a-70a8d3365682',4,'<anonimo>','2025-06-26 04:13:27','gestor-Module'),(7,'GA_001_00','Gestion de Archivos','Archivo-001/faces/LOG001','A','0ca1cccd-e1de-11ef-a71a-70a8d3365600',5,'<anonimo>','2025-06-26 04:23:00','gestor-Module'),(8,'BD_001_00','Base Desarrollo','BaseDesarrollo-001/faces/LOG001','A','0ca1cd0e-e1de-11ef-a71a-70a8d3365682',6,'<anonimo>','2025-06-26 04:21:49','gestor-Module'),(10,'OR_001_00','Orquestador Remote 001','http://localhost:5050/assets/orchestratorRemoteEntry.js','A','7531fdc8-8d6c-4260-bc6e-231018f44dab',1000,'<anonimo>','2025-06-20 03:31:33','gestor-Module'),(11,'lkjsdflkjasklj','kljlksadjfglkasj','kljlksdjflkasj','X','56c7a0b1-aff4-41e8-97ee-9b1ae3154784',1,'<anonimo>','2025-04-25 03:15:22','gestor-Module'),(12,'junmj','NuevoCampo','klsjdaflksj','X','776a949f-4ca7-4edd-9aa7-b8ead4a7a494',1,'<anonimo>','2025-04-25 03:15:38','gestor-Module');
/*!40000 ALTER TABLE `module` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parameter`
--

DROP TABLE IF EXISTS `parameter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parameter` (
  `id_parameter` int NOT NULL AUTO_INCREMENT,
  `id_module` int DEFAULT NULL,
  `index_parameter` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Indici con el que se conce al modulo de forma simplificada',
  `encrypted` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'Si los campos te texto son o no encriptados',
  `name` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Nombre del parametro',
  `description` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Descripción del campo a ser usado',
  `value_text_01` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'Valor texto a parametro',
  `value_text_02` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'Valor texto a parametro',
  `value_number_01` double DEFAULT NULL COMMENT 'Valor numero a parametro',
  `value_number_02` double DEFAULT NULL COMMENT 'Valor numero a parametro',
  `default_text_01` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'Default texto 01',
  `default_text_02` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'Default texto 02',
  `default_number_01` double DEFAULT NULL COMMENT 'Default numero 01',
  `default_number_02` double DEFAULT NULL COMMENT 'Default numero 02',
  `user` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Usuario que realizo el cambio',
  `user_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de insercion del registro',
  `user_app` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Programa usado para el cambio',
  `uuid` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'UUID para indice unico de consulta',
  PRIMARY KEY (`id_parameter`),
  KEY `parameter_FK` (`id_module`),
  KEY `parameter_index_IDX` (`index_parameter`) USING BTREE,
  CONSTRAINT `parametro_FK` FOREIGN KEY (`id_module`) REFERENCES `module` (`id_module`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parameter`
--

LOCK TABLES `parameter` WRITE;
/*!40000 ALTER TABLE `parameter` DISABLE KEYS */;
INSERT INTO `parameter` VALUES (2,1,'002','N','Tiempo de espera ante intentos fallidos','Tiempo en horas, antes que la clave vuelva a estar activo','','',2,NULL,'<No Definido>','<No Definido>',NULL,2,'ovelez','2021-05-16 23:00:24','manual','ad3b05c7-e1de-11ef-a71a-70a8d3365682'),(8,1,'001','N','Numero de Intentos','Numero de Intentos que el login tendra antes de bloquear',NULL,NULL,3,0,'<No Definido>','<No Definido>',3,0,'Pendiente','2021-07-05 21:54:10','SAFAdministrativo.ViewControllerAdministrativo.1.0-SNAPSHOT','ad3b0a5b-e1de-11ef-a71a-70a8d3365682'),(9,1,'003','N',' reCAPTCHA','reCAPTCHA al sitio web  \"loginADF\"','6LfRpt8bAAAAAFUbbzttVV5FrAhSiIN5vZUsekSL','6LfRpt8bAAAAANCPK5xqiHX2GTp3xC7MmTSL-p4o',NULL,NULL,'Clave del sitio Web','Clave secreta Servidor',0,0,'weblogic','2021-08-05 15:05:49','SAFAdministrativo.ViewControllerAdministrativo.1.0-SNAPSHOT','ad3b0b63-e1de-11ef-a71a-70a8d3365682'),(10,1,'004','N','Contexto Usuario','Contexto Usuario nuevo y/o cambio clave + idMenu menu de cambio de clave','https://testtasasytimbres.aerocivil.gov.co/Administrativo-001/faces/LOG001?server=GF5&?token=','',24,NULL,'Contexto de Usuario','Contexto de Usuario',0,0,'weblogic','2021-08-05 15:05:49','SAFAdministrativo.ViewControllerAdministrativo.1.0-SNAPSHOT','ad3b0bfc-e1de-11ef-a71a-70a8d3365682'),(11,1,'005','N','Plantilla notificación enviar token','id Plantilla notificación enviar token',NULL,NULL,1,NULL,'Expresión Regular de validación','Mensaje de validación',0,0,'omar','2022-01-22 05:43:02','/Administrativo-001','ad3b0cc9-e1de-11ef-a71a-70a8d3365682'),(13,2,'001','N','Expresion Regular para el cambio de claves','Expresion regular para claves ^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}]:;\',?/*~$^+=<>]).{8,20}$','^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}]:;\',?/*~$^+=<>]).{8,20}$','Debe contener: del 0-9, A-Z, a-z y los caracteres ! @ # & ( ) ; en un largo de 8-20 caracteres ',2,NULL,'<No Definido>','<No Definido>',2,0,'omar','2022-01-27 05:30:31','/Administrativo-001','ad3b0d54-e1de-11ef-a71a-70a8d3365682'),(14,8,'200','N','Path Relativo','Path Relativo para guardado de archivos','/home/azureuser/',NULL,NULL,NULL,'<No Definido>','<No Definido>',0,0,'omar','2022-02-25 04:31:17','/Administrativo-001','ad3b0de2-e1de-11ef-a71a-70a8d3365682'),(15,1,'100','N','Servidor por default de seguridades','Servidor por default de seguridades o proveedor o tecnologia de servidor, puede ser WLS12 GF5','GF5','',2,NULL,'<No Definido>','<No Definido>',NULL,2,'ovelez','2021-05-16 23:00:24','manual','ad3b0e82-e1de-11ef-a71a-70a8d3365682'),(16,2,'100','N','Servidor por default de seguridades','Servidor por default de seguridades o proveedor o tecnologia de servidor, puede ser WLS12 GF5','GF5','',2,NULL,'<No Definido>','<No Definido>',NULL,2,'ovelez','2021-05-16 23:00:24','manual','ad3b0f0c-e1de-11ef-a71a-70a8d3365682'),(18,8,'50','N','Logout del modulo','Logout del modulo','https://testtasasytimbres.aerocivil.gov.co/Login-001/faces/Home.jspx',NULL,NULL,NULL,'<No Definido>','<No Definido>',0,0,'omar','2022-02-25 04:31:17','/Administrativo-001','ad3b0f7e-e1de-11ef-a71a-70a8d3365682'),(19,2,'50','N','Logout del modulo','Logout del modulo','https://testtasasytimbres.aerocivil.gov.co/Login-001/faces/Home.jspx',NULL,NULL,NULL,'/homo/user','<No Definido>',0,0,'omar','2022-02-25 04:31:17','/Administrativo-001','ad3b0ff1-e1de-11ef-a71a-70a8d3365682'),(20,1,'50','N','Logout del modulo','Logout del modulo','https://testtasasytimbres.aerocivil.gov.co/Login-001/faces/Home.jspx',NULL,NULL,NULL,'/homo/user','<No Definido>',0,0,'omar','2022-02-25 04:31:17','/Administrativo-001','ad3b105d-e1de-11ef-a71a-70a8d3365682'),(21,6,'200','N','Path Relativo','Path Relativo para guardado de archivos','/home/azureuser/',NULL,NULL,NULL,'<No Definido>','<No Definido>',0,0,'omar','2022-02-25 04:31:17','/Administrativo-001','ad3b10c3-e1de-11ef-a71a-70a8d3365682'),(26,6,'001','N','URL Servicio manifiesto JDE','URL Servicio manifiesto JDE','https://172.16.51.177:8089/PY920/IntegracionPortalTasasTimbres',NULL,NULL,NULL,'https://186.31.107.90:8089/PY920/IntegracionPortalTasasTimbres','<No Definido>',0,0,'omar','2022-02-25 04:31:17','/Administrativo-001','ad3b1132-e1de-11ef-a71a-70a8d3365682'),(27,6,'002','N','Usuario/Clave URL Servicio manifiesto JDE','Usuario/Clave URL Servicio manifiesto JDE','CONSULTOR','C0nsult0r2021#*',NULL,NULL,'Usuario/Clave asignado desde  JDE ','<No Definido>',0,0,'omar','2022-02-25 04:31:17','/Administrativo-001','ad3b1200-e1de-11ef-a71a-70a8d3365682'),(28,6,'003','N','Path de archivo de llave SSL','Path de archivo de llave SSL que debe ser obtenida desde el sitio https  /home/azureuser/ssl_jde_aerocivil','/home/azureuser/certificado','12341234s',NULL,NULL,'Path de SSL','<No Definido>',0,0,'omar','2022-02-25 04:31:17','/Administrativo-001','ad3b1274-e1de-11ef-a71a-70a8d3365682'),(31,1,'006','N','URL empresarial','Url empresarial','https://www.aerocivil.gov.co/',NULL,1,NULL,'Expresión Regular de validación','Mensaje de validación',0,0,'omar','2022-01-22 05:43:02','/Administrativo-001','ad3b1441-e1de-11ef-a71a-70a8d3365682'),(32,1,'007','N','URL Declaimer','URL de declaimer del sitio web, se usa para dar informacion legal o de contenido variado','https://testtasasytimbres.aerocivil.gov.co/Imagen-001/declaimer.html',NULL,1,NULL,'Expresión Regular de validación','Url del Declamer',0,0,'omar','2022-01-22 05:43:02','/Administrativo-001','ad3b14c7-e1de-11ef-a71a-70a8d3365682'),(33,6,'004','N','Dias de seguridad para ingreso de Cierres','Dias de seguridad para ingreso de Cierres','','',120,1,'','',1,0,'omar','2022-02-25 04:31:17','/Administrativo-001','ad3b1542-e1de-11ef-a71a-70a8d3365682'),(34,6,'005','N','Maximo de ocupantes de los aviones','Maximo de ocupantes de los aviones validaciones',NULL,NULL,501,NULL,NULL,NULL,501,0,'omar','2022-02-25 04:31:17','/Administrativo-001','ad3b15bf-e1de-11ef-a71a-70a8d3365682'),(35,1,'300','N','Notificacion Solicitud Nueva Clave','Notificacion Solicitud Nueva Clave (Formato y Servicio)','',NULL,1,1,'','',1,1,'ovelez','2022-02-25 04:31:17','/Administrativo-001','ad3b163b-e1de-11ef-a71a-70a8d3365682'),(36,2,'300','N','Notificacion Crear Clave ','Notificacion Crear Clave (Formato y Servicio)','',NULL,2,1,' ',' ',2,1,'omar','2022-02-25 04:31:17','/Administrativo-001','ad3b16ae-e1de-11ef-a71a-70a8d3365682'),(37,2,'301','N','Notificacion Cambio Clave ','Notificacion Cambio Clave (Formato y Servicio)','',NULL,1,1,' ',' ',1,1,'omar','2022-02-25 04:31:17','/Administrativo-001','ad3b171f-e1de-11ef-a71a-70a8d3365682'),(38,6,'50','N','Logout del modulo','Logout del modulo','https://testtasasytimbres.aerocivil.gov.co/Login-001/faces/Home.jspx',NULL,NULL,NULL,'/homo/user','<No Definido>',0,0,'omar','2022-02-25 04:31:17','/Administrativo-001','ad3b178a-e1de-11ef-a71a-70a8d3365682'),(39,6,'201','N','Path Imagen Derecha','Path Imagen Derecha','/home/azureuser/Manifiesto/Imagenes/derecha.jpg',NULL,NULL,NULL,'/home/ovelez/derecha.jpg','<No Definido>',0,0,'omar','2022-02-24 23:31:17','/Administrativo-001','ad3b17fb-e1de-11ef-a71a-70a8d3365682'),(40,6,'202','N','Path Imagen Derecha','Path Imagen Derecha','/home/azureuser/Manifiesto/Imagenes/izquierda.jpg',NULL,NULL,NULL,'/home/ovelez/izquierda.jpg','<No Definido>',0,0,'omar','2022-02-24 23:31:17','/Administrativo-001','ad3b1871-e1de-11ef-a71a-70a8d3365682'),(41,6,'203','N','Titulo impuesto','Titulo impuesto','IMPUESTO DE TIMBRE NACIONAL\nLEY 2 DE 1976 Y RESOLUCIÓN 1545 DE 2 DE JULIO DE 2015',NULL,NULL,NULL,'IMPUESTO DE TIMBRE NACIONAL\nLEY 2 DE 1976 Y RESOLUCIÓN 1545 DE 2 DE JULIO DE 2015','<No Definido>',0,0,'omar','2022-02-24 23:31:17','/Administrativo-001','ad3b18dc-e1de-11ef-a71a-70a8d3365682'),(42,6,'204','N','Titulo impuesto','Titulo impuesto','AERONÁUTICA CIVIL DE COLOMBIA\nLIQUIDACIÓN DE PAGO',NULL,NULL,NULL,'AERONÁUTICA CIVIL DE COLOMBIA\nLIQUIDACIÓN DE PAGO','<No Definido>',0,0,'omar','2022-02-24 23:31:17','/Administrativo-001','ad3b1951-e1de-11ef-a71a-70a8d3365682'),(43,10,'001','N','URL Keycloak','URL Keycloak interno para bypass desde el orquestador para realizar labores varias de interaccion con el server keycloa','http://localhost:8080/realms/portal-realm/protocol/openid-connect/token',NULL,NULL,NULL,'http://localhost:8080/realms/cofin-realm/protocol/openid-connect/token','<No Definido>',0,0,'omar','2025-02-26 23:31:17','manual','ad3b1951-e1de-11ef-a71a-70a8d3365682'),(44,10,'002','N','Client Id Keycloak','URL Keycloak interno para bypass desde el orquestador para realizar labores varias de interaccion con el server keycloa','portal-client',NULL,NULL,NULL,'portal-client','<No Definido>',0,0,'omar','2025-02-26 23:31:17','manual','7d4aa382-ee0c-48ed-a392-ea573bd19cd0'),(45,2,'200','N','URL Base modulo','URL base de las consultas ','http://localhost:8090/gestor-ws/api','',2,NULL,'<No Definido>','<No Definido>',2,0,'omar','2022-01-27 05:30:31','/Administrativo-001','ad3b0d54-e1de-11ef-a71a-70a8d3365682');
/*!40000 ALTER TABLE `parameter` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-28 21:53:00
