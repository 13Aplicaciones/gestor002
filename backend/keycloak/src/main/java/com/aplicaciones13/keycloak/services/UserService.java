package com.aplicaciones13.keycloak.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import com.aplicaciones13.keycloak.config.KeycloakConfig;
import com.aplicaciones13.keycloak.model.Credential;
import com.aplicaciones13.keycloak.model.User;

import java.util.Arrays;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private KeycloakService keycloakService;
    
    @Autowired
    private KeycloakConfig keycloakConfig;
    
    /**
     * Obtiene la lista de usuarios
     */
    public List<User> getAllUsers() {
        String url = keycloakConfig.getRealmUrl() + "/users";
        ResponseEntity<User[]> response = keycloakService.get(url, User[].class);
        return Arrays.asList(response.getBody());
    }
    
    /**
     * Obtiene un usuario por su ID
     */
    public User getUserById(String userId) {
        String url = keycloakConfig.getRealmUrl() + "/users/" + userId;
        ResponseEntity<User> response = keycloakService.get(url, User.class);
        return response.getBody();
    }
    
    /**
     * Crea un nuevo usuario
     */
    public void createUser(User user) {
        String url = keycloakConfig.getRealmUrl() + "/users";
        keycloakService.post(url, user, Void.class);
    }
    
    /**
     * Actualiza un usuario existente
     */
    public void updateUser(String userId, User user) {
        String url = keycloakConfig.getRealmUrl() + "/users/" + userId;
        keycloakService.put(url, user, Void.class);
    }
    
    /**
     * Elimina un usuario
     */
    public void deleteUser(String userId) {
        String url = keycloakConfig.getRealmUrl() + "/users/" + userId;
        keycloakService.delete(url, Void.class);
    }
    
    /**
     * Establece la contraseña de un usuario
     */
    public void setPassword(String userId, String password, boolean temporary) {
        String url = keycloakConfig.getRealmUrl() + "/users/" + userId + "/reset-password";
        
        Credential credential = new Credential();
        credential.setType("password");
        credential.setValue(password);
        credential.setTemporary(temporary);
        
        keycloakService.put(url, credential, Void.class);
    }
    
    /**
     * Asigna roles a un usuario
     */
    public void assignRoles(String userId, List<String> roleIds) {
        // Implementación para asignar roles a un usuario
        // ...
    }
    
    /**
     * Agrega un usuario a un grupo
     */
    public void addUserToGroup(String userId, String groupId) {
        String url = keycloakConfig.getRealmUrl() + "/users/" + userId + "/groups/" + groupId;
        keycloakService.put(url, null, Void.class);
    }
}