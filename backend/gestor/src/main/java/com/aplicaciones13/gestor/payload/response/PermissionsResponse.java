package com.aplicaciones13.gestor.payload.response;

import com.aplicaciones13.base.payload.common.UserDateAppResponse;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * DTO para la respuesta de la entidad Permissions.
 * 
 * @author omargo33
 * @since 2025-07-29
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Schema(description = "DTO para la respuesta de la entidad Permissions")
public class PermissionsResponse extends UserDateAppResponse {

    @Schema(description = "UUID del registro para busquedas", example = "550e8400-e29b-41d4-a716-446655440000")
    private String uuid;

    @Schema(description = "Id del menú asociado", example = "1")
    private Long idMenu;

    @Schema(description = "Realm Keycloak", example = "portal-realm")
    private String realm;

    @Schema(description = "Client Id Keycloak", example = "portal-client")
    private String clientId;

    @Schema(description = "Role Keycloak", example = "admin")
    private String role;

    @Schema(description = "Nombre del permiso", example = "CREAR")
    private String name;

    @Schema(description = "Valor del permiso (activo/inactivo)", example = "true")
    private Boolean value;
}