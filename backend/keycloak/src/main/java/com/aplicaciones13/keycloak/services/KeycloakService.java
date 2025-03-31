package com.aplicaciones13.keycloak.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.aplicaciones13.keycloak.config.KeycloakConfig;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;


import java.util.Collections;

@Service
public class KeycloakService {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private KeycloakConfig keycloakConfig;

    private String adminToken;
    private long tokenExpiry = 0;

    /**
     * Obtiene un token de administrador para autenticarse con la API de Keycloak
     */
    public String getAdminToken() {
        // Verificar si necesitamos un nuevo token
        if (adminToken == null || System.currentTimeMillis() > tokenExpiry) {

            

            String tokenUrl = keycloakConfig.getAuthServerUrl() + "/realms/"+keycloakConfig.getRealm()+"/protocol/openid-connect/token";
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
            
            MultiValueMap<String, String> map = new LinkedMultiValueMap<>();            
            map.add("client_id", keycloakConfig.getClientId());
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