package com.aplicaciones13.orquestador.controller;

import org.springframework.web.bind.annotation.RestController;

import com.aplicaciones13.orquestador.payload.response.ParameterResponse;
import com.aplicaciones13.orquestador.payload.response.UserDefinedCodeGroupResponse;
import com.aplicaciones13.orquestador.payload.response.UserDefinedCodeResponse;
import com.aplicaciones13.orquestador.services.ParameterService;
import com.aplicaciones13.orquestador.services.UserDefinedCodeService;

import lombok.extern.slf4j.Slf4j;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * 
 * Clase que contiene los metodos para obtener diversos metodos REST de Keycloak
 * 
 * @author omargo33
 * @since 20024-12-18
 */
@Slf4j
@RestController(value = "/structure")
public class StructureMenuController {

    @Autowired
    private ParameterService parameterService;

    @Autowired
    private UserDefinedCodeService userDefinedCodeService;

    /**
     * Metodo para obtener los menus que un usuario (Oauth2) tiene acceso.
     * 
     * Lista<Modulos>
     * -> lista<Menus>
     * -> lista<Persmios>
     * -> lista<Parametros>
     * 
     * @return
     */
    @GetMapping("/modules")
    public String getModules() {
        // Obtienen los
        return new String();
    }

    /**
     * Metodo para obtener las configuraciones de un usuario (Oauth2) tiene acceso.
     * 
     * Lista<Configuraciones>
     * -> FormatoTabla
     * -> Tokens de seguridad
     * 
     * @return
     */
    @GetMapping("/settings")
    public String getUserSettings() {
        // Obtienen los
        return new String();
    }

    /**
     * Metodo para obtener los UDC de un usuario (Oauth2) + Modulos tiene acceso.
     * 
     * @return
     */
    @GetMapping("/udc/udc={udc}")
    public String getUdc1() {
        // Obtienen los
        return new String();
    }

    /**
     * Metodo para obtener los UDC de un usuario (Oauth2) + Modulos tiene acceso.
     * 
     * @return
     */
    @GetMapping("/parameter/module={module}")
    public ResponseEntity<List<ParameterResponse>> getParameters(@PathVariable String module) {
        List<ParameterResponse> response = parameterService.findParametersByModuleIndex(module);
        return ResponseEntity.ok(response);
    }

    /**
     * Metodo para obtener los UDC Modulos.
     * 
     * @return
     */
    @GetMapping("/udc/module={module}")
    public ResponseEntity<List<UserDefinedCodeGroupResponse>> getUdc(@PathVariable String module) {
        List<UserDefinedCodeGroupResponse> response = userDefinedCodeService.find(module);        
        return ResponseEntity.ok(response);
    }
}
