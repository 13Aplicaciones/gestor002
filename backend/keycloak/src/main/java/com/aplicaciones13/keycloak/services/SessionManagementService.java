package com.aplicaciones13.keycloak.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.aplicaciones13.keycloak.config.KeycloakConfig;

import lombok.extern.slf4j.Slf4j;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class SessionManagementService {

    private final KeycloakService keycloakService;
    
    private final KeycloakConfig keycloakConfig;
    
    /**
     * Constructor para inyectar las dependencias necesarias
     * 
     * @param keycloakService Servicio para interactuar con Keycloak
     * @param keycloakConfig Configuración de Keycloak
     */
    public SessionManagementService(KeycloakService keycloakService, KeycloakConfig keycloakConfig) {
        this.keycloakService = keycloakService;
        this.keycloakConfig = keycloakConfig;
    }

    /**
     * Cierra todas las sesiones activas en el reino
     */
    public void logoutAllUsers() {
        String url = keycloakConfig.getRealmUrl() + "/logout-all";
        ResponseEntity<Void> response = keycloakService.post(url, null, Void.class);
        log.info("Logout all users response: URL = {}, Status Code = {}, Headers = {}", url, response.getStatusCode(), response.getHeaders());
    }
    
    /**
     * Cierra todas las sesiones de un usuario específico
     */
    public void logoutUser(String userId) {
        String url = keycloakConfig.getRealmUrl() + "/users/" + userId + "/logout";
        keycloakService.post(url, null, Void.class);
    }
    
    /**
     * Obtiene todas las sesiones activas de un usuario
     */
    public List<Map<String, Object>> getUserSessions(String userId) {
        String url = keycloakConfig.getRealmUrl() + "/users/" + userId + "/sessions";
        ResponseEntity<List> response = keycloakService.get(url, List.class);
        return response.getBody();
    }
    
    /**
     * Revoca todos los tokens de actualización (refresh tokens) emitidos para un 
     * cliente específico antes de un tiempo determinado
     */
    public void revokeClientTokens(String clientId, long notBefore) {
        String url = keycloakConfig.getRealmUrl() + "/clients/" + clientId + "/logout";
        
        // El campo notBefore es un timestamp en segundos (epoch time)
        Map<String, Long> requestBody = Map.of("notBefore", notBefore);
        keycloakService.put(url, requestBody, Void.class);
    }
    
    /**
     * Establece un tiempo "notBefore" a nivel de reino para revocar tokens
     */
    public void revokeRealmTokens(long notBefore) {
        String url = keycloakConfig.getRealmUrl() + "/logout";
        
        Map<String, Long> requestBody = Map.of("notBefore", notBefore);
        keycloakService.put(url, requestBody, Void.class);
    }
    
    /**
     * Expulsa a todos los usuarios de un grupo específico
     */
    public void logoutUsersByGroup(String groupId) {
        // Primero, obtenemos todos los usuarios del grupo
        String url = keycloakConfig.getRealmUrl() + "/groups/" + groupId + "/members";
        ResponseEntity<Map[]> response = keycloakService.get(url, Map[].class);
        Map<String, Object>[] users = response.getBody();
        
        // Luego, cerramos la sesión para cada usuario
        for (Map<String, Object> user : users) {
            String userId = (String) user.get("id");
            logoutUser(userId);
        }
    }
    
    /**
     * Expulsa a todos los usuarios con un rol específico
     */
    public void logoutUsersByRole(String roleName) {
        // Primero, obtenemos los usuarios con ese rol
        // Nota: Esta API puede variar dependiendo de la versión de Keycloak
        String url = keycloakConfig.getRealmUrl() + "/roles/" + roleName + "/users";
        ResponseEntity<Map[]> response = keycloakService.get(url, Map[].class);
        Map<String, Object>[] users = response.getBody();
        
        // Luego, cerramos la sesión para cada usuario
        for (Map<String, Object> user : users) {
            String userId = (String) user.get("id");
            logoutUser(userId);
        }
    }
    
    /**
     * Obtiene todas las sesiones activas en el reino
     */
    public List<Map<String, Object>> getAllActiveSessions() {
        //GET /admin/realms/{realm}
        //String url = keycloakConfig.getRealmUrl() + "/clients/" +  keycloakConfig.getClientId() +"/user-sessions";
        String url = keycloakConfig.getRealmUrl() + "/clients/?clientId=" +  keycloakConfig.getClientId();
        ResponseEntity<List> response = keycloakService.get(url, List.class);
        return response.getBody();
    }
    
    /**
     * Revocar un token específico
     */
    public void revokeToken(String token) {
        String url = keycloakConfig.getAuthServerUrl() + "/realms/" + keycloakConfig.getRealm() + "/protocol/openid-connect/revoke";
        
        // Configuramos los parámetros para revocar el token
        Map<String, String> requestBody = Map.of(
            "token", token,
            "client_id", keycloakConfig.getClientId(),
            "client_secret", keycloakConfig.getClientSecret()
        );
        
        keycloakService.post(url, requestBody, Void.class);
    }
}