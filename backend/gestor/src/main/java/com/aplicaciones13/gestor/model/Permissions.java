package com.aplicaciones13.gestor.model;

import com.aplicaciones13.base.model.common.UuidUserDateApp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Clase que representa la entidad Permissions.
 * 
 * Mapea los campos a la tabla correspondiente en la base de datos.
 * 
 * @author omargo33
 * @since 2025-07-29
 */
@Entity
@Table(name = "permissions")
@Data
@EqualsAndHashCode(callSuper = false)
public class Permissions extends UuidUserDateApp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_permissions")
    private Long idPermissions;

    @Column(name = "id_menu", nullable = false)
    private Long idMenu; // id menu

    @Column(length = 128, nullable = false)
    private String realm; // Realm Keycloak

    @Column(name = "client_id", length = 128, nullable = false)
    private String clientId; // Client Id Keycloak

    @Column(length = 128)
    private String role; // role Keycloak

    @Column(length = 64, nullable = false)
    private String name; // Nombre por ejemplo CREAR, READ, UPDATE, DELETE, etc

    @Column(nullable = false)
    private Boolean value; // Activo o inactivo
}