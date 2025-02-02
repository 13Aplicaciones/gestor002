package com.aplicaciones13.base.security;

/**
 * Clase para generar claves de forma randomica
 * 
 * @author omargo33
 * @since 2020-10-30
 * 
 */
public class GeneradorClaves {
    public static final String KEY_ALFANUMERICOS = "23456789ABCDEFGHJKMNPQRTUVWXYZabcdefghijkmnpqrtuvwxyz";
    public static final String KEY_NUMEROS = "0123456789";
    public static final String KEY_MAYUSCULAS = "ABCDEFGHJKMNPQRTUVWXYZ";
    public static final String KEY_MINUSCULAS = "abcdefghijkmnpqrtuvwxyz";

    /**
     * Metodo para generar una clave desde un alfabeto personalizado.
     * 
     * @param key
     * @param length
     * @return
     */
    public static String getPassword(String key, int length) {
        StringBuilder pswd = new StringBuilder();
        for (int i = 0; i < length; i++) {
            pswd.append(key.charAt((int) (Math.random() * key.length())));
        }
        return pswd.toString();
    }

    /**
     * Metodo para enmascarar textos.
     * 
     * @param texto
     * @return
     */
    public String enmascarar(String texto) {
        try {
            int caracteresVisibles = 2;
            String pattern = "(\\d)";
            String visible = texto.substring(texto.length() - caracteresVisibles, texto.length());
            return texto.substring(1, texto.length() - caracteresVisibles).replaceAll(pattern, "X") + visible;
        } catch (Exception e) {
            return texto;
        }
    }
}
