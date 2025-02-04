package com.aplicaciones13.orquestador.client.keyckloak26;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * Clase que contiene las clases de los objetos que se envian en las peticiones
 * 
 * @author omargo33
 * @since 2024-12-22
 * 
 */
public class KeycloakRequest {

    /**
     * Clase que contiene los atributos necesarios para obtener un token de acceso a partir de un user y contraseña
     */
    @Data
    public static class UserRequest {
        @Schema(description = "Client ID", example = "gestor002-client")
        @Size(min = 1, max = 100)
        @NotNull
        private String clientId;

        @Schema(description = "Username", example = "root")
        @Size(min = 1, max = 100)
        @NotNull
        private String username;

        @Schema(description = "Password", example = "12341234s")
        @Size(min = 1, max = 100)
        @NotNull
        private String password;

        @Schema(description = "Grant Type", example = "password")
        @Pattern(regexp = "password|client_credentials")
        @NotNull
        private String grantType;
    }

    /**
     * Clase que contiene los atributos necesarios para obtener un token de acceso a partir de un cliente y secret para app
     * 
     */
    @Data
    public class ApplicationTokenRequest {
        private String clientId;
        private String clientSecret;
        private String grantType;
    }

    /**
     * Clase que contiene los atributos necesarios para obtener un token de acceso a partir de un cliente y secret para app
     */
    @Data
    public class UserScopeRequest {
        @Schema(description = "Client ID", example = "gestor002-client")
        @Size(min = 1, max = 100)
        @NotNull
        private String clientId;

        @Schema(description = "Client Secret", example = "ooghA6fmjgjkQY6IvaZiuNpMNltwcc8K")
        @Size(min = 1, max = 100)
        @NotNull
        private String clientSecret;

        @Schema(description = "Username", example = "root")
        @Size(min = 1, max = 100)
        @NotNull
        private String username;

        @Schema(description = "Password", example = "12341234s")
        @Size(min = 1, max = 100)
        @NotNull
        private String password;

        @Schema(description = "Grant Type", example = "client_credentials")
        @Pattern(regexp = "password|client_credentials")
        @NotNull
        private String grantType;

        @Schema(description = "Scope", example = "openid")
        @Size(min = 1, max = 100)
        @NotNull
        private String scope;
    }
}
