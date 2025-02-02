package com.aplicaciones13.gestor_ws.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import com.aplicaciones13.gestor_ws.model.common.UuidUsuarioFechaPrograma;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

/**
 * 
 * Clase que representa la tabla rol en la base de datos
 *
 * @author omargo33
 * @since 2025-01-26
 *
 */
@Entity
@Table(name = "rol")
@Data
@EqualsAndHashCode(callSuper = false)
public class Rol extends UuidUsuarioFechaPrograma {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_rol")
    private Long idRol;

    @Column(name = "id_modulo")
    private Long idModulo;

    @Column(length = 128, nullable = false)
    private String nombre;

    @Column(length = 8, nullable = false)
    private String tipo;

    @Column(length = 8)
    private String estado;

    @PrePersist
    public void prePersist() {
        super.onCreate();
        estado = "C";
    }

}
