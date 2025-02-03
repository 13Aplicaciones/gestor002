package com.aplicaciones13.gestor.model;

import com.aplicaciones13.gestor.model.common.UsuarioFechaPrograma;

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
@Table(name = "permiso")
@Data
@EqualsAndHashCode(callSuper = false)
public class Permiso extends UsuarioFechaPrograma {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_permiso")
    private Long idPermiso;

    @Column(name = "id_menu")
    private long idMenu;

    @Column(name = "id_rol")
    private Long idRol;

    @Column(nullable = false, length = 8)
    private String crear;

    @Column(nullable = false, length = 8)
    private String actualizar;

    @Column(nullable = false, length = 8)
    private String borrar;

    @Column(name = "ver_auditoria", nullable = false, length = 8)
    private String verAuditoria;

}