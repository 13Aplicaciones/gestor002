package com.aplicaciones13.gestor.payload.request;


import com.aplicaciones13.base.payload.common.AppRequest;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * DTO para la solicitud de creación o actualización de un permiso.
 * 
 * @author omargo33
 * @since 2025-07-29
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Schema(description = "DTO para la solicitud de creación o actualización de un permiso")
public class PermissionsRequest extends AppRequest {

    @NotNull
    @Schema(description = "Id del menú asociado", example = "1")
    private Long idMenu;

    @NotNull
    @Size(max = 128)
    @Schema(description = "Realm Keycloak", example = "portal-realm")
    private String realm;

    @NotNull
    @Size(max = 128)
    @Schema(description = "Client Id Keycloak", example = "portal-client")
    private String clientId;

    @Size(max = 128)
    @Schema(description = "Role Keycloak", example = "admin")
    private String role;

    @NotNull
    @Size(max = 64)
    @Schema(description = "Nombre del permiso (ej: CREAR, READ, UPDATE, DELETE)", example = "CREAR")
    private String name;

    @NotNull
    @Schema(description = "Valor del permiso (activo/inactivo)", example = "true")
    private Boolean value;
}