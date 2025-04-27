package com.aplicaciones13.gestor.controller;

import com.aplicaciones13.base.controller.ControllerTools;
import com.aplicaciones13.base.tools.Conversions;
import com.aplicaciones13.base.validations.ValidUUID;
import com.aplicaciones13.gestor.model.User;
import com.aplicaciones13.gestor.payload.request.UserRequest;
import com.aplicaciones13.gestor.payload.response.UserResponse;
import com.aplicaciones13.gestor.services.UserService;

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
@RequestMapping("/api/users")
@Tag(name = "Users", description = "Servicio para CRUD de users")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * Metodo para registrar un CustomDateEditor para el controlador.
     * 
     * @param binder
     */
    @InitBinder
    public void initBinder(WebDataBinder binder) {
        SimpleDateFormat dateFormat = new SimpleDateFormat(Conversions.ISO_8601_DATE);
        dateFormat.setLenient(false);
        binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
    }

    /**
     * Metodo para obtener un user por su uuid.
     * 
     * @param uuid
     * @return
     */
    @GetMapping("/{uuid}")
    public ResponseEntity<?> getUserByUuid(@PathVariable @ValidUUID String uuid) {
        UserResponse response = userService.findByUuid(uuid);
        if (response == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(response);
    }

    /**
     * Crear un nuevo user.
     * 
     * @param request
     * @return
     */
    @PostMapping
    public ResponseEntity<UserResponse> crearuser(@RequestBody @Valid UserRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.create(request));
    }

    /**
     * Actualizar un user.
     * 
     * @param uuid
     * @param userRequest
     * @return
     */
    @PutMapping("/{uuid}")
    public ResponseEntity<UserResponse> actualizaruser(
            @PathVariable @ValidUUID String uuid,
            @RequestBody @Valid UserRequest userRequest) {
        return ResponseEntity.ok(userService.update(uuid, userRequest));
    }

    /**
     * Eliminar un user.
     * 
     * @param uuid
     * @return
     */
    @DeleteMapping("/{uuid}")
    public ResponseEntity<Void> eliminaruser(@PathVariable @ValidUUID String uuid) {
        userService.delete(uuid);
        return ResponseEntity.noContent().build();
    }

    /**
     * Metodo para obtener todos los users de manera paginada.
     * 
     * @return
     */
   
     @GetMapping("/paginado")
    public Map<String, Object> getAllusersWithPaginado(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name,desc") String[] sort,
            @RequestParam(required = false) String nick,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String lastName,
            @RequestParam(required = false) String status,
            @RequestParam(required = true) Date startDate,
            @RequestParam(required = true) Date endDate) {

        Page<User> pageusers = userService.findAll(nick, name, lastName, status, startDate, endDate,
                ControllerTools.generateOrders(page, size, sort));
                
        return ControllerTools.generateFooterPage(pageusers);
    }
}