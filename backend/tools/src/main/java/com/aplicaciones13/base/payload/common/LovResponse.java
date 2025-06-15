package com.aplicaciones13.base.payload.common;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * Clase que representa una respuesta de tipo Lov (List of Values).
 * Contiene un UUID, una etiqueta y una descripción.
 * 
 * @author omargo33
 * @since 2025-01-12
 */
@Data
public class LovResponse {

    @Schema(description = "Index", example = "uuid:123e4567-e89b-12d3-a456-426614174000 | string:valor | int:1 ")
    private String index;

    @Schema(description = "Etiqueta del registro", example = "Titulo del Registro")
    private String label;

    @Schema(description = "Etiqueta alternativa del registro", example = "Titulo Alternativo del Registro")
    private String labelAlternative;

    @Schema(description = "Descripción del registro", example = "Descripción de ejemplo")
    private String description;

    @Schema(description = "Valor del registro", example = "1")
    private int value;

    @Schema(description = "Valor decimal del registro", example = "1.23")
    private Double doubleValue;

    @Schema(description = "Estado del registro", example = "A")
    private String status;

    @Schema(description = "Orden del registro", example = "1 | date(String) | string")
    private String orden;
}
