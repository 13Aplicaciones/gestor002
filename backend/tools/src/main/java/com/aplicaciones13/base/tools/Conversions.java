package com.aplicaciones13.base.tools;

import java.util.Date;

/**
 * Clase para manejar conversiones de datos.
 * 
 * 
 * Se procura usar normativas de conversiones de datos en esta clase.
 * 
 * @author omargo33
 * @since 2021-01-22
 * 
 * @see https://es.wikipedia.org/wiki/ISO_8601
 */
public class Conversions {
    public static String ISO_8601_LARGA = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'";
    public static String ISO_8601_CORTA = "yyyy-MM-dd'T'HH:mm:ss'Z'";
    public static String ISO_8601_TIME = "HH:mm:ss";
    public static String ISO_8601_DATE = "yyyy-MM-dd";

    /**
     * Convierte un objeto de tipo java.util.Date a un String en formato ISO 8601.
     * 
     * @param date
     * @return String
     */
    public static String dateToStringFormat(java.util.Date date, String format) {
        return new java.text.SimpleDateFormat(format).format(date);
    }

    /**
     * Convierte un objeto de tipo String a un java.sql.Date.
     * 
     * @param date
     * @param format
     * @return java.sql.Date
     */
    public static Date stringToSqlDate(String date, String format) {
        try {
            Date utilDate = new java.text.SimpleDateFormat(format).parse(date);
            return utilDate;
        } catch (Exception e) {
            return null;
        }
    }
}
