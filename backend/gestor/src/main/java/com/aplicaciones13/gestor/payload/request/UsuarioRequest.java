package com.aplicaciones13.gestor.payload.request;

import com.aplicaciones13.gestor.payload.common.EstadoProgramaRequest;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * DTO para la solicitud de creación o actualización de un usuario.
 * 
 * @author omargo33
 * @since 2025-01-09
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Schema(description = "DTO para la solicitud de creación o actualización de un usuario")
public class UsuarioRequest extends EstadoProgramaRequest {

    @NotNull
    @Size(max = 128)
    @Schema(description = "Nick del usuario", example = "usuario123")
    private String nick;

    @NotNull
    @Size(max = 128)
    @Schema(description = "Nombre del usuario", example = "Juan")
    private String nombre;

    @NotNull
    @Size(max = 128)
    @Schema(description = "Apellido del usuario", example = "Pérez")
    private String apellido;
  
    @NotNull
    @Size(max = 512)
    @Schema(description = "Validador del usuario", example = "validador123")
    private String validador;   
}