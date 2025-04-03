package com.aplicaciones13.orquestador.model;

import lombok.Data;
import java.io.Serializable;

import java.util.Date;
/**
 * Modelo de datos para el pasaporte
 * 
 * @author omargo33
 * @since 2025-04-01
 * 
 */
@Data
public class Passport {
    
    private String passportNumber;
    private String fullName;
    private String nationality;
    private String issuingAuthority;
    private String gender;
}
