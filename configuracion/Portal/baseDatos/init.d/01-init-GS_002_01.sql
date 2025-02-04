--
-- Date: 2025-01-07
-- @autor: @omargo33
--
-- Leer el archivo clave.txt y crear el usuario user_keycloak con la clave leída
--
CREATE TEMPORARY TABLE temp_password (password VARCHAR(255));
LOAD DATA INFILE '/var/lib/mysql-files/.clave.txt' INTO TABLE temp_password LINES TERMINATED BY '\n';

-- Usar el valor cargado para crear el usuario
SET @password = (SELECT password FROM temp_password LIMIT 1);

-- Crear el usuario user_keycloak con la clave leída
SET @create_user1 = CONCAT('CREATE USER \'user_gs\'@\'%\' IDENTIFIED BY \'', @password, '\'');
SET @create_user2 = CONCAT('CREATE USER \'user_gs\'@\'localhost\' IDENTIFIED BY \'', @password, '\'');

-- Ejecutar las sentencias
PREPARE stmt1 FROM @create_user1;
EXECUTE stmt1;
DEALLOCATE PREPARE stmt1;

PREPARE stmt2 FROM @create_user2;
EXECUTE stmt2;
DEALLOCATE PREPARE stmt2;

--  Asignar permisos al usuario
GRANT ALL PRIVILEGES ON GS_002_01.* TO 'user_gs'@'%'; 
GRANT ALL PRIVILEGES ON GS_002_01.* TO 'user_gs'@'localhost'; 
FLUSH PRIVILEGES;

-- Eliminar la tabla temporal
DROP TEMPORARY TABLE temp_password;

-- Usa base de datos GS_002_01
USE GS_002_01;
