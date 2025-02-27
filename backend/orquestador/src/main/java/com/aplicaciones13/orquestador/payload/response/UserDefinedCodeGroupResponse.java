package com.aplicaciones13.orquestador.payload.response;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "DTO para la respuesta de la entidad user defined code agrupada")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDefinedCodeGroupResponse implements Serializable {
    
    private static final long serialVersionUID = 1L;
    
    @Schema(description = "group", example = "AA001")
    private String group;

    @Schema(description = "Codes", example = "A")
    List<UserDefinedCodeResponse> codes;

    public UserDefinedCodeGroupResponse(String group, List<UserDefinedCodeResponse> codes) {
        this.group = group;
        this.codes = codes;
    }
}
