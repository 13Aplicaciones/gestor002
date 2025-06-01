Promt para generar backend


Crear backend en java sobre la tabla que te describo

```sql

CREATE TABLE `combo_item` (
	`id_combo_item` int NOT NULL AUTO_INCREMENT,
	`id_combo` int DEFAULT NULL COMMENT 'Id de modulo',
	`name` varchar(128) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT 'Nombre del indice',
	`status` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Estado del listado A=Activo, I=Inactivo y X=Eliminado',
	`uuid` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'UUID para indice unico de consulta',
	`user` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Usuario que realizo el cambio',
	`user_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de insercion del registro',
	`user_app` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Programa usado para el cambio',
PRIMARY KEY (`id_combo_item`),
KEY `combo_item_FK` (`id_combo`),
CONSTRAINT `combo_item_FK` FOREIGN KEY (`id_combo`) REFERENCES `combo` (`id_combo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

```
usando como ejemplo o plantilla las siguientes clases e incluir documentacion en base a los comments.

Usar Cloud Sonnet. 