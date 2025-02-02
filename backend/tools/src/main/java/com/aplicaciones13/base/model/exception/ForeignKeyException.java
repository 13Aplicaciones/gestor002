package com.aplicaciones13.base.model.exception;

/**
 * Clase para crear un error personalizado para existencia de llaves foraneas.
 * 
 * @author omargo33
 * @since 2020-10-09
 * 
 */
public class ForeignKeyException extends RuntimeException {
    private static final long serialVersionUID = 1L;
    
    /**
     * Constructor de la clase.
     *    
     * @param message
     */
    public ForeignKeyException(String message) {
        super(message);                
    }
}
