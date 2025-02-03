package com.aplicaciones13.gestor.payload.common;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Clase que representa el request para cambiar el status de un user
 * 
 * @author omargo33
 * @since 2025-01-15
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class StatusAppRequest extends AppRequest {
        
    @NotNull
    @Size(min=1, max = 8)
    @Schema(description = "Status del registro", example = "C")
    private String status;   
}
