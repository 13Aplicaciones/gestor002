package com.aplicaciones13.gestor.controller;

import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aplicaciones13.base.controller.ControllerTools;
import com.aplicaciones13.base.validations.ValidUUID;
import com.aplicaciones13.gestor.model.Information;
import com.aplicaciones13.gestor.payload.request.InformationRequest;
import com.aplicaciones13.gestor.payload.response.InformationResponse;
import com.aplicaciones13.gestor.services.InformationService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/information")
@Tag(name = "Informacion", description = "Servicio para CRUD de Informacion")
public class InformationController {

    private final InformationService informationService;

    /**
     * Constructor de InformationController.
     * 
     * @param informationService
     */
    public InformationController(InformationService informationService) {
        this.informationService = informationService;
    }

    /**
     * Metodo para obtener un information por su uuid.
     * 
     * @param uuid
     * @return
     */
    @GetMapping("/{uuid}")
    public ResponseEntity<InformationResponse> getInformationByUuid(@PathVariable @ValidUUID String uuid) {
        InformationResponse response = informationService.findByUuid(uuid);
        if (response == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(response);
    }

    /**
     * Crear una nueva information.
     * 
     * @param request Datos de la nueva information.
     * @return Respuesta con la information creada.
     */
    @PostMapping
    public ResponseEntity<InformationResponse> crearInformation(@RequestBody @Valid InformationRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(informationService.create(request));
    }

    /**
     * Actualizar una information.
     * 
     * @param uuid
     * @param informationrRequest
     * @return
     */
    @PutMapping("/{uuid}")
    public ResponseEntity<InformationResponse> actualizarInformation(
            @PathVariable String uuid,
            @Valid @RequestBody InformationRequest informationrRequest) {
        return ResponseEntity.ok(informationService.update(uuid, informationrRequest));
    }

    /**
     * Eliminar una information.
     * 
     * @param uuid
     * @return
     */
    @DeleteMapping("/{uuid}")
    public ResponseEntity<Void> eliminarInformation(@PathVariable @ValidUUID String uuid) {
        informationService.delete(uuid);
        return ResponseEntity.noContent().build();
    }

    /**
     * Metodo para obtener todas las informationes de manera paginada.
     * 
     * @param page
     * @param size
     * @param sort
     * @param name
     * @return
     */
    @GetMapping("/paginated")
    @Operation(summary = "Obtiene la lista de informaciones paginadas", description = "Recibe los parámetros de paginación y filtrado", responses = {
            @ApiResponse(responseCode = "200", description = "Información recuperada exitosamente", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Map.class)))
    })
    public ResponseEntity<Map<String, Object>> getAllInformationWithPaginado(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name,desc") String[] sort,
            @RequestParam(required = false) String name) {
        Page<Information> pageInformation = informationService.findByName(name,
                ControllerTools.generateOrders(page, size, sort));

        Map<String, Object> response = ControllerTools.generateFooterPage(pageInformation);
        return ResponseEntity.ok(response);
    }
}
