package com.aplicaciones13.gestor.payload.request;

import com.aplicaciones13.base.payload.common.StatusAppRequest;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * DTO para la solicitud de creación o actualización de un Token realacionado a un correo.
 * 
 * @autor omargo33
 * @since 2025-01-09
 * 
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Schema(description = "DTO para la solicitud de creación o actualización de un Token")
public class TokenEmailRequest  extends StatusAppRequest {

    @NotNull
    @Schema(description = "UUID del usuario", example = "123e4567-e89b-12d3-a456-426614174000")
    private String uuidUser;

    @NotNull
    @Email
    @Schema(description = "email del usuario", example = "omargo33@gmail.com")
    private String email;    
}
