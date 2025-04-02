package com.aplicaciones13.keycloak.services;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import com.aplicaciones13.keycloak.model.Passport;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class PassportConsumer {

    @KafkaListener(topics = "${kafka.topic.passport}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumePassport(Passport passport) {
        log.info("Recibido nuevo registro de passport: {}", passport);

        // Aquí puedes procesar los datos del pasaporte
        // Por ejemplo, guardar en base de datos o enviar a otro servicio
        processPassport(passport);
    }

    private void processPassport(Passport passport) {
        // Lógica de procesamiento
        log.info("Procesando información del pasaporte número: {}", passport.getPassportNumber());

        log.warn("Pasaporte expirado y super procesado: {}", passport.getPassportNumber());

    }
}
