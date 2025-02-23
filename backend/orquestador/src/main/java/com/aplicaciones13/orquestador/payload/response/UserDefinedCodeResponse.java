package com.aplicaciones13.orquestador.payload.response;

import java.io.Serializable;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Clase que representa la entidad UserDefinedCode.
 * Mapea los campos a la tabla correspondiente en la base de datos.
 * 
 * @author omargo33
 * @since 2025-01-26
 *
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Schema(description = "DTO para la respuesta de la entidad user defined code")
public class UserDefinedCodeResponse implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Schema(description = "group", example = "AA001")
    private String group;
 
    @Schema(description = "codeText", example = "A")
    private String codeText;

    @Schema(description = "codeNumber", example = "2")
    private Long codeNumber;

    @Schema(description = "Name del code", example = "Activo")
    private String name;

    @Schema(description = "Descripción del user", example = "Descripción del user")
    private String description;

    @Schema(description = "Orden del user", example = "1")
    private Long order;

    @Schema(description = "Status del user", example = "activo")
    private String status;
}