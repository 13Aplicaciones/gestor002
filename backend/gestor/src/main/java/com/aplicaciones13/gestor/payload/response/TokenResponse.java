package com.aplicaciones13.gestor.payload.response;

import com.aplicaciones13.base.payload.common.UserDateAppResponse;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
@Schema(description = "DTO para la respuesta del token")
public class TokenResponse extends UserDateAppResponse {

    @Schema(description = "Social nick", example = "@omargo33")
    private String socialNick;

    @Schema(description = "Message de error", example = "Error al procesar la solicitud")
    private String email;
}