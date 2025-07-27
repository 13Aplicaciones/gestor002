package com.aplicaciones13.orchestrator.model;

import org.hibernate.annotations.Immutable;

import com.aplicaciones13.base.model.common.UuidUserDateApp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@Entity
@Immutable
@Table(name = "combo_item")
@Getter
@EqualsAndHashCode(callSuper = false)
public class ComboItem extends UuidUserDateApp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_combo_item")
    private Long idComboItem;

    @Column(name = "id_combo")
    private Integer idCombo;

    @ManyToOne
    @JoinColumn(name = "id_combo", referencedColumnName = "id_combo", insertable = false, updatable = false)
    private Combo combo;

    @Column(name = "index_combo_item", length = 128, nullable = false)
    private String indexComboItem;

    @Column(name = "code_number", nullable = false)
    private Integer codeNumber;

    @Column(name = "code_text", length = 8, nullable = false)
    private String codeText;

    @Column(name = "label", length = 64, nullable = false)
    private String label;

    @Column(name = "description", length = 256, nullable = false)
    private String description;

    @Column(name = "icon", length = 128)
    private String icon = "TransparencyGridIcon";

    @Column(name = "color", length = 64, nullable = false)
    private String color = "none";

    @Column(name = "orden", nullable = false)
    private Integer orden;

    @Column(name = "status", length = 8, nullable = false)
    private String status;

}