package com.aplicaciones13.gestor.payload.request;

import com.aplicaciones13.base.payload.common.StatusAppRequest;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * DTO para la manejar los status de un menu.
 * 
 * @autor omargo33
 * @since 2025-08-03
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Schema(description = "DTO para la manejar los status de un menu")
public class MenuPatchStatusRequest extends StatusAppRequest {
    
}
