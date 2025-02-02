package com.aplicaciones13.gestor_ws.model;

import com.aplicaciones13.gestor_ws.model.common.UsuarioFechaPrograma;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
public class Menu extends UsuarioFechaPrograma {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_menu")
    private Long idMenu;

    @Column(name = "id_modulo")
    private Long idModulo;

    @Column(nullable = false, length = 8)
    private String tipo; // Tipo de menú (ej. principal, secundario)

    @Column(length = 32, nullable = false, unique = true)
    private String indice; // Índice único del menú

    @Column(length = 128, nullable = false)
    private String nombre; // Nombre del menú

    @Column(name = "ruta_flujo", length = 256, nullable = false)
    private String rutaFlujo; // Ruta del flujo asociado al menú

    @Column(length = 8, nullable = false)
    private String estado; // Estado del menú (ej. A=activo, I=inactivo)

    @Column
    private Long orden; // Orden de visualización del menú

    @PrePersist
    public void prePersist() {
        super.onUpdate();
        estado = "C";
    }
}