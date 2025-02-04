package com.aplicaciones13.orquestador.service;

import org.springframework.stereotype.Service;

import com.aplicaciones13.orquestador.client.keyckloak26.KeycloakClient;
import com.aplicaciones13.orquestador.client.keyckloak26.KeycloakRequest.ApplicationTokenRequest;
import com.aplicaciones13.orquestador.client.keyckloak26.KeycloakRequest.UserRequest;
import com.aplicaciones13.orquestador.client.keyckloak26.KeycloakRequest.UserScopeRequest;
import com.aplicaciones13.orquestador.client.keyckloak26.KeycloakResponse.KeycloakTokenResponse;


@Service
public class KeycloakService{
    
    private final KeycloakClient keycloakClient;

    public KeycloakService(KeycloakClient keycloakClient) {
        this.keycloakClient = keycloakClient;
    }

    public KeycloakTokenResponse getToken(String url, UserRequest userRequest) {
        return keycloakClient.fetchToken(url, userRequest);
    }

    public KeycloakTokenResponse getToken(String url, ApplicationTokenRequest applicationTokenRequest) {
        return keycloakClient.fetchToken(url, applicationTokenRequest);
    }

    public KeycloakTokenResponse getToken(String url, UserScopeRequest userScopeRequest) {
        return keycloakClient.fetchToken(url, userScopeRequest);
    }
}
