package com.aplicaciones13.orchestrator.payload.response;

import java.io.Serializable;
import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;


@Data
@Schema(description = "DTO for the response of a combo")
public class ComboResponse implements Serializable {
    
    private static final long serialVersionUID = 1L;

    @Schema(description = "Combo index identifier")
    private String indexCombo;

    @Schema(description = "Combo name")
    private String name;

    @Schema(description = "Combo status")
    private String status;

    @Schema(description = "Unique identifier")
    private String uuid;

    @Schema(description = "User who created/modified the combo")
    private String user;

    @Schema(description = "Items in the combo")
    private List<ComboItemResponse> comboItems;
  
}
