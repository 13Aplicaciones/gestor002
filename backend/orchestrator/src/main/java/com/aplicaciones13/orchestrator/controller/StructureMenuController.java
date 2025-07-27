package com.aplicaciones13.orchestrator.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aplicaciones13.base.services.JwtService;
import com.aplicaciones13.orchestrator.payload.response.ParameterResponse;
import com.aplicaciones13.orchestrator.payload.response.StaticResponse;
import com.aplicaciones13.orchestrator.payload.response.UserResponse;

import com.aplicaciones13.orchestrator.services.ParameterService;
import com.aplicaciones13.orchestrator.services.StaticsService;
import com.aplicaciones13.orchestrator.services.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;

/**
 * 
 * Clase que contiene los metodos para obtener diversos metodos REST.
 * 
 * @author omargo33
 * @since 20024-12-18
 */
@Slf4j
@RestController()
@RequestMapping("/structure")
@Tag(name = "Structure", description = "Recurso para obtener la estructura de los menus y parametros de estos")
public class StructureMenuController {

    private final ParameterService parameterService;

    private final UserService userService;

    private final StaticsService staticsService;

    private final JwtService jwtService;

    /**
     * Constructor del controlador StructureMenuController.
     *
     * @param comboService     Servicio para manejar los combos.
     * @param jwtService       Servicio para manejar JWT.
     * @param staticsService   Servicio para manejar las estadisticas.
     * @param userService      Servicio para manejar los usuarios.
     * @param parameterService Servicio para manejar los parametros.
     */
    public StructureMenuController(
            JwtService jwtService,
            StaticsService staticsService,
            UserService userService,
            ParameterService parameterService) {
        this.parameterService = parameterService;
        this.userService = userService;
        this.staticsService = staticsService;
        this.jwtService = jwtService;
    }

    /**
     * Metodo para obtener los Parametros de un modulo.
     * 
     * @return
     */
    @GetMapping("/parameter/module={indexModule}")
    @Operation(summary = "Obtener parametros por modulo", description = "Este endpoint permite obtener los parametros de un modulo especifico", responses = {
            @ApiResponse(responseCode = "200", description = "Contenedor de la respuesta de los parametros", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ParameterResponse.class))) })
    public ResponseEntity<List<ParameterResponse>> getParameters(@PathVariable String indexModule) {
        List<ParameterResponse> response = parameterService.findParametersByModule_IndexModule(indexModule);
        return ResponseEntity.ok(response);
    }

    /**
     * Metodo para obtener los menus que un usuario (Oauth2) tiene acceso.
     * 
     * Lista<Modulos>
     * -> lista<Menus>
     * -> lista<Permisos>
     * 
     * @return
     */
    @GetMapping("/modules")
    @Operation(summary = "Obtener modulos por usuario", description = "Este endpoint permite obtener los modulos a los que un usuario tiene acceso", responses = {
            @ApiResponse(responseCode = "200", description = "Contenedor de la respuesta de los modulos", content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserResponse.class))) })
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
    @GetMapping("/menu/static={indexModule}")
    @Operation(summary = "Obtener estadisticas de menus", description = "Este endpoint permite obtener las estadisticas de los menus", responses = {
            @ApiResponse(responseCode = "200", description = "Contenedor de la respuesta de las estadisticas", content = @Content(mediaType = "application/json", schema = @Schema(implementation = StaticResponse.class))) })
    public ResponseEntity<List<StaticResponse>> getStatic(@PathVariable String indexModule) {
        List<StaticResponse> response = staticsService.executeDynamicQuery(indexModule);
        return ResponseEntity.ok(response);
    }
}
