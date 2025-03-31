package com.aplicaciones13.keycloak.model;

import java.util.List;
import java.util.Map;

import lombok.Data;

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