package com.aplicaciones13.gestor.model;

import com.aplicaciones13.base.model.common.UuidUserDateApp;

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
 * Clase que representa la tabla token
 * 
 * @author omargo33
 * @since 2025-01-22
 */
@Entity
@Table(name = "token")
@Data
@EqualsAndHashCode(callSuper = false)
public class Token extends UuidUserDateApp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_token")
    private Long idToken;

    @Column(name = "id_user", nullable = false)
    private Long idUser;

    @Column(length = 8, nullable = false)
    private String type;

    @Column(name = "social_nick", length = 256, nullable = false)
    private String socialNick;

    @Column(length = 256)
    private String email;

    @Column(name = "token", length = 512, nullable = false)
    private String credential;

    @Column(length = 512, nullable = false)
    private String validator;

    @Column(length = 8, nullable = false)
    private String status;

    @Override
    @PrePersist
    protected void onCreate() {
        super.onCreate();
        status = "C";
    }
}