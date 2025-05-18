package com.aplicaciones13.orchestrator.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;


/**
 * 
 * Clase que contiene los metodos para obtener diversos metodos REST de Keycloak
 * 
 * @author omargo33
 * @since 20025-02-04
 */
@RestController()
@RequestMapping("/session")
public class SessionController {
    
    /**
     * Metodo para obtener las sesiones de un usuario (Oauth2) tiene acceso.
     *  
     * @param param
     * @return
     */
    @GetMapping("/")
    public String getMethodName(@RequestParam String param) {
        return new String();
    }


    /**
     * Metodo para obtener la informacion de la sesion.
     * 
     * @param param
     * @return
     */
    @GetMapping("/info")
    public String getMethodName1(@RequestParam String param) {
        return new String();
    }

    /**
     * Metodo para actualizar las sesiones de un usuario (Oauth2) tiene acceso.
     * 
     * @param id
     * @param entity
     * @return
     */
    @PutMapping("/")
    public String putMethodName(@PathVariable String id, @RequestBody String entity) {

        return entity;
    }

    /**
     * Metodo para cerrar las sesiones de un usuario (Oauth2) tiene acceso.
     *  
     * @param param
     * @return
     */
    @PostMapping("/loggout")
    public String postMethodName(@RequestBody String entity) {
        
        return entity;
    }
}
