package com.tuempresa.keycloak.model;

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

@Data
public class Credential {
    private String type; // e.g., "password"
    private String value;
    private boolean temporary;
}

@Data
public class Role {
    private String id;
    private String name;
    private String description;
    private boolean composite;
    private boolean clientRole;
    private String containerId;
}

@Data
public class Group {
    private String id;
    private String name;
    private String path;
    private Map<String, List<String>> attributes;
    private List<String> realmRoles;
    private Map<String, List<String>> clientRoles;
    private List<Group> subGroups;
}