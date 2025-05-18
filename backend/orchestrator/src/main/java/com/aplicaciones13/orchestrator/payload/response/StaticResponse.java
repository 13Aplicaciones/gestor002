package com.aplicaciones13.orchestrator.payload.response;

import java.io.Serializable;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * Statics Response
 * 
 * @autor omargo33
 * @see 2025-03-03
 */
@Data
@Schema(description = "Statics Response")
public class StaticResponse implements Serializable {

    @Schema(name = "idStatic", description = "Id Static", example = "1")
    private Long idStatic;

    @Schema(name = "value", description = "Value", example = "34")
    private String value;

    @Schema(name = "description", description = "Description", example = "Description")
    private String description;

    @Schema(name = "status", description = "Status", example = "info | warning | success | error")
    private String status;

}
