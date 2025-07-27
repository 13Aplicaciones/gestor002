package com.aplicaciones13.orchestrator.controller;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aplicaciones13.orchestrator.client.keyckloak26.KeycloakRequest.ApplicationTokenRequest;
import com.aplicaciones13.orchestrator.client.keyckloak26.KeycloakRequest.UserRequest;
import com.aplicaciones13.orchestrator.client.keyckloak26.KeycloakRequest.UserScopeRequest;
import com.aplicaciones13.orchestrator.client.keyckloak26.KeycloakResponse.KeycloakTokenResponse;
import com.aplicaciones13.orchestrator.services.KeycloakService;

/**
 * 
 * Clase que contiene los metodos para obtener diversos metodos REST de Keycloak
 * 
 * @author omargo33
 * @since 20024-12-18
 */
@Validated
@RestController()
@RequestMapping("/login")
public class LoginController {

    private final KeycloakService keycloakService;

    /**
     * Constructor del controlador LoginController.
     * 
     * @param keycloakService Servicio para interactuar con Keycloak
     */
    public LoginController(KeycloakService keycloakService) {
        this.keycloakService = keycloakService;
    }
    
    /**
     * Metodo para obtener un token de acceso a partir de un refreshToken
     * 
     * @param refreshToken
     * @return
     */
    @GetMapping("/refreshToken/{refreshToken}")
    public KeycloakTokenResponse refresToken(@PathVariable String refreshToken) {
        return keycloakService.refreshToken(refreshToken);
    }

    /**
     * Metodo para obtener un token de acceso a partir de un user y contraseña
     * 
     * @param userRequest
     * @return
     */
    @PostMapping("/user")
    public KeycloakTokenResponse postMethodName(@RequestBody UserRequest userRequest) {
        String url = "http://127.0.0.1:80/realms/gestor002-realm/protocol/openid-connect/token";
        return keycloakService.getToken(url, userRequest);
    }

    /**
     * Metodo para obtener un token de acceso a partir de un cliente y secret para app
     * 
     * @param applicationTokenRequest
     * @return
     */
    @PostMapping("/application")
    public KeycloakTokenResponse postMethodName(@RequestBody ApplicationTokenRequest applicationTokenRequest) {
        String url = "http://127.0.0.1:80/realms/gestor002-realm/protocol/openid-connect/token";
        return keycloakService.getToken(url, applicationTokenRequest);
    }
    
    /**
     * Metodo para obtener un token de acceso a partir de un cliente y secret para app
     * 
     * @param userScopeRequest
     * @return
     */
    @PostMapping("/user-scope")
    public KeycloakTokenResponse postMethodName(@RequestBody UserScopeRequest userScopeRequest) {
        String url = "http://127.0.0.1:80/realms/gestor002-realm/protocol/openid-connect/token";
        return keycloakService.getToken(url, userScopeRequest);
    }
       
}
