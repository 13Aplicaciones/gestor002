package com.aplicaciones13.gestor_ws.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import com.aplicaciones13.gestor_ws.model.common.UsuarioFechaPrograma;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

/**
 * Clase que representa la tabla token
 * 
 * @author omargo33
 * @since 2025-01-22
 */
@Entity
@Table(name = "token")
@Data
@EqualsAndHashCode(callSuper = false)
public class Token extends UsuarioFechaPrograma{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_token")
    private Long idToken;

    @Column(name = "id_usuario", nullable = false)
    private Long idUsuario;

    @Column(length = 8, nullable = false)
    private String tipo;

    @Column(name = "social_nick", length = 256, nullable = false)
    private String socialNick;

    @Column(length = 256)
    private String correo;

    @Column(length = 512, nullable = false)
    private String token;

    @Column(length = 512, nullable = false)
    private String validador;

    @Column(length = 8, nullable = false)
    private String estado;

    @PrePersist
    protected void onCreate() {
        super.onCreate();
        estado = "C";
    }
}