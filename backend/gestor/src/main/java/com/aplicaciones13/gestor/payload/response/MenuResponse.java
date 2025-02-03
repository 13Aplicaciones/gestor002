package com.aplicaciones13.gestor.payload.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import com.aplicaciones13.gestor.payload.common.UsuarioFechaProgramaResponse;

/**
 * DTO para la respuesta de la entidad Menu
 * 
 * @autor omargo33
 * @since 2025-01-10
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Schema(description = "DTO para la respuesta de la entidad Menu")
public class MenuResponse extends UsuarioFechaProgramaResponse {

    @Schema(description = "Identificador único del menú", example = "1")
    private Long idMenu;

    @Schema(description = "Identificador del módulo al que pertenece el menú", example = "2")
    private Long idModulo;

    @Schema(description = "Tipo de menú", example = "principal")
    private String tipo;

    @Schema(description = "Índice del menú", example = "menu_01")
    private String indice;

    @Schema(description = "Nombre del menú", example = "Menú Principal")
    private String nombre;

    @Schema(description = "Ruta del flujo asociado al menú", example = "/home")
    private String rutaFlujo;

    @Schema(description = "Estado del menú (activo/inactivo)", example = "activo")
    private String estado;

    @Schema(description = "Orden de visualización del menú", example = "1")
    private Long orden;


}