package com.aplicaciones13.gestor.payload.procesos;

import com.aplicaciones13.gestor.payload.common.ProgramaRequest;
import com.aplicaciones13.gestor.payload.common.TipoEncripcion;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;


/**
 * Clase para la creación de una clave.
 * 
 * @author omargo33
 * @since 2025-01-10
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class CrearClaveRequest extends ProgramaRequest {
    
    @Schema(description = "UUID del registro para búsquedas", example = "d290f1ee-6c54-4b01-90e6-d701748f0851")
    @NotNull
    private String uuid;

    @Schema(description = "Tipo de token", example = "AES, RSA, HMAC, DES3")    
    private TipoEncripcion tipo =TipoEncripcion.AES;    
        
    @Schema(description = "Correo del usuario", example = "omargo33@gmail.com")
    @NotNull
    @Email
    private String correo;

}
