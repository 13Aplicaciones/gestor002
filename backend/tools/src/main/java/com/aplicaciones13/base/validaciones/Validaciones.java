package com.aplicaciones13.base.validaciones;

/**
 * Clase que permite validaciones varias.
 * 
 * @author omargo33
 * @since 2022-10-04
 * 
 */
public class Validaciones {

    /**
     * Constructor de la clase.
     */
    private Validaciones() {
        super();
    }

    /**
     * Método que permite validar el RUC de ecuador.
     * 
     * @param ruc
     * @return
     */
    public static boolean validarRuc(String ruc) {
        boolean resultadoRuc = false;
        if (ruc.length() == 13) {
            int total = 0;
            int digitoRuc = Integer.parseInt(ruc.substring(9, 10));
            int[] coeficientes = { 2, 1, 2, 1, 2, 1, 2, 1, 2 };
            int n = coeficientes.length;
            int aux = 0;
            for (int i = 0; i < n; i++) {
                aux = Integer.parseInt(ruc.substring(i, i + 1)) * coeficientes[i];
                total = total + ((aux / 10) + (aux % 10));
            }
            int decenaRuc = total / 10;
            decenaRuc = (decenaRuc + 1) * 10;
            if ((decenaRuc - total) == digitoRuc) {
                resultadoRuc = true;
            } else if ((total % 10 == 0) && (digitoRuc == 0)) {
                resultadoRuc = true;
            } else {
                resultadoRuc = false;
            }
        }
        return resultadoRuc;
    }

    /**
     * Método que permite validar el Cédula de ecuador.
     * 
     * @param cedula
     * @return
     */
    public static boolean validarCedula(String cedula) {
        boolean resultado = false;
        if (cedula.length() == 10) {
            int total = 0;
            int digito = Integer.parseInt(cedula.substring(9, 10));
            int[] coeficientes = { 2, 1, 2, 1, 2, 1, 2, 1, 2 };
            int n = coeficientes.length;
            int aux = 0;
            for (int i = 0; i < n; i++) {
                aux = Integer.parseInt(cedula.substring(i, i + 1)) * coeficientes[i];
                total = total + ((aux / 10) + (aux % 10));
            }
            int decena = total / 10;
            decena = (decena + 1) * 10;
            if ((decena - total) == digito) {
                resultado = true;
            } else if ((total % 10 == 0) && (digito == 0)) {
                resultado = true;
            } else {
                resultado = false;
            }
        }
        return resultado;
    }

    /**
     * Método que permite validar el Pasaporte de ecuador.
     * 
     * @param pasaporte
     * @return
     */
    public static boolean validarPasaporte(String pasaporte) {
        boolean resultado = false;
        if (pasaporte.length() == 9) {
            resultado = true;
        }
        return resultado;
    }    
}
