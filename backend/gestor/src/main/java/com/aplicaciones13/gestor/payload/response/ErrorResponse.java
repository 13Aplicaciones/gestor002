package com.aplicaciones13.gestor.payload.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.UUID;

import com.aplicaciones13.gestor.payload.common.UsuarioFechaProgramaResponse;

/**
 * DTO para la respuesta de un error.
 * 
 * @autor omargo33
 * @since 2025-01-10
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Schema(description = "DTO para la respuesta de un error")
public class ErrorResponse extends UsuarioFechaProgramaResponse {
    
    @Schema(description = "UUID del registro para búsquedas", example = "d290f1ee-6c54-4b01-90e6-d701748f0851")
    private UUID uuid;

    @Schema(description = "Indice de error", example = "ERR001")
    private String indice;

    @Schema(description = "Mensaje de error", example = "Error al procesar la solicitud")
    private String mensaje;

    @Schema(description = "Descripción del mensaje de error", example = "Descripción detallada del error")
    private String descripcion;

}