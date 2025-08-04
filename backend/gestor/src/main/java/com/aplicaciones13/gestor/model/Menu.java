package com.aplicaciones13.gestor.model;

import com.aplicaciones13.base.model.common.UuidUserDateApp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Clase que representa la entidad Menu.
 * 
 * Mapea los campos a la tabla correspondiente en la base de datos.
 * 
 * @author omargo33
 * @since 2025-01-26
 *
 */
@Entity
@Table(name = "menu")
@Data
@EqualsAndHashCode(callSuper = false)
public class Menu extends UuidUserDateApp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_menu")
    private Long idMenu;

    @Column(name = "id_module")
    private Long idModule;

    @Column(nullable = false, length = 8)
    private String type; // Type de menú (ej. principal, secundario)

    @Column(name="index_menu", length = 32, nullable = false, unique = true)
    private String indexMenu; // Índice único del menú

    @Column(length = 128, nullable = false)
    private String name; // Name del menú

    @Column(name = "task_flow", length = 256, nullable = false)
    private String taskFlow; // Ruta del flujo asociado al menú

    @Column(length = 8, nullable = false)
    private String status; // Status del menú (ej. A=activo, I=inactivo)

    @Column(name = "orden")
    private Long order; 

    @ManyToOne
    @JoinColumn(name = "id_module", insertable = false, updatable = false)
    private Module module; // Relación con el módulo al que pertenece el menú

    @PrePersist
    public void prePersist() {
        super.onUpdate();
        status = "C";
    }
}