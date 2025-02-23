package com.aplicaciones13.base.model.common;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

/**
 * Clase abstracta que contiene los campos de auditoría de fecha y programa.
 * 
 * @author omargo33
 * @since 2025-01-24
 */
@MappedSuperclass
@Data
public abstract class DateApp {

    @Column(name = "user_date", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date userDate;

    @Column(name = "user_app", nullable = false, length = 256)
    private String userApp;

    /**
     * Método que se ejecuta antes de insertar un registro en la base de datos.
     */
    @PrePersist
    protected void onCreate() {
        userDate = Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());
        userApp = ((userApp == null) ? "" : userApp + "-") + getClass().getSimpleName();
    }

    /**
     * Método que se ejecuta antes de actualizar un registro en la base de datos.
     */
    @PreUpdate
    protected void onUpdate() {
        userDate = Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());

        int last = userApp.lastIndexOf("-");
        if (last > 0) {
            userApp = ((userApp == null) ? "" : userApp.substring(0, last) + "-")
                    + getClass().getSimpleName();
        } else {
            userApp = ((userApp == null) ? "" : userApp + "-") + getClass().getSimpleName();
        }
    }
}
