package com.aplicaciones13.gestor_ws.services;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import java.util.Map;

/**
 * Servicio para obtener los claims del JWT
 * 
 * @author omargo33
 * @since 2025-01-23
 * @see <a href="https://docs.spring.io/spring-security/site/docs/current/reference/html5/#oauth2login-advanced-map-authorities">Spring Security OAuth2 Login</a>
 * 
 */
@Component
public class JwtService {

    /**
     * Obtiene los claims del JWT
     * 
     * @return
     */
    public Map<String, Object> getClaims() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof Jwt) {
            Jwt jwt = (Jwt) authentication.getPrincipal();
            return jwt.getClaims();
        }
        throw new IllegalStateException("JWT no encontrado en el contexto de seguridad");
    }

    /**
     * Obtiene el username del JWT
     * 
     * @return
     */
    public String getUsername() {
        Map<String, Object> claims = getClaims();
        return (String) claims.get("preferred_username");
    }

    /**
     * Obtiene el nombre completo del JWT
     * 
     * @return
     */
    public String getFullName() {
        Map<String, Object> claims = getClaims();
        return (String) claims.get("name");
    }

    /**
     * Obtiene el email del JWT
     * 
     * @return
     */
    public String getEmail() {
        Map<String, Object> claims = getClaims();
        return (String) claims.get("email");
    }
}