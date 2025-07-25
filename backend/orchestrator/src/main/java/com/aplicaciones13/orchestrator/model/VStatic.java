package com.aplicaciones13.orchestrator.model;

import org.hibernate.annotations.Immutable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;

@Entity
@Immutable
@Table(name = "v_static")
@Getter
public class VStatic {

    //GS-MD-001
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_static")
    private Long idStatic;

    @Column(length = 32)
    private String value;
    
    @Column(length = 128)
    private String description;

    @Column(length = 8)
    private String status;
}
