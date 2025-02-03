package com.aplicaciones13.base.validations;

/**
 * Clase que permite validaciones varias.
 * 
 * @author omargo33
 * @since 2022-10-04
 * 
 */
public class Validations {

    /**
     * Constructor de la clase.
     */
    private Validations() {
        super();
    }

    /**
     * Método que permite validar el RUC de ecuador.
     * 
     * @param ruc
     * @return
     */
    public static boolean validateRuc(String ruc) {
        boolean responseRuc = false;
        if (ruc.length() == 13) {
            int total = 0;
            int digitRuc = Integer.parseInt(ruc.substring(9, 10));
            int[] coefficients = { 2, 1, 2, 1, 2, 1, 2, 1, 2 };
            int n = coefficients.length;
            int aux = 0;
            for (int i = 0; i < n; i++) {
                aux = Integer.parseInt(ruc.substring(i, i + 1)) * coefficients[i];
                total = total + ((aux / 10) + (aux % 10));
            }
            int decenaRuc = total / 10;
            decenaRuc = (decenaRuc + 1) * 10;
            if ((decenaRuc - total) == digitRuc) {
                responseRuc = true;
            } else if ((total % 10 == 0) && (digitRuc == 0)) {
                responseRuc = true;
            } else {
                responseRuc = false;
            }
        }
        return responseRuc;
    }

    /**
     * Método que permite validar el Cédula de ecuador.
     * 
     * @param cedula
     * @return
     */
    public static boolean validateCedula(String cedula) {
        boolean response = false;
        if (cedula.length() == 10) {
            int total = 0;
            int digit = Integer.parseInt(cedula.substring(9, 10));
            int[] coefficients = { 2, 1, 2, 1, 2, 1, 2, 1, 2 };
            int n = coefficients.length;
            int aux = 0;
            for (int i = 0; i < n; i++) {
                aux = Integer.parseInt(cedula.substring(i, i + 1)) * coefficients[i];
                total = total + ((aux / 10) + (aux % 10));
            }
            int decena = total / 10;
            decena = (decena + 1) * 10;
            if ((decena - total) == digit) {
                response = true;
            } else if ((total % 10 == 0) && (digit == 0)) {
                response = true;
            } else {
                response = false;
            }
        }
        return response;
    }

    /**
     * Método que permite validar el Pasaporte de ecuador.
     * 
     * @param pasaporte
     * @return
     */
    public static boolean validatePassport(String pasaporte) {
        boolean response = false;
        if (pasaporte.length() == 9) {
            response = true;
        }
        return response;
    }    
}
