package com.aplicaciones13.gestor.payload.request;

import com.aplicaciones13.base.payload.common.AppRequest;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * DTO para la solicitud de creación o actualización de un rol de user.
 * 
 * @autor omargo33
 * @since 2025-01-09
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Schema(description = "DTO para la solicitud de creación o actualización de un rol de user")
public class RolUserRequest extends AppRequest {

    @NotNull
    @Schema(description = "Id de roles al que pertenece el listado", example = "1")
    private Long idRol;

    @NotNull
    @Schema(description = "Id de user al que pertenece el listado", example = "1")
    private Long idUser;

}