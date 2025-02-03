package com.aplicaciones13.gestor.payload.common;

import com.aplicaciones13.base.anotacion.SetUser;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * Clase que representa el request para cambiar el status de un user
 * 
 * @author omargo33
 * @since 2025-01-15
 */
@Data
public class AppRequest {
    
    @NotNull
    @Size(max = 256)
    @Schema(description = "App usado para el cambio", example = "AppEjemplo")
    private String userApp;

    /**
     * user oculto para JWT es escondido no se ve en swagger
     */
    @SetUser
    @Schema(description = "user oculto para JWT", example = "ovelez", hidden = true)
    private String userHidden;

}
