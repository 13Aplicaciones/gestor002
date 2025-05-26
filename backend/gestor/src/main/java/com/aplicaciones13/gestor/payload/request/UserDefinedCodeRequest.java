package com.aplicaciones13.gestor.payload.request;

import com.aplicaciones13.base.payload.common.AppRequest;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * DTO para la solicitud de creación o actualización de un parámetro.
 * 
 * @autor omargo33
 * @since 2025-01-09
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Schema(description = "DTO para la solicitud de creación o actualización de un código definido por el usuario")
public class UserDefinedCodeRequest extends AppRequest {

    @NotNull
    @Size(max = 64)
    @Schema(description = "UUID del módulo", example = "123e4567-e89b-12d3-a456-426614174000")
    private String uuidModule;

    @NotNull
    @Size(max = 8)
    @Schema(description = "Grupo", example = "001")
    private String group;

    @NotNull
    @Size(min = 1)
    @Size(max = 128)
    @Schema(description = "Code Text", example = "A")
    private String codeText;

    @Schema(description = "Code number", example = "1")
    private int codeNumber;

    @Size(max = 64)
    @Size(min = 4)
    @Schema(description = "Name", example = "Nombre del codigo")
    private String name;

    @Size(min = 8)
    @Size(max = 512)
    @Schema(description = "Description", example = "Descripción del código")
    private String description;

    @Size(max = 256)
    @Schema(description = "Style", example = "color: red;")
    private String style;

    @Schema(description = "Orden", example = "1", defaultValue = "0")
    private int order;
    
    @Size(min = 1)
    @Size(max = 8)
    @Schema(description = "Status", example = "a", defaultValue = "A")
    private String status;
}