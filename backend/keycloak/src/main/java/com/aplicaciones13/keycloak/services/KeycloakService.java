package com.aplicaciones13.keycloak.services;

import java.util.Collections;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.aplicaciones13.keycloak.config.KeycloakConfig;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Servicio para interactuar con la API de Keycloak usando RestTemplate.
 * 
 * @author omargo33
 * @since 2025-03-31
 * 
 */
@Service
public class KeycloakService {

    private final RestTemplate restTemplate;

    private final KeycloakConfig keycloakConfig;

    private String adminToken;
    private long tokenExpiry = 0;

    /**
     * Constructor del servicio KeycloakService.
     * 
     * @param restTemplate
     * @param keycloakConfig
     */
    public KeycloakService(RestTemplate restTemplate, KeycloakConfig keycloakConfig) {
        this.restTemplate = restTemplate;
        this.keycloakConfig = keycloakConfig;
    }

    /**
     * Obtiene un token de administrador para autenticarse con la API de Keycloak
     */
    public String getAdminToken() {
        // Verificar si necesitamos un nuevo token
        if (adminToken == null || System.currentTimeMillis() > tokenExpiry) {

            String tokenUrl = keycloakConfig.getAuthServerUrl() + "/realms/master/protocol/openid-connect/token";
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
            MultiValueMap<String, String> map = new LinkedMultiValueMap<>();            
            map.add("client_id", "admin-cli");
            map.add("username", keycloakConfig.getAdminUsername());
            map.add("password", keycloakConfig.getAdminPassword());
            map.add("grant_type", "password");
            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
            
            try {
                ResponseEntity<String> response = restTemplate.postForEntity(tokenUrl, request, String.class);
                ObjectMapper mapper = new ObjectMapper();
                JsonNode root = mapper.readTree(response.getBody());
                
                adminToken = root.get("access_token").asText();
                int expiresIn = root.get("expires_in").asInt();
                
                // Establecer la expiración del token (con un margen de seguridad)
                tokenExpiry = System.currentTimeMillis() + (expiresIn * 1000) - 30000;
                
            } catch (Exception e) {
                throw new RuntimeException("Error al obtener token de administrador: " + e.getMessage());
            }
        }
        return adminToken;
    }
    
    /**
     * Crea los headers HTTP con el token de autenticación
     */
    public HttpHeaders createAuthHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(getAdminToken());
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        return headers;
    }
    
    /**
     * Ejecuta una solicitud GET a la API de Keycloak
     */
    public <T> ResponseEntity<T> get(String url, Class<T> responseType) {
        HttpEntity<?> entity = new HttpEntity<>(createAuthHeaders());
        return restTemplate.exchange(url, HttpMethod.GET, entity, responseType);
    }
    
    /**
     * Ejecuta una solicitud POST a la API de Keycloak
     */
    public <T> ResponseEntity<T> post(String url, Object request, Class<T> responseType) {
        HttpEntity<?> entity = new HttpEntity<>(request, createAuthHeaders());
        return restTemplate.exchange(url, HttpMethod.POST, entity, responseType);
    }
    
    /**
     * Ejecuta una solicitud PUT a la API de Keycloak
     */
    public <T> ResponseEntity<T> put(String url, Object request, Class<T> responseType) {
        HttpEntity<?> entity = new HttpEntity<>(request, createAuthHeaders());
        return restTemplate.exchange(url, HttpMethod.PUT, entity, responseType);
    }
    
    /**
     * Ejecuta una solicitud DELETE a la API de Keycloak
     */
    public <T> ResponseEntity<T> delete(String url, Class<T> responseType) {
        HttpEntity<?> entity = new HttpEntity<>(createAuthHeaders());
        return restTemplate.exchange(url, HttpMethod.DELETE, entity, responseType);
    }
}