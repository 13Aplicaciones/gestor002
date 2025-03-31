package com.aplicaciones13.keycloak.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;

import lombok.Getter;

@Configuration
public class KeycloakConfig {

    @Value("${keycloak.auth-server-url}")
    @Getter
    private String authServerUrl;

    @Value("${keycloak.realm}")
    @Getter
    private String realm;

    @Value("${keycloak.resource}")
    @Getter
    private String clientId;

    @Value("${keycloak.credentials.secret}")
    @Getter
    private String clientSecret;

    @Value("${keycloak.admin.username}")
    @Getter
    private String adminUsername;

    @Value("${keycloak.admin.password}")
    @Getter
    private String adminPassword;

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    // Construir la URL base de la API de admin para el reino específico
    public String getRealmUrl() {
        return authServerUrl + "/admin/realms/" + realm;
    }

    // Obtener un token de acceso para la API de administración
    public String getAdminToken(RestTemplate restTemplate) {
        String tokenUrl = authServerUrl + "/realms/master/protocol/openid-connect/token";
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        
        // Crear el cuerpo de la solicitud para autenticación
        String requestBody = "client_id=admin-cli" +
                "&username=" + adminUsername +
                "&password=" + adminPassword +
                "&grant_type=password";
        
        // Hacer la solicitud para obtener el token (implementación completa en KeycloakService)
        // ...

        return "token"; // Implementación simplificada
    }
}