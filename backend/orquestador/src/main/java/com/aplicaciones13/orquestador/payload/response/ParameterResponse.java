package com.aplicaciones13.orquestador.payload.response;

import java.io.Serializable;

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
public class ParameterResponse implements Serializable {

    private static final long serialVersionUID = 1L;

    @Schema(description = "Index del parameter", example = "parameter123")
    private String index;

    @Schema(description = "Listado de CDU + E=encriptado, TP=texto plano", example = "TP")
    private String encryted;

    @Schema(description = "Valor texto del parameter", example = "Valor Text 01")
    private String valueText01;

    @Schema(description = "Valor texto del parameter", example = "Valor Text 02")
    private String valueText02;

    @Schema(description = "Valor numerico del parameter", example = "123.45")
    private Double valueNumber01;

    @Schema(description = "Valor numerico del parameter", example = "678.90")
    private Double valueNumber02;
}