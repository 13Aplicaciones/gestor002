package com.aplicaciones13.base.security;

/**
 * Clase para ofuscar cadenas de texto.
 * 
 * @author omargo33
 * @since 2022-09-20
 * 
 */
public class Ofuscar {
    private static final String OFUSCADO = "********";

    /**
     * Constructor de la clase.
     */
    private Ofuscar() {
        super();
    }

    /**
     * Metodo para ofuscar una cadena de texto o identificacion personal.
     * 
     * @param item
     * @return
     */
    public static String ofuscar(String item) {
        if (item == null || item.isEmpty()) {
            return "";
        }
        if (item.length() < 4) {
            return OFUSCADO;
        }
        return item.substring(0, 4) + OFUSCADO;
    }

    /**
     * Metodo para ofuscar PCI DSS en una cadena de texto.
     * 
     * @param item
     * @return
     */
    public static String ofuscarTarjetaCredito(String item) {
        if (item == null || item.length() < 12) {
            return item;
        }
        return item.substring(0, 6) + OFUSCADO + item.substring(item.length() - 4);
    }

    /**
     * Metodo para ofuscar direccion de correo electronico.
     * 
     * @param item
     * @return
     */
    public static String ofuscarCorreoElectronico(String item) {
        if (item == null || item.length() < 6) {
            return item;
        }
        String[] partes = item.split("@");
        if (partes.length != 2) {
            return item;
        }
        String parteNombre = partes[0];
        String parteDominio = partes[1];
        if (parteNombre.length() < 3) {
            return item;
        }
        return parteNombre.substring(0, 3) + OFUSCADO + parteDominio;
    }

    /**
     * Metodo para ofuscar numero de telefono internacional.
     * 
     * @param item
     * @return
     */
    public static String ofuscarNumeroTelefono(String item) {
        if (item == null || item.length() < 8) {
            return item;
        }
        String[] partes = item.split("-");
        if (partes.length != 2) {
            return item;
        }
        String parte1 = partes[0];
        String parte2 = partes[1];
        if (parte1.length() < 3) {
            return item;
        }
        return parte1.substring(0, 3) + OFUSCADO + parte2;
    }
}
