package com.example.consumer;

@Service
public class Service {
    @KafkaListener(topics = "test-topic", groupId = "group_id")
    public void consume(String message) {
        System.out.println("Mensaje recibido: " + message);
    }
}