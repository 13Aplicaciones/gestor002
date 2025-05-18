package com.aplicaciones13.orchestrator.controller;

import org.springframework.web.bind.annotation.RestController;

import com.aplicaciones13.base.services.JwtService;
import com.aplicaciones13.orchestrator.payload.response.ParameterResponse;
import com.aplicaciones13.orchestrator.payload.response.StaticResponse;
import com.aplicaciones13.orchestrator.payload.response.UserDefinedCodeGroupResponse;
import com.aplicaciones13.orchestrator.payload.response.UserResponse;
import com.aplicaciones13.orchestrator.services.ParameterService;
import com.aplicaciones13.orchestrator.services.StaticsService;
import com.aplicaciones13.orchestrator.services.UserDefinedCodeService;
import com.aplicaciones13.orchestrator.services.UserService;

import lombok.extern.slf4j.Slf4j;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 
 * Clase que contiene los metodos para obtener diversos metodos REST de Keycloak
 * 
 * @author omargo33
 * @since 20024-12-18
 */
@Slf4j
@RestController()
@RequestMapping("/structure")
public class StructureMenuController {

    @Autowired
    private ParameterService parameterService;

    @Autowired
    private UserDefinedCodeService userDefinedCodeService;

    @Autowired
    private UserService userService;

    @Autowired
    private StaticsService staticsService;

    @Autowired
    private JwtService jwtService;

    /**
     * Metodo para obtener los UDC de un usuario (Oauth2) + Modulos tiene acceso.
     * 
     * @return
     */
    @GetMapping("/parameter/module={module}")
    public ResponseEntity<List<ParameterResponse>> getParameters(@PathVariable String module) {
        List<ParameterResponse> response = parameterService.findParametersByModule_IndexModule(module);
        return ResponseEntity.ok(response);
    }

    /**
     * Metodo para obtener los UDC Modulos.
     * 
     * @return
     */
    @GetMapping("/udc/module={indexModule}")
    public ResponseEntity<List<UserDefinedCodeGroupResponse>> getUdc(@PathVariable String indexModule) {
        List<UserDefinedCodeGroupResponse> response = userDefinedCodeService.find(indexModule);
        return ResponseEntity.ok(response);
    }

    /**
     * Metodo para obtener los menus que un usuario (Oauth2) tiene acceso.
     * 
     * Lista<Modulos>
     * -> lista<Menus>
     * -> lista<Persmios>
     * 
     * @return
     */
    @GetMapping("/modules")
    public ResponseEntity<UserResponse> getModules() {
        String nick = jwtService.getUsername();
        UserResponse response = userService.findByNick(nick);
        return ResponseEntity.ok(response);
    }

    /**
     * Metodo para obtener las estadisticas de los menus.
     * 
     * @param index
     * @return
     */
    @GetMapping("/menu/static={index}")
    public ResponseEntity<List<StaticResponse>> getMethodName(@PathVariable String index) {
        List<StaticResponse> response = staticsService.executeDynamicQuery(index);
        return ResponseEntity.ok(response);
    }
}
