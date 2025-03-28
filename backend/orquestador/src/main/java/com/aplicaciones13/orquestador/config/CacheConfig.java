package com.aplicaciones13.orquestador.config;

/* 
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import java.util.concurrent.TimeUnit;
*/

/**
 * Configuración de la cache
 * 
 * @autor omargo33
 * @since 2025-03-03
 */
//@Configuration
//@EnableCaching
public class CacheConfig {

    /**
     * Configuración de la cache con TTL
     * 
     * en CaffeineCacheManager("menuService"... ) se define el nombre de la cache y
     * se debe agregar los demas servicios que se quieran cachear
     * 
     * @return
     */

     /* 
    @Bean
    public CaffeineCacheManager cacheManagerWithTtl() {
        CaffeineCacheManager cacheManager = new CaffeineCacheManager("menuService", "StaticsService");
        cacheManager.setCaffeine(Caffeine.newBuilder()
                .expireAfterWrite(5, TimeUnit.MINUTES)); // Configura el TTL a 5 minutos
        return cacheManager;
    }
        */
}