package com.aplicaciones13.gestor.payload.common;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class UsuarioFechaProgramaResponse extends FechaProgramaResponse {

    @Schema(description = "Usuario que realizó el cambio", example = "root")
    private String usuario;

}
