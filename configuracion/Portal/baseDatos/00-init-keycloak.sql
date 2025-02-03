--
-- Date: 2021-07-07
-- @autor: @omargo33
--

CREATE USER 'user'@'127.0.0.1' IDENTIFIED BY '123456s';
CREATE USER 'user_keycloak'@'%' IDENTIFIED BY '12341234s';
CREATE USER 'user_keycloak'@'localhost' IDENTIFIED BY '12341234s';

CREATE DATABASE keycloak;

GRANT ALL PRIVILEGES ON GS_002_01.* TO 'user'@'127.0.0.1';
GRANT ALL PRIVILEGES ON GS_002_01.* TO 'user'@'localhost';
GRANT ALL PRIVILEGES ON GS_002_01.* TO 'user'@'%';
GRANT ALL PRIVILEGES ON keycloak.* TO 'user_keycloak'@'%'; 
GRANT ALL PRIVILEGES ON keycloak.* TO 'user_keycloak'@'localhost'; 

GRANT USAGE ON *.* TO 'user'@'127.0.0.1';
GRANT USAGE ON *.* TO 'user'@'%';
GRANT USAGE ON *.* TO 'user'@'localhost';

FLUSH PRIVILEGES;

USE GS_002_01;

SHOW GRANTS FOR 'user'@'%';



CREATE USER 'user'@'localhost' IDENTIFIED BY '123456s';
GRANT ALL PRIVILEGES ON GS_002_01.* TO 'user'@'localhost';
CREATE USER 'user'@'127.0.0.1' IDENTIFIED BY '123456s';
GRANT ALL PRIVILEGES ON GS_002_01.* TO 'user'@'127.0.0.1';
FLUSH PRIVILEGES;



