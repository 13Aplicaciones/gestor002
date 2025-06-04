package com.aplicaciones13.keycloak.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.aplicaciones13.keycloak.config.KeycloakConfig;
import com.aplicaciones13.keycloak.model.Role;

import java.util.Arrays;
import java.util.List;

@Service
public class RoleService {

    private final KeycloakService keycloakService;
    
    private final KeycloakConfig keycloakConfig;
    
    public RoleService(KeycloakService keycloakService, KeycloakConfig keycloakConfig) {
        this.keycloakService = keycloakService;
        this.keycloakConfig = keycloakConfig;
    }

    /**
     * Obtiene todos los roles del reino
     */
    public List<Role> getAllRoles() {
        String url = keycloakConfig.getRealmUrl() + "/roles";
        ResponseEntity<Role[]> response = keycloakService.get(url, Role[].class);
        return Arrays.asList(response.getBody());
    }
    
    /**
     * Obtiene un rol por su nombre
     */
    public Role getRoleByName(String roleName) {
        String url = keycloakConfig.getRealmUrl() + "/roles/" + roleName;
        ResponseEntity<Role> response = keycloakService.get(url, Role.class);
        return response.getBody();
    }
    
    /**
     * Crea un nuevo rol
     */
    public void createRole(Role role) {
        String url = keycloakConfig.getRealmUrl() + "/roles";
        keycloakService.post(url, role, Void.class);
    }
    
    /**
     * Actualiza un rol existente
     */
    public void updateRole(String roleName, Role role) {
        String url = keycloakConfig.getRealmUrl() + "/roles/" + roleName;
        keycloakService.put(url, role, Void.class);
    }
    
    /**
     * Elimina un rol
     */
    public void deleteRole(String roleName) {
        String url = keycloakConfig.getRealmUrl() + "/roles/" + roleName;
        keycloakService.delete(url, Void.class);
    }
    
    /**
     * Obtiene los roles asignados a un usuario
     */
    public List<Role> getUserRoles(String userId) {
        String url = keycloakConfig.getRealmUrl() + "/users/" + userId + "/role-mappings/realm";
        ResponseEntity<Role[]> response = keycloakService.get(url, Role[].class);
        return Arrays.asList(response.getBody());
    }
}