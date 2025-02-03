package com.aplicaciones13.base.security;

/**
 * Clase para generar claves de forma randomica
 * 
 * @author omargo33
 * @since 2020-10-30
 * 
 */
public class KeyGenerator {
    public static final String KEY_ALFANUMERICS = "23456789ABCDEFGHJKMNPQRTUVWXYZabcdefghijkmnpqrtuvwxyz";
    public static final String KEY_NUMBERS = "0123456789";
    public static final String KEY_CAPITAL = "ABCDEFGHJKMNPQRTUVWXYZ";
    public static final String KEY_LOWERCASE = "abcdefghijkmnpqrtuvwxyz";

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
     * Metodo para enmascarar texts.
     * 
     * @param text
     * @return
     */
    public String mask(String text) {
        try {
            int visibleCharacters = 2;
            String pattern = "(\\d)";
            String visible = text.substring(text.length() - visibleCharacters, text.length());
            return text.substring(1, text.length() - visibleCharacters).replaceAll(pattern, "X") + visible;
        } catch (Exception e) {
            return text;
        }
    }
}
