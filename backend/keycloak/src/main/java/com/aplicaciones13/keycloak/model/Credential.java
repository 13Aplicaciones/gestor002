package com.aplicaciones13.keycloak.model;

import lombok.Data;

@Data
public class Credential {
    private String type; // e.g., "password"
    private String value;
    private boolean temporary;
}