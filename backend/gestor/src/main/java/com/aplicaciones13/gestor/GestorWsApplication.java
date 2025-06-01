package com.aplicaciones13.gestor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

/**
 * Clase principal para iniciar la aplicación Gestor WS.
 * 
 * @autor omargo33
 * @since 2025-01-12
 */
@EnableAspectJAutoProxy
@SpringBootApplication
@ComponentScan(basePackages = {"com.aplicaciones13.gestor", "com.aplicaciones13.base.services"})
public class GestorWsApplication {

	public static void main(String[] args) {
		SpringApplication.run(GestorWsApplication.class, args);
	}
}
