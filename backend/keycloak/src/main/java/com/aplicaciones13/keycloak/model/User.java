package com.aplicaciones13.keycloak.model;

import java.util.List;
import java.util.Map;

import lombok.Data;

@Data
public class User {
    private String id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private boolean enabled;
    private boolean emailVerified;
    private List<String> requiredActions;
    private Map<String, List<String>> attributes;
    private List<Credential> credentials;
}
