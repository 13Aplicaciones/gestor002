package com.aplicaciones13.gestor_ws.payload.common;

public enum TipoEncripcion {

    AES("AES"), TRIPLEDES("3DES"), RABBIT("Rabbit"), RC4("RC4");

    private final String value;

    TipoEncripcion(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

}
