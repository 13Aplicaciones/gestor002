--
-- Date: 2021-07-07
-- @autor: @omargo33
--
CREATE USER 'user_keycloak'@'%' IDENTIFIED BY '12341234s';
CREATE USER 'user_keycloak'@'localhost' IDENTIFIED BY '12341234s';

CREATE DATABASE keycloak;

GRANT ALL PRIVILEGES ON keycloak.* TO 'user_keycloak'@'%'; 
GRANT ALL PRIVILEGES ON keycloak.* TO 'user_keycloak'@'localhost'; 

FLUSH PRIVILEGES;

USE GS_002_01;