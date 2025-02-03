package com.aplicaciones13.gestor.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import com.aplicaciones13.gestor.model.common.UserDateApp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * 
 * Clase que representa la tabla rol_user en la base de datos
 * 
 * @author omargo33
 * @since 2025-01-26
 *
 */
@Entity
@Table(name = "rol_user")
@Data
@EqualsAndHashCode(callSuper = false)
public class RolUser extends UserDateApp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_rol_user")
    private Long idRolUser;

    @Column(name = "id_rol", nullable = false)
    private Long idRol;

    @Column(name = "id_user", nullable = false)
    private Long idUser;

}