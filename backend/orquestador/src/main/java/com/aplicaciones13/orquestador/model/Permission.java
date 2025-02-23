package com.aplicaciones13.orquestador.model;


import com.aplicaciones13.base.model.common.UserDateApp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Clase que representa la entidad Permiso.
 * 
 * Mapea los campos a la tabla correspondiente en la base de datos.
 * 
 * @author omargo33
 * @since 2025-01-26
 *
 */
@Entity
@Table(name = "permission")
@Data
@EqualsAndHashCode(callSuper = false)
public class Permission extends UserDateApp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_permission")
    private Long idPermission;

    @Column(name = "id_menu")
    private long idMenu;

    @Column(name = "id_rol")
    private Long idRol;

    @Column(nullable = false, length = 8)
    private String create;

    @Column(nullable = false, length = 8)
    private String update;

    @Column(nullable = false, length = 8)
    private String delete;

    @Column( nullable = false, length = 8)
    private String audit;

}