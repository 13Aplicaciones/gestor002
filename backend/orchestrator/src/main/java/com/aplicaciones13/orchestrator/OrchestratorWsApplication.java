package com.aplicaciones13.orchestrator;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.ComponentScan;


@SpringBootApplication
@EnableCaching
@ComponentScan(basePackages = {"com.aplicaciones13.orchestrator", "com.aplicaciones13.base.services"})
public class OrchestratorWsApplication {

	public static void main(String[] args) {
		SpringApplication.run(OrchestratorWsApplication.class, args);
	}

}
