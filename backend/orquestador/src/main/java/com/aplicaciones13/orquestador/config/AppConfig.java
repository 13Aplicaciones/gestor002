package com.aplicaciones13.orquestador.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

/**
 * AppConfig
 * 
 * @author omargo33
 * @since 2025-01-03
 * 
 */
@Configuration
public class AppConfig {
    
    /**
     * RestTemplate Bean para realizar peticiones HTTP, ejemplo: GET, POST, PUT, DELETE de keycloak
     * 
     * @return
     */
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}