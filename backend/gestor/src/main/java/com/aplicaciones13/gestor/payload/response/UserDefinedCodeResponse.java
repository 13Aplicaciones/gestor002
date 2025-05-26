package com.aplicaciones13.gestor.payload.response;

import com.aplicaciones13.base.payload.common.UserDateAppResponse;

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
public class UserDefinedCodeResponse extends UserDateAppResponse {

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

    @Schema(description = "uuid", example = "123e4567-e89b-12d3-a456-426614174000")
    private String uuid;
}