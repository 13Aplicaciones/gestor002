package com.aplicaciones13.keycloak.services;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;
import com.aplicaciones13.keycloak.services.KeycloakService;
import org.springframework.beans.factory.annotation.Autowired;

@Slf4j
@Service
public class PassportConsumer {


    @Autowired
    private SessionManagementService sessionManagementService;

    @KafkaListener(topics = "${kafka.topic.passport}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumePassport(String passportString) {
        log.info("Recibido nuevo registro de passport: {}", passportString);

        // Aquí puedes procesar los datos del pasaporte
        // Por ejemplo, guardar en base de datos o enviar a otro servicio
        processPassport(passportString);
    }

    private void processPassport(String passport) {
        // Lógica de procesamiento
        log.info("Procesando información del pasaporte número: {}", passport);

        //log.warn("Pasaporte expirado y super procesado: {}", passport.getPassportNumber());

        try {
            sessionManagementService.logoutAllUsers();
            log.info("Se han cerrado todas las sesiones TODAS activas.");
        } catch (Exception e) {
            log.error("Error al procesar el pasaporte: {}", e.getMessage());
        }
    }
}
