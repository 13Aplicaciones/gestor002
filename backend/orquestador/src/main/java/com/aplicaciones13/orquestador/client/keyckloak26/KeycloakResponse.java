package com.aplicaciones13.orquestador.client.keyckloak26;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

/**
 * Clase que contiene las clases de los objetos que se responden en las peticiones
 * 
 * @author omargo33
 * @since 2024-12-22
 * 
 */
@Data
public class KeycloakResponse {


    @Data
    public static  class KeycloakTokenResponse  {

        @JsonProperty("access_token")
        private String accessToken;

        @JsonProperty("expires_in")
        private int expiresIn;

        @JsonProperty("refresh_expires_in")
        private int refreshExpiresIn;

        @JsonProperty("refresh_token")
        private String refreshToken;

        @JsonProperty("token_type")
        private String tokenType;

        @JsonProperty("not-before-policy")
        private int notBeforePolicy;

        @JsonProperty("session_state")
        private String sessionState;

        @JsonProperty("scope")
        private String scope;
    }
}
