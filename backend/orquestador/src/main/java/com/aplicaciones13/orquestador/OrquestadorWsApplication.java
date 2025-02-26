package com.aplicaciones13.orquestador;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.ComponentScan;


@SpringBootApplication
@EnableCaching
@ComponentScan(basePackages = {"com.aplicaciones13.orquestador", "com.aplicaciones13.base.services"})
public class OrquestadorWsApplication {

	public static void main(String[] args) {
		SpringApplication.run(OrquestadorWsApplication.class, args);
	}

}
