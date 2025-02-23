package com.aplicaciones13.orquestador.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import com.aplicaciones13.base.config.SecurityConfig;

/**
 * Security
 * 
 * Clase de configuración de seguridad
 * 
 * @author omargo33
 * @since 2025-02-22
 * 
 */
@Configuration
@EnableWebSecurity
public class Security extends SecurityConfig{
    
}
