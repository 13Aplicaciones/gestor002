package com.aplicaciones13.gestor.payload.response;

import com.aplicaciones13.gestor.payload.common.UsuarioFechaProgramaResponse;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * DTO para la respuesta de la entidad Parametro
 * 
 * @autor omargo33
 * @since 2025-01-10
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Schema(description = "DTO para la respuesta de la entidad Parametro")
public class ParametroResponse extends UsuarioFechaProgramaResponse {

    @Schema(description = "Indice del parametro", example = "parametro123")
    private String indice;

    @Schema(description = "Listado de CDU + E=encriptado, TP=texto plano", example = "TP")
    private String clave;

    @Schema(description = "Nombre del parametro", example = "Nombre del Parámetro")
    private String nombre;

    @Schema(description = "Descripcion de parametro y su uso", example = "Descripción del Parámetro")
    private String descripcion;

    @Schema(description = "Valor texto del parametro", example = "Valor Texto 01")
    private String valorTexto01;

    @Schema(description = "Valor texto del parametro", example = "Valor Texto 02")
    private String valorTexto02;

    @Schema(description = "Valor numerico del parametro", example = "123.45")
    private Double valorNumero01;

    @Schema(description = "Valor numerico del parametro", example = "678.90")
    private Double valorNumero02;

    @Schema(description = "Descripcion default del parametro para informacion", example = "Default Texto 01")
    private String defaultTexto01;

    @Schema(description = "Descripcion default del parametro para informacion", example = "Default Texto 02")
    private String defaultTexto02;

    @Schema(description = "Descripcion default del parametro para informacion", example = "123.45")
    private Double defaultNumero01;

    @Schema(description = "Descripcion default del parametro para informacion", example = "678.90")
    private Double defaultNumero02;
}