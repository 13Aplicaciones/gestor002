package com.aplicaciones13.orquestador.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;
import com.aplicaciones13.orquestador.model.Passport;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class PassportProducer {
    

    private final KafkaTemplate<String, Passport> kafkaTemplate;
    
    @Value("${kafka.topic.passport}")
    private String passportTopic;

    public PassportProducer(KafkaTemplate<String, Passport> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendPassportInfo(Passport passport) {
        CompletableFuture<SendResult<String, Passport>> future = kafkaTemplate.send(
                passportTopic, 
                passport.getPassportNumber(), 
                passport
        );
        
        future.whenComplete((result, ex) -> {
            if (ex == null) {
                
                log.info("Enviado passport {} con offset {}", 
                        passport.getPassportNumber(), 
                        result.getRecordMetadata().offset());
            } else {
                log.error("No se pudo enviar passport {} debido a: {}", 
                        passport.getPassportNumber(), 
                        ex.getMessage());
            }
        });
    }
}
