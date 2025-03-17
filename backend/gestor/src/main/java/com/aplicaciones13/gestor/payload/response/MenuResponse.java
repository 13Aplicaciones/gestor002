package com.aplicaciones13.gestor.payload.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import com.aplicaciones13.base.payload.common.UserDateAppResponse;

/**
 * DTO para la respuesta de la entidad Menu
 * 
 * @autor omargo33
 * @since 2025-01-10
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Schema(description = "DTO para la respuesta de la entidad Menu")
public class MenuResponse extends UserDateAppResponse {

    @Schema(description = "Identificador único del menú", example = "1")
    private Long idMenu;

    @Schema(description = "Identificador del módulo al que pertenece el menú", example = "2")
    private Long idModule;

    @Schema(description = "Type de menú", example = "principal")
    private String type;

    @Schema(description = "Índice del menú", example = "menu_01")
    private String indexMenu;

    @Schema(description = "Name del menú", example = "Menú Principal")
    private String name;

    @Schema(description = "Ruta del flujo asociado al menú", example = "/home")
    private String taskFlow;

    @Schema(description = "Status del menú (activo/inactivo)", example = "activo")
    private String status;

    @Schema(description = "Order de visualización del menú", example = "1")
    private Long order;


}