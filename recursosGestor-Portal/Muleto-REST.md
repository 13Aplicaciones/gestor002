
### Códigos de Estado Comunes en REST API

#### Respuestas Satisfactorias (2xx)

- **200 OK:** La solicitud se ha completado con éxito y el contenido solicitado se devuelve en el cuerpo de la respuesta.
- **201 Created:** La solicitud ha resultado en la creación de un nuevo recurso.
- **204 No Content:** La solicitud se ha procesado con éxito, pero no hay contenido que devolver.

#### Redirecciones (3xx)

- **301 Moved Permanently:** El recurso solicitado ha sido movido permanentemente a una nueva URL.
- **302 Found:** La respuesta temporalmente redirecciona a una nueva URL.
- **304 Not Modified:** El cliente posee una copia actualizada del recurso.

#### Errores del Cliente (4xx)

- **400 Bad Request:** La solicitud está mal formada.
- **401 Unauthorized:** Se requiere autenticación.
- **403 Forbidden:** No se tiene permiso para acceder al recurso.
- **404 Not Found:** El recurso solicitado no existe.
- **405 Method Not Allowed:** El método HTTP no está soportado para el recurso.

#### Errores del Servidor (5xx)

- **500 Internal Server Error:** Ocurrió un error inesperado en el servidor.
- **502 Bad Gateway:** El servidor, como puerta de enlace, recibió una respuesta inválida de un servidor ascendente.
- **503 Service Unavailable:** El servidor temporalmente no está disponible.

### Códigos de Estado por Método HTTP

- **GET:** Generalmente se utiliza 200 OK para respuestas exitosas y 404 Not Found si el recurso no se encuentra.
- **PUT:** Se usa 200 OK para actualizaciones exitosas y 404 Not Found si el recurso no existe.
- **DELETE:** Se utiliza 204 No Content para indicar que el recurso se ha eliminado correctamente.
- **POST:** Se utiliza 201 Created para indicar que se ha creado un nuevo recurso y 200 OK si se actualiza un recurso existente.

### Consideraciones Adicionales

- **Semántica de los métodos:** Es importante respetar la semántica de cada método HTTP. Por ejemplo, un PUT debe actualizar un recurso completamente, mientras que un PATCH puede realizar actualizaciones parciales.
- **Personalización:** Puedes personalizar los códigos de estado para adaptarlos a las necesidades específicas de tu API, pero es recomendable seguir las convenciones estándar.
- **Encabezados:** Además del código de estado, los encabezados HTTP proporcionan información adicional sobre la respuesta, como el tipo de contenido, la ubicación del recurso, etc.

### Ejemplo de Uso

JSON

```
// Respuesta exitosa a una solicitud GET
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "id": 1,
    "name": "John Doe"
  }
]
```

JSON

```
// Respuesta a una solicitud DELETE exitosa
HTTP/1.1 204 No Content
```

**En resumen,** los códigos de estado HTTP son esenciales para comunicar el resultado de una solicitud en una API REST. Al utilizar los códigos correctos, puedes ayudar a los desarrolladores a comprender mejor cómo interactuar con tu API y a construir aplicaciones más robustas.

