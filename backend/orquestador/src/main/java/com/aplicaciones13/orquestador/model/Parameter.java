package com.aplicaciones13.orquestador.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import com.aplicaciones13.base.model.common.UuidUserDateApp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

/**
 * Clase que representa la entidad Parameter.
 * 
 * Mapea los campos a la tabla correspondiente en la base de datos.
 * 
 * @author omargo33
 * @since 2025-01-26
 * 
 */
@Entity
@Table(name = "parameter")
@Data
@EqualsAndHashCode(callSuper = false)
public class Parameter extends UuidUserDateApp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_parameter")
    private Long idParameter;

    @Column(name = "id_module")
    private Long idModule;

    @ManyToOne
    @JoinColumn(name = "id_module", referencedColumnName = "id_module", insertable = false, updatable = false)
    private Module module;

    @Column(length = 32, nullable = false, unique = true)
    private String index;

    @Column(name = "encrypted", length = 8)
    private String encrypt;

    @Column(length = 128, nullable = false)
    private String name;

    @Column(length = 512)
    private String description;

    @Column(name = "value_text_01", length = 256)
    private String valueText01;

    @Column(name = "value_text_02", length = 256)
    private String valueText02;

    @Column(name = "value_number_01")
    private Double valueNumber01;

    @Column(name = "value_number_02")
    private Double valueNumber02;

    @Column(name = "default_text_01", length = 256)
    private String defaultText01;

    @Column(name = "default_text_02", length = 256)
    private String defaultText02;

    @Column(name = "default_number_01")
    private Double defaultNumber01;

    @Column(name = "default_number_02")
    private Double defaultNumber02;
}