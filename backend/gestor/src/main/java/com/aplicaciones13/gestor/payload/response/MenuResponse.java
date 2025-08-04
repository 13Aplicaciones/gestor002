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

    @Schema(description = "UUID del registro para búsquedas", example = "d290f1ee-6c54-4b01-90e6-d701748f0851")
    private String uuid;

    @Schema(description = "UUID del módulo al que pertenece el menú", example = "550e8400-e29b-41d4-a716-446655440000")
    private String uuidModule;

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