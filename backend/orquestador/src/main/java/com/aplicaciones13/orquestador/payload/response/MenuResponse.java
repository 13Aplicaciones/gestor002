package com.aplicaciones13.orquestador.payload.response;

import java.io.Serializable;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * DTO para la respuesta de la entidad Menu
 * 
 * @autor omargo33
 * @since 2025-01-10
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Schema(description = "DTO para la respuesta de la entidad Menu")
public class MenuResponse implements Serializable {

    @Schema(description = "Type de menú", example = "principal")
    private String type;

    @Schema(description = "Índice del menú", example = "menu_01")
    private String index;

    @Schema(description = "Name del menú", example = "Menú Principal")
    private String name;

    @Schema(description = "Ruta del flujo asociado al menú", example = "/home")
    private String taskFlow;

    @Schema(description = "Status del menú (activo/inactivo)", example = "activo")
    private String status;

    @Schema(description = "Order de visualización del menú", example = "1")
    private Long order;

    @Schema(description = "Icon Presentacion", example = "QuestionMarkIcon")
    private String icon;

    @Schema(description = "Create")
    private String create;

    @Schema(description = "Update")
    private String update;

    @Schema(description = "Delete")
    private String delete;

    @Schema(description = "Audit")
    private String audit;
}