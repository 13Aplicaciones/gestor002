package com.aplicaciones13.gestor_ws.payload.request;

import com.aplicaciones13.gestor_ws.payload.common.ProgramaRequest;

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
public class MenuRequest extends ProgramaRequest {

    @NotNull
    @Schema(description = "Id del menú", example = "1")
    private Long idMenu;

    @Schema(description = "Id del módulo al que pertenece el menú", example = "2")
    private Long idModulo;

    @NotNull
    @Size(max = 32)
    @Schema(description = "Tipo del menú", example = "principal")
    private String tipo;

    @NotNull
    @Size(max = 32)
    @Schema(description = "Índice del menú", example = "menu_1")
    private String indice;

    @NotNull
    @Size(max = 128)
    @Schema(description = "Nombre del menú", example = "Menú Principal")
    private String nombre;

    @Size(max = 256)
    @Schema(description = "Ruta del flujo asociado al menú", example = "/home")
    private String rutaFlujo;

    @NotNull
    @Schema(description = "Estado del menú (activo/inactivo)", example = "activo")
    private String estado;

    @Schema(description = "Orden de visualización del menú", example = "1")
    private Long orden;

}