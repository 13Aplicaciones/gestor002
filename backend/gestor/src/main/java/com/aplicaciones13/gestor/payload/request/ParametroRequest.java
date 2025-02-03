package com.aplicaciones13.gestor.payload.request;

import com.aplicaciones13.gestor.payload.common.ProgramaRequest;

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
public class ParametroRequest extends ProgramaRequest {

    @NotNull
    @Size(max = 32)
    @Schema(description = "Indice del parametro", example = "parametro123")
    private String indice;

    @Size(max = 8)
    @Schema(description = "Listado de CDU + E=encriptado, TP=texto plano", example = "TP")
    private String clave;

    @NotNull
    @Size(max = 128)
    @Schema(description = "Nombre del parametro", example = "Nombre del Parámetro")
    private String nombre;

    @Size(max = 512)
    @Schema(description = "Descripcion de parametro y su uso", example = "Descripción del Parámetro")
    private String descripcion;

    @Size(max = 256)
    @Schema(description = "Valor texto del parametro", example = "Valor Texto 01")
    private String valorTexto01;

    @Size(max = 256)
    @Schema(description = "Valor texto del parametro", example = "Valor Texto 02")
    private String valorTexto02;

    @Schema(description = "Valor numerico del parametro", example = "123.45")
    private Double valorNumero01;

    @Schema(description = "Valor numerico del parametro", example = "678.90")
    private Double valorNumero02;

    @Size(max = 256)
    @Schema(description = "Descripcion default del parametro para informacion", example = "Default Texto 01")
    private String defaultTexto01;

    @Size(max = 256)
    @Schema(description = "Descripcion default del parametro para informacion", example = "Default Texto 02")
    private String defaultTexto02;

    @Schema(description = "Descripcion default del parametro para informacion", example = "123.45")
    private Double defaultNumero01;

    @Schema(description = "Descripcion default del parametro para informacion", example = "678.90")
    private Double defaultNumero02;

 
}