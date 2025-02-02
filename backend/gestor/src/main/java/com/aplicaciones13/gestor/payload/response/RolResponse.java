package com.aplicaciones13.gestor_ws.payload.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import com.aplicaciones13.gestor_ws.payload.common.UsuarioFechaProgramaResponse;

/**
 * DTO para la respuesta de la entidad Rol
 * 
 * @autor omargo33
 * @since 2025-01-10
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Schema(description = "DTO para la respuesta de la entidad Rol")
public class RolResponse extends UsuarioFechaProgramaResponse {

    @Schema(description = "Id del rol", example = "1")
    private Long idRol;

    @Schema(description = "Id del modulo al que pertenece el listado", example = "1")
    private Long idModulo;

    @Schema(description = "Nombre del rol", example = "Administrador")
    private String nombre;

    @Schema(description = "Listado de CDU + ROLES Maestro de roles es un CDU", example = "ADMIN")
    private String tipo;

    @Schema(description = "Listado de CDU + A=Activo, X=Borrado, etc", example = "A")
    private String estado;
}
