package com.aplicaciones13.gestor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@EnableAspectJAutoProxy
@SpringBootApplication
public class GestorWsApplication {

	public static void main(String[] args) {
		SpringApplication.run(GestorWsApplication.class, args);
	}

}
