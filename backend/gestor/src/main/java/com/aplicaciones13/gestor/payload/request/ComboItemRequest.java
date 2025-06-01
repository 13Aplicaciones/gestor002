package com.aplicaciones13.gestor.payload.request;

import com.aplicaciones13.base.payload.common.AppRequest;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * DTO para la solicitud de creación o actualización de ítem de combo.
 * 
 * @author omargo33
 * @since 2025-06-01
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Schema(description = "DTO para la solicitud de creación o actualización de ítem de combo")
public class ComboItemRequest extends AppRequest {

    @NotNull
    @Schema(description = "ID del combo al que pertenece", example = "1")
    private Long idCombo;

    @NotNull
    @Size(max = 128)
    @Schema(description = "Nombre del ítem del combo", example = "Opción 1")
    private String name;

    @NotNull
    @Size(max = 8)
    @Pattern(regexp = "^(A|I|X)$", message = "El estado debe ser A (Activo), I (Inactivo) o X (Eliminado)")
    @Schema(description = "Estado del ítem: A=Activo, I=Inactivo, X=Eliminado", example = "A")
    private String status;
}