package com.aplicaciones13.gestor.payload.request;

import com.aplicaciones13.gestor.payload.common.ProgramaRequest;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * DTO para la solicitud de creación o actualización de un TokenServidor.
 * 
 * @autor omargo33
 * @since 2025-01-09
 * 
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Schema(description = "DTO para la solicitud de creación o actualización de un TokenServidor")
public class TokenServidorRequest extends ProgramaRequest {

    @NotNull
    @Schema(description = "Id del token", example = "1")
    private Long idToken;

    @NotNull
    @Size(max = 32)
    @Schema(description = "Tipo de token", example = "Bearer")
    private String tipo;

    @NotNull
    @Size(max = 256)
    @Schema(description = "Valor del token", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
    private String token;
}