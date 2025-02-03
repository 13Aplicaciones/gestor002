package com.aplicaciones13.gestor.controller;

import com.aplicaciones13.base.controller.ControllerTools;
import com.aplicaciones13.base.tools.Conversiones;
import com.aplicaciones13.base.validaciones.ValidUUID;
import com.aplicaciones13.gestor.model.Usuario;
import com.aplicaciones13.gestor.payload.request.UsuarioRequest;
import com.aplicaciones13.gestor.payload.response.UsuarioResponse;
import com.aplicaciones13.gestor.services.UsuarioService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Valid
@RestController
@RequestMapping("/api/usuarios")
@Tag(name = "Usuarios", description = "Servicio para CRUD de Usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    /**
     * Metodo para registrar un CustomDateEditor para el controlador.
     * 
     * @param binder
     */
    @InitBinder
    public void initBinder(WebDataBinder binder) {
        SimpleDateFormat dateFormat = new SimpleDateFormat(Conversiones.ISO_8601_DATE);
        dateFormat.setLenient(false);
        binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
    }

    /**
     * Metodo para obtener un usuario por su uuid.
     * 
     * @param uuid
     * @return
     */
    @GetMapping("/{uuid}")
    public ResponseEntity<?> getUsuarioByUuid(@PathVariable @ValidUUID String uuid) {
        UsuarioResponse response = usuarioService.findByUuid(uuid);
        if (response == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(response);
    }

    /**
     * Crear un nuevo usuario.
     * 
     * @param request
     * @return
     */
    @PostMapping
    public ResponseEntity<UsuarioResponse> crearUsuario(@RequestBody @Valid UsuarioRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioService.create(request));
    }

    /**
     * Actualizar un usuario.
     * 
     * @param uuid
     * @param usuarioRequest
     * @return
     */
    @PutMapping("/{uuid}")
    public ResponseEntity<UsuarioResponse> actualizarUsuario(
            @PathVariable @ValidUUID String uuid,
            @RequestBody @Valid UsuarioRequest usuarioRequest) {
        return ResponseEntity.ok(usuarioService.update(uuid, usuarioRequest));
    }

    /**
     * Eliminar un usuario.
     * 
     * @param uuid
     * @return
     */
    @DeleteMapping("/{uuid}")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable @ValidUUID String uuid) {
        usuarioService.delete(uuid);
        return ResponseEntity.noContent().build();
    }

    /**
     * Metodo para obtener todos los usuarios de manera paginada.
     * 
     * @return
     */
    @GetMapping("/paginado")
    public Map<String, Object> getAllUsuariosWithPaginado(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "nombre,desc") String[] sort,
            @RequestParam(required = false) String nick,
            @RequestParam(required = false) String nombre,
            @RequestParam(required = false) String apellido,
            @RequestParam(required = false) String estado,
            @RequestParam(required = true) Date fechaInicio,
            @RequestParam(required = true) Date fechaFin) {

        Page<Usuario> pageUsuarios = usuarioService.findAll(nick, nombre, apellido, estado, fechaInicio, fechaFin,
                ControllerTools.generarOrders(page, size, sort));
                
        return ControllerTools.generarPiePage(pageUsuarios);
    }
}