package com.aplicaciones13.gestor_ws.payload.request;

import com.aplicaciones13.gestor_ws.payload.common.EstadoProgramaRequest;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;


/**
 * DTO para la solicitud de creación o actualización de un rol.
 * 
 * @author omargo33
 * @since 2025-01-09
 * 
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Schema(description = "DTO para la solicitud de creación o actualización de un rol")
public class RolRequest extends EstadoProgramaRequest {

    @Schema(description = "Id del modulo al que pertenece el listado", example = "1")
    private Long idModulo;

    @NotNull
    @Size(max = 128)
    @Schema(description = "Nombre del rol", example = "Administrador")
    private String nombre;

    @NotNull
    @Size(max = 8)
    @Schema(description = "Listado de CDU + ROLES Maestro de roles es un CDU", example = "ADMIN")
    private String tipo;    
}
