package com.aplicaciones13.orquestador.controller;

import org.springframework.web.bind.annotation.RestController;

import com.aplicaciones13.base.services.JwtService;
import com.aplicaciones13.orquestador.payload.response.ParameterResponse;
import com.aplicaciones13.orquestador.payload.response.StaticResponse;
import com.aplicaciones13.orquestador.payload.response.StaticsResponse;
import com.aplicaciones13.orquestador.payload.response.UserDefinedCodeGroupResponse;
import com.aplicaciones13.orquestador.payload.response.UserResponse;
import com.aplicaciones13.orquestador.services.ParameterService;
import com.aplicaciones13.orquestador.services.StaticsService;
import com.aplicaciones13.orquestador.services.UserDefinedCodeService;
import com.aplicaciones13.orquestador.services.UserService;

import lombok.extern.slf4j.Slf4j;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

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
