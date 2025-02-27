package com.aplicaciones13.base;

/**
 *  Constantes de seguridades.
 * 
 * @author omargo33
 * @since 2020-10-28
 * 
 */
public class ConstantsTools {
    public static final String TOKEN_SECRET="qapaq.io";
    public static final String ACCESS_TOKEN="access-token";
    public static final String REFRESH_TOKEN="refresh-token";
    public static final String TOKEN_PREFIX="Bearer ";
    public static final String HEADER_STRING="Authorization";  
    public static final String ROLES_STRING="roles";
    public static final String ALGORITMO_KEY = "PBKDF2WithHmacSHA1";
    public static final String TRANSFORMATION = "AES/CBC/PKCS5Padding";
    public static final String SPEC = "AES";
    public static final String USER_NAME = "username";
	public static final String PASSWORD = "password";
    public static final String EMAIL = "email";
    public static final int ITERACIONES = 65556;
    public static final int KEY_LENGTH = 256;
    
    /**
     * Constructor de la clase.
     */
    protected ConstantsTools() { 
    }    

    /**
     * Método para obtener el token Secret.
     * @return
     */
    public static byte[] getPassword() {
        return TOKEN_SECRET.getBytes();
    }

    /**
     * Método para obtener el token Secret.
     * @return
     */
    public static char[] getPasswordChar() {
        return TOKEN_SECRET.toCharArray();
    }
}