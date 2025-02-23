package com.aplicaciones13.orquestador.model;

import com.aplicaciones13.base.model.common.UserDateApp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
public class Menu extends UserDateApp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_menu")
    private Long idMenu;

    @Column(name = "id_module")
    private Long idModule;

    @ManyToOne
    private Module module;

    @Column(nullable = false, length = 8)
    private String type; // Type de menú (ej. principal, secundario)

    @Column(length = 32, nullable = false, unique = true)
    private String index; // Índice único del menú

    @Column(length = 128, nullable = false)
    private String name; // Name del menú

    @Column(name = "task_flow", length = 256, nullable = false)
    private String taskFlow; // Ruta del flujo asociado al menú

    @Column(length = 8, nullable = false)
    private String status; // Status del menú (ej. A=activo, I=inactivo)

    @Column
    private Long order; // Order de visualización del menú

    @PrePersist
    public void prePersist() {
        super.onUpdate();
        status = "C";
    }
}