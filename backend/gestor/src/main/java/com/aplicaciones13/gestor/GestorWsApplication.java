package com.aplicaciones13.gestor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 * Clase principal para iniciar la aplicación Gestor WS.
 * 
 * @autor omargo33
 * @since 2025-01-12
 */
@EnableAspectJAutoProxy
@SpringBootApplication
@ComponentScan(basePackages = {
		"com.aplicaciones13.gestor",
		"com.aplicaciones13.base.services" })
@EntityScan(basePackages = {
		"com.aplicaciones13.gestor.model",
		"com.aplicaciones13.base.model" // Base model package se requiere para usar LOV
})
@EnableJpaRepositories(basePackages = {
		"com.aplicaciones13.gestor.repository",
		"com.aplicaciones13.base.repository" // Base repository package se requiere para usar LOV
})
public class GestorWsApplication {
	public static void main(String[] args) {
		SpringApplication.run(GestorWsApplication.class, args);
	}
}
