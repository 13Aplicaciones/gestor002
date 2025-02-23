package com.aplicaciones13.gestor.payload.request;

import com.aplicaciones13.base.payload.common.AppRequest;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * DTO para la solicitud de creación o actualización de información.
 * 
 * @author omargo33
 * @since 2025-01-09
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Schema(description = "DTO para la solicitud de creación o actualización de información")
public class InformationRequest extends AppRequest{

    @NotNull
    @Size(max = 128)
    @Schema(description = "Name de la información a relatar", example = "Información Ejemplo")
    private String name;

    @NotNull
    @Size(max = 256)
    @Schema(description = "Valor 01", example = "Valor 1")
    private String value01;

    @Size(max = 256)
    @Schema(description = "Valor 02", example = "Valor 2")
    private String value02; 
}