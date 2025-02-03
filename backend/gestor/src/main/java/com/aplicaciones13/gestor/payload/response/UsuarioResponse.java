package com.aplicaciones13.gestor.payload.response;

import java.util.UUID;

import com.aplicaciones13.gestor.payload.common.UsuarioFechaProgramaResponse;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Clase que representa el payload de respuesta para las operaciones relacionadas con la entidad Usuario.
 * 
 * @author omargo33
 * @since 2025-01-09
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Schema(description = "DTO para la respuesta de la entidad Usuario")
public class UsuarioResponse extends UsuarioFechaProgramaResponse {

    @Schema(description = "UUID del registro", example = "550e8400-e29b-41d4-a716-446655440000")
    private UUID uuid;

    @Schema(description = "Nick del usuario", example = "usuario123")
    private String nick;

    @Schema(description = "Nombre del usuario", example = "Juan")
    private String nombre;

    @Schema(description = "Apellido del usuario", example = "Pérez")
    private String apellido;

    @Schema(description = "Validador del usuario", example = "validador123")
    private String validador;

    @Schema(description = "Estado del usuario", example = "activo")
    private String estado;
}