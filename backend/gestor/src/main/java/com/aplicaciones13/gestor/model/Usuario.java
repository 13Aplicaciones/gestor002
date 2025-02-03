package com.aplicaciones13.gestor.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

import com.aplicaciones13.gestor.model.common.UuidUsuarioFechaPrograma;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

/**
 * Clase que representa la tabla GS_002_01.usuario
 * 
 * @autor omargo33
 * @since 2025-01-12
 */
@Entity
@Table(name = "usuario")
@Data
@EqualsAndHashCode(callSuper = false)
public class Usuario extends UuidUsuarioFechaPrograma {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Long idUsuario;

    @Column(length = 128, nullable = false)
    private String nick;

    @Column(length = 128, nullable = false)
    private String nombre;

    @Column(length = 128, nullable = false)
    private String apellido;

    @Column(length = 512)
    private String validador;

    @Column(nullable = false, length = 8)
    private String estado;

    @Column(name="contador_ingreso")
    private Long contadorIngreso;

    @Column(name="contador_fecha")
    @Temporal(TemporalType.TIMESTAMP)
    private Date contadorFecha;

    @PrePersist
    protected void onCreate() {
        super.onCreate();
        estado = "C";
        contadorIngreso = 0L;
        contadorFecha = new Date();
    }
}