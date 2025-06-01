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
 * Clase que representa la tabla combo.
 * 
 * Esta clase contiene los atributos que corresponden a la entidad Combo,
 * incluyendo id_combo, id_module, index_combo, name, status, uuid, user,
 * user_date y user_app.
 * 
 * @autor omargo33
 * @since 2025-01-12
 */
@Entity
@Table(name = "combo")
@Data
@EqualsAndHashCode(callSuper = false)
public class Combo extends UuidUserDateApp {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_combo")
    private Long idCombo;

    @Column(name = "id_module", nullable = false)
    private Long idModule;

    @Column(name = "index_combo", nullable = false)
    private Integer indexCombo;

    @Column(length = 128, nullable = false)
    private String name;

    @Column(nullable = false)
    private String status;
}