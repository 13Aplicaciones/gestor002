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
 * Clase que representa la entidad Modulo.
 * 
 * @author omargo33
 * @since 2025-01-24
 */
@Entity
@Table(name = "modulo")
@Data
@EqualsAndHashCode(callSuper = false)
public class Modulo extends UuidUsuarioFechaPrograma {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_modulo")
    private Long idModulo;

    @Column(length = 32, nullable = false, unique = true)
    private String indice;

    @Column(length = 128, nullable = false)
    private String nombre;

    @Column(length = 128, nullable = false)
    private String contexto;

    @Column(length = 8)
    private String estado;

    @PrePersist
    protected void onCreate() {
        super.onCreate();
        estado = "C";
    }
}