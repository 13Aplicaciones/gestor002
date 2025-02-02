package com.aplicaciones13.gestor_ws.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import com.aplicaciones13.gestor_ws.model.common.UsuarioFechaPrograma;

/**
 * 
 * Clase que representa la tabla rol_usuario en la base de datos
 * 
 * @author omargo33
 * @since 2025-01-26
 *
 */
@Entity
@Table(name = "rol_usuario")
@Data
@EqualsAndHashCode(callSuper = false)
public class RolUsuario extends UsuarioFechaPrograma {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_rol_usuario")
    private Long idRolUsuario;

    @Column(name = "id_rol", nullable = false)
    private Long idRol;

    @Column(name = "id_usuario", nullable = false)
    private Long idUsuario;

}