package com.aplicaciones13.gestor.payload.request;

import com.aplicaciones13.base.payload.common.AppRequest;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * DTO para la solicitud de creación o actualización de un combo.
 * 
 * @author omargo33
 * @since 2025-01-12
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Schema(description = "DTO para la solicitud de creación o actualización de un combo")
public class ComboRequest extends AppRequest{

    @NotNull
    @Schema(description = "UUID del módulo asociado al combo", example = "550e8400-e29b-41d4-a716-446655440000")
    private String uuidModule;

    @NotNull
    @Schema(description = "Índice del combo", example = "0")
    private String indexCombo;

    @NotNull
    @Size(max = 128)
    @Schema(description = "Nombre del combo", example = "Combo de Ejemplo")
    private String name;

    @Schema(description = "Estado del combo", example = "activo")
    private String status;
}