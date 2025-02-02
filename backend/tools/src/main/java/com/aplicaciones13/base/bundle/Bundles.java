package com.aplicaciones13.base.bundle;

import java.text.MessageFormat;
import java.util.Locale;
import java.util.ResourceBundle;

/**
 * Objeto para dar soporte a mensajes bundle.
 *
 * @author omargo33
 * @created 2022-08-19
 */
public class Bundles {

    ResourceBundle resourceBundle = ResourceBundle.getBundle("info");
    Locale locale = new Locale("es", "EC");

    /**
     * Metodo para set Bundle para crear el objeto.
     *
     * @param bundleProperties
     */
    public void setBundle(String bundleProperties) {
        this.resourceBundle = ResourceBundle.getBundle(bundleProperties, locale);
    }

    /**
     * To String.
     *
     * @param key
     * @return
     */
    public String getString(String key) {
        return resourceBundle.getString(key);
    }

    /**
     * To String mas ingreso de parametros.
     *
     * @param key
     * @param parametros
     * @return
     */
    public String getString(String key, Object... parametros) {
        String texto = resourceBundle.getString(key);
        if (texto == null) {
            texto = key;
        }

        MessageFormat messageFormat = new MessageFormat(texto);
        messageFormat.setLocale(locale);
        return messageFormat.format(parametros, new StringBuffer(), null).toString();
    }
}
