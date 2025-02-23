package com.aplicaciones13.gestor.payload.response;

import java.util.UUID;

import com.aplicaciones13.base.payload.common.UserDateAppResponse;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Clase que representa el payload de respuesta para las operaciones relacionadas con la entidad user.
 * 
 * @author omargo33
 * @since 2025-01-09
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Schema(description = "DTO para la respuesta de la entidad user")
public class UserResponse extends UserDateAppResponse {

    @Schema(description = "UUID del registro", example = "550e8400-e29b-41d4-a716-446655440000")
    private UUID uuid;

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
}