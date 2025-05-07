package com.aplicaciones13.gestor.payload.procesos;

import com.aplicaciones13.base.payload.common.AppRequest;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * DTO para la solicitud de cambio de contraseña.
 * 
 * @autor omargo33
 * @since 2025-01-12
 * 
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Schema(description = "DTO para la solicitud del lock o el unlock de un usuario")
public class LockRequest extends AppRequest {
    
    @Schema(description = "UUID del usuario", example = "123e4567-e89b-12d3-a456-426614174000")
    private String uuidUser;

    @Schema(description = "Email del usuario", example = "user@example.com")
    private String email;
}
