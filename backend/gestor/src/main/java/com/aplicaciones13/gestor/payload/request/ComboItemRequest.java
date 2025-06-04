package com.aplicaciones13.gestor.payload.request;

import com.aplicaciones13.base.payload.common.AppRequest;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Min;
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
    @Schema(description = "Nombre del uuid module", example = "f357141f-7501-4f9f-9b14-a52a312046cf")
    private String uuidModule;

    @NotNull
    @Size(max = 128)
    @Schema(description = "Index combo item", example = "LM_001")
    private String indexComboItem;

    @NotNull
    @Min(0)
    @Schema(description = "Código numérico", example = "1")
    private Integer codeNumber = 0;

    @NotNull
    @Size(max = 8)
    @Schema(description = "Código de texto", example = "CC")
    private String codeText;

    @NotNull
    @Size(max = 64)
    @Schema(description = "Etiqueta de presentación", example = "Cédula de Ciudadanía")
    private String label;

    @NotNull
    @Size(max = 256)
    @Schema(description = "Descripción de la opción", example = "Documento de identificación para ciudadanos colombianos")
    private String description;

    @Size(max = 128)
    @Schema(description = "Icono que usa la lista de valor", example = "TransparencyGridIcon")
    private String icon = "TransparencyGridIcon";

    @NotNull
    @Size(max = 64)
    @Schema(description = "Color de la opción", example = "blue")
    private String color = "none";

    @NotNull
    @Min(0)
    @Schema(description = "Orden del elemento", example = "1")
    private Integer orden = 0;

    @NotNull
    @Size(max = 8)
    @Pattern(regexp = "^(A|I|-|X)$", message = "El estado debe ser A (Activo), I (Inactivo), - (guion medio) o X (Eliminado)")
    @Schema(description = "Estado del ítem: A=Activo, I=Inactivo, -=guion medio, X=Eliminado", example = "A")
    private String status;
}