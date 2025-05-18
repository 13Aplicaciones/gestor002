package com.aplicaciones13.orchestrator.payload.response;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * Clase que representa el payload de respuesta para las operaciones relacionadas con la entidad user.
 * 
 * @author omargo33
 * @since 2025-01-09
 */
@Data
@Schema(description = "DTO para la respuesta de la entidad user")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserResponse implements Serializable {

    private static final long serialVersionUID = 1L;

    @Schema(description = "UUID del registro", example = "550e8400-e29b-41d4-a716-446655440000")
    private String uuid;

    @Schema(description = "Nick del user", example = "user123")
    private String nick;

    @Schema(description = "Name del user", example = "Juan")
    private String name;

    @Schema(description = "LastName del user", example = "Pérez")
    private String lastName;

    @Schema(description = "Validator del user", example = "validador123")
    private String validator;

    @Schema(description = "Status del user", example = "activo")
    private String status;

    @Schema(description = "Listado de modulos asociados al user")
    private List<ModuleResponse> modules;
 
}