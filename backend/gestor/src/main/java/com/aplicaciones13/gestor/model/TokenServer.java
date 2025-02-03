package com.aplicaciones13.gestor.model;

import com.aplicaciones13.gestor.model.common.DateApp;

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
public class TokenServer extends DateApp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_token_server")
    private Long idTokenServer; // Identificador único del token servidor

    @Column(name = "id_token", nullable = false)
    private long idToken; // Identificador del token

    @Column( length = 8)
    private String type; // Type de token

    @Column(name = "token", nullable = false, length = 512)
    private String token; // Valor del token

}