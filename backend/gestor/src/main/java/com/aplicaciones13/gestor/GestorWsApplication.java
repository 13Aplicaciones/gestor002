package com.aplicaciones13.gestor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@EnableAspectJAutoProxy
@SpringBootApplication
@ComponentScan(basePackages = {"com.aplicaciones13.gestor", "com.aplicaciones13.base.services"})
public class GestorWsApplication {

	public static void main(String[] args) {
		SpringApplication.run(GestorWsApplication.class, args);
	}

}
