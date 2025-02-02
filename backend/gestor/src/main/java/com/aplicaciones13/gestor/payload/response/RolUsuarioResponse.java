package com.aplicaciones13.gestor_ws.payload.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import com.aplicaciones13.gestor_ws.payload.common.UsuarioFechaProgramaResponse;

@Data
@EqualsAndHashCode(callSuper = false)
@Schema(description = "DTO para la respuesta de la entidad RolUsuario")
public class RolUsuarioResponse extends UsuarioFechaProgramaResponse {

    @Schema(description = "Id del rol de usuario", example = "1")
    private Long idRolUsuario;

    @Schema(description = "Id de roles al que pertenece el listado", example = "2")
    private Long idRol;

    @Schema(description = "Id de usuario al que pertenece el listado", example = "3")
    private Long idUsuario;
  
}