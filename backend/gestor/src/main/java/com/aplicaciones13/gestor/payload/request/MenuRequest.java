package com.aplicaciones13.gestor.payload.request;

import com.aplicaciones13.base.payload.common.AppRequest;
import com.aplicaciones13.base.validations.ValidUUID;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * DTO para la solicitud de creación o actualización de un menú.
 * 
 * @autor omargo33
 * @since 2025-01-09
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Schema(description = "DTO para la solicitud de creación o actualización de un menú")
public class MenuRequest extends AppRequest {

    @NotNull
    @ValidUUID
    @Schema(description = "UUID del módulo al que pertenece el menú", example = "0ca1c748-e1de-11ef-a71a-70a8d3365682")
    private String uuidModule;

    @NotNull
    @Size(max = 8)
    @Schema(description = "Type del menú", example = "P")
    private String type;

    @NotNull
    @Size(max = 32)
    @Schema(description = "Índice del menú", example = "menu_1")
    private String indexMenu;

    @NotNull
    @Size(max = 128)
    @Schema(description = "Name del menú", example = "Menú Principal")
    private String name;

    @Size(max = 256)
    @Schema(description = "Ruta del flujo asociado al menú", example = "/home")
    private String taskFlow;

    @NotNull
    @Schema(description = "Status del menú (activo/inactivo)", example = "A")
    private String status;

    @Schema(description = "Order de visualización del menú", example = "1")
    private Long order;

}