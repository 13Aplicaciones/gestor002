package com.aplicaciones13.gestor.payload.response;

import com.aplicaciones13.base.payload.common.UserDateAppResponse;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Clase que representa el payload de respuesta para las operaciones
 * relacionadas con la entidad ComboItem.
 * 
 * @author omargo33
 * @since 2025-06-01
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Schema(description = "DTO para la respuesta de la entidad ComboItem")
@JsonPropertyOrder({
        "uuid",
        "indexComboItem",
        "uuidCombo",
        "label",
        "description",
        "codeNumber",
        "codeText",
        "icon",
        "color",
        "orden",
        "status",
        "user",
        "userDate",
        "userApp"
})
public class ComboItemResponse extends UserDateAppResponse {

    @Schema(description = "UUID del registro", example = "550e8400-e29b-41d4-a716-446655440000")
    private String uuid;

    @Schema(description = "ID del combo al que pertenece", example = "1")
    private String uuidCombo;

    @Schema(description = "Nombre del índice del combo item", example = "TIPO_DOCUMENTO")
    private String indexComboItem;

    @Schema(description = "Código numérico", example = "1")
    private Integer codeNumber;

    @Schema(description = "Código de texto", example = "CC")
    private String codeText;

    @Schema(description = "Etiqueta de presentación", example = "Cédula de Ciudadanía")
    private String label;

    @Schema(description = "Descripción de la opción", example = "Documento de identificación para ciudadanos colombianos")
    private String description;

    @Schema(description = "Icono que usa la lista de valor", example = "TransparencyGridIcon")
    private String icon;

    @Schema(description = "Color de la opción", example = "blue")
    private String color;

    @Schema(description = "Orden del elemento", example = "1")
    private Integer orden;

    @Schema(description = "Estado del ítem: A=Activo, I=Inactivo, -=guion medio, X=Eliminado", example = "A")
    private String status;
}