package com.aplicaciones13.orquestador.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * 
 * Clase que contiene los metodos para obtener diversos metodos REST de Keycloak
 * 
 * @author omargo33
 * @since 20024-12-18
 */
@RestController(value = "/structure")
public class StructureMenuController {
    
    /**
     * Metodo para obtener los menus que un usuario (Oauth2) tiene acceso.
     * 
     * Lista<Modulos> 
     *  -> lista<Menus>
     *      -> lista<Persmios>
     *  -> lista<Parametros>
     * 
     * @return
     */
    @GetMapping("/modules")
    public String getModules() {
        //Obtienen los 
        return new String();
    }

    /**
     * Metodo para obtener las configuraciones de un usuario (Oauth2) tiene acceso.
     * 
     * Lista<Configuraciones>
     *  -> FormatoTabla
     *  -> Tokens de seguridad
     * 
     * @return
     */
    @GetMapping("/settings")
    public String getUserSettings() {
        //Obtienen los 
        return new String();
    }

    /**
     * Metodo para obtener los UDC de un usuario (Oauth2) + Modulos tiene acceso.
     * 
     * @return
     */
    @GetMapping("/udc/module={module}")
    public String getUdc() {
        //Obtienen los 
        return new String();
    }    

    /**
     * Metodo para obtener los UDC de un usuario (Oauth2) + Modulos tiene acceso.
     * 
     * @return
     */
    @GetMapping("/udc/udc={udc}")
    public String getUdc1() {
        //Obtienen los 
        return new String();
    }
}
