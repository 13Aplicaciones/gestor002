package com.aplicaciones13.base.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

/**
 * Clase que representa la tabla lov
 * 
 * @author omargo33
 * @since 2025-06-14
 * 
 */
@Entity
@Data
public class Lov {

    @Id
    @Column(length = 64, nullable = false)
    private String index;

    @Column(length = 128, nullable = false)
    private String label;

    @Column(length = 128)
    private String labelAlternative;

    @Column(length = 512, nullable = false)
    private String description;

    @Column(name = "value")
    private int value;

    @Column(name = "double_value")
    private Double doubleValue;

    @Column(name = "status")
    private String status;

    @Column(name = "orden", length = 64)
    private String orden;
}
