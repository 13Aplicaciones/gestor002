package com.aplicaciones13.gestor.payload.request;

import com.aplicaciones13.base.payload.common.StatusAppRequest;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * DTO para la solicitud de creación o actualización de un user.
 * 
 * @author omargo33
 * @since 2025-01-09
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Schema(description = "DTO para la solicitud de creación o actualización de un user")
public class UserRequest extends StatusAppRequest {

    @NotNull
    @Size(max = 128)
    @Schema(description = "Nick del user", example = "user123")
    private String nick;

    @NotNull
    @Size(max = 128)
    @Schema(description = "Name del user", example = "Juan")
    private String name;

    @NotNull
    @Size(max = 128)
    @Schema(description = "LastName del user", example = "Pérez")
    private String lastName;
  
    @NotNull
    @Size(max = 512)
    @Schema(description = "Validator del user", example = "validador123")
    private String validator;   
}