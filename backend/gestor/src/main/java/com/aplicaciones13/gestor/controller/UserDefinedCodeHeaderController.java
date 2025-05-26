package com.aplicaciones13.gestor.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
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
import com.aplicaciones13.gestor.model.UserDefinedCode;
import com.aplicaciones13.gestor.payload.request.UserDefinedCodeRequest;
import com.aplicaciones13.gestor.payload.response.UserDefinedCodeResponse;
import com.aplicaciones13.gestor.services.UserDefinedCodeHeaderService;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@Validated
@RequestMapping("/api/cduHeader")
@Tag(name = "Codigo Definido User - Encabezado", description = "Servicio para CRUD de Codigos Definidos por el user (CDU) encabezado")
public class UserDefinedCodeHeaderController {

    @Autowired
    private UserDefinedCodeHeaderService userDefinedCodeHeaderService;

    @GetMapping("/{uuid}")
    public ResponseEntity<UserDefinedCodeResponse> getAllCodigosDefinidos( @PathVariable @ValidUUID String uuid) {
        UserDefinedCodeResponse codigo = new UserDefinedCodeResponse();
        return ResponseEntity.ok(codigo);
    }

    @GetMapping("/paginated")
    public Map<String, Object> getAllusersWithPaginado(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "order,desc") String[] sort,
            @RequestParam(required = true) String uuidModule,
            @RequestParam(required = false) String group,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String description) {

        Page<UserDefinedCode> pageUserDefinedCode = null; 
        
        return ControllerTools.generateFooterPage(pageUserDefinedCode);
    }

    @PostMapping
    public ResponseEntity<UserDefinedCodeResponse> createCodigoDefinido(@RequestBody UserDefinedCodeRequest userDefinedCodeRequest) {
        UserDefinedCodeResponse updatedCodigoResponse = new UserDefinedCodeResponse();
        return ResponseEntity.status(HttpStatus.CREATED).body(updatedCodigoResponse);
    }

    @PutMapping("/{uuid}")
    public ResponseEntity<UserDefinedCodeResponse> updateCodigoDefinido(@PathVariable @ValidUUID String uuid, @RequestBody UserDefinedCodeRequest userDefinedCodeRequest) {
        UserDefinedCodeResponse updatedCodigoResponse = new UserDefinedCodeResponse();
        return ResponseEntity.ok(updatedCodigoResponse);
    }

    @DeleteMapping("/{uuid}")
    public ResponseEntity<Void> deleteCodigoDefinido(@PathVariable @ValidUUID String uuid) {
        return ResponseEntity.noContent().build();
    }
}