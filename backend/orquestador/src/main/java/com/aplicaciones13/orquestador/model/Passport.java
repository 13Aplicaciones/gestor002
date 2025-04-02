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
public class Passport implements Serializable {
    private static final long serialVersionUID = 1L;

    private String passportNumber;
    private String fullName;
    private String nationality;
    private Date dateOfBirth;
    private Date issueDate;
    private Date expiryDate;
    private String issuingAuthority;
    private String gender;

}
