package com.aplicaciones13.gestor.controller;

import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aplicaciones13.base.controller.ControllerTools;
import com.aplicaciones13.base.payload.common.LovResponse;
import com.aplicaciones13.base.validations.ValidUUID;
import com.aplicaciones13.gestor.payload.request.MenuPatchStatusRequest;
import com.aplicaciones13.gestor.payload.request.MenuRequest;
import com.aplicaciones13.gestor.payload.response.MenuResponse;
import com.aplicaciones13.gestor.services.LovService;
import com.aplicaciones13.gestor.services.MenuService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

/**
 * Controlador REST para la gestión de Menús.
 * Proporciona métodos para crear, actualizar, buscar y eliminar menús.
 * Utiliza el servicio MenuService para interactuar con la lógica de negocio.
 * 
 * @author omargo33
 * @since 2025-08-03
 */
@Validated
@RestController
@RequestMapping("/api/menus")
@Tag(name = "Menus", description = "Servicio para CRUD de Menús")
public class MenuController {

    private final MenuService menuService;
    private final LovService lovService;

    /**
     * Constructor del controlador MenuController.
     * 
     * @param menuService
     */
    public MenuController(MenuService menuService, LovService lovService) {
        this.menuService = menuService;
        this.lovService = lovService;
    }

    /**
     * Obtiene un Menu por su UUID.
     * 
     * @param uuid UUID del Menu a buscar.
     * @ValidUUID Anotación personalizada para validar que el UUID es válido.
     * @return
     */
    @Operation(summary = "Obtiene Menu por UUID", description = "Devuelve un menu por UUID <br><br>✅ Testado con Postman<br><br>❌ GUI")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Menu", content = @Content(schema = @Schema(implementation = MenuResponse.class))),
    })
    @GetMapping("/{uuid}")
    public ResponseEntity<MenuResponse> getMenuById(@PathVariable @ValidUUID String uuid) {
        MenuResponse response = menuService.findByUuid(uuid);
        return ResponseEntity.ok(response);
    }

    /**
     * Obtiene un Menu por su índice único (indexMenu).
     * 
     * @param index
     * @return
     */
    @Operation(summary = "Obtiene Menu por indexMenu", description = "Devuelve un menu por indexMenu <br><br>✅ Testado con Postman<br><br>❌ GUI")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Menu", content = @Content(schema = @Schema(implementation = MenuResponse.class))),
    })
    @GetMapping("/index={index}")
    public ResponseEntity<MenuResponse> getMenuByIndex(@PathVariable String index) {
        MenuResponse response = menuService.findByIndex(index);
        return ResponseEntity.ok(response);
    }

    /**
     * Obtiene un listado de Menus por un UUID de un Módulo de forma paginada.
     * 
     * @param uuidModule    UUID del Módulo al que pertenece el Menu
     * @param indexMenu     Índice único del Menu (opcional)
     * @param name          Nombre del Menu (opcional)
     * @param page          Número de página (default 0)
     * @param size          Tamaño de la página (default 10)
     * @param sort          Campos por los que ordenar (default "indexMenu,name")
     * @return
     */
    @Operation(summary = "Obtiene Menus de forma paginada", description = "Devuelve listado de Menus que correspondan a la solicitud<br><br>✅ Testado con Postman<br><br>❌ GUI")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Menus paginados", content = @Content(schema = @Schema(implementation = MenuResponse[].class))),
    })
    @GetMapping("/paginated")
    public Map<String, Object> getPaginatedMenus(
            @RequestParam(required = true) String uuidModule,
            @RequestParam(required = false) String indexMenu,
            @RequestParam(required = false) String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "index_menu,desc") String[] sort) {
        Page<MenuResponse> pageMenus = menuService.paginada(uuidModule, indexMenu, name,
                ControllerTools.generateOrders(page, size, sort));
        return ControllerTools.generateFooterPage(pageMenus);
    }

    /**
     * Obtiene un LOV (List of Values) de Menus por un UUID de un Módulo de forma paginada.
     * 
     * @param page          Número de página (default 0)
     * @param size          Tamaño de la página (default 10)
     * @param sort          Campos por los que ordenar (default "label,asc")
     * @param label         Etiqueta del Menu a buscar (opcional)
     * @param labelAlternative Etiqueta alternativa del Menu a buscar (opcional)
     *  
     * @return
     */
    @GetMapping("/lov-module")
    @Operation(summary = "Obtiene LOV de Menus por Módulo", description = "Devuelve un LOV de Menus por Módulo <br><br>✅ Testado con Postman<br><br>❌ GUI")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "LOV de Menus paginados", content = @Content(schema = @Schema(implementation = LovResponse[].class))),
    })
    public ResponseEntity<Map<String, Object>> getLovMenusByModule(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "label,asc") String[] sort,
            @RequestParam(required = false) String label,
            @RequestParam(required = false) String labelAlternative) {
        Page<LovResponse> pageLov = lovService.findLov(LovService.LOV_MODULE, label, labelAlternative,
                ControllerTools.generateOrders(page, size, sort));
        
        return ResponseEntity.ok(ControllerTools.generateFooterPage(pageLov));
    }

    /**
     * Crear un nuevo Menu.
     * 
     * @param request Solicitud que contiene los datos del Menu a crear.
     * @return
     */
    @Operation(summary = "Crear un nuevo Menu", description = "Crea un nuevo menu<br><br>✅ Testado con Postman<br><br>❌ GUI")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Menu creado", content = @Content(schema = @Schema(implementation = MenuResponse.class))),
            @ApiResponse(responseCode = "400", description = "Error de validación", content = @Content(schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "404", description = "Módulo no encontrado", content = @Content(schema = @Schema(implementation = String.class))),
    })
    @PostMapping
    public ResponseEntity<MenuResponse> createMenu(@Validated @RequestBody MenuRequest request) {
        MenuResponse response = menuService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Actualizar el status de un Menu.
     * 
     * @param uuid UUID del Menu a actualizar.
     * @param request Solicitud que contiene el nuevo status del Menu.
     * @return Respuesta que contiene los datos del Menu actualizado.
     */
    @Operation(summary = "Actualizar el status de un Menu", description = "Actualiza el status de un menu<br><br>✅ Testado con Postman<br><br>❌ GUI")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Menu actualizado", content = @Content(schema = @Schema(implementation = MenuResponse.class))),
            @ApiResponse(responseCode = "400", description = "Error de validación", content = @Content(schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "404", description = "Menu no encontrado", content = @Content(schema = @Schema(implementation = String.class))),
    })
    @PatchMapping("/status/{uuid}")
    public ResponseEntity<MenuResponse> updateMenuStatus(@PathVariable String uuid,
                                                          @Validated @RequestBody MenuPatchStatusRequest request) {
        MenuResponse response = menuService.updateStatus(uuid, request);
        return ResponseEntity.ok(response);
    }

    /**
     * Actualizar un Menu por su UUID.
     * 
     * @param uuid UUID del Menu a actualizar.
     * @param request Solicitud que contiene los datos del Menu a actualizar.
     * @return Respuesta que contiene los datos del Menu actualizado.
     */
    @Operation(summary = "Actualizar un Menu", description = "Actualiza un menu<br><br>✅ Testado con Postman<br><br>❌ GUI")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Menu actualizado", content = @Content(schema = @Schema(implementation = MenuResponse.class))),
            @ApiResponse(responseCode = "400", description = "Error de validación", content = @Content(schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "404", description = "Menu no encontrado", content = @Content(schema = @Schema(implementation = String.class))),
    })
    @PutMapping("/{uuid}")
    public ResponseEntity<MenuResponse> updateMenu(@PathVariable String uuid,
            @Validated @RequestBody MenuRequest request) {
        MenuResponse response = menuService.update(uuid, request);
        return ResponseEntity.ok(response);
    }

    /**
     * Borrar un Menu por su UUID.
     * 
     * @param uuid UUID del Menu a borrar.
     * @return ResponseEntity con estado 204 No Content si se borra correctamente.
     */
    @Operation(summary = "Borrar un Menu", description = "Borra un menu<br><br>✅ Testado con Postman<br><br>❌ GUI")
    @ApiResponses(value = { @ApiResponse(responseCode = "204", description = "Borrar Menu") })
    @DeleteMapping("/{uuid}")
    public ResponseEntity<Void> deleteMenu(@PathVariable @ValidUUID String uuid) {
        menuService.delete(uuid);
        return ResponseEntity.noContent().build();
    }
}