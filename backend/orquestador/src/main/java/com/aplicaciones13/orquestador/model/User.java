package com.aplicaciones13.orquestador.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

import com.aplicaciones13.base.model.common.UuidUserDateApp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

/**
 * Clase que representa la tabla GS_002_01.User
 * 
 * @autor omargo33
 * @since 2025-01-12
 */
@Entity
@Table(name = "user")
@Data
@EqualsAndHashCode(callSuper = false)
public class User extends UuidUserDateApp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_user")
    private Long idUser;
    
    @Column(length = 128, nullable = false)
    private String nick;

    @Column(length = 128, nullable = false)
    private String name;

    @Column(length = 128, nullable = false)
    private String lastName;

    @Column(length = 512)
    private String validator;

    @Column(nullable = false, length = 8)
    private String status;

    @Column(name="income_counter")
    private Long incomeCounter;

    @Column(name="income_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date incomeDate;

    @PrePersist
    protected void onCreate() {
        super.onCreate();
        status = "C";
        incomeCounter = 0L;
        incomeDate = new Date();
    }
}