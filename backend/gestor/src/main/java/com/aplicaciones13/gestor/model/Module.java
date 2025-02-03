package com.aplicaciones13.gestor.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import com.aplicaciones13.gestor.model.common.UuidUserDateApp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

/**
 * Clase que representa la entidad Module.
 * 
 * @author omargo33
 * @since 2025-01-24
 */
@Entity
@Table(name = "module")
@Data
@EqualsAndHashCode(callSuper = false)
public class Module extends UuidUserDateApp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_module")
    private Long idModule;

    @Column(length = 32, nullable = false, unique = true)
    private String index;

    @Column(length = 128, nullable = false)
    private String name;

    @Column(length = 128, nullable = false)
    private String context;

    @Column(length = 8)
    private String status;

    @PrePersist
    protected void onCreate() {
        super.onCreate();
        status = "C";
    }
}