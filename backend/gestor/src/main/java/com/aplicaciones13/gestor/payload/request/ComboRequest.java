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
    @Schema(description = "ID del módulo asociado al combo", example = "1")
    private Long idModule;

    @NotNull
    @Schema(description = "Índice del combo", example = "0")
    private Integer indexCombo;

    @NotNull
    @Size(max = 128)
    @Schema(description = "Nombre del combo", example = "Combo de Ejemplo")
    private String name;

    @Schema(description = "Estado del combo", example = "activo")
    private String status;
}