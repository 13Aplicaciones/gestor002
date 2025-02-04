package com.aplicaciones13.manager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import de.codecentric.boot.admin.server.config.EnableAdminServer;

/**
 * Clase principal de la aplicación
 * 
 * TODO: No esta implementada la seguridad.
 * 
 * @author @omargo33
 * 
 * @since 2025-02-04
 * @see https://www.baeldung.com/spring-boot-admin
 * 
 */
@SpringBootApplication
@EnableAdminServer
public class ManagerApplication {
	public static void main(String[] args) {
		SpringApplication.run(ManagerApplication.class, args);
	}
}
