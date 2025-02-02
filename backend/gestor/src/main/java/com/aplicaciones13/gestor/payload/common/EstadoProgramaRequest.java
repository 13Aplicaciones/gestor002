package com.aplicaciones13.gestor_ws.payload.common;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Clase que representa el request para cambiar el estado de un usuario
 * 
 * @author omargo33
 * @since 2025-01-15
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class EstadoProgramaRequest extends ProgramaRequest {
        
    @NotNull
    @Size(min=1, max = 8)
    @Schema(description = "Estado del registro", example = "C")
    private String estado;   
}
