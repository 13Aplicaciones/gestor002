package com.aplicaciones13.orquestador;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;


@SpringBootApplication
@EnableCaching
public class OrquestadorWsApplication {

	public static void main(String[] args) {
		SpringApplication.run(OrquestadorWsApplication.class, args);
	}

}
