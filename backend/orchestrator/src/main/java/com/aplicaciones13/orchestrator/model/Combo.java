package com.aplicaciones13.orchestrator.model;

import java.util.List;

import org.hibernate.annotations.Immutable;

import com.aplicaciones13.base.model.common.UuidUserDateApp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@Entity
@Immutable
@Table(name = "combo")
@Getter
@EqualsAndHashCode(callSuper = false)
public class Combo extends UuidUserDateApp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_combo")
    private Integer idCombo;

    @Column(name = "id_module")
    private Integer idModule;

    @ManyToOne
    @JoinColumn(name = "id_module", referencedColumnName = "id_module", insertable = false, updatable = false)
    private Module module;

    @Column(name = "index_combo", length = 32, nullable = false, unique = false)
    private String indexCombo;

    @Column(name = "name", length = 128, nullable = false)
    private String name;

    @Column(name = "status", length = 8, nullable = false)
    private String status;

    @OneToMany(mappedBy = "combo", fetch = FetchType.LAZY)
    private List<ComboItem> comboItems;
}