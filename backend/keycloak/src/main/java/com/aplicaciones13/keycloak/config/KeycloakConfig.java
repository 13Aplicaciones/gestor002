package com.aplicaciones13.keycloak.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.aplicaciones13.keycloak.model.Token;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

/**
 * Configuracion de API keycloak
 * 
 * @author omargo33
 * @since 2025-03-31
 * 
 */
@Slf4j
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

    /**
     * Obtiene la URL del servidor de autenticación
     * 
     * @return
     */
    public String getRealmUrl() {
        return authServerUrl + "/admin/realms/" + realm;
    }

    /**
     * Obtiene el token de administracion.
     * 
     * @param restTemplate
     * @return
     */
    public String getAdminToken(RestTemplate restTemplate) {
        try {
            String tokenUrl = authServerUrl + "/realms/master/protocol/openid-connect/token";

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            // Crear el cuerpo de la solicitud para autenticación
            MultiValueMap<String, String> requestBody = new org.springframework.util.LinkedMultiValueMap<>();
            requestBody.add("client_id", "admin-cli");
            requestBody.add("grant_type", "password");
            requestBody.add("username", adminUsername);
            requestBody.add("password", adminPassword);

            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
            HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);

            log.info("Fetching token {}", requestBody);

            ResponseEntity<Token> response = restTemplate.exchange(
                    tokenUrl,
                    HttpMethod.POST,
                    requestEntity,
                    Token.class);

            if (response.getStatusCode() != HttpStatus.OK) {
                log.warn("Failed to fetch token, status {} body {}", response.getStatusCode(), response.getBody());
            }
            return response.getBody().getAccessToken();
        } catch (Exception e) {
            log.error("Error al obtener token de administrador: {}", e.getMessage());
            return null;
        }
    }
}