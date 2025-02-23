package com.aplicaciones13.base.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

/**
 * Clase para configurar el OpenAPI 3.0.
 * 
 * @autor: omargo33@gmail.com
 * @since: 2024-07-10
 */
@OpenAPIDefinition(
    info = @io.swagger.v3.oas.annotations.info.Info(
        title = "${openapi.info.title}",
        version = "${openapi.info.version}",
        description = "${openapi.info.description}",
        contact = @io.swagger.v3.oas.annotations.info.Contact(
            name = "${openapi.info.contact.name}",
            url = "${openapi.info.contact.url}",
            email = "${openapi.info.contact.email}"
        )
    )
)
@Configuration
public class OpenAPI30Config {

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