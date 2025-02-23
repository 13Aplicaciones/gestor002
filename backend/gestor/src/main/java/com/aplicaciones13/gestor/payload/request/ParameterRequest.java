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
@Schema(description = "DTO para la solicitud de creación o actualización de un parámetro")
public class ParameterRequest extends AppRequest {

    @NotNull
    @Size(max = 32)
    @Schema(description = "Index del parameter", example = "parameter123")
    private String index;

    @Size(max = 8)
    @Schema(description = "Listado de CDU + E=encriptado, TP=texto plano", example = "TP")
    private String encrypted;

    @NotNull
    @Size(max = 128)
    @Schema(description = "Name del parameter", example = "Name del Parámetro")
    private String name;

    @Size(max = 512)
    @Schema(description = "Description de parameter y su uso", example = "Descripción del Parámetro")
    private String description;

    @Size(max = 256)
    @Schema(description = "Value texto del parameter", example = "Value Text 01")
    private String valueText01;

    @Size(max = 256)
    @Schema(description = "Value texto del parameter", example = "Value Text 02")
    private String valueText02;

    @Schema(description = "Value numerico del parameter", example = "123.45")
    private Double valueNumber01;

    @Schema(description = "Value numerico del parameter", example = "678.90")
    private Double valueNumber02;

    @Size(max = 256)
    @Schema(description = "Description default del parameter para information", example = "Default Text 01")
    private String defaultText01;

    @Size(max = 256)
    @Schema(description = "Description default del parameter para information", example = "Default Text 02")
    private String defaultText02;

    @Schema(description = "Description default del parameter para information", example = "123.45")
    private Double defaultNumber01;

    @Schema(description = "Description default del parameter para information", example = "678.90")
    private Double defaultNumber02;

 
}