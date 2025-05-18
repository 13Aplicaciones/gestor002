package com.aplicaciones13.orchestrator.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;

import java.util.List;

import org.hibernate.annotations.Immutable;

import com.aplicaciones13.base.model.common.UuidUserDateApp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

/**
 * Clase que representa la entidad Module.
 * 
 * @author omargo33
 * @since 2025-01-24
 */
@Entity
@Immutable
@Table(name = "module")
@Getter
@EqualsAndHashCode(callSuper = false)
public class Module extends UuidUserDateApp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_module")
    private Long idModule;

    @Column(name = "index_module",length = 32, nullable = false, unique = true)
    private String indexModule;

    @Column(length = 128, nullable = false)
    private String name;

    @Column(length = 128, nullable = false)
    private String context;

    @Column(length = 8)
    private String status;

    @OneToMany(mappedBy = "module")
    private List<Parameter> parameters;

    @OneToMany(mappedBy = "module")
    private List<UserDefinedCode> userDefinedCodes;

    @PrePersist
    protected void onCreate() {
        super.onCreate();
        status = "C";
    }
}