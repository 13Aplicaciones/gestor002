package com.aplicaciones13.gestor.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import lombok.extern.slf4j.Slf4j;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;

/**
 * Clase para configurar el OpenAPI 3.0.
 * 
 * @autor: omargo33@gmail.com
 * @since: 2024-07-10
 */
@Slf4j
@Configuration
public class OpenAPI30 {

    /**
     * Configura el OpenAPI 3.0, con la información del proyecto y el esquema de
     * seguridad.
     * 
     * @return
     */
    @Bean
    public OpenAPI customizeOpenAPI() {
        final String securitySchemeName = "bearerAuth";

        return new OpenAPI()
                .info(new Info()
                        .title("Gestor WS")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("omargo33")
                                .url("https://github.com/13Aplicaciones/gestor002")
                                .email("omargo33@gmail.com"))
                        .description("API para el gestor de la aplicación Gestor 002."))
                .addSecurityItem(new SecurityRequirement()
                        .addList(securitySchemeName))

                .components(new Components()
                        .addSecuritySchemes(securitySchemeName, new SecurityScheme()
                                .name(securitySchemeName)
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")));
    }
}