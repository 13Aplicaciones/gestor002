package com.aplicaciones13.orquestador.model;

import java.io.Serializable;

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
@Table(name = "menu")
@Getter
public class Menu implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_menu")
    private Long idMenu;

    @Column(name="index_menu", length = 32, nullable = false, unique = true)
    private String indexMenu;
    
    @Column(name="statistics_query", length = 128, nullable = false)
    private String statisticsQuery;
}
