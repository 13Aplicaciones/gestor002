package com.aplicaciones13.base.security;

import java.util.StringJoiner;

/**
 * Clase para crear el hash de los parametros.
 * 
 * @author omargo33
 * @since 2020-12-09
 * 
 */
public class Hash {

    /**
     * Constructor de la clase.
     */
    protected Hash() {
        super();
    }

    /**
     * Metodo para crear el hash de los parametros.
     * 
     * @param params
     * @return
     */
    public static String crearHash(String... params) {
        StringJoiner sj = new StringJoiner(" ");
        for (String param : params) {
            sj.add(String.valueOf(param.hashCode()));
        }
        return sj.toString();
    }

    /**
     * Metodo para validar el hash de los parametros.
     * 
     * @param params
     * @return
     */
    public static boolean isValid(String hash, String... params) {
        String hashGenerado = crearHash(params);
        return (hash.compareTo(hashGenerado) == 0);
    }
}
