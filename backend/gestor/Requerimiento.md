# Requerimientos

En base al esquema adjunto  "base.sql" hay que hacer el siguiente desarrollo para la tabla de "information":

El pruducto se va a llamar  gs-001-01 (las siglas gs vienen de `gestion-servicio`) y va a tener las siguientes requisitos:

## Tecnologia a usarse

Crear un producto que sea
    - Spring Boot 3.4
    - Java 17
    - JPA
    - Postgres
    - Maven
        - OpenApi con la descripcion en org.springdoc springdoc-openapi-starter-webmvc-ui version 2.6.0
        - Lombok
        - spring-boot-starter-validation

## Arquitectura

Que tenga la siguiente arquitectura:

gs-001-01
    config
    controller
    mapping
    model
    palyload
    repository
    services
    tools
    gs-001-01Application.java

### Detalle de los paquetes:

#### config

    - OpenAPI30.java con la configuración de OpenAPI para tener una pagina sawagger del proyecto

#### controller

    - {elemento}Controller.java tomando en cuenta que el elemento es el name de la entidad que se va a gestionar
    /common 
        - ControladorGenerico.java (que tambien adjunto)        
    
    Cada controlador va a tener los metodo de:
        - Listar
        - Listar con paginacion y orderamiento 
        - Listar elementos borrados para las entidades que tengan el campo status
        - Crear
        - Actualizar
        - Eliminar
        - Buscar por id
        - Buscar por UUID (donde sea posible)

    Al momento de paginar tomar en cuenta como referencia el siguietne codigo como ejemplo para detalle de information la paginacion. 

    ```java

    private Map<String, Object> convertToResponse(final Page<PersonData> pagePersons) {
        Map<String, Object> response = new HashMap<>();
        response.put("persons", pagePersons.getContent());
        response.put("current-page", pagePersons.getNumber());
        response.put("total-items", pagePersons.getTotalElements());
        response.put("total-pages", pagePersons.getTotalPages());
        return response;
    }
    ```
**La eliminacion de un registro se va a hacer por el campo `uuid` y no por el `id` en donde sea posible y este no borrara el registro en las tablas que tengan un campo status, ahi se limitara a cambiar el status a `X`, en las demas si borrara el resgistro.**

#### mapping

Este paquete va a tener las clases de mapeo de los objetos de la base de datos a los objetos de la aplicacion y viceversa.

#### model

    - Este paquete va a tener las clases de los objetos de la base de datos, como estamos usando JPA y lombok, las clases a mas de las anotaciones de JPA, se va a tener que tener las anotaciones de lombok para que se generen los metodos de acceso a los atributos.
    - En medida de lo posible en los compos de varchar se debe incluir anotaciones de "length" para limitar el tamaño de los campos.
    - En los campos not null se debe incluir en la  anotacion de "nullable" con el valor de false
    - En los campos que sean unicos se debe incluir la anotacion de @Unique
    - En los campos que sean de fecha se debe incluir la anotacion de @Temporal(TemporalType.TIMESTAMP)
    - En los campos que sean de type UUID se debe incluir la anotacion de @Type(type = "pg-uuid")
    - Para los autoincrementales se debe incluir la anotacion de @GeneratedValue(strategy = GenerationType.IDENTITY)
    - Generar las relaciones de llaves foreaneas con la anotacion de @ManyToOne y @OneToMany segun sea el caso.

#### payload

    Los payload voy a tener dos types los de Reques que se usan en las solicituds de al api-rest y los de response que se usan en las respuestas de la api-rest.

     - request
         - Estos van a tener las anotaciones de validacion de los campos que se van a recibir en la solicitud.
         - En los campos que sean obligatorios se debe incluir la anotacion de @NotNull
         - En los campos que sean de type UUID se debe incluir la anotacion de @Type(type = "pg-uuid")
         - Se debe incluir antaciones de @Shema para la documentacion de los campos, que se obtiene de los campos comentarios de la estructura de la base de datos. siguiendo el ejemplo:
            
        ```java
           
            @Schema(description = "DTO para la solicitud de creación de un empleado")
            public class EmpleadoRequest {
                @NotNull
                @Size(max = 50)
                @Schema(description = "Name del empleado", example = "Juan")
                private String name;
            
                @NotNull
                @Size(max = 50)
                @Schema(description = "LastName del empleado", example = "Pérez")
                private String apellido;
        
            // Otros campos y sus validaciones
    
        // Getters y setters
            }
    ```

### repository

    - Este paquete va a tener las interfaces de los repositorios de las entidades que se van a gestionar, estas interfaces van a extender de JpaRepository y van a tener la anotacion de @Repository
    - Se crea los listados de las entidades que tenga status activo es decir cuyo campo status sea diferente de `X`
    - Se va a tener que crear un metodo que busque por el campo `uuid` que no sea borrado.
    - Se va a tener que crear un metodo que busque por el campo `id` y que no sea borrado.
    - Para la entidades que tengan user_fecha, se creara un metodo de busqueda que incluya el index (de existir), el detalle o descripcion (de existir) y el rango de fechas (user_fecha) y que no sea borrado (de existir el campo "estado").
    - Se va a tener que crear un metodo que busque por el detalle o descripcion (de existir) que sea del type like y tenga un limitante a 100 registros y que no sea borrado (de existir el campo "estado").
    - En las entidades donde se tenga el campo order, por este campo sera orderdado de forma ascendente.
    - Los listado del type findAll se tiene que limitar al 1500 registros.
    - Todos los listados de las entidades que tiene el campo status se filtraran por el campo status diferente de `X`.
    - En las entidades que se tiene el campo status se crea un metodo para listar los registros que esten borrados, es decir status `X` unicamente.

### services

    - Este paquete va a tener las interfaces de los servicios de las entidades que se van a gestionar, estas interfaces van a tener la anotacion de @Service
    - Se van crear los mentdos correspondientes a los metodos de los controladores y congruentes con los mentodos de los repositorios.

### tools

    - Este paquete va a tener las clases de utilidades que se van a usar en el proyecto y es de uso general.
    

## lineamientos generales

- Crea todas las clases con documentacion del para que sirve el objeto creado.
- El objeto debe tener @author con el name del autor -> omargo33
- El objeto debe tener @fecha con en el formato yyyy-MM-dd -> 2022-02-02
- Los metodos que tenga una complejidad mayor a 10 lineas se debe documentar con el uso de javadoc.
