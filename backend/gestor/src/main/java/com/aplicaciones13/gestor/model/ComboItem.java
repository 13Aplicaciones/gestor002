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

    @Column(name = "index_combo_item", length = 128, nullable = false)
    private String indexComboItem;

    @Column(name = "code_number", nullable = false)
    private Integer codeNumber = 0;

    @Column(name = "code_text", length = 8, nullable = false)
    private String codeText;

    @Column(length = 64, nullable = false)
    private String label;

    @Column(length = 256, nullable = false)
    private String description;

    @Column(length = 128)
    private String icon = "TransparencyGridIcon";

    @Column(length = 64, nullable = false)
    private String color = "none";

    @Column(nullable = false)
    private Integer orden = 0;

    @Column(length = 8, nullable = false)
    private String status;
}