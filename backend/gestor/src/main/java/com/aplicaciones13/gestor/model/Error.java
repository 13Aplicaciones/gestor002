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
 * Clase que representa la tabla Error
 * 
 * @author omargo33
 * @since 2025-01-12
 */
@Entity
@Table(name = "error")
@Data
@EqualsAndHashCode(callSuper = false)
public class Error extends UuidUserDateApp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_error")
    private Long idError;
    
    @Column(name = "index_error",length = 128, nullable = false)
    private String indexError;

    @Column(length = 1024, nullable = false)
    private String message;

    @Column(length = 4098, nullable = false)
    private String description;
}