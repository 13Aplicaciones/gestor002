package com.aplicaciones13.gestor.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import com.aplicaciones13.base.model.common.UuidUserDateApp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Clase que representa la tabla information
 * 
 * @author omargo33
 * @since 2025-01-12
 */
@Entity
@Table(name = "information")
@Data
@EqualsAndHashCode(callSuper = false)
public class Information extends UuidUserDateApp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_information")
    private Long idInformation;

    @Column(length = 128, nullable = false)
    private String name;

    @Column(name="value_01", length = 256)
    private String value01;

    @Column(name="value_02", length = 256)
    private String value02;
}