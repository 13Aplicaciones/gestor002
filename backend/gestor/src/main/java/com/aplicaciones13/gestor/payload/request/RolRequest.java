package com.aplicaciones13.gestor.payload.request;

import com.aplicaciones13.gestor.payload.common.StatusAppRequest;

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
public class RolRequest extends StatusAppRequest {

    @Schema(description = "Id del module al que pertenece el listado", example = "1")
    private Long idModule;

    @NotNull
    @Size(max = 128)
    @Schema(description = "Name del rol", example = "Administrador")
    private String name;

    @NotNull
    @Size(max = 8)
    @Schema(description = "Listado de CDU + ROLES Maestro de roles es un CDU", example = "ADMIN")
    private String type;    
}
