package com.aplicaciones13.orchestrator.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aplicaciones13.orchestrator.client.keyckloak26.KeycloakClient;
import com.aplicaciones13.orchestrator.client.keyckloak26.KeycloakRequest.ApplicationTokenRequest;
import com.aplicaciones13.orchestrator.client.keyckloak26.KeycloakRequest.UserRequest;
import com.aplicaciones13.orchestrator.client.keyckloak26.KeycloakRequest.UserScopeRequest;
import com.aplicaciones13.orchestrator.client.keyckloak26.KeycloakResponse.KeycloakTokenResponse;
import com.aplicaciones13.orchestrator.payload.response.ParameterResponse;
 
@Service
public class KeycloakService{
    
    @Autowired
    private ParameterService parameterService;

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

    /**
     * Metodo para obtener un token de acceso a partir de un refreshToken
     * 
     * @param refreshToken
     * @return
     */
    public KeycloakTokenResponse refreshToken(String refreshToken) {        
        ParameterResponse urlKeycloak = parameterService.findParameterByIndexParameterAndModule_IndexModule("001", "OR_001_00");
        ParameterResponse clientId = parameterService.findParameterByIndexParameterAndModule_IndexModule("002", "OR_001_00");
        return keycloakClient.refreshToken(urlKeycloak.getValueText01(), clientId.getValueText01(), refreshToken);
    }
}
