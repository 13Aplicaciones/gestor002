package com.aplicaciones13.orquestador.model;

import com.aplicaciones13.base.model.common.UserDateApp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Clase que representa la entidad UserDefinedCode.
 * Mapea los campos a la tabla correspondiente en la base de datos.
 * 
 * @author omargo33
 * @since 2025-01-26
 *
 */
@Entity
@Table(name = "user_defined_code")
@Data
@EqualsAndHashCode(callSuper = false)
public class UserDefinedCode extends UserDateApp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_user_defined_code")
    private Long idUserDefinedCode;

    @Column(name = "id_module", nullable = false)
    private Long idModule;

    @ManyToOne
    private Module module;

    @Column(nullable = false, length = 8)
    private String group;
 
    @Column(name = "code_text", nullable = false, length = 8)
    private String codeText;

    @Column(name = "code_number", nullable = false)
    private Long codeNumber;

    @Column(nullable = false, length = 64)
    private String name;

    @Column(nullable = false, length = 512)
    private String description;

    @Column(nullable = false)
    private Long order;

    @Column(nullable = false, length = 8)
    private String status;

    @PrePersist
    public void onUpdate() {
        super.onUpdate();
        this.status = "C";
    }
}