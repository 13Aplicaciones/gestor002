package com.aplicaciones13.keycloak.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;

@Configuration
public class OpenAPIConfig {

    /**
     * Configura el OpenAPI 3.0, con la información del proyecto y el esquema de
     * seguridad.
     * 
     * @return
     */
    @Bean
    public OpenAPI customizeOpenAPI() {        
        return new OpenAPI();
    }
}