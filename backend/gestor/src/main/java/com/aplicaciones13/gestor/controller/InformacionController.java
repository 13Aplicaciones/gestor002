package com.aplicaciones13.gestor_ws.controller;

import com.aplicaciones13.base.controller.ControllerTools;
import com.aplicaciones13.base.validaciones.ValidUUID;
import com.aplicaciones13.gestor_ws.model.Informacion;
import com.aplicaciones13.gestor_ws.payload.request.InformacionRequest;
import com.aplicaciones13.gestor_ws.payload.response.InformacionResponse;
import com.aplicaciones13.gestor_ws.services.InformacionService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

import jakarta.validation.Valid;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/informacion")
@Valid
public class InformacionController {

    @Autowired
    private InformacionService informacionService;

    /**
     * Metodo para obtener un informacion por su uuid.
     * 
     * @param uuid
     * @return
     */
    @GetMapping("/{uuid}")
    public ResponseEntity<?> getInformacionByUuid(@PathVariable @ValidUUID String uuid) {
        InformacionResponse response = informacionService.findByUuid(uuid);
        if (response == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(response);
    }

    /**
     * Crear una nueva informacion.
     * 
     * @param request Datos de la nueva informacion.
     * @return Respuesta con la informacion creada.
     */
    @PostMapping
    public ResponseEntity<InformacionResponse> crearInformacion(@RequestBody InformacionRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(informacionService.create(request));
    }

    /**
     * Actualizar una informacion.
     * 
     * @param uuid
     * @param informacionrRequest
     * @return
     */
    @PutMapping("/{uuid}")
    public ResponseEntity<InformacionResponse> actualizarInformacion(
            @PathVariable @ValidUUID String uuid,
            @RequestBody @Valid InformacionRequest informacionrRequest) {
        return ResponseEntity.ok(informacionService.update(uuid, informacionrRequest));
    }

    /**
     * Eliminar una informacion.
     * 
     * @param uuid
     * @return
     */
    @DeleteMapping("/{uuid}")
    public ResponseEntity<Void> eliminarInformacion(@PathVariable @ValidUUID String uuid) {
        informacionService.delete(uuid);
        return ResponseEntity.noContent().build();
    }

    /**
     * Metodo para obtener todas las informaciones de manera paginada.
     * 
     * @param page
     * @param size
     * @param sort
     * @param nombre
     * @return
     */
    @GetMapping("/paginado")
    public Map<String, Object> getAllInformacionWithPaginado(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "nombre,desc") String[] sort,
            @RequestParam(required = false) String nombre) {
        Page<Informacion> pageInformacion = informacionService.findByNombre(nombre,
                ControllerTools.generarOrders(page, size, sort));

        return ControllerTools.generarPiePage(pageInformacion);
    }
}
