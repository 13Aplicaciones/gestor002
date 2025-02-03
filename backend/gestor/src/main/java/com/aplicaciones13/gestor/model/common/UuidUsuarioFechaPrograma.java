package com.aplicaciones13.gestor.model.common;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

/**
 * Clase abstracta que contiene los campos de auditoría de UUID, usuario, fecha y programa.
 * 
 * @author omargo33
 * @since 2025-01-24
 */
@MappedSuperclass
@Data
public abstract class UuidUsuarioFechaPrograma {

    @Column(name = "uuid", length = 36, updatable = false)
    private UUID uuid;

    @Column(length = 128, nullable = false)
    private String usuario;

    @Column(name = "usuario_fecha", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date usuarioFecha;

    @Column(name = "usuario_programa", nullable = false, length = 256)
    private String usuarioPrograma;

    /**
     * Método que retorna el UUID.
     * 
     * @param uuid
     */
    public void setUuid(String uuid) {
        this.uuid = UUID.fromString(uuid);
    }

    /**
     * Método que se ejecuta antes de insertar un registro en la base de datos.
     */
    @PrePersist
    protected void onCreate() {
        if (uuid == null) {
            uuid = UUID.randomUUID();
        }
        if (usuario == null) {
            usuario = "<anonimo>";
        }

        usuarioFecha = Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());
        usuarioPrograma = ((usuarioPrograma == null) ? "" : usuarioPrograma + "-") + getClass().getSimpleName();
    }

    /**
     * Método que se ejecuta antes de actualizar un registro en la base de datos.
     */
    @PreUpdate
    protected void onUpdate() {

        if (usuario == null) {
            usuario = "<anonimo>";
        }
        usuarioFecha = Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());
        int ultimo = usuarioPrograma.lastIndexOf("-");
        if (ultimo > 0) {
            usuarioPrograma = ((usuarioPrograma == null) ? "" : usuarioPrograma.substring(0, ultimo) + "-")
                    + getClass().getSimpleName();
        } else {
            usuarioPrograma = ((usuarioPrograma == null) ? "" : usuarioPrograma + "-") + getClass().getSimpleName();
        }
    }
}
