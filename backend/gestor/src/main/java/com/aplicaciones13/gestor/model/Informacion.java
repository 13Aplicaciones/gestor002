package com.aplicaciones13.gestor.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import com.aplicaciones13.gestor.model.common.UuidUsuarioFechaPrograma;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Clase que representa la tabla informacion
 * 
 * @author omargo33
 * @since 2025-01-12
 */
@Entity
@Table(name = "informacion")
@Data
@EqualsAndHashCode(callSuper = false)
public class Informacion extends UuidUsuarioFechaPrograma {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_informacion")
    private Long idInformacion;

    @Column(length = 128, nullable = false)
    private String nombre;

    @Column(name="valor_01", length = 256)
    private String valor01;

    @Column(name="valor_02", length = 256)
    private String valor02;
}