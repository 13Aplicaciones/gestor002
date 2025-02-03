package com.aplicaciones13.gestor.payload.common;

public enum EncryptionType {

    AES("AES"), TRIPLEDES("3DES"), RABBIT("Rabbit"), RC4("RC4");

    private final String value;

    EncryptionType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

}
