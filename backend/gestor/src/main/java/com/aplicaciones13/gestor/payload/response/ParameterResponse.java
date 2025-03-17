package com.aplicaciones13.gestor.payload.response;

import com.aplicaciones13.base.payload.common.UserDateAppResponse;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * DTO para la respuesta de la entidad Parameter
 * 
 * @autor omargo33
 * @since 2025-01-10
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Schema(description = "DTO para la respuesta de la entidad Parameter")
public class ParameterResponse extends UserDateAppResponse {

    @Schema(description = "Index del parameter", example = "parameter123")
    private String indexParameter;

    @Schema(description = "Listado de CDU + E=encriptado, TP=texto plano", example = "TP")
    private String encryt;

    @Schema(description = "Name del parameter", example = "Name del Parámetro")
    private String name;

    @Schema(description = "Description de parameter y su uso", example = "Descripción del Parámetro")
    private String description;

    @Schema(description = "Valor texto del parameter", example = "Valor Text 01")
    private String valueText01;

    @Schema(description = "Valor texto del parameter", example = "Valor Text 02")
    private String valueText02;

    @Schema(description = "Valor numerico del parameter", example = "123.45")
    private Double valueNumber01;

    @Schema(description = "Valor numerico del parameter", example = "678.90")
    private Double valueNumber02;

    @Schema(description = "Description default del parameter para information", example = "Default Text 01")
    private String defaultText01;

    @Schema(description = "Description default del parameter para information", example = "Default Text 02")
    private String defaultText02;

    @Schema(description = "Description default del parameter para information", example = "123.45")
    private Double defaultNumber01;

    @Schema(description = "Description default del parameter para information", example = "678.90")
    private Double defaultNumber02;
}