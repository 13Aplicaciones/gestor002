package com.aplicaciones13.orchestrator.payload.response;

import java.io.Serializable;
import java.util.List;

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
public class StaticsResponse implements Serializable {

    @Schema(description = "List of static", example = "List<static>")
    List<StaticResponse> statics;
}
