package com.aplicaciones13.orchestrator.payload.response;

import java.io.Serializable;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "DTO para la respuesta de un item de combo")
public class ComboItemResponse implements Serializable {

    private static final long serialVersionUID = 1L;

    @Schema(description = "Index del item de combo", example = "item123")
    private String indexComboItem;

    @Schema(description = "Número de código del item de combo", example = "1001")
    private Integer codeNumber;

    @Schema(description = "Texto del código del item de combo", example = "CODE")
    private String codeText;

    @Schema(description = "Etiqueta del item de combo", example = "Etiqueta 01")
    private String label;

    @Schema(description = "Descripción del item de combo", example = "Descripción detallada del item")
    private String description;

    @Schema(description = "Icono del item de combo", example = "TransparencyGridIcon")
    private String icon;

    @Schema(description = "Color del item de combo", example = "none")
    private String color;

    @Schema(description = "Orden del item de combo", example = "1")
    private Integer orden;

    @Schema(description = "Estado del item de combo", example = "active")
    private String status;
    
}
