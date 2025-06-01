package com.aplicaciones13.gestor.model;

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
 * Clase que representa la tabla combo_item
 * 
 * @author omargo33
 * @since 2025-06-01
 */
@Entity
@Table(name = "combo_item")
@Data
@EqualsAndHashCode(callSuper = false)
public class ComboItem extends UuidUserDateApp {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_combo_item")
    private Long idComboItem;

    @ManyToOne
    @JoinColumn(name = "id_combo")
    private Combo combo;

    @Column(length = 128, nullable = false)
    private String name;

    @Column(length = 8, nullable = false)
    private String status;
}