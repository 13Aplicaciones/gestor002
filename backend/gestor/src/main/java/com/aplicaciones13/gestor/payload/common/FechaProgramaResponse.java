package com.aplicaciones13.gestor_ws.payload.common;

import java.util.Date;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class FechaProgramaResponse {

    @Schema(description = "Fecha de registro del usuario", example = "2022-02-02T10:00:00")
    private Date usuarioFecha;

    @Schema(description = "Programa usado para el cambio", example = "ProgramaEjemplo")
    private String usuarioPrograma;

}
