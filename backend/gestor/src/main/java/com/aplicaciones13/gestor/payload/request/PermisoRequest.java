package com.aplicaciones13.gestor.payload.request;

import com.aplicaciones13.gestor.payload.common.ProgramaRequest;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * DTO para la solicitud de creación o actualización de un permiso.
 * 
 * @author omargo33
 * @since 2025-01-09
 * 
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Schema(description = "DTO para la solicitud de creación o actualización de un permiso")
public class PermisoRequest extends ProgramaRequest {

    @NotNull
    @Schema(description = "Id del menú asociado al permiso", example = "1")
    private Long idMenu;

    @NotNull
    @Schema(description = "Id del rol asociado al permiso", example = "2")
    private Long idRol;

    @NotNull
    @Schema(description = "Permiso para crear", example = "true")
    private String crear;

    @NotNull
    @Schema(description = "Permiso para actualizar", example = "true")
    private String actualizar;

    @NotNull
    @Schema(description = "Permiso para borrar", example = "false")
    private String borrar;

    @NotNull
    @Schema(description = "Permiso para ver auditoría", example = "true")
    private String verAuditoria;

}