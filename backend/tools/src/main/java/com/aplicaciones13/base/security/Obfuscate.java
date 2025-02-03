package com.aplicaciones13.base.security;

/**
 * Clase para ofuscar cadenas de texto.
 * 
 * @author omargo33
 * @since 2022-09-20
 * 
 */
public class Obfuscate {
    private static final String OBFUSCED = "********";

    /**
     * Constructor de la clase.
     */
    private Obfuscate() {
        super();
    }

    /**
     * Metodo para ofuscar una cadena de texto o identificacion personal.
     * 
     * @param item
     * @return
     */
    public static String obfuscate(String item) {
        if (item == null || item.isEmpty()) {
            return "";
        }
        if (item.length() < 4) {
            return OBFUSCED;
        }
        return item.substring(0, 4) + OBFUSCED;
    }

    /**
     * Metodo para ofuscar PCI DSS en una cadena de texto.
     * 
     * @param item
     * @return
     */
    public static String obfuscateCreditCard(String item) {
        if (item == null || item.length() < 12) {
            return item;
        }
        return item.substring(0, 6) + OBFUSCED + item.substring(item.length() - 4);
    }

    /**
     * Metodo para ofuscar direccion de correo electronico.
     * 
     * @param item
     * @return
     */
    public static String obfuscateEmail(String item) {
        if (item == null || item.length() < 6) {
            return item;
        }
        String[] parts = item.split("@");
        if (parts.length != 2) {
            return item;
        }
        String partName = parts[0];
        String partDomain = parts[1];
        if (partName.length() < 3) {
            return item;
        }
        return partName.substring(0, 3) + OBFUSCED + partDomain;
    }

    /**
     * Metodo para ofuscar numero de telefono internacional.
     * 
     * @param item
     * @return
     */
    public static String obfuscateNumberPhone(String item) {
        if (item == null || item.length() < 8) {
            return item;
        }
        String[] parts = item.split("-");
        if (parts.length != 2) {
            return item;
        }
        String part1 = parts[0];
        String part2 = parts[1];
        if (part1.length() < 3) {
            return item;
        }
        return part1.substring(0, 3) + OBFUSCED + part2;
    }
}
