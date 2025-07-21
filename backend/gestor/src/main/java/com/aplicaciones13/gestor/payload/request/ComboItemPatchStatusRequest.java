package com.aplicaciones13.gestor.payload.request;

import com.aplicaciones13.base.payload.common.StatusAppRequest;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * DTO para la solicitud de creación o actualización de un user.
 * 
 * @author omargo33
 * @since 2025-04-03
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Schema(description = "DTO para la manejar los status de un combo item")
public class ComboItemPatchStatusRequest extends StatusAppRequest {
 
}