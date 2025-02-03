-- MySQL dump 10.13  Distrib 8.0.33, for Linux (x86_64)
--
-- Host: localhost    Database: GS_001_00
-- ------------------------------------------------------
-- Server version	8.0.33-0ubuntu0.22.10.2

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
-- Table structure for table `codigo_definido_usuario`
--

DROP TABLE IF EXISTS `codigo_definido_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `codigo_definido_usuario` (
  `id_codigo_definido_usuario` int NOT NULL AUTO_INCREMENT,
  `id_modulo` int NOT NULL,
  `grupo` varchar(8) NOT NULL COMMENT 'Grupo de listas',
  `codigo_texto` varchar(8) NOT NULL COMMENT 'Codigo para los campos de: estado, tipo, grupo y/o categoría',
  `codigo_numero` int NOT NULL COMMENT 'Codigo para los campos de: estado, tipo y/o categoría',
  `nombre` varchar(64) NOT NULL COMMENT 'Nombre del campo',
  `descripcion` varchar(512) DEFAULT NULL COMMENT 'Descripción del campo para presentación',
  `orden` int NOT NULL COMMENT 'Orden de presentacion',
  `estado` varchar(8) NOT NULL COMMENT 'Estado del listado A=Activo, I=Inactivo y X=Eliminado',
  `usuario` varchar(128) NOT NULL COMMENT 'Usuario que realizo el cambio',
  `usuario_fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de insercion del registro',
  `usuario_programa` varchar(256) NOT NULL COMMENT 'Programa usado para el cambio',
  PRIMARY KEY (`id_codigo_definido_usuario`),
  KEY `codigo_definido_usuario_id_modulo_IDX` (`id_modulo`,`grupo`) USING BTREE,
  KEY `codigo_definido_usuario_codigo_texto_IDX` (`codigo_texto`) USING BTREE,
  KEY `codigo_definido_usuario_codigo_numero_IDX` (`codigo_numero`) USING BTREE,
  CONSTRAINT `codigo_definido_usuario_FK` FOREIGN KEY (`id_modulo`) REFERENCES `modulo` (`id_modulo`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `codigo_definido_usuario`
--

LOCK TABLES `codigo_definido_usuario` WRITE;
/*!40000 ALTER TABLE `codigo_definido_usuario` DISABLE KEYS */;
INSERT INTO `codigo_definido_usuario` VALUES (1,1,'AD_US_01','A',1,'Activo','Usuario Activo',1,'A','ovelez','2021-05-19 01:41:42','manual'),(2,1,'AD_US_01','X',2,'Borrado','Usuario Borrado',3,'A','ovelez','2021-05-19 01:42:36','manual'),(3,1,'AD_US_01','P',3,'Pausado','Usuario Suspendido',2,'A','ovelez','2021-05-19 01:43:01','manual'),(4,1,'001','AD_US_01',1,'Usuario-Estado','Usuario-Estado',11,'A','ovelez','2021-05-19 01:43:01','manual'),(5,1,'AD_RL_01','A',1,'Activo','Rol Activo',1,'A','ovelez','2021-06-18 17:15:10','manual'),(6,1,'AD_RL_01','I',2,'Inactivo','Rol Inactivo',2,'A','ovelez','2021-06-18 17:15:10','manual'),(7,1,'AD_RL_02','ADM',1,'Administrador','Rol-Administrador',2,'A','ovelez','2021-06-18 17:15:10','manual'),(8,1,'AD_RL_02','LOG',2,'Auditor','Rol-Auditor',3,'A','ovelez','2021-06-18 17:15:10','manual'),(9,1,'AD_RL_02','CLI-01',3,'Cliente 01','Rol-Cliente 01',4,'A','ovelez','2021-06-18 17:15:10','manual'),(10,1,'AD_RL_02','CLI-02',4,'Cliente 02','Rol-Cliente 02',5,'A','ovelez','2021-06-18 17:15:10','manual'),(11,1,'AD_RL_02','ROOT',5,'Principal','Rol-Principal',1,'A','ovelez','2021-06-18 17:15:10','manual'),(12,1,'001','AD_RL_01',2,'Rol-Estado','Rol-Estado',12,'A','ovelez','2021-05-19 01:43:01','manual'),(13,1,'001','AD_RL_02',3,'Rol-Tipo-Acceso','Rol-Tipo-Acceso',13,'A','ovelez','2021-05-19 01:43:01','manual'),(14,1,'001','AD_MD_01',4,'Modulo-Estado','Modulo-Estado',17,'A','ovelez','2021-06-22 22:11:12','manual'),(15,1,'AD_MD_01','A',1,'Activo','Modulo Activo',1,'A','ovelez','2021-06-22 22:11:52','manual'),(16,1,'AD_MD_01','I',1,'Inactivo','Modulo Inactivo',2,'A','ovelez','2021-06-22 22:12:39','manual'),(17,1,'001','AD_CD_01',5,'CDU-Estado','CDU-Estado',6,'A','ovelez','2021-06-22 22:11:12','manual'),(18,1,'AD_CD_01','A',1,'Activo','Codigo Definido Usuario Activo',1,'A','ovelez','2021-06-22 23:37:06','manual'),(19,1,'AD_CD_01','I',2,'Inactivo','Codigo Definido Usuario Inactivo',2,'A','ovelez','2021-06-22 23:37:06','manual'),(23,1,'sdfsadf','11',11,'11','11',-1,'A','Pendiente','2021-06-25 22:18:28','SAFAdministrativo.ViewControllerAdministrativo.1.0-SNAPSHOT'),(24,1,'001','AD_PM_01',1,'Parametro-Clave','Administracion de parametros, en el que se tiene como clave o no',14,'A','Pendiente','2021-07-01 16:24:40','SAFAdministrativo.ViewControllerAdministrativo.1.0-SNAPSHOT'),(25,1,'AD_PM_01','C',0,'Clave','El parametro contiene claves',1,'A','Pendiente','2021-07-01 16:26:59','SAFAdministrativo.ViewControllerAdministrativo.1.0-SNAPSHOT'),(26,1,'AD_PM_01','N',1,'Sin Clave','El parametro no tiene claves',2,'A','Pendiente','2021-07-01 16:27:26','SAFAdministrativo.ViewControllerAdministrativo.1.0-SNAPSHOT'),(27,1,'001','AD_TK_01',1,'Token-Tipo','Tipo de toke, Correo, Facebook o cualquier otra red social',15,'A','Pendiente','2021-07-02 15:22:02','SAFAdministrativo.ViewControllerAdministrativo.1.0-SNAPSHOT'),(28,1,'AD_TK_01','C',1,'Correo','Es el inicial que usa directamente el correo',1,'A','Pendiente','2021-07-02 15:24:18','SAFAdministrativo.ViewControllerAdministrativo.1.0-SNAPSHOT'),(29,1,'AD_TK_01','F',2,'Facebook','Ingreso por Facebook',2,'A','Pendiente','2021-07-02 15:25:51','SAFAdministrativo.ViewControllerAdministrativo.1.0-SNAPSHOT'),(30,1,'AD_TK_01','G',3,'Google','Google Autenticador',3,'A','Pendiente','2021-07-02 16:01:19','SAFAdministrativo.ViewControllerAdministrativo.1.0-SNAPSHOT'),(35,1,'001','AD_TK_02',2,'Token-Estado','Estado del token',16,'A','Pendiente','2021-07-02 16:35:17','SAFAdministrativo.ViewControllerAdministrativo.1.0-SNAPSHOT'),(36,1,'AD_TK_02','A',1,'Activo','Token Activo',2,'A','Pendiente','2021-07-02 16:35:59','SAFAdministrativo.ViewControllerAdministrativo.1.0-SNAPSHOT'),(37,1,'AD_TK_02','I',2,'Inactivo','Token inactivo',3,'A','Pendiente','2021-07-02 16:36:19','SAFAdministrativo.ViewControllerAdministrativo.1.0-SNAPSHOT'),(38,1,'AD_TK_02','C',0,'Creado','Creado pero aun no activado',1,'A','Pendiente','2021-07-02 17:32:39','SAFAdministrativo.ViewControllerAdministrativo.1.0-SNAPSHOT'),(39,1,'001','AD_MN_01',1,'Menu-Tipo','Tipo de menus',9,'A','Pendiente','2021-07-07 22:44:29','SAFAdministrativo.ViewControllerAdministrativo.1.0-SNAPSHOT'),(42,1,'001','AD_MN_02',1,'Menu-Estado','Menu Estado',10,'A','Pendiente','2021-07-07 22:47:25','SAFAdministrativo.ViewControllerAdministrativo.1.0-SNAPSHOT'),(43,1,'AD_MN_01','P',1,'Principal','Es menu principal',1,'A','Pendiente','2021-07-07 22:50:25','SAFAdministrativo.ViewControllerAdministrativo.1.0-SNAPSHOT'),(44,1,'AD_MN_01','S',2,'Secundario','Menu Secundario',2,'A','Pendiente','2021-07-07 22:51:02','SAFAdministrativo.ViewControllerAdministrativo.1.0-SNAPSHOT'),(45,1,'AD_MN_01','U',2,'Usuario','Menu de Usuario',3,'A','Pendiente','2021-07-07 22:51:27','SAFAdministrativo.ViewControllerAdministrativo.1.0-SNAPSHOT'),(46,1,'AD_MN_01','S',4,'Salir','Menu de salida ',4,'A','Pendiente','2021-07-07 22:52:03','SAFAdministrativo.ViewControllerAdministrativo.1.0-SNAPSHOT'),(47,1,'AD_MN_02','A',1,'Activo','Menu activo',2,'A','Pendiente','2021-07-07 22:52:29','SAFAdministrativo.ViewControllerAdministrativo.1.0-SNAPSHOT'),(48,1,'AD_MN_02','I',2,'Inactivo','Menu inactivo',1,'A','Pendiente','2021-07-07 22:52:47','SAFAdministrativo.ViewControllerAdministrativo.1.0-SNAPSHOT'),(49,1,'001','AD_PR_01',1,'Permiso-Crear','Permisos de creación, actualizar, borrar y auditar',8,'A','Pendiente','2021-07-08 16:36:32','SAFAdministrativo.ViewControllerAdministrativo.1.0-SNAPSHOT'),(50,1,'AD_PR_01','S',1,'Si','Esta habilitado',1,'A','Pendiente','2021-07-08 16:37:51','SAFAdministrativo.ViewControllerAdministrativo.1.0-SNAPSHOT'),(51,1,'AD_PR_01','N',0,'No','No Habilitado',2,'A','Pendiente','2021-07-08 16:38:13','SAFAdministrativo.ViewControllerAdministrativo.1.0-SNAPSHOT'),(52,4,'001','CL_PR_01',1,'Estado proyecto','Estado proyecto',7,'A','omar','2022-01-20 14:41:54','/ViewControllerAdministrativo'),(53,4,'CL_PR_01','A',1,'Activo','Proyecto Activo/Ejecución ',1,'A','omar','2022-01-20 14:42:40','/ViewControllerAdministrativo'),(54,4,'001','CL_UB_01',2,'Ubicación','CDU para la ubicación de clientes',3,'A','omar','2022-01-28 00:37:24','/Administrativo-001'),(55,4,'CL_UB_01','E',1,'Email','Correo de contacto',2,'A','omar','2022-01-28 00:40:08','/Administrativo-001'),(56,4,'CL_UB_01','C',2,'Celular','Teléfono Celular',1,'A','omar','2022-01-28 00:42:06','/Administrativo-001'),(57,4,'CL_UB_01','T',3,'Teléfono','Teléfono Fijo',3,'A','omar','2022-01-28 00:42:35','/Administrativo-001'),(58,6,'001','MV_LD_01',1,'Tipo de Direcciones','Tipo de direcciones para el manifiesto',1,'A','omar','2022-02-18 23:05:46','/Administrativo-001'),(59,6,'MV_LD_01','C',1,'Aerolinea','Aerolinea',0,'A','omar','2022-02-18 23:06:27','/Administrativo-001'),(60,6,'MV_LD_01','AR',2,'Aeropuerto','Aeropuerto Origen/Desino ',1,'A','omar','2022-02-18 23:08:23','/Administrativo-001'),(61,6,'MV_LD_01','CA',2,'Aeronave','Idenfivicacion de Avion',2,'A','omar','2022-02-18 23:09:00','/Administrativo-001'),(62,6,'001','MV_LD_02',2,'Estado libro de direcciones','Estado libro de direcciones si esta borrado acitivo, etc',2,'A','omar','2022-02-20 16:09:55','/Administrativo-001'),(63,6,'MV_LD_02','A',1,'Activo','Activo',0,'A','omar','2022-02-20 16:11:02','/Administrativo-001'),(64,6,'MV_LD_02','I',1,'Inactivo','Inactivo',2,'A','omar','2022-02-20 16:11:29','/Administrativo-001'),(65,6,'MV_LD_02','X',2,'Borrado','Borrado Logico',2,'A','omar','2022-02-20 16:11:51','/Administrativo-001'),(66,6,'001','MV_LD_03',3,'Estado Sin borrar','Estado Sin borrar',4,'A','omar','2022-02-20 16:50:01','/Administrativo-001'),(67,6,'MV_LD_03','A',1,'Activo','Activo',0,'A','omar','2022-02-20 16:11:02','/Administrativo-001'),(68,6,'MV_LD_03','I',1,'Inactivo','Inactivo',2,'A','omar','2022-02-20 16:11:29','/Administrativo-001'),(69,6,'001','MV_MN_02',4,'Tipo de Manifiesto','Tipo de Manifiesto',18,'A','omar','2022-02-21 23:37:02','/Administrativo-001'),(70,6,'MV_MN_02','N',0,'Nacional','Vuelo Local',0,'A','omar','2022-02-21 23:37:34','/Administrativo-001'),(71,6,'MV_MN_02','I',1,'Internacional','Vuelo Internacional',2,'A','omar','2022-02-21 23:38:51','/Administrativo-001'),(72,6,'001','MV_MN_01',2,'Estado','Estado de manifiesto',5,'A','omar','2022-02-22 00:02:12','/Administrativo-001'),(73,6,'MV_MN_01','C',1,'Creado','Creado',1,'A','omar','2022-02-22 00:02:42','/Administrativo-001'),(74,6,'MV_MN_01','B',2,'Bloqueado','Bloqueado para Ediciones',2,'A','omar','2022-02-22 00:03:29','/Administrativo-001'),(75,6,'MV_MN_01','JDE',3,'JDE','Pasado a JDE',3,'A','omar','2022-02-22 00:04:04','/Administrativo-001'),(76,6,'MV_MN_01','BADCON',4,'(X) Conexion','Error al Conectarse a JDE',4,'A','omar','2022-02-22 00:04:48','/Administrativo-001'),(77,6,'MV_MN_01','BAD1',5,'Error JDE (1)','Error al pasar a JDE',4,'A','omar','2022-02-22 00:04:48','/Administrativo-001'),(78,6,'MV_MN_01','BAD2',5,'Error JDE (2)','Error al pasar a JDE',5,'A','omar','2022-02-22 00:04:48','/Administrativo-001'),(79,6,'MV_MN_01','BAD3',5,'Error JDE (3)','Error al pasar a JDE',6,'A','omar','2022-02-22 00:04:48','/Administrativo-001'),(80,6,'001','MV_MN_03',2,'Cancelado','Vuelo Cancelado',5,'A','omar','2022-02-22 00:04:48','/Administrativo-001'),(81,6,'MV_MN_03','N',1,'Ninguna','Ninguna',0,'A','omar','2023-02-01 21:45:15','/Administrativo-001'),(82,6,'MV_MN_03','C',2,'Vuelo Cancelado','Vuelo Cancelado',1,'A','omar','2023-02-01 21:45:15','/Administrativo-001'),(83,1,'AD_RL_02','CLI-03',5,'Cliente 03','Rol-Cliente 03',6,'A','ovelez','2021-06-18 17:15:10','manual'),(84,6,'MV_MN_03','F',3,'Ferry','Ferry',1,'A','omar','2023-02-01 21:45:15','/Administrativo-001'),(85,6,'MV_MN_03','T',4,'Traslado','Traslado',1,'A','omar','2023-02-01 21:45:15','/Administrativo-001'),(86,6,'MV_MN_03','S',5,'Cobro por extemporaneidad o por Resolucion','Cobro por extemporaneidad o por Resolucion',1,'A','omar','2023-02-01 21:45:15','/Administrativo-001');
/*!40000 ALTER TABLE `codigo_definido_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `error`
--

DROP TABLE IF EXISTS `error`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `error` (
  `id_error` int NOT NULL AUTO_INCREMENT,
  `indice` varchar(128) NOT NULL COMMENT 'Indice de error',
  `mensaje` varchar(1024) NOT NULL COMMENT 'Mensaje de error',
  `descripcion` varchar(4098) DEFAULT NULL COMMENT 'Descripcion del mensaje de error',
  `usuario` varchar(128) NOT NULL COMMENT 'Usuario que realizo el cambio',
  `usuario_fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de insercion del registro',
  `usuario_programa` varchar(256) NOT NULL COMMENT 'Programa usado para el cambio',
  PRIMARY KEY (`id_error`),
  KEY `error_indice_IDX` (`indice`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `error`
--

LOCK TABLES `error` WRITE;
/*!40000 ALTER TABLE `error` DISABLE KEYS */;
INSERT INTO `error` VALUES (1,'SAF000001','SAF000001 Error commit para el codigo {0} en la ubicacion {1}.{2}(). Motivado por: {3}','Mensaje que se usa al dar: \n\ncommitRollback(elemento, \"metodoInvocado\");\n\nelemento: es el campo de los datos que va a indicar los datos que se esten haciendo.\n\n\"metodoInvocado\": es el campo con el nombre del metodo que invoca el commitRollback \n\n','ovelez','2021-05-04 23:03:08','manual'),(2,'SAF000002','SAF000002 Error al registrar el acceso {0}','Mensaje que se usa al dar: \n\ncrearAcceso(SAFAuditoriaModuloImpl moduloAplicacion, String nombre, String token, String tokenApi, String usuarioPrograma)\n\nNo fue capaz de ejecutar','ovelez','2021-05-04 23:03:08','manual');
/*!40000 ALTER TABLE `error` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `informacion`
--

DROP TABLE IF EXISTS `informacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `informacion` (
  `id_informacion` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(128) NOT NULL COMMENT 'Nombre de la información a relatar',
  `valor_01` varchar(256) NOT NULL COMMENT 'Valor 01',
  `valor_02` varchar(256) DEFAULT NULL COMMENT 'Valor 02',
  `usuario` varchar(128) NOT NULL COMMENT 'Usuario que realizo el cambio',
  `usuario_fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de insercion del registro',
  `usuario_programa` varchar(256) NOT NULL COMMENT 'Programa usado para el cambio',
  PRIMARY KEY (`id_informacion`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `informacion`
--

LOCK TABLES `informacion` WRITE;
/*!40000 ALTER TABLE `informacion` DISABLE KEYS */;
INSERT INTO `informacion` VALUES (1,'Nombre','GS_001_00','','ovelez','2012-12-12 17:12:12','manual'),(2,'Descripción','General Setup version 001','..','ovelez','2012-12-12 17:12:12','manual'),(3,'Autor','administracion@procesoelectronico.com','..','ovelez','2021-04-08 14:58:38','manual');
/*!40000 ALTER TABLE `informacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu` (
  `id_menu` int NOT NULL AUTO_INCREMENT,
  `id_modulo` int DEFAULT NULL COMMENT 'Id de modulo',
  `tipo` varchar(8) NOT NULL COMMENT 'Tipo de menu, P=principal, S=secundario, U=usuario y S=salir',
  `indice` varchar(32) NOT NULL COMMENT 'Indice con el que se conce al menu de forma simplificada',
  `nombre` varchar(128) NOT NULL COMMENT 'Nombre del indice',
  `task_flow` varchar(128) NOT NULL COMMENT 'Contexto del modulo',
  `estado` varchar(8) DEFAULT NULL COMMENT 'Estado del listado A=Activo, I=Inactivo',
  `orden` int DEFAULT '0' COMMENT 'Orden de presentacion',
  `usuario` varchar(128) NOT NULL COMMENT 'Usuario que realizo el cambio',
  `usuario_fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de insercion del registro',
  `usuario_programa` varchar(256) NOT NULL COMMENT 'Programa usado para el cambio',
  PRIMARY KEY (`id_menu`),
  KEY `menu_indice_IDX` (`indice`),
  KEY `menu_FK` (`id_modulo`),
  CONSTRAINT `menu_FK` FOREIGN KEY (`id_modulo`) REFERENCES `modulo` (`id_modulo`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (3,1,'P','LG-US-001','Usuario','/WEB-INF/usuario-task-flow.xml#usuario-task-flow','A',1,'Pendiente','2021-07-09 00:39:01','SAFAdministrativo.ViewControllerAdministrativo.1.0-SNAPSHOT'),(6,2,'P','GS-RL-001','Roles','/WEB-INF/rol-task-flow.xml#rol-task-flow','A',3,'Pendiente','2021-07-09 05:02:06','SAFAdministrativo.ViewControllerAdministrativo.1.0-SNAPSHOT'),(9,2,'P','GS-MN-001','Menús','/WEB-INF/menu-task-flow.xml#menu-task-flow','A',2,'Pendiente','2021-07-09 05:19:24','SAFAdministrativo.ViewControllerAdministrativo.1.0-SNAPSHOT'),(10,2,'P','GS-CD-001','Códigos Definidos','/WEB-INF/cdu-task-flow.xml#cdu-task-flow','A',4,'Pendiente','2021-07-11 17:40:39','SAFAdministrativo.ViewControllerAdministrativo.1.0-SNAPSHOT'),(11,2,'P','GS-ER-001','Errores','/WEB-INF/error-task-flow.xml#error-task-flow','A',6,'Pendiente','2022-01-04 15:53:49','manual'),(12,2,'P','GS-IN-001','Información','/WEB-INF/informacion-task-flow.xml#informacion-task-flow','A',7,'Pendiente','2022-01-04 16:28:04','manual'),(13,3,'P','IW-EN-001','Reportes','/WEB-INF/reporte-task-flow.xml#reporte-task-flow','A',1,'Pendiente','2022-01-05 04:54:14','manual'),(14,4,'P','CL_001','Cliente','/WEB-INF/cliente-task-flow#cliente-task-flow','A',2,'omar','2022-01-06 13:43:16','/ViewControllerAdministrativo'),(15,2,'P','GS-US-001','Usuarios','/WEB-INF/usuario-task-flow.xml#usuario-task-flow','A',5,'omar','2022-01-08 05:40:54','/ViewControllerAdministrativo'),(16,2,'P','GS-MD-001','Módulos','/WEB-INF/modulo-task-flow.xml#modulo-task-flow','A',1,'omar','2022-01-20 13:53:00','/ViewControllerAdministrativo'),(18,4,'P','CS_PR_001','Proyecto','/WEB-INF/proyecto-task-flow#proyecto-task-flow','A',1,'omar','2022-01-25 14:42:01','/Administrativo-001'),(19,4,'P','CS_CT_001','Contacto','/WEB-INF/contacto-task-flow#contacto-task-flow','A',3,'omar','2022-02-08 14:53:37','/Administrativo-001'),(20,6,'P','MV_RG_001','Cierre de Vuelo ADM','/WEB-INF/manifiesto-usuario-task-flow.xml#manifiesto-usuario-task-flow','A',1,'omar','2022-02-18 18:18:04','/Administrativo-001'),(21,6,'P','MV_AL_001','Cierre de Vuelo','/WEB-INF/manifiesto-usuario-task-flow.xml#manifiesto-usuario-task-flow','A',2,'omar','2022-02-18 20:10:46','/Administrativo-001'),(22,6,'P','MV_LD_001','Libro Direcciones','/WEB-INF/libro-direccion-task-flow.xml#libro-direccion-task-flow','A',5,'omar','2022-02-20 16:37:18','/Administrativo-001'),(23,6,'P','MV_TT_001','Tasas Timbres','/WEB-INF/tasa-task-flow.xml#tasa-task-flow','A',6,'admin','2022-03-15 18:03:26','/Administrativo-001'),(24,2,'P','GS-CC-001','Cambio Clave','/WEB-INF/clave-task-flow.xml#clave-task-flow','A',8,'root','2022-06-14 00:04:43','/Administrativo-001'),(25,6,'P','MV_ER_001','Envio Cierre Vuelo','/WEB-INF/error-rest-task-flow.xml#error-rest-task-flow','A',7,'admin','2022-03-15 18:03:26','/Administrativo-001'),(26,6,'P','MV_PL_001','Preliquidación','/WEB-INF/preliquidacion-task-flow.xml#preliquidacion-task-flow','A',4,'root','2023-02-16 23:53:55','/Administrativo-001'),(27,6,'P','MV_UP_001','Proceso Lotes','/WEB-INF/manifiesto-up-task-flow.xml#manifiesto-up-task-flow','A',3,'root','2023-02-23 12:36:54','/Administrativo-001'),(28,6,'P','FA_CL_001','Filiales','/WEB-INF/filial-task-flow.xml#filial-task-flow','A',3,'root','2023-02-23 12:36:54','/Administrativo-001');
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modulo`
--

DROP TABLE IF EXISTS `modulo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modulo` (
  `id_modulo` int NOT NULL AUTO_INCREMENT,
  `indice` varchar(32) NOT NULL COMMENT 'Indici con el que se conce al modulo de forma simplificada',
  `nombre` varchar(128) NOT NULL COMMENT 'Nombre del indice',
  `contexto` varchar(128) NOT NULL COMMENT 'Contexto de aplicacion',
  `usuario` varchar(128) NOT NULL COMMENT 'Usuario que realizo el cambio',
  `usuario_fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de insercion del registro',
  `usuario_programa` varchar(256) NOT NULL COMMENT 'Programa usado para el cambio',
  `estado` varchar(8) DEFAULT NULL COMMENT 'Estado del listado A=Activo, I=Inactivo y X=Eliminado',
  PRIMARY KEY (`id_modulo`),
  KEY `modulo_indice_IDX` (`indice`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modulo`
--

LOCK TABLES `modulo` WRITE;
/*!40000 ALTER TABLE `modulo` DISABLE KEYS */;
INSERT INTO `modulo` VALUES (1,'LG_001_00','Login','https://testtasasytimbres.aerocivil.gov.co/Login-001/faces/LOG001?server=GF5&?token=','ovelez','2021-05-16 22:47:55','manual','I'),(2,'GS_001_00','X. Configuración','https://testtasasytimbres.aerocivil.gov.co/Administrativo-001/faces/LOG001?server=GF5&?token=','Pendiente','2021-07-07 23:24:44','SAFAdministrativo.ViewControllerAdministrativo.1.0-SNAPSHOT','A'),(3,'IW_001_00','Reportes Impresiones','ViewControllerReportes/faces/LOG001','Pendiebnte','2022-01-05 04:52:13','manual','I'),(4,'CS_001_00','Cliente SAF','Cliente-001/faces/LOG001','omar','2022-01-06 13:40:57','/ViewControllerAdministrativo','I'),(6,'MV_001_00','Manifiesto','https://testtasasytimbres.aerocivil.gov.co/Manifiesto-001/faces/LOG001?server=GF5&?token=','omar','2022-02-18 18:13:50','/Administrativo-001','A'),(7,'GA_001_00','Gestion de Archivos','Archivo-001/faces/LOG001','omar','2022-02-25 04:30:28','/Administrativo-001','I'),(8,'BD_001_00','Base Desarrollo','BaseDesarrollo-001/faces/LOG001','omar','2022-02-25 04:30:28','/Administrativo-001','I');
/*!40000 ALTER TABLE `modulo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parametro`
--

DROP TABLE IF EXISTS `parametro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parametro` (
  `id_parametro` int NOT NULL AUTO_INCREMENT,
  `id_modulo` int DEFAULT NULL,
  `indice` varchar(32) NOT NULL COMMENT 'Indice de busquedas',
  `clave` varchar(8) DEFAULT NULL COMMENT 'Si los campos te texto son o no encriptados',
  `nombre` varchar(128) NOT NULL COMMENT 'Nombre del parametro',
  `descripcion` varchar(512) NOT NULL COMMENT 'Descripción del campo a ser usado',
  `valor_texto_01` varchar(256) DEFAULT NULL COMMENT 'Valor texto a parametro',
  `valor_texto_02` varchar(256) DEFAULT NULL COMMENT 'Valor texto a parametro',
  `valor_numero_01` double DEFAULT NULL COMMENT 'Valor numero a parametro',
  `valor_numero_02` double DEFAULT NULL COMMENT 'Valor numero a parametro',
  `default_texto_01` varchar(256) DEFAULT NULL COMMENT 'Default texto 01',
  `default_texto_02` varchar(256) DEFAULT NULL COMMENT 'Default texto 02',
  `default_numero_01` double DEFAULT NULL COMMENT 'Default numero 01',
  `default_numero_02` double DEFAULT NULL COMMENT 'Default numero 02',
  `usuario` varchar(128) NOT NULL COMMENT 'Usuario que realizo el cambio',
  `usuario_fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de insercion del registro',
  `usuario_programa` varchar(256) NOT NULL COMMENT 'Programa usado para el cambio',
  PRIMARY KEY (`id_parametro`),
  KEY `parametro_FK` (`id_modulo`),
  KEY `parametro_indice_IDX` (`indice`) USING BTREE,
  CONSTRAINT `parametro_FK` FOREIGN KEY (`id_modulo`) REFERENCES `modulo` (`id_modulo`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parametro`
--

LOCK TABLES `parametro` WRITE;
/*!40000 ALTER TABLE `parametro` DISABLE KEYS */;
INSERT INTO `parametro` VALUES (2,1,'002','N','Tiempo de espera ante intentos fallidos','Tiempo en horas, antes que la clave vuelva a estar activo','','',2,NULL,'<No Definido>','<No Definido>',NULL,2,'ovelez','2021-05-16 23:00:24','manual'),(8,1,'001','N','Numero de Intentos','Numero de Intentos que el login tendra antes de bloquear',NULL,NULL,3,0,'<No Definido>','<No Definido>',3,0,'Pendiente','2021-07-05 21:54:10','SAFAdministrativo.ViewControllerAdministrativo.1.0-SNAPSHOT'),(9,1,'003','N',' reCAPTCHA','reCAPTCHA al sitio web  \"loginADF\"','6LfRpt8bAAAAAFUbbzttVV5FrAhSiIN5vZUsekSL','6LfRpt8bAAAAANCPK5xqiHX2GTp3xC7MmTSL-p4o',NULL,NULL,'Clave del sitio Web','Clave secreta Servidor',0,0,'weblogic','2021-08-05 15:05:49','SAFAdministrativo.ViewControllerAdministrativo.1.0-SNAPSHOT'),(10,1,'004','N','Contexto Usuario','Contexto Usuario nuevo y/o cambio clave + idMenu menu de cambio de clave','https://testtasasytimbres.aerocivil.gov.co/Administrativo-001/faces/LOG001?server=GF5&?token=','',24,NULL,'Contexto de Usuario','Contexto de Usuario',0,0,'weblogic','2021-08-05 15:05:49','SAFAdministrativo.ViewControllerAdministrativo.1.0-SNAPSHOT'),(11,1,'005','N','Plantilla notificación enviar token','id Plantilla notificación enviar token',NULL,NULL,1,NULL,'Expresión Regular de validación','Mensaje de validación',0,0,'omar','2022-01-22 05:43:02','/Administrativo-001'),(13,2,'001','N','Expresion Regular para el cambio de claves','Expresion regular para claves ^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}]:;\',?/*~$^+=<>]).{8,20}$','^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}]:;\',?/*~$^+=<>]).{8,20}$','Debe contener: del 0-9, A-Z, a-z y los caracteres ! @ # & ( ) ; en un largo de 8-20 caracteres ',2,NULL,'<No Definido>','<No Definido>',2,0,'omar','2022-01-27 05:30:31','/Administrativo-001'),(14,8,'200','N','Path Relativo','Path Relativo para guardado de archivos','/home/azureuser/',NULL,NULL,NULL,'<No Definido>','<No Definido>',0,0,'omar','2022-02-25 04:31:17','/Administrativo-001'),(15,1,'100','N','Servidor por default de seguridades','Servidor por default de seguridades o proveedor o tecnologia de servidor, puede ser WLS12 GF5','GF5','',2,NULL,'<No Definido>','<No Definido>',NULL,2,'ovelez','2021-05-16 23:00:24','manual'),(16,2,'100','N','Servidor por default de seguridades','Servidor por default de seguridades o proveedor o tecnologia de servidor, puede ser WLS12 GF5','GF5','',2,NULL,'<No Definido>','<No Definido>',NULL,2,'ovelez','2021-05-16 23:00:24','manual'),(18,8,'50','N','Logout del modulo','Logout del modulo','https://testtasasytimbres.aerocivil.gov.co/Login-001/faces/Home.jspx',NULL,NULL,NULL,'<No Definido>','<No Definido>',0,0,'omar','2022-02-25 04:31:17','/Administrativo-001'),(19,2,'50','N','Logout del modulo','Logout del modulo','https://testtasasytimbres.aerocivil.gov.co/Login-001/faces/Home.jspx',NULL,NULL,NULL,'/homo/user','<No Definido>',0,0,'omar','2022-02-25 04:31:17','/Administrativo-001'),(20,1,'50','N','Logout del modulo','Logout del modulo','https://testtasasytimbres.aerocivil.gov.co/Login-001/faces/Home.jspx',NULL,NULL,NULL,'/homo/user','<No Definido>',0,0,'omar','2022-02-25 04:31:17','/Administrativo-001'),(21,6,'200','N','Path Relativo','Path Relativo para guardado de archivos','/home/azureuser/',NULL,NULL,NULL,'<No Definido>','<No Definido>',0,0,'omar','2022-02-25 04:31:17','/Administrativo-001'),(26,6,'001','N','URL Servicio manifiesto JDE','URL Servicio manifiesto JDE','https://172.16.51.177:8089/PY920/IntegracionPortalTasasTimbres',NULL,NULL,NULL,'https://186.31.107.90:8089/PY920/IntegracionPortalTasasTimbres','<No Definido>',0,0,'omar','2022-02-25 04:31:17','/Administrativo-001'),(27,6,'002','N','Usuario/Clave URL Servicio manifiesto JDE','Usuario/Clave URL Servicio manifiesto JDE','CONSULTOR','C0nsult0r2021#*',NULL,NULL,'Usuario/Clave asignado desde  JDE ','<No Definido>',0,0,'omar','2022-02-25 04:31:17','/Administrativo-001'),(28,6,'003','N','Path de archivo de llave SSL','Path de archivo de llave SSL que debe ser obtenida desde el sitio https  /home/azureuser/ssl_jde_aerocivil','/home/azureuser/certificado','12341234s',NULL,NULL,'Path de SSL','<No Definido>',0,0,'omar','2022-02-25 04:31:17','/Administrativo-001'),(31,1,'006','N','URL empresarial','Url empresarial','https://www.aerocivil.gov.co/',NULL,1,NULL,'Expresión Regular de validación','Mensaje de validación',0,0,'omar','2022-01-22 05:43:02','/Administrativo-001'),(32,1,'007','N','URL Declaimer','URL de declaimer del sitio web, se usa para dar informacion legal o de contenido variado','https://testtasasytimbres.aerocivil.gov.co/Imagen-001/declaimer.html',NULL,1,NULL,'Expresión Regular de validación','Url del Declamer',0,0,'omar','2022-01-22 05:43:02','/Administrativo-001'),(33,6,'004','N','Dias de seguridad para ingreso de Cierres','Dias de seguridad para ingreso de Cierres','','',120,1,'','',1,0,'omar','2022-02-25 04:31:17','/Administrativo-001'),(34,6,'005','N','Maximo de ocupantes de los aviones','Maximo de ocupantes de los aviones validaciones',NULL,NULL,501,NULL,NULL,NULL,501,0,'omar','2022-02-25 04:31:17','/Administrativo-001'),(35,1,'300','N','Notificacion Solicitud Nueva Clave','Notificacion Solicitud Nueva Clave (Formato y Servicio)','',NULL,1,1,'','',1,1,'ovelez','2022-02-25 04:31:17','/Administrativo-001'),(36,2,'300','N','Notificacion Crear Clave ','Notificacion Crear Clave (Formato y Servicio)','',NULL,2,1,' ',' ',2,1,'omar','2022-02-25 04:31:17','/Administrativo-001'),(37,2,'301','N','Notificacion Cambio Clave ','Notificacion Cambio Clave (Formato y Servicio)','',NULL,1,1,' ',' ',1,1,'omar','2022-02-25 04:31:17','/Administrativo-001'),(38,6,'50','N','Logout del modulo','Logout del modulo','https://testtasasytimbres.aerocivil.gov.co/Login-001/faces/Home.jspx',NULL,NULL,NULL,'/homo/user','<No Definido>',0,0,'omar','2022-02-25 04:31:17','/Administrativo-001'),(39,6,'201','N','Path Imagen Derecha','Path Imagen Derecha','/home/azureuser/Manifiesto/Imagenes/derecha.jpg',NULL,NULL,NULL,'/home/ovelez/derecha.jpg','<No Definido>',0,0,'omar','2022-02-24 23:31:17','/Administrativo-001'),(40,6,'202','N','Path Imagen Derecha','Path Imagen Derecha','/home/azureuser/Manifiesto/Imagenes/izquierda.jpg',NULL,NULL,NULL,'/home/ovelez/izquierda.jpg','<No Definido>',0,0,'omar','2022-02-24 23:31:17','/Administrativo-001'),(41,6,'203','N','Titulo impuesto','Titulo impuesto','IMPUESTO DE TIMBRE NACIONAL\nLEY 2 DE 1976 Y RESOLUCIÓN 1545 DE 2 DE JULIO DE 2015',NULL,NULL,NULL,'IMPUESTO DE TIMBRE NACIONAL\nLEY 2 DE 1976 Y RESOLUCIÓN 1545 DE 2 DE JULIO DE 2015','<No Definido>',0,0,'omar','2022-02-24 23:31:17','/Administrativo-001'),(42,6,'204','N','Titulo impuesto','Titulo impuesto','AERONÁUTICA CIVIL DE COLOMBIA\nLIQUIDACIÓN DE PAGO',NULL,NULL,NULL,'AERONÁUTICA CIVIL DE COLOMBIA\nLIQUIDACIÓN DE PAGO','<No Definido>',0,0,'omar','2022-02-24 23:31:17','/Administrativo-001');
/*!40000 ALTER TABLE `parametro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permiso`
--

DROP TABLE IF EXISTS `permiso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permiso` (
  `id_permiso` int NOT NULL AUTO_INCREMENT,
  `id_menu` int DEFAULT NULL COMMENT 'Id de menu',
  `id_rol` int DEFAULT NULL COMMENT 'Id de Rol',
  `crear` varchar(8) NOT NULL COMMENT 'Si el menu permite crear',
  `actualizar` varchar(8) NOT NULL COMMENT 'Si el menu permite actualizar',
  `borrar` varchar(8) NOT NULL COMMENT 'Si el menu permite borrar',
  `ver_auditoria` varchar(8) NOT NULL COMMENT 'Si el menu permite ver la auditoria',
  `usuario` varchar(128) NOT NULL COMMENT 'Usuario que realizo el cambio',
  `usuario_fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de insercion del registro',
  `usuario_programa` varchar(256) NOT NULL COMMENT 'Programa usado para el cambio',
  PRIMARY KEY (`id_permiso`),
  KEY `permiso_FK` (`id_rol`),
  KEY `permiso_FK_1` (`id_menu`),
  CONSTRAINT `permiso_FK` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `permiso_FK_1` FOREIGN KEY (`id_menu`) REFERENCES `menu` (`id_menu`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permiso`
--

LOCK TABLES `permiso` WRITE;
/*!40000 ALTER TABLE `permiso` DISABLE KEYS */;
INSERT INTO `permiso` VALUES (4,6,1,'S','S','S','S','Pendiente','2021-07-09 05:02:38','SAFAdministrativo.ViewControllerAdministrativo.1.0-SNAPSHOT'),(12,10,1,'S','S','S','S','Pendiente','2021-07-11 17:45:20','SAFAdministrativo.ViewControllerAdministrativo.1.0-SNAPSHOT'),(15,11,1,'S','S','S','S','Pendiente','2022-01-04 15:54:50','manual'),(17,12,1,'S','S','S','S','Pendiente','2022-01-04 16:28:32','manual'),(19,13,1,'S','S','S','S','Pendiente','2022-01-05 04:54:43','manual'),(23,15,1,'S','S','S','S','omar','2022-01-08 05:55:12','/ViewControllerAdministrativo'),(25,3,1,'S','S','S','S','omar','2022-01-19 04:56:31','/ViewControllerAdministrativo'),(72,21,1,'S','S','S','S','admin','2022-03-09 14:32:55','/Administrativo-001'),(78,23,1,'S','S','S','S','admin','2022-03-15 18:03:59','/Administrativo-001'),(81,16,1,'S','S','S','S','admin','2022-03-23 09:42:49','/Administrativo-001'),(82,9,1,'S','S','S','S','admin','2022-03-23 09:43:27','/Administrativo-001'),(83,22,1,'S','S','S','S','admin','2022-03-23 09:48:03','/Administrativo-001'),(84,20,1,'S','S','S','S','admin','2022-03-23 09:48:39','/Administrativo-001'),(85,21,11,'S','S','S','S','root','2022-03-23 10:04:44','/Administrativo-001'),(86,3,11,'S','S','S','S','root','2022-03-23 10:43:27','/Administrativo-001'),(87,15,12,'S','S','S','S','root','2022-03-23 10:48:31','/Administrativo-001'),(88,20,12,'N','N','N','S','root','2022-03-23 10:50:07','/Administrativo-001'),(89,23,12,'S','S','S','S','root','2022-03-23 10:53:37','/Administrativo-001'),(90,22,12,'S','S','S','S','root','2022-03-23 10:58:50','/Administrativo-001'),(91,3,12,'S','S','S','S','root','2022-03-23 11:05:09','/Administrativo-001'),(92,3,13,'S','S','S','S','root','2022-03-23 11:05:17','/Administrativo-001'),(93,22,13,'S','S','S','S','root','2022-03-23 11:05:37','/Administrativo-001'),(94,20,13,'S','S','S','S','root','2022-03-23 11:07:22','/Administrativo-001'),(99,24,12,'S','S','S','S','root','2022-06-14 00:05:38','/Administrativo-001'),(100,24,11,'S','S','S','S','root','2022-06-14 00:05:44','/Administrativo-001'),(101,24,1,'S','S','S','S','root','2022-06-14 00:05:56','/Administrativo-001'),(102,24,13,'S','S','S','S','root','2022-06-14 00:06:04','/Administrativo-001'),(103,25,1,'S','S','S','S','admin','2022-03-15 18:03:59','/Administrativo-001'),(104,25,12,'S','S','S','S','root','2022-03-23 10:53:37','/Administrativo-001'),(105,20,15,'N','N','N','N','root','2023-02-09 03:25:56','/Administrativo-001'),(106,26,12,'S','S','S','S','root','2023-02-16 23:55:03','/Administrativo-001'),(107,26,11,'S','S','S','S','root','2023-02-16 23:55:14','/Administrativo-001'),(108,26,1,'S','S','S','S','root','2023-02-16 23:55:21','/Administrativo-001'),(109,27,11,'S','S','S','S','root','2023-02-23 12:38:23','/Administrativo-001'),(110,27,13,'S','S','S','S','root','2023-02-23 12:38:34','/Administrativo-001'),(111,27,1,'S','S','S','S','root','2023-02-23 12:39:13','/Administrativo-001'),(112,3,15,'S','S','S','S','root','2023-08-03 12:40:57','/Administrativo-001'),(113,24,15,'S','S','S','S','root','2023-08-03 12:47:15','/Administrativo-001'),(114,27,15,'S','S','S','S','root','2023-10-17 17:39:36','/Administrativo-001'),(115,26,15,'S','S','S','S','root','2023-10-17 17:46:18','/Administrativo-001'),(116,26,13,'S','S','S','S','root','2023-12-12 22:16:21','/Administrativo-001'),(117,28,12,'S','S','S','S','root','2023-10-17 17:39:36','/Administrativo-001'),(118,28,1,'S','S','S','S','root','2023-10-17 17:39:36','/Administrativo-001'),(119,21,15,'S','S','S','S','root','2024-02-15 16:46:17','/Administrativo-001');
/*!40000 ALTER TABLE `permiso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `id_rol` int NOT NULL AUTO_INCREMENT,
  `id_modulo` int DEFAULT NULL COMMENT 'Menu al que afecta este modulo',
  `nombre` varchar(128) NOT NULL COMMENT 'Nombre del rol',
  `tipo` varchar(8) NOT NULL COMMENT 'Tipo de Rol tecnico en desarrollo JANZ',
  `estado` varchar(8) NOT NULL COMMENT 'Estado del listado A=Activo, I=Inactivo y X=Eliminado',
  `usuario` varchar(128) NOT NULL COMMENT 'Usuario que realizo el cambio',
  `usuario_fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de insercion del registro',
  `usuario_programa` varchar(256) NOT NULL COMMENT 'Programa usado para el cambio',
  PRIMARY KEY (`id_rol`),
  KEY `rol_FK` (`id_modulo`),
  CONSTRAINT `rol_FK` FOREIGN KEY (`id_modulo`) REFERENCES `modulo` (`id_modulo`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,2,'Root-SuperUsuarios','ROOT','A','sdfsadf','2021-06-21 22:01:53','fsdfs'),(11,6,'Aerolinea','CLI-02','A','root','2022-03-23 10:01:34','/Administrativo-001'),(12,6,'Administrador','ADM','A','root','2022-03-23 10:47:54','/Administrativo-001'),(13,6,'Supervisor','CLI-01','A','root','2022-03-23 11:04:09','/Administrativo-001'),(15,6,'Supervisor Aerolinea','CLI-03','A','root','2023-02-09 03:25:08','/Administrativo-001');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol_usuario`
--

DROP TABLE IF EXISTS `rol_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol_usuario` (
  `id_rol_usuario` int NOT NULL AUTO_INCREMENT,
  `id_rol` int NOT NULL,
  `id_usuario` int NOT NULL,
  `usuario` varchar(128) NOT NULL COMMENT 'Usuario que realizo el cambio',
  `usuario_fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de insercion del registro',
  `usuario_programa` varchar(256) NOT NULL COMMENT 'Programa usado para el cambio',
  PRIMARY KEY (`id_rol_usuario`),
  KEY `rol_usuario_FK` (`id_rol`),
  KEY `rol_usuario_FK_1` (`id_usuario`),
  CONSTRAINT `rol_usuario_FK` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`),
  CONSTRAINT `rol_usuario_FK_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=252 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol_usuario`
--

LOCK TABLES `rol_usuario` WRITE;
/*!40000 ALTER TABLE `rol_usuario` DISABLE KEYS */;
INSERT INTO `rol_usuario` VALUES (39,1,15,'admin','2022-03-23 09:42:33','/Administrativo-001'),(42,12,13,'root','2022-03-23 10:49:10','/Administrativo-001'),(43,13,25,'root','2022-03-23 11:25:14','/Administrativo-001'),(44,11,26,'admin','2022-03-23 14:38:00','/Administrativo-001'),(49,12,29,'admin','2022-04-18 15:33:38','/Administrativo-001'),(51,12,31,'cgaribello','2022-04-18 22:22:39','/Administrativo-001'),(52,12,32,'supervisor','2022-04-20 22:09:10','/Administrativo-001'),(59,11,39,'admin','2022-06-13 16:14:49','/Administrativo-001'),(66,13,42,'cgaribello','2022-07-25 20:50:47','/Administrativo-001'),(67,11,43,'cgaribello','2022-07-26 15:26:22','/Administrativo-001'),(69,11,45,'cgaribello','2022-10-27 12:07:56','/Administrativo-001'),(70,11,46,'cgaribello','2022-10-27 12:10:55','/Administrativo-001'),(103,11,78,'cgaribello','2023-03-23 14:40:52','/Administrativo-001'),(106,13,81,'cgaribello','2023-03-24 11:50:09','/Administrativo-001'),(107,11,82,'cgaribello','2023-03-24 15:28:31','/Administrativo-001'),(108,12,83,'ROOT','2023-04-11 16:18:34','/Administrativo-001'),(109,15,27,'ovelez','2023-04-12 11:59:02','/Administrativo-001'),(111,11,85,'sicadmon','2023-04-13 19:06:32','/Administrativo-001'),(117,15,84,'ovelez','2023-05-23 11:57:02','/Administrativo-001'),(118,11,35,'ovelez','2023-05-23 14:48:41','/Administrativo-001'),(119,11,80,'ovelez','2023-05-23 15:29:50','/Administrativo-001'),(121,13,30,'ovelez','2023-06-21 15:04:31','/Administrativo-001'),(124,12,92,'52988800','2023-06-21 15:41:10','/Administrativo-001'),(125,12,93,'23606926','2023-06-21 15:56:02','/Administrativo-001'),(126,11,94,'ovelez','2023-06-21 16:23:56','/Administrativo-001'),(127,11,95,'23606926','2023-06-21 16:39:57','/Administrativo-001'),(128,11,96,'52988800','2023-06-21 16:47:55','/Administrativo-001'),(130,11,98,'ovelez','2023-06-22 09:19:46','/Administrativo-001'),(131,11,99,'79510019','2023-06-22 10:14:09','/Administrativo-001'),(132,12,90,'ovelez','2023-06-22 10:33:12','/Administrativo-001'),(133,11,100,'23606926','2023-06-22 14:35:00','/Administrativo-001'),(134,11,101,'23606926','2023-06-22 14:51:47','/Administrativo-001'),(135,11,102,'52988800','2023-06-22 14:53:38','/Administrativo-001'),(136,11,103,'23606926','2023-06-22 15:14:06','/Administrativo-001'),(137,11,104,'23606926','2023-06-22 15:24:15','/Administrativo-001'),(138,11,102,'52988800','2023-06-22 15:26:18','/Administrativo-001'),(139,11,105,'23606926','2023-06-22 15:33:26','/Administrativo-001'),(140,11,106,'23606926','2023-06-22 15:37:41','/Administrativo-001'),(141,11,108,'23606926','2023-06-22 15:44:57','/Administrativo-001'),(142,11,109,'23606926','2023-06-22 15:57:09','/Administrativo-001'),(143,11,110,'23606926','2023-06-22 16:00:59','/Administrativo-001'),(144,11,107,'52988800','2023-06-22 16:05:28','/Administrativo-001'),(145,11,112,'23606926','2023-06-22 16:20:49','/Administrativo-001'),(146,11,114,'23606926','2023-06-22 16:24:16','/Administrativo-001'),(147,15,113,'52988800','2023-06-22 16:24:58','/Administrativo-001'),(148,11,115,'23606926','2023-06-22 16:30:05','/Administrativo-001'),(149,11,116,'23606926','2023-06-22 16:33:07','/Administrativo-001'),(150,11,102,'52988800','2023-06-22 16:47:04','/Administrativo-001'),(151,11,117,'52795896','2023-06-22 19:20:10','/Administrativo-001'),(152,11,118,'52795896','2023-06-22 19:21:36','/Administrativo-001'),(153,11,119,'52795896','2023-06-22 19:23:29','/Administrativo-001'),(154,11,121,'52795896','2023-06-22 19:25:39','/Administrativo-001'),(155,11,122,'52795896','2023-06-22 19:27:05','/Administrativo-001'),(156,11,123,'52795896','2023-06-22 19:27:49','/Administrativo-001'),(157,11,124,'52795896','2023-06-22 19:28:33','/Administrativo-001'),(158,11,125,'52988800','2023-06-23 08:41:19','/Administrativo-001'),(159,11,126,'52988800','2023-06-23 08:42:11','/Administrativo-001'),(160,11,127,'23606926','2023-06-23 08:42:19','/Administrativo-001'),(161,11,126,'52988800','2023-06-23 08:43:00','/Administrativo-001'),(162,11,128,'52988800','2023-06-23 08:46:02','/Administrativo-001'),(163,11,129,'23606926','2023-06-23 08:46:03','/Administrativo-001'),(164,11,130,'23606926','2023-06-23 08:50:08','/Administrativo-001'),(165,15,131,'52988800','2023-06-23 08:51:04','/Administrativo-001'),(166,11,132,'23606926','2023-06-23 08:54:13','/Administrativo-001'),(167,11,133,'23606926','2023-06-23 09:09:00','/Administrativo-001'),(168,11,134,'52988800','2023-06-23 09:10:36','/Administrativo-001'),(169,11,135,'23606926','2023-06-23 09:11:21','/Administrativo-001'),(170,11,136,'23606926','2023-06-23 09:18:54','/Administrativo-001'),(171,11,137,'23606926','2023-06-23 09:21:37','/Administrativo-001'),(172,11,138,'23606926','2023-06-23 09:27:57','/Administrativo-001'),(173,11,134,'52988800','2023-06-23 09:57:49','/Administrativo-001'),(174,11,139,'52988800','2023-06-23 10:04:19','/Administrativo-001'),(175,11,140,'52988800','2023-06-23 10:07:44','/Administrativo-001'),(176,11,141,'52988800','2023-06-23 10:14:46','/Administrativo-001'),(177,11,142,'52988800','2023-06-23 10:18:26','/Administrativo-001'),(178,11,143,'52988800','2023-06-23 10:21:50','/Administrativo-001'),(179,11,144,'52795896','2023-06-23 22:15:35','/Administrativo-001'),(180,11,145,'52795896','2023-06-23 22:16:57','/Administrativo-001'),(181,11,146,'52795896','2023-06-23 22:18:29','/Administrativo-001'),(182,11,148,'52795896','2023-06-23 22:21:04','/Administrativo-001'),(183,11,147,'52795896','2023-06-23 22:22:02','/Administrativo-001'),(184,11,149,'52795896','2023-06-23 22:23:01','/Administrativo-001'),(185,11,150,'52795896','2023-06-23 22:47:05','/Administrativo-001'),(186,11,151,'52795896','2023-06-23 22:49:40','/Administrativo-001'),(187,11,152,'52795896','2023-06-23 22:50:51','/Administrativo-001'),(188,11,153,'52795896','2023-06-23 22:52:09','/Administrativo-001'),(189,11,154,'52795896','2023-06-23 22:54:21','/Administrativo-001'),(190,11,155,'52795896','2023-06-23 22:55:52','/Administrativo-001'),(191,11,156,'52795896','2023-06-23 22:56:58','/Administrativo-001'),(192,11,157,'52795896','2023-06-23 22:57:45','/Administrativo-001'),(193,11,158,'52795896','2023-06-23 22:58:34','/Administrativo-001'),(194,11,159,'52795896','2023-06-23 22:59:30','/Administrativo-001'),(195,11,160,'52795896','2023-06-23 23:00:20','/Administrativo-001'),(196,11,161,'52795896','2023-06-23 23:07:19','/Administrativo-001'),(197,11,162,'52795896','2023-06-23 23:08:20','/Administrativo-001'),(198,11,163,'52795896','2023-06-23 23:09:01','/Administrativo-001'),(199,11,164,'52795896','2023-06-23 23:09:41','/Administrativo-001'),(200,11,165,'52795896','2023-06-23 23:10:31','/Administrativo-001'),(201,11,166,'52795896','2023-06-23 23:11:22','/Administrativo-001'),(202,11,167,'52795896','2023-06-23 23:12:03','/Administrativo-001'),(203,11,168,'52795896','2023-06-23 23:12:48','/Administrativo-001'),(204,11,169,'52795896','2023-06-23 23:13:35','/Administrativo-001'),(205,11,170,'52795896','2023-06-23 23:14:23','/Administrativo-001'),(206,11,171,'52795896','2023-06-23 23:15:02','/Administrativo-001'),(207,11,172,'52795896','2023-06-23 23:15:43','/Administrativo-001'),(208,11,173,'52795896','2023-06-23 23:16:25','/Administrativo-001'),(209,11,174,'52795896','2023-06-23 23:17:15','/Administrativo-001'),(210,11,175,'52795896','2023-06-23 23:18:13','/Administrativo-001'),(211,11,176,'52795896','2023-06-23 23:27:03','/Administrativo-001'),(212,11,177,'52795896','2023-06-23 23:36:12','/Administrativo-001'),(213,11,178,'52795896','2023-06-23 23:36:49','/Administrativo-001'),(214,11,179,'52795896','2023-06-23 23:37:30','/Administrativo-001'),(215,11,180,'52795896','2023-06-23 23:38:09','/Administrativo-001'),(216,11,181,'52795896','2023-06-23 23:38:48','/Administrativo-001'),(217,11,182,'52795896','2023-06-23 23:39:38','/Administrativo-001'),(218,11,183,'52795896','2023-06-23 23:40:30','/Administrativo-001'),(219,11,184,'52795896','2023-06-23 23:41:09','/Administrativo-001'),(220,11,185,'52795896','2023-06-23 23:41:50','/Administrativo-001'),(221,11,186,'52795896','2023-06-23 23:42:34','/Administrativo-001'),(222,11,187,'52795896','2023-06-23 23:43:45','/Administrativo-001'),(223,11,188,'52795896','2023-06-23 23:44:29','/Administrativo-001'),(224,11,189,'52795896','2023-06-23 23:45:12','/Administrativo-001'),(225,11,190,'52795896','2023-06-23 23:45:54','/Administrativo-001'),(226,11,191,'52795896','2023-06-23 23:46:30','/Administrativo-001'),(227,11,192,'52795896','2023-06-23 23:47:09','/Administrativo-001'),(228,11,193,'52795896','2023-06-23 23:47:51','/Administrativo-001'),(229,11,194,'52795896','2023-06-23 23:48:38','/Administrativo-001'),(230,11,195,'52795896','2023-06-23 23:49:15','/Administrativo-001'),(231,11,196,'52795896','2023-06-23 23:49:55','/Administrativo-001'),(232,11,197,'52795896','2023-06-23 23:50:41','/Administrativo-001'),(233,11,198,'52795896','2023-06-23 23:51:24','/Administrativo-001'),(234,11,199,'52988800','2023-07-04 11:44:15','/Administrativo-001'),(235,11,200,'52988800','2023-07-06 10:48:52','/Administrativo-001'),(236,11,201,'ovelez','2023-07-24 21:04:28','/Administrativo-001'),(237,11,202,'ovelez','2023-07-25 10:51:14','/Administrativo-001'),(238,11,203,'ovelez','2023-07-25 11:28:37','/Administrativo-001'),(239,11,204,'ovelez','2023-07-25 23:54:01','/Administrativo-001'),(240,11,205,'ovelez','2023-07-26 14:30:29','/Administrativo-001'),(241,11,206,'ovelez','2023-07-26 15:45:07','/Administrativo-001'),(242,11,207,'ovelez','2023-07-31 12:49:54','/Administrativo-001'),(243,11,91,'79510019','2023-08-03 15:24:45','/Administrativo-001'),(244,11,97,'79510019','2023-08-11 13:51:03','/Administrativo-001'),(245,15,208,'root','2023-10-18 18:18:34','/Administrativo-001'),(246,15,209,'ovelez','2023-12-19 14:50:44','/Administrativo-001'),(247,11,210,'ovelez','2024-01-12 16:47:23','/Administrativo-001'),(248,11,211,'ovelez','2024-01-12 16:56:09','/Administrativo-001'),(249,11,212,'ovelez','2024-01-12 16:57:45','/Administrativo-001'),(250,11,213,'ovelez','2024-01-12 17:07:35','/Administrativo-001'),(251,15,214,'ovelez','2024-01-15 14:53:32','/Administrativo-001');
/*!40000 ALTER TABLE `rol_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token`
--

DROP TABLE IF EXISTS `token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token` (
  `id_token` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `tipo` varchar(8) NOT NULL COMMENT 'Tipo de red social, L=linkeid, G=google, etc',
  `social_nick` varchar(256) NOT NULL COMMENT 'Nombre de usuario de red @omargo33',
  `correo` varchar(256) DEFAULT NULL COMMENT 'Correo electrónico',
  `token` varchar(512) NOT NULL COMMENT 'Token o clave encripatada',
  `validador` varchar(512) NOT NULL COMMENT 'Campo validacion de los campos ejecutados',
  `estado` varchar(8) NOT NULL COMMENT 'Estado del listado A=Activo, I=Inactivo y X=Eliminado',
  `usuario` varchar(128) NOT NULL COMMENT 'Usuario que realizo el cambio',
  `usuario_fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de insercion del registro',
  `usuario_programa` varchar(256) NOT NULL COMMENT 'Programa usado para el cambio',
  PRIMARY KEY (`id_token`),
  KEY `token_FK` (`id_usuario`),
  KEY `token_correo_IDX` (`correo`) USING BTREE,
  KEY `token_social_nick_IDX` (`social_nick`) USING BTREE,
  CONSTRAINT `token_FK` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=202 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token`
--

LOCK TABLES `token` WRITE;
/*!40000 ALTER TABLE `token` DISABLE KEYS */;
INSERT INTO `token` VALUES (4,15,'C','root','omargo33@hotmail.com','464EDDB4E198E2BA834181283811FD1326930AA94260F13010086B37B22B173A','3506402','A','root','2024-10-16 21:05:10','/Administrativo-001'),(13,18,'C','aerolinea','administracion001@procesoelectronico.com','4819567762E70300348172C234F8695DD3B2F4BAD149420D35B8A4CC7B8083AE','2077778476','A','aerolinea','2022-06-14 01:29:47','/Administrativo-001'),(14,25,'C','supervisor','jmartinez214+usuario11@gmail.com','0DCE095068F5568EF1D8468052D5865698010E24A0133B407E1D33A729C46EBE','-1697229976','A','supervisor','2024-10-08 16:57:39','/Administrativo-001'),(15,13,'C','admin','portaltasasytimbres@gmail.com','C823AA7F29185958EC6501D5491C2C29CCB6173CAD6280EA8987F03C7E5488C8','92668751','C','admin','2022-06-15 20:06:53','/Administrativo-001'),(16,26,'C','jmartinez','jmartinez214+usuario1@gmail.com','93B6E33B14494AC8C7C3C3A990B50F1567CB765C936620B06C472B5278762A43','1938753242','A','jmartinez','2023-08-24 10:42:33','/Administrativo-001'),(17,27,'C','lhernandez','temporal@13aplicaciones.com','EFBDB71710DEDCB86BFE0C4719183DC9649B85B77D806DBEBB1B5CBEDCE5DC09','-1771738745','C','admin','2022-04-06 18:17:17','/Administrativo-001'),(18,28,'C','aerolinea2','administracion003@procesoelectronico.com','8DF79DEB606C9A5955D4D7FBD93037C29F736659B06AEF73A377626DCD404B41','-13376634','C','admin','2022-04-07 19:13:24','/Administrativo-001'),(19,29,'C','cgaribello','jmartinez214+usuario21@gmail.com','64E4B735FD3FEB435D5FB1CB762B425703315D615E877962521F526200B142CE','-1014419240','A','cgaribello','2023-08-11 14:14:32','/Administrativo-001'),(20,30,'C','hloaiza','haidy.loaiza1@aerocivil.gov.co','93CF0D7D72DC430A45453431F3C3432C85CA1F0D37FE2C91A78FCDCF1BE20353','1008555962','A','hloaiza','2023-05-11 09:41:39','/Administrativo-001'),(21,31,'C','ovelez','jmartinez214@gmail.com','77626B2831043EDED0A114A582AE01AC32C0656E758A84885DE2EF9B061BBD51','-1005040125','A','ovelez','2023-08-02 13:00:07','/Administrativo-001'),(22,32,'C','aerocivil','administrador002@procesoelectronico.com','8DF79DEB606C9A5955D4D7FBD93037C29F736659B06AEF73A377626DCD404B41','2069474610','C','supervisor','2022-04-20 22:08:23','/Administrativo-001'),(23,33,'C','pgomez','jde@gmail.com','D90E9995E183EB8EFFFCA9639373EE00083D65EEB11E08877B93DC9E0A168CA9','-989964918','C','PGOMEZ','2023-01-04 18:38:04','/Administrativo-001'),(24,34,'C','truiz','tania.ruiz@sicsas.com','710213264A584929E3EC87F47A6865586E8BBEF236DDA85764E479E232CE6552','110640424','A','truiz','2023-03-23 17:23:45','/Administrativo-001'),(25,35,'C','adiaz','j0se0spina@hotmail.com','BFB042E55ABF3991775265B2E7AF1D17432272F98E734501D1DFE9626745ACCD','92664671','C','adiaz','2022-07-25 23:12:16','/Administrativo-001'),(26,36,'C','ivera','ivan.vera@aerocivil.gov.co','49D16E2A3850201535F3F73C3DA561DA42D70449CDF8D39A7B6BBBDC8C4B5824','100585735','A','ivera','2022-06-15 17:22:02','/Administrativo-001'),(27,37,'C','sjimenez','soniajimenez_m@hotmail.com','90F635306512986F97474E458C5808AB3666A062FAADBAA8CD6165FB3FAF456D','1255677785','A','sjimenez','2022-06-15 17:32:23','/Administrativo-001'),(29,38,'C','msalinas','marcela_250694@hotmail.com','B5EAEC45A56DCBA09ED25ECFD27C04895B01A55D6FB0AC84D97ED4905E6FF995','-1443488792','A','msalinas','2022-06-15 20:09:53','/Administrativo-001'),(30,39,'C','dpedreros','consultoriajde+usuario@gmail.com','681FAF0D37BD3F0ADFDC32E1DA6F73EA1F67DC518A927067C0874746C48E7B48','-315680904','A','dpedreros','2023-07-19 14:19:19','/Administrativo-001'),(31,40,'C','rodriguezm','myrockstar28@gmail.com','C75525372A12737F455001C86A69F651846EEF63F0BB4FFC98B9BE5C91408FFA','-303336660','A','rodriguezm','2022-09-30 14:35:33','/Administrativo-001'),(32,41,'C','stovar','confirmacionesjde@gmail.com','A1BED24E14BC34AA13BD8F2B978FE6E9ADA277A22FD4706D65E2CC632DF6BBA9','-892063175','A','stovar','2023-05-10 18:42:22','/Administrativo-001'),(33,43,'C','cjami','claudia.jami@sicsas.com','18DFB491062924BA57360B36C0CB19DC1704EA153DBD532DCEAAC4D0E182A85C','94683126','C','cgaribello','2022-07-26 15:25:52','/Administrativo-001'),(35,45,'C','alromero','alromero@wingo.com','98747821A7DFFD96B3B0AF1BC7EA6064481AA8C4D1E68BBCDA92BB6A0EF77389','1984609661','A','alromero','2022-11-02 12:29:51','/Administrativo-001'),(36,46,'C','etorres','Etorres@wingo.com','A1503DA2CDC51899FA2A93AB205E35B60024CDAD22913F3358C20935B1624792','-1424407410','A','etorres','2022-11-02 10:54:48','/Administrativo-001'),(37,48,'C','savergara1','svergara@aeromexico.com','DAF3DB645DF7FA73C8D6486E8C2574A1ACCEEAB17D41AD20470388E63C001E2B','1944955731','A','savergara1','2022-11-17 05:00:29','/Administrativo-001'),(38,47,'C','karobayo','jmartinez214+usuario3@gmail.com','220BA9B01D3381F566891235BCB5A7B6DE61F605BD2085BECA43CA90CEAC4F47','1059906600','A','karobayo','2022-11-16 18:47:47','/Administrativo-001'),(40,49,'C','sloaiza','sloaizas@aeromexico.com','99AC38628766C5DFD6BCBAD5ADB0C19D941FC12B97D41A2DEB74FEFA8AF955E5','-2113805435','A','sloaiza','2022-11-16 15:33:49','/Administrativo-001'),(41,51,'C','emontoya','johanna.martinez@sicsas.com','D5D2E147CA7ABBC85D04EBE086E480AED7A425BE196A180D9FF97D235D6EE390','1166827466','A','emontoya','2023-06-14 17:16:46','/Administrativo-001'),(42,72,'C','jquintana','jailer.quintana@latam.com','D98743C1E210B240D8CB2DBDCD2F925583A45E1880EC215AAA61926AC0DE6D98','627376403','C','cgaribello','2022-11-16 14:22:13','/Administrativo-001'),(44,70,'C','wniebles','william.niebles@latam.com','D246FA3E33F30D0867C18B2FBA7240B54F9250B61E54C6B0BA4FAEDE5FB97DA4','-1115447509','A','wniebles','2022-11-16 18:54:29','/Administrativo-001'),(45,69,'C','dzurique','Daniela.zurique@latam.com','3AED4DBB4D03D62839FA6208BA5DD439F5795AF5F6BC0D35DA3668515B178CBD','-1748193813','C','cgaribello','2022-11-16 14:26:05','/Administrativo-001'),(46,68,'C','msepulveda','manuela.sepulveda@latam.com','5AB0E5C723235D263D761CD59EAA677F6C1EF8E7DD33AE96E537DFB689CC4226','-1939620204','A','msepulveda','2022-11-17 12:53:08','/Administrativo-001'),(47,67,'C','jvanegas','john.vanegasq@latam.com','E56B4BEF349D80BB797230B0F39B27E9B0D528B2CE6E9C0D0FD51963044E9187','287279693','C','cgaribello','2022-11-16 14:28:02','/Administrativo-001'),(50,73,'C','lababilonia','levis.babilonia@latam.com','10716857C71DE0CFD5486E9E82E4E9039A353D546105BA13CABCE144FF288991','2018072264','A','lababilonia','2022-12-28 07:09:58','/Administrativo-001'),(51,63,'C','mcala','marly.cala@latam.com','6008FCAF336B2BF5A9FD6CA53F26CB115FFF9A21DB72F8D90FEC655088CA40D1','103709760','A','mcala','2022-11-16 15:22:02','/Administrativo-001'),(52,62,'C','hrios','hilda.rios@latam.com','96766E19A054E4D10F46C634FA477D91FEF42263C400A929675DEA5A1DB8F9ED','99546819','C','cgaribello','2022-11-16 14:39:15','/Administrativo-001'),(53,61,'C','jcocuy','jose.cocuy@latam.com','5A11399090EB8C8BCABA7A1B92525F529E51C5224DD33DD0CC462912575C9D93','-1165443023','A','jcocuy','2023-01-04 11:45:19','/Administrativo-001'),(54,60,'C','sarrieta','sergiol.arrieta@latam.com','7B3FAF092FAC2D41C6FB9559034AA29CC84F855E0DB479F3424D7B513E342F26','2120470167','A','Sarrieta','2022-12-22 13:06:19','/Administrativo-001'),(55,59,'C','amendoza','jmartinez21@gmail.com','CF6C1593F75C2FAAFE9C3021DD7C7B291F8733AE8C27EEC86184D2D699D53748','-1796214713','A','amendoza','2023-06-14 16:06:44','/Administrativo-001'),(60,54,'C','amantilla','alvaro.mantilla@latam.com','51172D5C697119B3F8C89D4C077878FBEFD471936AEE187FAB3570FE88D72803','911455891','A','amantilla','2022-12-21 10:01:39','/Administrativo-001'),(61,53,'C','avargas','leidy.vargas@latam.com','0AFD7FD97667062E9CDDE3D60440AA3FB22326BB4EF40FECB25E9C64D1C942DB','-635136525','A','avargas','2022-12-20 22:15:54','/Administrativo-001'),(62,52,'C','lzamora','luz.zamora@latam.com','63670590967772FD53B00F1B403BF54431271A5469E9DA18DEEA8BA2091360D8','651845220','A','lzamora','2022-11-16 15:33:35','/Administrativo-001'),(67,78,'C','chernandez','chamillo2004@gmail.com','F947191161EE225C963309BAAD5E83594C042850B197005DAF3E5335638D255A','-3117200','A','chernandez','2023-03-23 15:16:36','/Administrativo-001'),(68,79,'C','ngomez','asesoriasjmar@gmail.com','DFDD1ADA03A2B8CBC3D6B9B19C4EC608F89789BA8AA05F147DF76320336D23A0','-1047223220','C','cgaribello','2023-03-08 14:10:42','/Administrativo-001'),(69,80,'C','jmartinezt2','jmartinezt214@outlook.com','D949F8AB7C0CBA887A995BB4BE2486F5F34A525D72CD702701F40C298D415832','-873937256','A','jmartinezt2','2023-07-04 11:32:23','/Administrativo-001'),(70,42,'C','eruiz','tania.m.ruiz92@gmail.com','123','96787609','C','cgaribello','2023-03-23 18:26:37','/Administrativo-001'),(71,81,'C','airlines','consultorjohannamartinez@gmail.com','D02F8D21A40BAFE526FAD66D69FE944EFE30F6EBBE79A46C1A64696F1AFBA5E8','-680782859','A','airlines','2023-05-10 16:35:55','/Administrativo-001'),(72,82,'C','aerorepublica','jmartinez214+40@gmail.com','060DFCFA42640EBFDE712D211A5FB77AEF20D20106C5D7A889C686C8786119DC','-1766581948','C','aerorepublica','2023-05-10 18:30:53','/Administrativo-001'),(73,83,'C','sicadmon','confirmaciones@gmail.com','8888F92960027DC58543469B78A32494FE91763D4AB6F844F3F4ED21FD9273FE','185286492','C','sicadmon','2023-04-13 18:48:31','/Administrativo-001'),(74,84,'C','sicsuperaeroc','consultorjohannamartinez+usuario2@gmail.com','44464FA2454A5FC434D4C17FA6AB455A857EF592B3D48B209AC10184E3129BF9','2060874004','A','sicsuperaeroc','2024-07-10 10:04:50','/Administrativo-001'),(75,85,'C','latam','confirmacionesjdelatam@gmail.com','3142BE5B5EC181FEBABB6C37929D605E6A9BA38C25026D0262855BFD0538926A','102744587','A','latam','2023-05-02 19:02:48','/Administrativo-001'),(76,86,'C','pepito',NULL,'0C14AE66FAD0F1BEFCA19A2F706294CD6488D1E534F00A23767F824773BF69F0','-991785559','A','pepito','2023-04-14 10:46:11','/Administrativo-001'),(78,90,'C','52795896','johanna.marz@sicsas.com','B496B324DE05098CF729EA0A2AA57D1E45AEC44352B1E5DD7429369C089FE29F','934056895','A','52795896','2023-06-13 16:00:10','/Administrativo-001'),(79,91,'C','52988800','haidy.loaiza@aerocivil.gov.co','4A33EB5DB4FC4C4EAF86FA429E4EEEFB037015B9FEB6AD3AE691C7D264F07A6F','990480764','A','52988800','2023-07-27 14:10:02','/Administrativo-001'),(80,92,'C','23606926','dianapedreros6@hotmail.com','AEF9A6D8084F938608E2DAC814FE03A2B0A5900B596137BD796F97FB865191FD','851186562','A','23606926','2023-08-10 10:20:35','/Administrativo-001'),(81,93,'C','52951014','carolinitaesteban@gmail.com','A231EA65049DAAADEF9222DCF893DA80AC58AB44A8A5101A0E634C895CF86112','987494011','A','52951014','2023-06-21 16:01:56','/Administrativo-001'),(82,94,'C','7700971','despachobog@searca.com.co','4C954ABAD2D6CCEEC8DB23AF591C906BF218778767F8703C6572362EA1BB7198','-1106486285','A','7700971','2023-07-26 04:48:05','/Administrativo-001'),(83,95,'C','82330539','despachomde@searca.com.co','A46F20F177726CCC71FD6ED7C28144D4D5E45FCA2DAE8126672EC014877B3BB1','1747310853','C','82330539','2023-08-02 14:55:17','/Administrativo-001'),(84,96,'C','15674456','despachobaq@searca.com.co','2D70900E8B4961FC9FF74E83D7C001B85CBF9936D2C0C6B0C54E2E97EBBC689B','889783942','A','15674456','2023-08-02 11:08:30','/Administrativo-001'),(85,97,'C','79510019','carlos.garibello@aerocivil.gov.co','527C7043425527234134C51EDB54063D16C2AF344D5EE3F9A6AC1B10D798F5EB','1977465382','A','79510019','2023-08-11 13:54:35','/Administrativo-001'),(86,98,'C','1104869063','jorgepikor@hotmail.com','2C078BC430248F96B3D6AD7082D4284685584E715EABBB79BD0C74C37E18D1A8','-1094232778','A','1104869063','2023-06-22 09:39:51','/Administrativo-001'),(87,99,'C','1015473680','asisoperaciones@llaneradeavioacion.com.co','123','-1065197599','C','79510019','2023-06-22 10:13:33','/Administrativo-001'),(88,100,'C','1032470987','angiecastro.sarpa@gmail.com','123','-242174455','C','23606926','2023-06-22 14:34:09','/Administrativo-001'),(89,101,'C','80411289','operaciones@helicol.com.co','123','-887337','C','23606926','2023-06-22 14:51:13','/Administrativo-001'),(90,102,'C','7715369','elmer.molina@easyfly.co','123','-1105419598','C','52988800','2023-06-22 14:53:20','/Administrativo-001'),(91,103,'C','1026255346','dispatch@centralaerospace.com','123','1506067654','C','23606926','2023-06-22 15:13:42','/Administrativo-001'),(92,104,'C','1007702795','fbo@centralaerospace.com','123','-953606560','C','23606926','2023-06-22 15:23:49','/Administrativo-001'),(93,105,'C','53081946','ops@centralaerospace.com','123','1620114640','C','23606926','2023-06-22 15:33:17','/Administrativo-001'),(94,106,'C','10178622','jarenas@centralaerospace.com','123','604208067','C','23606926','2023-06-22 15:37:32','/Administrativo-001'),(95,108,'C','94513415','baseclo@centralaerospace.com','123','1025660860','C','23606926','2023-06-22 15:44:51','/Administrativo-001'),(96,109,'C','1136888726','sferreira@centralaerospace.com','123','1616062150','C','23606926','2023-06-22 15:56:59','/Administrativo-001'),(97,110,'C','1072717379',NULL,'123','-1780318638','C','23606926','2023-06-22 16:00:53','/Administrativo-001'),(98,107,'C','1026269575','lead.bog@volaris.com','123','1507112353','C','52988800','2023-06-22 16:04:57','/Administrativo-001'),(99,112,'C','1001327460',NULL,'123','-2096184938','C','23606926','2023-06-22 16:20:45','/Administrativo-001'),(100,114,'C','1005183514','yefersonmendez.sarpa@gmail.com','123','1401994256','C','23606926','2023-06-22 16:24:07','/Administrativo-001'),(101,113,'C','52792395','yaneth.ramirez@volaris.com','123','933962716','C','52988800','2023-06-22 16:24:29','/Administrativo-001'),(102,115,'C','1007343094','julianasierra.sarpa@gmail.com','123','-1064406017','C','23606926','2023-06-22 16:29:55','/Administrativo-001'),(103,116,'C','1123625333',NULL,'123','1442815451','C','23606926','2023-06-22 16:32:53','/Administrativo-001'),(104,117,'C','52784685','diana.mendez@latam.com','123','933101629','C','52795896','2023-06-22 19:19:54','/Administrativo-001'),(105,118,'C','1023919640','katherin.plazas@latam.com','123','-959611375','C','52795896','2023-06-22 19:21:22','/Administrativo-001'),(106,119,'C','53155125','karen.leon@latam.com','123','1646084641','C','52795896','2023-06-22 19:23:20','/Administrativo-001'),(107,120,'C','53032025','leidyusaquen.sya@latam.com','123','1615518114','C','52795896','2023-06-22 19:24:10','/Administrativo-001'),(108,121,'C','1000973258','mariahernandez.sya@latam.com','123','1487550079','C','52795896','2023-06-22 19:25:30','/Administrativo-001'),(109,122,'C','1001201823','isabella.baquero@latam.com','123','-2126836154','C','52795896','2023-06-22 19:26:57','/Administrativo-001'),(110,123,'C','1010007837','ivon.rugeles@latam.com','123','-1328609021','C','52795896','2023-06-22 19:27:42','/Administrativo-001'),(111,124,'C','1033819398','jhonperez.sya@latam.com','123','754567089','C','52795896','2023-06-22 19:28:27','/Administrativo-001'),(112,125,'C','1075317226','sebastian.camacho@easyfly.co','123','767674682','C','52988800','2023-06-23 08:40:53','/Administrativo-001'),(113,127,'C','1032470067','despacho.aac3@gmail.com','123','-242183166','C','23606926','2023-06-23 08:42:11','/Administrativo-001'),(114,126,'C','1088337928','maria.duque@easyfly.co','123','879882535','C','52988800','2023-06-23 08:43:04','/Administrativo-001'),(115,128,'C','1117519674','andasasi4@gmail.com','123','-1074377956','C','52988800','2023-06-23 08:45:27','/Administrativo-001'),(116,129,'C','24827361','despacho.aac@gmail.com','123','1797819731','C','23606926','2023-06-23 08:45:52','/Administrativo-001'),(117,130,'C','1023879891','despacho.aac4@gmail.com','123','-982697322','C','23606926','2023-06-23 08:50:15','/Administrativo-001'),(118,131,'C','36294846','jessica.paker@easyfly.co','123','855275248','C','52988800','2023-06-23 08:50:44','/Administrativo-001'),(119,132,'C','1018460449','josecaos88@gmail.com','123','1596298513','C','23606926','2023-06-23 08:54:04','/Administrativo-001'),(120,133,'C','1018471561','cristianmaldonad182@gmail.com','123','1597252840','C','23606926','2023-06-23 09:08:52','/Administrativo-001'),(121,134,'C','92521536','camilo.urzola@united.com','123','-748481539','C','52988800','2023-06-23 09:10:21','/Administrativo-001'),(122,135,'C','1070616189','cnxandres@hotmail.com','123','710980463','C','23606926','2023-06-23 09:11:02','/Administrativo-001'),(123,136,'C','80757968','k-shingo@hotmail.com','123','88879610','C','23606926','2023-06-23 09:18:48','/Administrativo-001'),(124,137,'C','1098694086','Piloto.fabian@outlook.com','387865598C4893DB3C5A625B8DE4149C80959DB1487939D9C80240A67385E554','-1580943685','A','1098694086','2023-08-09 20:34:30','/Administrativo-001'),(125,138,'C','1072715655','ndelatorre2810@gmail.com','123','-1780375403','C','23606926','2023-06-23 09:27:35','/Administrativo-001'),(126,139,'C','53002189','ivon.cardenas@united.com','123','1612748702','C','52988800','2023-06-23 10:04:05','/Administrativo-001'),(127,140,'C','1026258436','john.tovaria@united.com','123','1506157957','C','52988800','2023-06-23 10:07:12','/Administrativo-001'),(128,141,'C','79547984','mauricio.guzman@united.com','123','1980453343','C','52988800','2023-06-23 10:14:31','/Administrativo-001'),(129,142,'C','1030520097','facturacion.united@yahoo.com','123','-1993178889','C','52988800','2023-06-23 10:18:09','/Administrativo-001'),(130,143,'C','35466431','marcela.garavito@united.com','123','22315008','C','52988800','2023-06-23 10:21:32','/Administrativo-001'),(131,144,'C','1018492902','dania_2904@hotmail.com','123','1599133332','C','52795896','2023-06-23 22:15:17','/Administrativo-001'),(132,145,'C','1123631670','benitezluisa910@gmail.com','123','1443622812','C','52795896','2023-06-23 22:16:41','/Administrativo-001'),(133,146,'C','1123636393','valeriepalacio@hotmail.com','123','1443768949','C','52795896','2023-06-23 22:18:14','/Administrativo-001'),(134,148,'C','1123627173','ar3valop@gmail.com','123','1442873235','C','52795896','2023-06-23 22:20:46','/Administrativo-001'),(135,147,'C','1007340235','mendez.navarro20@gmail.com','123','-1064493653','C','52795896','2023-06-23 22:21:56','/Administrativo-001'),(136,149,'C','1123637208','djjuanjo73@gmail.com','123','1443797505','C','52795896','2023-06-23 22:22:51','/Administrativo-001'),(137,150,'C','24605147','maria.erazo.subavh@avianca.com','123','1738652827','C','52795896','2023-06-23 22:46:59','/Administrativo-001'),(138,151,'C','57464857','ana.caballero@avianca.com','123','987920074','C','52795896','2023-06-23 22:49:24','/Administrativo-001'),(139,152,'C','1140888386','andrea.hernandezl@avianca.com','123','-1966153259','C','52795896','2023-06-23 22:50:45','/Administrativo-001'),(140,153,'C','32765102','angela.ulloa@avianca.com','123','1740625948','C','52795896','2023-06-23 22:52:02','/Administrativo-001'),(141,154,'C','1143258138','angie.acuna@avianca.com','123','521810240','C','52795896','2023-06-23 22:54:15','/Administrativo-001'),(142,155,'C','1042417095','margarita.serrano@avianca.com','123','1495294671','C','52795896','2023-06-23 22:55:44','/Administrativo-001'),(143,156,'C','1084729502','idalmis.palacio@avianca.com','123','1738483860','C','52795896','2023-06-23 22:56:45','/Administrativo-001'),(144,157,'C','22445897','judith.jimenez@avianca.com','123','-89911871','C','52795896','2023-06-23 22:57:39','/Administrativo-001'),(145,158,'C','44152784','mariela.rodriguez@avianca.com','123','790694565','C','52795896','2023-06-23 22:58:24','/Administrativo-001'),(146,159,'C','1129523526','milena.arzuza@avianca.com','123','-1850783894','C','52795896','2023-06-23 22:59:23','/Administrativo-001'),(147,160,'C','52448962','rosa.perdomo@avianca.com','123','843642074','C','52795896','2023-06-23 23:00:15','/Administrativo-001'),(148,161,'C','1016084617','ingrid.martinez@avianca.com','123','-291257420','C','52795896','2023-06-23 23:07:14','/Administrativo-001'),(149,162,'C','1099373583','brayan.moreno@avianca.com','123','-781199488','C','52795896','2023-06-23 23:08:15','/Administrativo-001'),(150,163,'C','1116792925','julio.villamizar@avianca.com','123','-1897440975','C','52795896','2023-06-23 23:08:53','/Administrativo-001'),(151,164,'C','63490386','janeth.caceres@avianca.com','123','-816637629','C','52795896','2023-06-23 23:09:33','/Administrativo-001'),(152,165,'C','13741073','carlos.moreno@avianca.com','123','-859457990','C','52795896','2023-06-23 23:10:11','/Administrativo-001'),(153,166,'C','13536949','edgar.acevedo@avianca.com','123','-917482296','C','52795896','2023-06-23 23:11:17','/Administrativo-001'),(154,167,'C','13538001','edgar.barajas@avianca.com','123','-917431495','C','52795896','2023-06-23 23:11:55','/Administrativo-001'),(155,168,'C','1098658090','lucy.espinosa@avianca.com','123','-1584518580','C','52795896','2023-06-23 23:12:40','/Administrativo-001'),(156,169,'C','1102348563','paola.garnica@avianca.com','123','1280709373','C','52795896','2023-06-23 23:13:24','/Administrativo-001'),(157,170,'C','1024479514','benjaminperilla.aguillar@avianca.com','123','-209713373','C','52795896','2023-06-23 23:14:17','/Administrativo-001'),(158,171,'C','88035252','emilio.rolon@avianca.com','123','-1603342979','C','52795896','2023-06-23 23:14:55','/Administrativo-001'),(159,172,'C','37531046','ruth.gomez@avianca.com','123','1823028195','C','52795896','2023-06-23 23:15:36','/Administrativo-001'),(160,173,'C','1130680434','jennifer.carrillo@avianca.com','123','528507876','C','52795896','2023-06-23 23:16:20','/Administrativo-001'),(161,174,'C','1007900967','gabriela.nunez@avianca.com','123','-896406009','C','52795896','2023-06-23 23:17:11','/Administrativo-001'),(162,175,'C','63453359','karol.rojas@avianca.com','123','-820242430','C','52795896','2023-06-23 23:18:09','/Administrativo-001'),(163,176,'C','43263970','nini.moscote@avianca.com','123','-67224766','C','52795896','2023-06-23 23:26:56','/Administrativo-001'),(164,177,'C','79450847','alberto.parra@avianca.com','123','1952538094','C','52795896','2023-06-23 23:36:07','/Administrativo-001'),(165,178,'C','1023914670','claudia.rodriguez@avianca.com','123','-959760237','C','52795896','2023-06-23 23:36:41','/Administrativo-001'),(166,179,'C','53930178','angela.munoz@avianca.com','123','1873122010','C','52795896','2023-06-23 23:37:25','/Administrativo-001'),(167,180,'C','1012340316','diana.tunjo@avianca.com','123','535766473','C','52795896','2023-06-23 23:38:04','/Administrativo-001'),(168,181,'C','52103847','amalfi.rodriguez@avianca.com','123','753910564','C','52795896','2023-06-23 23:38:38','/Administrativo-001'),(169,182,'C','1014232200','yessika.zambrano@avianca.com','123','-2013687549','C','52795896','2023-06-23 23:39:26','/Administrativo-001'),(170,183,'C','1016075662','adrianacarolina.suarez@avianca.com','123','-292151000','C','52795896','2023-06-23 23:40:13','/Administrativo-001'),(171,184,'C','1022373243','alejandra.pardo@avianca.com','123','-2013531423','C','52795896','2023-06-23 23:41:02','/Administrativo-001'),(172,185,'C','1032374491','maria.cardozo@avianca.com','123','-270689222','C','52795896','2023-06-23 23:41:43','/Administrativo-001'),(173,186,'C','1020751998','katherine.lozano@avianca.com','123','619045378','C','52795896','2023-06-23 23:42:25','/Administrativo-001'),(174,187,'C','1016059803','yeimi.rodriguez@avianca.com','123','-293877141','C','52795896','2023-06-23 23:43:38','/Administrativo-001'),(175,188,'C','53132699','leidy.hernandez@avianca.com','123','1644153252','C','52795896','2023-06-23 23:44:21','/Administrativo-001'),(176,189,'C','20958792','angelica.macias@avianca.com','123','-1720761550','C','52795896','2023-06-23 23:45:07','/Administrativo-001'),(177,190,'C','1016066840','karol.bermudez@avianca.com','123','-293042872','C','52795896','2023-06-23 23:45:46','/Administrativo-001'),(178,191,'C','1016083463','laura.soler@avianca.com','123','-291288982','C','52795896','2023-06-23 23:46:22','/Administrativo-001'),(179,192,'C','1074159328','lina.delgado@avianca.com','123','-173332672','C','52795896','2023-06-23 23:47:01','/Administrativo-001'),(180,193,'C','1020787123','dahiana.pena@avianca.com','123','621986777','C','52795896','2023-06-23 23:47:42','/Administrativo-001'),(181,194,'C','68304144','jaidymagaly.trujillo@avianca.com','123','-710910244','C','52795896','2023-06-23 23:48:31','/Administrativo-001'),(182,195,'C','53065934','niyireth.parra@avianca.com','123','1618386729','C','52795896','2023-06-23 23:49:11','/Administrativo-001'),(183,196,'C','1070955298','leidy.obando@avianca.com','123','800533200','C','52795896','2023-06-23 23:49:47','/Administrativo-001'),(184,197,'C','21018478','carmenpatricia.sanchez@avianca.com','123','-1094617251','C','52795896','2023-06-23 23:50:33','/Administrativo-001'),(185,198,'C','1032361012','neyda.baquero@avianca.com','123','-271706207','C','52795896','2023-06-23 23:51:13','/Administrativo-001'),(186,199,'C','1013640178','despacho-bog@taccolombia.com','123','1509155873','C','52988800','2023-07-04 11:43:52','/Administrativo-001'),(187,200,'C','1006810318','supervisor.atencion4@saitlm.com.co','123','-1811621240','C','52988800','2023-07-06 10:48:31','/Administrativo-001'),(188,201,'C','searca','jmartinez214+usuario4@gmail.com','0F0E548EB77D27B8B0444E632D8A905DECC968F2D67A0E6B6880A56727FE4D0F','-906336863','A','searca','2023-07-25 09:09:19','/Administrativo-001'),(189,202,'C','satena','jmartinez214+usuario5@gmail.com','544BD3D92ED6427A710DFCC1B41311EF7ADA353A38C99DFDA31A3B1DCD60AE47','-909477070','A','satena','2023-07-25 10:54:05','/Administrativo-001'),(190,203,'C','aliansa','jmartinez214+usuario6@gmail.com','E1383535C72562268E048E104C34DA7D9C376112B194E60A06D63A4C6B4F13DE','-914539047','A','aliansa','2024-11-17 17:59:43','/Administrativo-001'),(191,204,'C','usuario','jmartinez214+usuario7@gmail.com','339C919600752739814F0D1838AC670D3A2FDB120EAE06AB21028DF8A7838CBA','-132844754','A','usuario','2023-07-26 15:20:53','/Administrativo-001'),(192,205,'C','vertical','jmartinez214+usuario8@gmail.com','12938EC1E1FEDAF9FC9663737C77BC5E664C16894F86337C3FA94D00C5B043D4','-1984141450','C','ovelez','2023-07-26 14:30:07','/Administrativo-001'),(193,206,'C','avianca','jmartinez214+usuario9@gmail.com','6B32E21569D91E3D566DFD02E99E23CCDC347DCE1B04074504A0F613299CABF4','-628248033','A','avianca','2023-08-16 14:48:15','/Administrativo-001'),(194,207,'C','lan','jmartinez214+usuario10@gmail.com','058A54557F5F18DBC2300177441AD6F7634547516E20A69A3777AB34E9A28434','106905','A','lan','2023-08-09 15:37:01','/Administrativo-001'),(195,208,'C','omar123','omargo33+test@gmail.com','8C038A8749AE2AF28A9AF4FA0FC87431099FC29260CBD2462617FC47972D7B0E','-1352702653','A','omar123','2023-10-18 18:20:44','/Administrativo-001'),(196,209,'C','pruebassuperaero','jmartinez214+usuario41@gmail.com','1083325F5B70BCDAF75566D729EC533ED9962A68D745676A91CF21A23F9A4ADB','225103578','A','pruebassuperaero','2023-12-19 14:54:39','/Administrativo-001'),(197,210,'C','taca','jmartinez214+usuario35@gmail.com','E6CD70B68DD430C179068040D0AC73D327FC55E88B9DAF8B516BA006FECFDE17','3552139','A','taca','2024-01-12 16:51:42','/Administrativo-001'),(198,211,'C','aviateca','jmartinez214+usuario36@gmail.com','78C68F58CEB78D19E0E62D914484C3DE21986B6A3E4B6BC080F102C28211335D','1999328284','A','aviateca','2024-01-12 17:01:22','/Administrativo-001'),(199,212,'C','regional','jmartinez214+usuario37@gmail.com','2B1A92528CAE26A5BB6EADC56FB0686759FCCCBCA1755A52D3130AD0DD9626F1','-690338273','A','regional','2024-01-12 17:03:38','/Administrativo-001'),(200,213,'C','avacostar','jmartinez214+usuario38@gmail.com','8ADA5B09EB4D6F0B580EE4885606A2B888685104E4033917CDFED437F8639F89','-902353270','A','avacostar','2024-01-12 17:09:59','/Administrativo-001'),(201,214,'C','latamsuperv','jmartinez214+usuario39@gmail.com','A39240712BF1016CAD88CC3394FD14E5DA2E0F242822C55DC0030A2968BE03E3','1015893542','C','latamsuperv','2024-01-15 14:57:35','/Administrativo-001');
/*!40000 ALTER TABLE `token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token_servidor`
--

DROP TABLE IF EXISTS `token_servidor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token_servidor` (
  `id_token_servidor` int NOT NULL AUTO_INCREMENT,
  `id_token` int DEFAULT NULL,
  `tipo` varchar(8) NOT NULL COMMENT 'Tipo de encripcion AES DES JASCRIPT',
  `servidor` varchar(8) NOT NULL COMMENT 'Servidor que esta utilizando WL12=weblogic 12c  WF19=wildfly 19, GF5 glassfish 5',
  `password` varchar(512) DEFAULT NULL COMMENT 'Clave que se ha guardado password',
  `usuario_fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de insercion del registro',
  `usuario_programa` varchar(256) NOT NULL COMMENT 'Programa usado para el cambio',
  PRIMARY KEY (`id_token_servidor`),
  KEY `token_servidor_indice_IDX` (`tipo`),
  KEY `token_servidor_FK` (`id_token`),
  CONSTRAINT `token_servidor_FK` FOREIGN KEY (`id_token`) REFERENCES `token` (`id_token`)
) ENGINE=InnoDB AUTO_INCREMENT=4194 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token_servidor`
--

LOCK TABLES `token_servidor` WRITE;
/*!40000 ALTER TABLE `token_servidor` DISABLE KEYS */;
/*!40000 ALTER TABLE `token_servidor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `id_archivo` int DEFAULT NULL COMMENT 'Codigo de archivos que no tiene obligotariedad',
  `nick` varchar(128) DEFAULT NULL COMMENT 'Nick de Usuario',
  `nombre` varchar(128) NOT NULL COMMENT 'Nombre de Usuario',
  `apellido` varchar(128) NOT NULL COMMENT 'Apellido de Usuario',
  `usuario` varchar(128) NOT NULL COMMENT 'Usuario que realizo el cambio',
  `validador` varchar(512) NOT NULL COMMENT 'Campo de validacion para los registros',
  `usuario_fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de insercion del registro',
  `usuario_programa` varchar(256) NOT NULL COMMENT 'Programa usado para el cambio',
  `estado` varchar(8) DEFAULT NULL COMMENT 'Estado del listado A=Activo, I=Inactivo y X=Eliminado',
  `contador_ingreso` int DEFAULT NULL COMMENT 'Contador de intentos fallidos',
  `contador_fecha` datetime DEFAULT NULL COMMENT 'Fecha y hora del intentos fallidos',
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `usuario_nick_IDX` (`nick`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=215 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (13,NULL,'admin','Administrador','SIC','root','92668751','2021-06-22 17:29:13','/Login-001','A',3,'2023-02-03 13:57:39'),(15,NULL,'root','Usuario Principal','SIC','root','3506402','2021-06-22 21:39:42','/Login-001','A',0,'2024-11-18 12:32:55'),(18,NULL,'aerolinea','usuario manifiesto','SIC','omar','2077778476','2022-03-08 20:46:09','/Login-001','A',1,'2024-11-18 14:16:18'),(25,NULL,'supervisor','Supervisor','SIC','root','-1697229976','2022-03-23 11:10:29','/Login-001','A',0,'2024-11-17 18:56:06'),(26,NULL,'jmartinez','Johanna Martinez AVIANCA','SIC','admin','1938753242','2022-03-23 14:36:49','/Login-001','A',0,'2024-01-23 10:13:18'),(27,NULL,'lhernandez','Luis Hernandez','SIC','admin','-1771738745','2022-04-06 18:08:54','/Login-001','A',0,'2022-04-18 16:05:17'),(28,NULL,'aerolinea2','Paul Sanchez','SIC','admin','-13376634','2022-04-07 19:12:42','/Login-001','A',0,'2022-06-04 20:16:57'),(29,NULL,'cgaribello','Carlos Mauricio Garibello Correa','AEROCIVIL','admin','-1014419240','2022-04-18 15:31:01','/Login-001','A',0,'2023-08-11 14:14:45'),(30,NULL,'hloaiza','Haidy Loaiza','AEROCIVIL','admin','1008555962','2022-04-18 15:40:04','/Login-001','A',0,'2023-06-21 15:18:46'),(31,NULL,'ovelez','Omar Velez','SIC','cgaribello','-1005040125','2022-04-18 22:20:57','/Login-001','A',0,'2024-07-09 14:06:02'),(32,NULL,'aerocivil','Aeronautica','SIC','supervisor','2069474610','2022-04-20 22:07:59','/Login-001','A',0,'2022-09-09 12:32:17'),(33,NULL,'pgomez','Pedro Gomez','SIC','admin','-989964918','2022-04-21 18:37:24','/Login-001','A',1,'2023-05-23 17:28:13'),(34,NULL,'truiz','Tania Ruiz','SIC','ADMIN','110640424','2022-06-03 16:51:02','/Login-001','A',0,'2023-03-24 11:42:12'),(35,NULL,'adiaz','Alexander','zDiaz','supervisor','92664671','2022-06-09 14:25:36','/Login-001','A',0,'2023-02-14 10:15:22'),(36,NULL,'ivera','ivan vera','AEROCIVIL','admin','100585735','2022-06-13 14:58:09','/Login-001','A',0,'2022-10-14 09:56:57'),(37,NULL,'sjimenez','Sonia Jimenez','AEROCIVIL','admin','1255677785','2022-06-13 14:57:44','/Login-001','A',0,'2023-02-03 11:49:31'),(38,NULL,'msalinas','Marcela Salinas ','AEROCIVIL','admin','-1443488792','2022-06-13 15:23:24','/Login-001','A',0,'2023-02-14 11:03:32'),(39,NULL,'dpedreros','Diana Pedreros ','AEROCIVIL','admin','-315680904','2022-06-13 16:12:17','/Login-001','A',0,'2023-08-30 15:50:28'),(40,NULL,'rodriguezm','miryan rodríguez ','AEROCIVIL','admin','-303336660','2022-06-13 16:19:38','/Login-001','A',2,'2023-05-05 12:11:42'),(41,NULL,'stovar','Sandra Tovar','SIC','cgaribello','-892063175','2022-06-15 12:39:01','/Login-001','A',0,'2023-05-10 23:17:30'),(42,NULL,'eruiz','Elian Ruiz','SIC','cgaribello','96787609','2022-07-25 13:59:55','/Login-001','A',2,'2023-05-23 21:47:50'),(43,NULL,'cjami','Claudia Jami','SIC','cgaribello','94683126','2022-07-26 15:23:48','/Administrativo-001','A',0,NULL),(45,NULL,'alromero','Alexander Romero ','WINGO','cgaribello','1984609661','2022-10-27 11:52:17','/Login-001','A',0,'2022-11-04 13:20:59'),(46,NULL,'etorres','Edison Torres ','WINGO','cgaribello','-1424407410','2022-10-27 12:09:44','/Login-001','A',0,'2022-11-02 10:55:07'),(47,NULL,'karobayo','Karen Andrea Robayo molano ','AEROMEXICO','cgaribello','1059906600','2022-11-16 13:40:06','/Login-001','A',0,'2023-01-07 17:41:22'),(48,NULL,'savergara1','sulmara vergara f','AEROMEXICO','cgaribello','1944955731','2022-11-16 13:42:45','/Login-001','A',0,'2022-11-17 05:00:59'),(49,NULL,'sloaiza','santiago loaiza ','AEROMEXICO','cgaribello','-2113805435','2022-11-16 13:43:51','/Login-001','A',0,'2022-11-16 15:34:58'),(51,NULL,'emontoya','edna cecilia montoya ','AEROMEXICO','cgaribello','1166827466','2022-11-16 13:45:13','/Login-001','A',0,'2023-06-14 17:17:10'),(52,NULL,'lzamora','luz angela zamora z','LATAM','cgaribello','651845220','2022-11-16 14:03:11','/Login-001','A',0,'2022-12-24 18:04:40'),(53,NULL,'avargas','alexandra vargas C','LATAM','cgaribello','-635136525','2022-11-16 14:04:14','/Login-001','A',0,'2023-03-01 14:37:38'),(54,NULL,'amantilla','Alvaro Mantilla ','LATAM','cgaribello','911455891','2022-11-16 14:04:45','/Login-001','A',0,'2022-12-21 09:59:27'),(59,NULL,'amendoza','adriana mendoza','LATAM','cgaribello','-1796214713','2022-11-16 14:08:51','/Login-001','A',0,'2023-06-14 16:19:42'),(60,NULL,'sarrieta','sergio arrieta ','LATAM','cgaribello','2120470167','2022-11-16 14:09:41','/Login-001','A',0,'2022-12-22 13:06:56'),(61,NULL,'jcocuy','jose manuel cocuy','LATAM','cgaribello','-1165443023','2022-11-16 14:10:14','/Login-001','A',0,'2023-01-11 22:32:39'),(62,NULL,'hrios','hilda maria reyes','LATAM','cgaribello','99546819','2022-11-16 14:10:57','/Administrativo-001','A',0,NULL),(63,NULL,'mcala','marly viviana cala','LATAM','cgaribello','103709760','2022-11-16 14:11:32','/Login-001','A',0,'2022-11-16 15:23:36'),(67,NULL,'jvanegas','john vanegas ','LATAM','cgaribello','287279693','2022-11-16 14:15:38','/Administrativo-001','A',0,NULL),(68,NULL,'msepulveda','manuela sepulveda','LATAM','cgaribello','-1939620204','2022-11-16 14:16:07','/Login-001','A',0,'2023-02-08 21:02:44'),(69,NULL,'dzurique','daniela zurique','LATAM','cgaribello','-1748193813','2022-11-16 14:16:36','/Login-001','A',0,'2023-01-26 11:15:16'),(70,NULL,'wniebles','william niebles ','LATAM','cgaribello','-1115447509','2022-11-16 14:17:54','/Login-001','A',0,'2022-11-16 18:55:01'),(72,NULL,'jquintana','jailer quintana ','LATAM','cgaribello','627376403','2022-11-16 14:19:16','/Administrativo-001','A',0,NULL),(73,NULL,'lababilonia','levis alberto Babilonia','LATAM','cgaribello','2018072264','2022-11-16 14:35:21','/Login-001','A',0,'2023-02-06 19:25:57'),(78,NULL,'chernandez','Camilo Hernandez','SIC','cgaribello','-3117200','2023-02-28 19:43:46','/Login-001','A',0,'2023-07-05 11:09:12'),(79,NULL,'ngomez','Nancy Gomez','SIC','cgaribello','-1047223220','2023-03-08 14:09:37','/Login-001','A',0,'2023-05-02 07:11:12'),(80,NULL,'jmartinezt2','Johanna Martinez SuperAERO','SIC','cgaribello','-873937256','2023-03-23 17:51:29','/Login-001','A',0,'2023-08-24 10:31:29'),(81,NULL,'airlines','American Airlines','SIC','cgaribello','-680782859','2023-03-24 11:45:03','/Login-001','A',0,'2023-06-08 21:33:14'),(82,NULL,'aerorepublica','Aerorepublica','SIC','cgaribello','-1766581948','2023-03-24 14:52:29','/Login-001','A',0,'2023-06-08 20:58:19'),(83,NULL,'sicadmon','SIC','SIC','ROOT','123','2023-04-11 16:15:04','/Login-001','A',1,'2023-05-23 14:41:13'),(84,NULL,'sicsuperaeroc','Supervisor Aerolinea','SIC','sicadmon','2060874004','2023-04-13 18:56:11','/Login-001','A',0,'2024-07-10 10:37:25'),(85,NULL,'latam','Latam','SIC','sicadmon','123','2023-04-13 19:03:08','/Login-001','A',1,'2023-06-13 17:51:15'),(86,NULL,'pepito','pepito','zpepito','root','-991785559','2023-04-14 10:40:31','/Login-001','A',0,'2023-04-14 10:46:30'),(90,NULL,'52795896','Johanna Martinez ADM','SIC','ovelez','934056895','2023-06-05 11:39:05','/Login-001','A',0,'2025-01-08 10:11:40'),(91,NULL,'52988800','Haidy Esperanza Loaiza Soache','AEROCIVIL','ovelez','990480764','2023-06-21 15:13:34','/Login-001','A',0,'2023-08-30 15:33:02'),(92,NULL,'23606926','Diana Marcela Pedreros Diaz','AEROCIVIL','52988800','123','2023-06-21 15:37:37','/Login-001','A',0,'2023-08-10 15:50:10'),(93,NULL,'52951014','Carolina Esteban Diaz','AEROCIVIL','23606926','123','2023-06-21 15:50:00','/Login-001','A',2,'2023-07-10 10:30:03'),(94,NULL,'7700971','Jose Hernan Muñoz','SEARCA','ovelez','123','2023-06-21 16:19:24','/Login-001','A',0,'2023-08-11 10:35:20'),(95,NULL,'82330539','Gerardo Perez Moreno','SEARCA','23606926','123','2023-06-21 16:37:18','/Login-001','A',0,'2023-08-11 10:26:11'),(96,NULL,'15674456','Fredys Manuel Arrieta Palacios','SEARCA','52988800','123','2023-06-21 16:45:51','/Login-001','A',0,'2023-08-02 11:12:44'),(97,NULL,'79510019','Carlos Mauricio Garibello Correa','AEROCIVIL','ovelez','123','2023-06-22 09:07:39','/Login-001','A',2,'2023-10-17 13:28:20'),(98,NULL,'1104869063','Jorge Enrique Agresot Rodriguez','SATENA','ovelez','123','2023-06-22 09:16:22','/Login-001','A',0,'2023-06-22 09:40:15'),(99,NULL,'1015473680','Sarita del Pilar Camargo Cabrera','LLANERA DE AVIACION ','79510019','123','2023-06-22 10:11:57','/Administrativo-001','A',0,NULL),(100,NULL,'1032470987','Angie Katherin Castro Carvajal','SARPA','23606926','123','2023-06-22 14:29:50','/Administrativo-001','A',0,NULL),(101,NULL,'80411289','Juan Diego Vargas Calderon','HELICOL','23606926','123','2023-06-22 14:49:18','/Administrativo-001','A',0,NULL),(102,NULL,'7715369','Elmer Molinas Rivas','EASYFLY','52988800','123','2023-06-22 14:51:49','/Administrativo-001','A',0,NULL),(103,NULL,'1026255346','Mary Ellen Consuegra Cardona','Central Aerospace','23606926','123','2023-06-22 15:11:09','/Administrativo-001','A',0,NULL),(104,NULL,'1007702795','Samara Cadena Clavijo','Central Aerospace','23606926','-953606560','2023-06-22 15:22:13','/Administrativo-001','A',0,NULL),(105,NULL,'53081946','Adriana Milena Becerra Colmenares','Central Aerospace','23606926','123','2023-06-22 15:31:10','/Administrativo-001','A',0,NULL),(106,NULL,'10178622','Juan Carlos Arenas Melo','Central Aerospace','23606926','123','2023-06-22 15:35:29','/Administrativo-001','A',0,NULL),(107,NULL,'1026269575','Roger Fuentes','CONCESIONARIA VOLARIS','52988800','1507112353','2023-06-22 15:39:10','/Administrativo-001','A',0,NULL),(108,NULL,'94513415','Flower Alfonso Hoyos Garcia','Central Aerospace','23606926','123','2023-06-22 15:42:26','/Administrativo-001','A',0,NULL),(109,NULL,'1136888726','David Santiago Ferreira Aldana','Central Aerospace','23606926','123','2023-06-22 15:54:42','/Administrativo-001','A',0,NULL),(110,NULL,'1072717379','Diana Marcela Solarte Pachón','Central Aerospace','23606926','123','2023-06-22 15:59:15','/Administrativo-001','A',0,NULL),(111,NULL,'1018493110','Jenny Moreno','CONCECIONARIA VOLARIS','52988800','123','2023-06-22 16:07:50','/Administrativo-001','A',0,NULL),(112,NULL,'1001327460','Nicoll Carolina Castellanos Parra','SARPA','23606926','123','2023-06-22 16:17:52','/Administrativo-001','A',0,NULL),(113,NULL,'52792395','Yaneth Ramirez','CONCECIONARIA VOLARIS','52988800','123','2023-06-22 16:21:59','/Administrativo-001','A',0,NULL),(114,NULL,'1005183514','Yeferson Steven Mendez Hernandez','SARPA','23606926','123','2023-06-22 16:23:02','/Administrativo-001','A',0,NULL),(115,NULL,'1007343094','Angge Juliana Sierra Cañon','SARPA','23606926','123','2023-06-22 16:28:30','/Administrativo-001','A',0,NULL),(116,NULL,'1123625333','Chavely Cheryl Cordoba Henry','SARPA','23606926','123','2023-06-22 16:32:05','/Administrativo-001','A',0,NULL),(117,NULL,'52784685','Diana Milena Méndez Barboza','LATAM','52795896','123','2023-06-22 19:18:32','/Administrativo-001','A',0,NULL),(118,NULL,'1023919640','Katherin Julieth Plazas Martinez ','LATAM','52795896','123','2023-06-22 19:20:47','/Administrativo-001','A',0,NULL),(119,NULL,'53155125','Karen Lorena Leon Turriago ','LATAM','52795896','123','2023-06-22 19:22:52','/Administrativo-001','A',0,NULL),(120,NULL,'53032025','Leidy Johanna Usaquen Velasquez','LATAM','52795896','123','2023-06-22 19:23:43','/Administrativo-001','A',0,NULL),(121,NULL,'1000973258','Maria Paula Hernandez Santamaria','LATAM','52795896','123','2023-06-22 19:24:32','/Administrativo-001','A',0,NULL),(122,NULL,'1001201823','Isabella Baquero Herrera','LATAM','52795896','123','2023-06-22 19:26:19','/Administrativo-001','A',0,NULL),(123,NULL,'1010007837','Ivon Vannesa Rugeles Calderon','LATAM','52795896','123','2023-06-22 19:27:17','/Administrativo-001','A',0,NULL),(124,NULL,'1033819398','Jhon Alejandro Perez Cano','LATAM','52795896','123','2023-06-22 19:28:02','/Administrativo-001','A',0,NULL),(125,NULL,'1075317226','Juan Sebastián Camacho Perdomo','EASYFLY','52988800','123','2023-06-23 08:32:48','/Administrativo-001','A',0,NULL),(126,NULL,'1088337928','Maria Alejandra Duque Fernandez','EASYFLY','52988800','123','2023-06-23 08:38:10','/Administrativo-001','A',0,NULL),(127,NULL,'1032470067','Alejandra Moreno Moncada','AMBULANCIAS AEREAS DE COLOMBIA','23606926','123','2023-06-23 08:40:34','/Administrativo-001','A',0,NULL),(128,NULL,'1117519674','Daniel Enrique Torres Velasquez','EASYFLY','52988800','123','2023-06-23 08:43:49','/Administrativo-001','A',0,NULL),(129,NULL,'24827361','Mariluz Loaiza Alvarez','AMBULANCIAS AEREAS DE COLOMBIA','23606926','123','2023-06-23 08:44:47','/Administrativo-001','A',0,NULL),(130,NULL,'1023879891','Javier Sichaca Castellanos','AMBULANCIAS AEREAS DE COLOMBIA','23606926','123','2023-06-23 08:48:44','/Administrativo-001','A',0,NULL),(131,NULL,'36294846','Jessica Paola Paker Meneses','EASYFLY','52988800','123','2023-06-23 08:48:42','/Administrativo-001','A',0,NULL),(132,NULL,'1018460449','Camilo Enriquez Bravo','AMBULANCIAS AEREAS DE COLOMBIA','23606926','123','2023-06-23 08:52:38','/Administrativo-001','A',0,NULL),(133,NULL,'1018471561','Cristian Maldonado Rincon','AMBULANCIAS AEREAS DE COLOMBIA','23606926','123','2023-06-23 09:07:51','/Administrativo-001','A',0,NULL),(134,NULL,'92521536','Camilo Urzola Gomez','UNITED AIRLINES','52988800','123','2023-06-23 09:08:33','/Administrativo-001','A',0,NULL),(135,NULL,'1070616189','Oscar Guevara Buitrago','AMBULANCIAS AEREAS DE COLOMBIA','23606926','123','2023-06-23 09:10:20','/Administrativo-001','A',0,NULL),(136,NULL,'80757968','Jimmy Cañaveral Guevara','AMBULANCIAS AEREAS DE COLOMBIA','23606926','123','2023-06-23 09:17:11','/Administrativo-001','A',0,NULL),(137,NULL,'1098694086','Andres Prada Granados','AMBULANCIAS AEREAS DE COLOMBIA','23606926','123','2023-06-23 09:20:36','/Login-001','A',0,'2023-08-09 20:34:43'),(138,NULL,'1072715655','Nicolas De la Torre Avendaño','AMBULACIAS AEREAS DE COLOMBIA','23606926','123','2023-06-23 09:23:04','/Administrativo-001','A',0,NULL),(139,NULL,'53002189','Ivon Cardenas Ruiz','UNITED AIRLINES','52988800','123','2023-06-23 10:02:58','/Administrativo-001','A',0,NULL),(140,NULL,'1026258436','John Tovaria Romero','UNITED AIRLINES','52988800','123','2023-06-23 10:05:52','/Administrativo-001','A',0,NULL),(141,NULL,'79547984','Mauricio Guzman Rodriguez','UNITED AIRLINES','52988800','123','2023-06-23 10:09:43','/Administrativo-001','A',0,NULL),(142,NULL,'1030520097','Ana Maria Cañon Abril','UNITED AIRLINES','52988800','123','2023-06-23 10:16:04','/Administrativo-001','A',0,NULL),(143,NULL,'35466431','Marcela Garavito Rubio','UNITED AIRLINES','52988800','123','2023-06-23 10:20:02','/Administrativo-001','A',0,NULL),(144,NULL,'1018492902','Dania Loo Martinez Navarro','AVA','52795896','123','2023-06-23 22:13:03','/Administrativo-001','A',0,NULL),(145,NULL,'1123631670','Luisa Fernanda Benitez Gomez','AVA','52795896','123','2023-06-23 22:15:55','/Administrativo-001','A',0,NULL),(146,NULL,'1123636393','Valerie Palacio Ramirez','AVA','52795896','123','2023-06-23 22:17:41','/Administrativo-001','A',0,NULL),(147,NULL,'1007340235','Litsy Paola Mendes Navarro','AVA','52795896','123','2023-06-23 22:18:58','/Administrativo-001','A',0,NULL),(148,NULL,'1123627173','Juliette Patricia Arevalo Pajaro ','AVA','52795896','123','2023-06-23 22:19:48','/Administrativo-001','A',0,NULL),(149,NULL,'1123637208','Garnica Lever Juan Jose','AVA','52795896','123','2023-06-23 22:22:26','/Administrativo-001','A',0,NULL),(150,NULL,'24605147','Maria Yamile Erazo Moreno','AVA','52795896','123','2023-06-23 22:46:26','/Administrativo-001','A',0,NULL),(151,NULL,'57464857','Ana Maria Caballero Cuao','AVA','52795896','123','2023-06-23 22:49:00','/Administrativo-001','A',0,NULL),(152,NULL,'1140888386','Andrea Carolina Hernandez Lugo','AVA','52795896','123','2023-06-23 22:49:55','/Administrativo-001','A',0,NULL),(153,NULL,'32765102','Angela Luz Ulloa Caraballo','AVA','52795896','123','2023-06-23 22:51:44','/Administrativo-001','A',0,NULL),(154,NULL,'1143258138','Angie Daniela Acuna Pedrozo','AVA','52795896','521810240','2023-06-23 22:52:25','/Administrativo-001','A',0,NULL),(155,NULL,'1042417095','Deliana Margarita Serrano Padilla','AVA','52795896','123','2023-06-23 22:55:16','/Administrativo-001','A',0,NULL),(156,NULL,'1084729502','Idalmis Mercedes Palacio Herrera','AVA','52795896','123','2023-06-23 22:56:16','/Administrativo-001','A',0,NULL),(157,NULL,'22445897','Judith Marina Jimenez Otalvarez','AVA','52795896','123','2023-06-23 22:57:19','/Administrativo-001','A',0,NULL),(158,NULL,'44152784','Mariela Rodriguez Castro','AVA','52795896','123','2023-06-23 22:58:06','/Administrativo-001','A',0,NULL),(159,NULL,'1129523526','Milena Paola Arzuza Molina','AVA','52795896','123','2023-06-23 22:58:59','/Administrativo-001','A',0,NULL),(160,NULL,'52448962','Rosa Alexandra Perdomo Donado','AVA','52795896','123','2023-06-23 22:59:50','/Administrativo-001','A',0,NULL),(161,NULL,'1016084617','Ingrid Carolina Martinez Guaneme','AVA','52795896','123','2023-06-23 23:06:41','/Administrativo-001','A',0,NULL),(162,NULL,'1099373583','Brayam Leonardo Moreno Saavedra','AVA','52795896','123','2023-06-23 23:07:49','/Administrativo-001','A',0,NULL),(163,NULL,'1116792925','Julio Andres Villamizar Zabala','AVA','52795896','123','2023-06-23 23:08:37','/Administrativo-001','A',0,NULL),(164,NULL,'63490386','Janeth Consuelo Caceres Hernandez','AVA','52795896','123','2023-06-23 23:09:17','/Administrativo-001','A',0,NULL),(165,NULL,'13741073','Carlos Ivan Moreno Almeyda','AVA','52795896','123','2023-06-23 23:09:56','/Administrativo-001','A',0,NULL),(166,NULL,'13536949','Edgar Mauricio Acevedo Galvis','AVA','52795896','123','2023-06-23 23:10:47','/Administrativo-001','A',0,NULL),(167,NULL,'13538001','Edgar Orlando Barajas Almeida','AVA','52795896','123','2023-06-23 23:11:39','/Administrativo-001','A',0,NULL),(168,NULL,'1098658090','Lucy Espinosa','AVA','52795896','123','2023-06-23 23:12:18','/Administrativo-001','A',0,NULL),(169,NULL,'1102348563','Paola Marcela Garnica Arguello','AVA','52795896','123','2023-06-23 23:13:02','/Administrativo-001','A',0,NULL),(170,NULL,'1024479514','Benjamin Perilla Aguilar','AVA','52795896','123','2023-06-23 23:13:57','/Administrativo-001','A',0,NULL),(171,NULL,'88035252','Emilio Jose Rolon Jimenez','AVA','52795896','123','2023-06-23 23:14:39','/Administrativo-001','A',0,NULL),(172,NULL,'37531046','Ruth Mary Gomez Chaparro','AVA','52795896','123','2023-06-23 23:15:18','/Administrativo-001','A',0,NULL),(173,NULL,'1130680434','Jennifer Zuleima Gonzalez Carrillo','AVA','52795896','123','2023-06-23 23:15:56','/Administrativo-001','A',0,NULL),(174,NULL,'1007900967','Luz Gabriela Nunez Duran','AVA','52795896','123','2023-06-23 23:16:38','/Administrativo-001','A',0,NULL),(175,NULL,'63453359','Karol Vanessa Rojas Torres','AVA','52795896','123','2023-06-23 23:17:32','/Administrativo-001','A',0,NULL),(176,NULL,'43263970','Nini Johana Moscote Monroy','AVA','52795896','123','2023-06-23 23:26:16','/Administrativo-001','A',0,NULL),(177,NULL,'79450847','Carlos Alberto Parra Colmenares','AVA','52795896','123','2023-06-23 23:35:33','/Administrativo-001','A',0,NULL),(178,NULL,'1023914670','Claudia Marcela Rodriguez Barrera','AVA','52795896','123','2023-06-23 23:36:26','/Administrativo-001','A',0,NULL),(179,NULL,'53930178','Angela Johanna Munoz Torres','AVA','52795896','123','2023-06-23 23:36:56','/Administrativo-001','A',0,NULL),(180,NULL,'1012340316','Diana Marcela Guerrero Tunjo','AVA','52795896','123','2023-06-23 23:37:43','/Administrativo-001','A',0,NULL),(181,NULL,'52103847','Amalfi Zoraida Rodriguez Escobar','AVA','52795896','123','2023-06-23 23:38:21','/Administrativo-001','A',0,NULL),(182,NULL,'1014232200','Yessika Lorena Zambrano Artunduaga','AVA','52795896','123','2023-06-23 23:39:08','/Administrativo-001','A',0,NULL),(183,NULL,'1016075662','Adriana Carolina Suarez Suarez','AVA','52795896','123','2023-06-23 23:39:54','/Administrativo-001','A',0,NULL),(184,NULL,'1022373243','Alejandra Martinez Pardo','AVA','52795896','123','2023-06-23 23:40:46','/Administrativo-001','A',0,NULL),(185,NULL,'1032374491','Maria Yessica Cardozo Chaparro','AVA','52795896','123','2023-06-23 23:41:25','/Administrativo-001','A',0,NULL),(186,NULL,'1020751998','Katherine Gina Lozano Navarro','AVA','52795896','123','2023-06-23 23:42:07','/Administrativo-001','A',0,NULL),(187,NULL,'1016059803','Yeimi Andrea Rodriguez Chaves','AVA','52795896','123','2023-06-23 23:42:48','/Administrativo-001','A',0,NULL),(188,NULL,'53132699','Leidy Yasmina Hernandez Salamanca','AVA','52795896','123','2023-06-23 23:44:04','/Administrativo-001','A',0,NULL),(189,NULL,'20958792','Maria Angelica Macias Munoz','AVA','52795896','123','2023-06-23 23:44:47','/Administrativo-001','A',0,NULL),(190,NULL,'1016066840','Karol Natalia Bermudez Figueroa','AVA','52795896','123','2023-06-23 23:45:27','/Administrativo-001','A',0,NULL),(191,NULL,'1016083463','Laura Stephania Soler Martinez','AVA','52795896','123','2023-06-23 23:46:00','/Administrativo-001','A',0,NULL),(192,NULL,'1074159328','Lina Maria Delgado Pardo','AVA','52795896','123','2023-06-23 23:46:44','/Administrativo-001','A',0,NULL),(193,NULL,'1020787123','Dahiana Pena Garcia','AVA','52795896','123','2023-06-23 23:47:24','/Administrativo-001','A',0,NULL),(194,NULL,'68304144','Jaidy Magaly Trujillo Diaz','AVA','52795896','123','2023-06-23 23:48:16','/Administrativo-001','A',0,NULL),(195,NULL,'53065934','Niyireth Parra Garavito','AVA','52795896','123','2023-06-23 23:48:53','/Administrativo-001','A',0,NULL),(196,NULL,'1070955298','Leidy Johana Obando Campos','AVA','52795896','800533200','2023-06-23 23:49:31','/Administrativo-001','A',0,NULL),(197,NULL,'21018478','Sanchez Carmen Patricia','AVA','52795896','123','2023-06-23 23:50:13','/Administrativo-001','A',0,NULL),(198,NULL,'1032361012','Neyda Maritza Baquero Hortua','AVA','52795896','123','2023-06-23 23:50:54','/Administrativo-001','A',0,NULL),(199,NULL,'1013640178','Santiago Silva','TAC','52988800','123','2023-07-04 11:38:33','/Administrativo-001','A',0,NULL),(200,NULL,'1006810318','Juana Hernandez','CONCESIONARIA VUELA COMPAÑIA DE AVIACION VOLARIS','52988800','123','2023-07-06 10:46:04','/Administrativo-001','A',0,NULL),(201,NULL,'searca','Aerolinea Searca','SEARCA','ovelez','123','2023-07-24 21:03:16','/Login-001','A',0,'2023-07-25 12:11:49'),(202,NULL,'satena','AEROLINEA SATENA','SATENA','ovelez','123','2023-07-25 10:50:30','/Login-001','A',0,'2024-10-24 09:11:27'),(203,NULL,'aliansa','Usuario Andinas Aliansa','ALIANSA','ovelez','123','2023-07-25 11:27:00','/Login-001','A',0,'2025-01-08 10:16:21'),(204,NULL,'usuario','AEROLINEA','PRUEBAS','ovelez','123','2023-07-25 23:52:04','/Login-001','A',0,'2023-08-24 10:37:14'),(205,NULL,'vertical','VERTICAL DE AVIACION','VERTICAL','ovelez','123','2023-07-26 14:29:45','/Administrativo-001','A',0,NULL),(206,NULL,'avianca','Aeronaves del Continente AVIANCA','AVIANCA Pruebas','ovelez','123','2023-07-26 15:43:51','/Login-001','A',1,'2024-10-23 19:40:12'),(207,NULL,'lan','Latam Pruebas','LAN','ovelez','123','2023-07-31 12:49:05','/Login-001','A',0,'2023-08-09 15:37:18'),(208,NULL,'omar123','omar','test','root','123','2023-10-18 18:17:49','/Login-001','A',0,'2023-10-23 18:54:45'),(209,NULL,'pruebassuperaero','pruebas super aerolinea','SIC','ovelez','123','2023-12-19 14:49:26','/Login-001','A',0,'2024-02-15 16:51:33'),(210,NULL,'taca','Taca Internacional','SIC','ovelez','123','2024-01-12 16:44:09','/Login-001','A',0,'2024-01-12 16:51:56'),(211,NULL,'aviateca','Aviateca SA','SIC','ovelez','123','2024-01-12 16:55:19','/Login-001','A',0,'2024-01-15 15:01:14'),(212,NULL,'regional','Regional Express','SIC','ovelez','123','2024-01-12 16:56:52','/Login-001','A',0,'2024-01-12 17:03:49'),(213,NULL,'avacostar','Avianca Costa Rica','SIC','ovelez','123','2024-01-12 17:06:09','/Login-001','A',0,'2024-01-12 17:10:06'),(214,NULL,'latamsuperv','Supervisor LATAM','SIC','ovelez','123','2024-01-15 14:52:28','/Login-001','A',0,'2024-01-15 14:57:44');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `v_group_members`
--

DROP TABLE IF EXISTS `v_group_members`;
/*!50001 DROP VIEW IF EXISTS `v_group_members`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_group_members` AS SELECT 
 1 AS `NAME`,
 1 AS `MEMBER`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_groups`
--

DROP TABLE IF EXISTS `v_groups`;
/*!50001 DROP VIEW IF EXISTS `v_groups`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_groups` AS SELECT 
 1 AS `NAME`,
 1 AS `DESCRIPTION`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_menu`
--

DROP TABLE IF EXISTS `v_menu`;
/*!50001 DROP VIEW IF EXISTS `v_menu`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_menu` AS SELECT 
 1 AS `nick`,
 1 AS `id_menu`,
 1 AS `indice_menu`,
 1 AS `nombre_menu`,
 1 AS `task_flow`,
 1 AS `task_flow_informacion`,
 1 AS `tipo`,
 1 AS `indice_modulo`,
 1 AS `nombre_modulo`,
 1 AS `contexto`,
 1 AS `orden`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_menu_usuario`
--

DROP TABLE IF EXISTS `v_menu_usuario`;
/*!50001 DROP VIEW IF EXISTS `v_menu_usuario`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_menu_usuario` AS SELECT 
 1 AS `nick`,
 1 AS `id_menu`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_users`
--

DROP TABLE IF EXISTS `v_users`;
/*!50001 DROP VIEW IF EXISTS `v_users`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_users` AS SELECT 
 1 AS `id_usuario`,
 1 AS `DESCRIPTION`,
 1 AS `NAME`,
 1 AS `PASSWORD`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `v_group_members`
--

/*!50001 DROP VIEW IF EXISTS `v_group_members`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`sic`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_group_members` AS select `r`.`tipo` AS `NAME`,`u`.`nick` AS `MEMBER` from ((`rol` `r` join `rol_usuario` `ru`) join `usuario` `u`) where ((`ru`.`id_usuario` = `u`.`id_usuario`) and (`ru`.`id_rol` = `r`.`id_rol`) and (`u`.`estado` = 'A')) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_groups`
--

/*!50001 DROP VIEW IF EXISTS `v_groups`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`sic`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_groups` AS select `rol`.`tipo` AS `NAME`,`rol`.`nombre` AS `DESCRIPTION` from `rol` where (`rol`.`estado` = 'A') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_menu`
--

/*!50001 DROP VIEW IF EXISTS `v_menu`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`sic`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_menu` AS select `vmu`.`nick` AS `nick`,`m`.`id_menu` AS `id_menu`,`m`.`indice` AS `indice_menu`,`m`.`nombre` AS `nombre_menu`,`m`.`task_flow` AS `task_flow`,`m`.`task_flow` AS `task_flow_informacion`,`m`.`tipo` AS `tipo`,`md`.`indice` AS `indice_modulo`,`md`.`nombre` AS `nombre_modulo`,`md`.`contexto` AS `contexto`,`m`.`orden` AS `orden` from ((`modulo` `md` join `menu` `m`) join `v_menu_usuario` `vmu`) where ((`vmu`.`id_menu` = `m`.`id_menu`) and (`m`.`id_modulo` = `md`.`id_modulo`) and (`m`.`estado` = 'A') and (`md`.`estado` = 'A')) order by `m`.`orden` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_menu_usuario`
--

/*!50001 DROP VIEW IF EXISTS `v_menu_usuario`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`sic`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_menu_usuario` AS select distinct `u`.`nick` AS `nick`,`p`.`id_menu` AS `id_menu` from ((((`rol_usuario` `ru` join `rol` `r`) join `permiso` `p`) join `usuario` `u`) join `token` `t`) where ((`u`.`id_usuario` = `ru`.`id_usuario`) and (`ru`.`id_rol` = `r`.`id_rol`) and (`r`.`id_rol` = `p`.`id_rol`) and (`r`.`estado` = 'A') and (`u`.`estado` = 'A') and (`u`.`id_usuario` = `t`.`id_usuario`) and (`t`.`estado` = 'C') and (`p`.`id_menu` = (select `p`.`valor_numero_01` from (`parametro` `p` join `modulo` `m`) where ((`m`.`indice` = 'LG_001_00') and (`m`.`id_modulo` = `p`.`id_modulo`) and (`p`.`indice` = '004'))))) union all select distinct `u`.`nick` AS `nick`,`p`.`id_menu` AS `id_menu` from ((((`rol_usuario` `ru` join `rol` `r`) join `permiso` `p`) join `usuario` `u`) join `token` `t`) where ((`u`.`id_usuario` = `ru`.`id_usuario`) and (`ru`.`id_rol` = `r`.`id_rol`) and (`r`.`id_rol` = `p`.`id_rol`) and (`r`.`estado` = 'A') and (`u`.`estado` = 'A') and (`u`.`id_usuario` = `t`.`id_usuario`) and (`t`.`estado` = 'A')) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_users`
--

/*!50001 DROP VIEW IF EXISTS `v_users`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`sic`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_users` AS select `u`.`id_usuario` AS `id_usuario`,concat(`u`.`nombre`,' ',`u`.`apellido`) AS `DESCRIPTION`,`u`.`nick` AS `NAME`,(select `t`.`token` from `token` `t` where ((`t`.`id_usuario` = `u`.`id_usuario`) and (`t`.`tipo` = 'C')) limit 1) AS `PASSWORD` from `usuario` `u` where (`u`.`estado` = 'A') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-01 23:10:01
