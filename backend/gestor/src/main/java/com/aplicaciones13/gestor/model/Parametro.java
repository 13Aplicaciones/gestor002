package com.aplicaciones13.gestor_ws.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import com.aplicaciones13.gestor_ws.model.common.UuidUsuarioFechaPrograma;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Clase que representa la entidad Parametro.
 * 
 * Mapea los campos a la tabla correspondiente en la base de datos.
 * 
 * @author omargo33
 * @since 2025-01-26
 * 
 */
@Entity
@Table(name = "parametro")
@Data
@EqualsAndHashCode(callSuper = false)
public class Parametro extends UuidUsuarioFechaPrograma {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_parametro")
    private Long idParametro;

    @Column(name = "id_modulo")
    private Long idModulo;

    @Column(length = 32, nullable = false, unique = true)
    private String indice;

    @Column(length = 8)
    private String clave;

    @Column(length = 128, nullable = false)
    private String nombre;

    @Column(length = 512)
    private String descripcion;

    @Column(name = "valor_texto_01", length = 256)
    private String valorTexto01;

    @Column(name = "valor_texto_02", length = 256)
    private String valorTexto02;

    @Column(name = "valor_numero_01")
    private Double valorNumero01;

    @Column(name = "valor_numero_02")
    private Double valorNumero02;

    @Column(name = "default_texto_01", length = 256)
    private String defaultTexto01;

    @Column(name = "default_texto_02", length = 256)
    private String defaultTexto02;

    @Column(name = "default_numero_01")
    private Double defaultNumero01;

    @Column(name = "default_numero_02")
    private Double defaultNumero02;
}