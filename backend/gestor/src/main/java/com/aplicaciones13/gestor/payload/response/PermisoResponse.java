package com.aplicaciones13.gestor.payload.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import com.aplicaciones13.gestor.payload.common.UsuarioFechaProgramaResponse;

/**
 * DTO para la respuesta de la entidad Permiso
 * 
 * @autor omargo33
 * @since 2025-01-10
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Schema(description = "DTO para la respuesta de la entidad Permiso")
public class PermisoResponse extends UsuarioFechaProgramaResponse {

    @Schema(description = "Id del permiso", example = "1")
    private Long idPermiso;

    @Schema(description = "Id del menú asociado", example = "10")
    private Long idMenu;

    @Schema(description = "Id del rol asociado", example = "5")
    private Long idRol;

    @Schema(description = "Permiso para crear", example = "true")
    private String crear;

    @Schema(description = "Permiso para actualizar", example = "false")
    private String actualizar;

    @Schema(description = "Permiso para borrar", example = "true")
    private String borrar;

    @Schema(description = "Permiso para ver auditoría", example = "false")
    private String verAuditoria;

   
}