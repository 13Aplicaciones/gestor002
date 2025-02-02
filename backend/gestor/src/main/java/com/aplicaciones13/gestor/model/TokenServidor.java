package com.aplicaciones13.gestor_ws.model;

import com.aplicaciones13.gestor_ws.model.common.FechaPrograma;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Clase que representa la tabla token_servidor
 * 
 * @author omargo33
 * @since 2025-01-26
 *
 */
@Entity
@Table(name = "token_servidor")
@Data
@EqualsAndHashCode(callSuper = false)
public class TokenServidor extends FechaPrograma {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_token_servidor")
    private Long idTokenServidor; // Identificador único del token servidor

    @Column(name = "id_token", nullable = false)
    private long idToken; // Identificador del token

    @Column(name = "tipo", length = 8)
    private String tipo; // Tipo de token

    @Column(name = "token", nullable = false, length = 512)
    private String token; // Valor del token

}