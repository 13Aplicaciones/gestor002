package com.aplicaciones13.gestor.payload.common;

import com.aplicaciones13.gestor.anotacion.SetUsuario;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * Clase que representa el request para cambiar el estado de un usuario
 * 
 * @author omargo33
 * @since 2025-01-15
 */
@Data
public class ProgramaRequest {
    
    @NotNull
    @Size(max = 256)
    @Schema(description = "Programa usado para el cambio", example = "ProgramaEjemplo")
    private String usuarioPrograma;

    /**
     * Usuario oculto para JWT es escondido no se ve en swagger
     */
    @SetUsuario
    @Schema(description = "Usuario oculto para JWT", example = "ovelez", hidden = true)
    private String usuarioHidden;

}
