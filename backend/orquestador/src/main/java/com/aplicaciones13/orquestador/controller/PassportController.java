package com.aplicaciones13.orquestador.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aplicaciones13.orquestador.model.Passport;
import com.aplicaciones13.orquestador.services.PassportProducer;


@RestController
@RequestMapping("/api/passport")
public class PassportController {

    private final PassportProducer producer;

    public PassportController(PassportProducer producer) {
        this.producer = producer;
    }

    @PostMapping
    public ResponseEntity<String> publishPassport(@RequestBody Passport passport) {
        try {
            producer.sendPassportInfo(passport);
            return new ResponseEntity<>("Pasaporte enviado a Kafka correctamente", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al enviar pasaporte: " + e.getMessage(), 
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}