# tools

Herramientas de desarrollo para el sistema de 13 aplicaciones y que son parte de un marco de desarrollo de aplicaciones genéricas para el portal empresarial.

## Características/features

### Versión 0.0.2

- **@Anotaciones**
    - **@SetUser**: anotación para obtener el usuario logueado en el sistema desde los servidores OAuth2.
- **Bundle**: anotación para obtener los mensajes de los archivos de propiedades.
- **Configuraciones**: 
   - **Swagger**: configuración de swagger para la documentación de los servicios REST.
   - **OAuth2**: configuración de los servidores de autenticación OAuth2.
   - **CORS**: configuración de los servidores de autenticación OAuth2.
   - **Validaciones**: configuración de las validaciones de los servicios REST.
- **Controller**: 
   - **Exception**: Recuersos de estado de Http.
   - **ControllerGeneric**: controlador de excepciones genéricas que ahorran respuestas de estado de Http.
   - **ControllerTools**: Herramientas de formación de la respuesta Genéricas.
- **Model de datos comunes**: 
   - **Fecha y Aplicación**: modelo de datos para la fecha de aplicación.
   - **Usuario, Fecha y Aplicación**: modelo de datos para el usuario, fecha de aplicación.
   - **UUID, Usuario, Fecha y Aplicación**: modelo de datos para el UUID, usuario, fecha de aplicación.
- **Model de datos Exception**: 
   - **Error Llave Foreana**: modelo de datos para el manejo de errores.
   - **Error de Seguridades**: modelo de datos para el manejo de errores de Seguridades.
- **Payload**: 
   - **Aplicacion Request**: Request con información de la aplicación.
   - **Fecha y Aplicacion Request**: Request con información de la fecha y aplicación.
   - **Encrypted Tipo**: <pendiente>
   - **Estado y Aplicacion Request**: Request con información del estado y aplicación.
   - **Usuario, Fecha y Aplicación Response**: Response con información del usuario, fecha y aplicación.
- **Seguridades**: hash, generador de claves y ofuscador de data.
- **Servicios**: 
   - **JWT service**: servicio para obtener la información del token de autenticación.
   - **Request REST URL**: Solicitud request de JSON.
- **Utilidades**: 
   - **Constantes**: constantes de la aplicación.
   - **Conversiones**: conversiones varias de fechas, texto y etc.
   - **Encrypt**: <pendiente>.
- **Validaciones**: 
    - **Validaciones UUID**: validaciones de UUID.

## Configuración de desarrollo

### JDK (JAVA Development Kit)

El sistema debe tener instalado el JDK (JAVA Development Kit) en su versión 17, para verificar la versión de java se debe ejecutar el siguiente comando:

```bash
java -version
```

### Maven

El sistema debe tener instalado Maven, al menos la versión 3.8.8 para verificar la versión de Maven se debe ejecutar el siguiente comando:

```bash
mvn -version
```

## Dependencias internas

Para el presente desarrollo y en el orden de ejecución se debe tener instalado y configurado los siguientes productos:

## Dependencias externas

Las que se encuentran en el archivo pom.xml

```xml
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
             <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        
        <!-- Elemento de Data-JPA -->
        <dependency>
			    <groupId>org.springframework.boot</groupId>
			    <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>

        <!-- https://mvnrepository.com/artifact/org.springframework/spring-tx -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-tx</artifactId>
        </dependency>

        <!-- dependencia lombok -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <!-- https://mvnrepository.com/artifact/jakarta.validation/jakarta.validation-api -->
        <dependency>
            <groupId>jakarta.validation</groupId>
            <artifactId>jakarta.validation-api</artifactId>
            <version>3.1.0</version>
        </dependency>
                
        <!-- Seguridades -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
            <scope>provided</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-oauth2-client</artifactId>
            <scope>provided</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-oauth2-resource-server</artifactId>
            <scope>provided</scope>
        </dependency>

        <!-- Swager Open API -->
        <dependency>
            <groupId>org.springdoc</groupId>
            <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
			   <version>2.8.3</version>
        </dependency>
    </dependencies>
```

## Parámetros de configuración del sistema

Pare el uso de las herramientas se debe configurar el archivo `application.properties` con los siguientes parámetros:

```properties
##
## Configuración de la documentación
openapi.info.title=OrquestadorWS
openapi.info.version=1.0.0
openapi.info.description=API de Orquestar las aplicaciones del microfrontend
openapi.info.contact.name=13Aplicaciones
openapi.info.contact.url=http://localhost:8092/orquestador-ws/swagger-ui/index.html
openapi.info.contact.email=omargo33@gmail.com

##
## Seguridades (separados por comas y sin espacios)
contexts.excluded-security=/login,/v3/api-docs/**,/swagger-ui/**,/swagger-ui.html,/actuator/**

##
## Configuración de CORS (separados por comas y sin espacios)
cors.allowed-origins=http://localhost:3000,http://example.com,
cors.allowed-methods=GET,POST,PUT,DELETE,
```

>**NOTA:**
>
>Los log del producto se obtienen de manera estándar en la consola de la aplicación.

---
**@omargo33** Creado: 2025-01-22