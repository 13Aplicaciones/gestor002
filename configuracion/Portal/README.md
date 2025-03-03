# Docker Compose Desarrollo

## Descripción

Este archivo contiene la configuración de Docker Compose para el entorno de desarrollo. En el cual se establecen los servicios necesarios para el desarrollo de la aplicación.

## Servicios

Para lanzar los servicios se debe ejecutar el siguiente comando:

```bash
docker compose up -d --build
```

### Nginx

Servidor web que se encarga de servir los archivos estáticos de la aplicación.

En este se configura el proxy inverso para redirigir las peticiones de los elementos de Spring Boot a los puertos correspondientes.

Y se configura una pagina de inicio con los enlaces a los servicios de la aplicación o a la documentación de la misma.[Ver](http://localhost/index.html)

### PostgreSQL (versión: 14)

La base de dato se encuentra en la carpeta `baseDatos` y esta configurada para que se cree la base de datos `gestor 002` al iniciar el contenedor en la primera vez.

#### Respaldo de la base de datos GESTOR 002

mysqldump -u root -p GS_002_01 > gs_002_01.sql

Siempre que ese realicen cambios en la base de datos se debe realizar un respaldo de la misma y actualizar el repositorio git con el archivo `02-init-gestor002.sql`.

Para realizar el respaldo de la base de datos se debe ejecutar los siguientes comandos:

```bash
docker ps

## de la salida tomar el <CONTAINER ID> del contenedor de postgres

docker exec <CONTAINER_ID> pg_dump -h localhost -U postgres -d gestor002 > baseDatos/02-init-gestor002.sql

```

> **Nota:** La contraseña debe ser cambiada por una segura.
