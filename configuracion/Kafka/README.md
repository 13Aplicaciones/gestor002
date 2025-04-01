# Docker Compose Desarrollo

## Descripción

Este archivo contiene la configuración de Docker Compose para el entorno de desarrollo. En el cual se establecen los servicios necesarios para el desarrollo de la aplicación.

## Servicios

Para lanzar los servicios se debe ejecutar el siguiente comando:

```bash
docker compose up -d --build
```

### Kafka 

Servidor de mensajería que se encarga de la comunicación entre los microservicios de la aplicación.

### Kafka-ui

Interfaz gráfica para visualizar los mensajes que se envían y reciben en el servidor de mensajería, y se puede visualizar en el link [Kafka-ui](http://localhost:8078)

### Zookeeper

Servidor de coordinación que se encarga de mantener la configuración de los nodos del servidor de mensajería.


