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
 * Clase que representa la entidad CodigoDefinidoUsuario.
 * Mapea los campos a la tabla correspondiente en la base de datos.
 * 
 * @author omargo33
 * @since 2025-01-26
 *
 */
@Entity
@Table(name = "codigo_definido_usuario")
@Data
@EqualsAndHashCode(callSuper = false)
public class CodigoDefinidoUsuario extends UsuarioFechaPrograma {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_codigo_definido_usuario")
    private Long idCodigoDefinidoUsuario;

    @Column(name = "id_modulo", nullable = false)
    private Long idModulo;

    @Column(nullable = false, length = 8)
    private String grupo;
 
    @Column(name = "codigo_texto", nullable = false, length = 8)
    private String codigoTexto;

    @Column(name = "codigo_numero", nullable = false)
    private Long codigoNumero;

    @Column(nullable = false, length = 64)
    private String nombre;

    @Column(nullable = false, length = 512)
    private String descripcion;

    @Column(nullable = false)
    private Long orden;

    @Column(nullable = false, length = 8)
    private String estado;

    @PrePersist
    public void onUpdate() {
        super.onUpdate();
        this.estado = "C";
    }
}