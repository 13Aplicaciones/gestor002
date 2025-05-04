package com.aplicaciones13.base.security;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import lombok.extern.slf4j.Slf4j;

import java.util.Base64;

@Slf4j
public class Encrypt {

    static String transformation = "AES";// "AES/CBC/PKCS5Padding";

    static String data = "yAeC4gcVn3YpbIDopTPV2nApKbnnOngHPdj8qGLbBaw=";

    public static void main(String[] args) {
        String data = "Hola mundo";
        try {
            SecretKey secretKey = generateKey();
            log.info("Clave generada: " + secretKey.getFormat());
            String encryptedData = encrypt(data, secretKey);
            log.info("Text encriptado: " + encryptedData);
            String decryptedData = decrypt(encryptedData, secretKey);
            log.info("Text desencriptado: " + decryptedData);
            String miKeyString = secretKeyToString(secretKey);
            log.info("Clave en string: " +miKeyString);
            SecretKey miSecretKey = stringToSecretKey(miKeyString);   
            String encryptedData2 = decrypt(encryptedData, miSecretKey);
            log.info("Text desencriptado con clave en string: " + encryptedData2);



            
        } catch (Exception e) {
            log.error("Error al generar la clave", e);
        }
    }

    public static String encrypt(String data, SecretKey key) throws Exception {
        Cipher cipher = Cipher.getInstance(transformation);
        cipher.init(Cipher.ENCRYPT_MODE, key);
        byte[] encryptedData = cipher.doFinal(data.getBytes());
        return Base64.getEncoder().encodeToString(encryptedData);
    }

    public static String decrypt(String encryptedData, SecretKey key) throws Exception {
        Cipher cipher = Cipher.getInstance(transformation);
        cipher.init(Cipher.DECRYPT_MODE, key);
        byte[] decodedData = Base64.getDecoder().decode(encryptedData);
        byte[] decryptedData = cipher.doFinal(decodedData);
        return new String(decryptedData);
    }

    public static SecretKey generateKey() throws Exception {
        KeyGenerator keyGen = KeyGenerator.getInstance(transformation);
        keyGen.init(256); 
        return keyGen.generateKey();
    }

    public static String secretKeyToString(SecretKey secretKey) {
        return Base64.getEncoder().encodeToString(secretKey.getEncoded());
    }

    public static SecretKey stringToSecretKey(String keyString) {
        byte[] decodedKey = Base64.getDecoder().decode(keyString);
        return new SecretKeySpec(decodedKey, 0, decodedKey.length, transformation);
    }
}
