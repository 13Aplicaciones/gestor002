package com.aplicaciones13.keycloak.services;

import java.util.Arrays;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.aplicaciones13.keycloak.config.KeycloakConfig;
import com.aplicaciones13.keycloak.model.Group;
import com.aplicaciones13.keycloak.model.User;

@Service
public class GroupService {

    private final KeycloakService keycloakService;
    
    private final KeycloakConfig keycloakConfig;

    public GroupService(KeycloakService keycloakService, KeycloakConfig keycloakConfig) {
        this.keycloakService = keycloakService;
        this.keycloakConfig = keycloakConfig;
    }

    /**
     * Obtiene todos los grupos
     */
    public List<Group> getAllGroups() {
        String url = keycloakConfig.getRealmUrl() + "/groups";
        ResponseEntity<Group[]> response = keycloakService.get(url, Group[].class);
        return Arrays.asList(response.getBody());
    }
    
    /**
     * Obtiene un grupo por su ID
     */
    public Group getGroupById(String groupId) {
        String url = keycloakConfig.getRealmUrl() + "/groups/" + groupId;
        ResponseEntity<Group> response = keycloakService.get(url, Group.class);
        return response.getBody();
    }
    
    /**
     * Crea un nuevo grupo
     */
    public void createGroup(Group group) {
        String url = keycloakConfig.getRealmUrl() + "/groups";
        keycloakService.post(url, group, Void.class);
    }
    
    /**
     * Actualiza un grupo existente
     */
    public void updateGroup(String groupId, Group group) {
        String url = keycloakConfig.getRealmUrl() + "/groups/" + groupId;
        keycloakService.put(url, group, Void.class);
    }
    
    /**
     * Elimina un grupo
     */
    public void deleteGroup(String groupId) {
        String url = keycloakConfig.getRealmUrl() + "/groups/" + groupId;
        keycloakService.delete(url, Void.class);
    }
    
    /**
     * Obtiene los miembros de un grupo
     */
    public List<User> getGroupMembers(String groupId) {
        String url = keycloakConfig.getRealmUrl() + "/groups/" + groupId + "/members";
        ResponseEntity<User[]> response = keycloakService.get(url, User[].class);
        return Arrays.asList(response.getBody());
    }
    
    /**
     * Asigna roles a un grupo
     */
    public void assignRolesToGroup(String groupId, List<String> roleNames) {
        // Implementación para asignar roles a un grupo
        // ...
    }
}