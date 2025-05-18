# Orchestrator-WS

El producto Orchestrator-MS backend de servicios relacionados con el manejo de sesiones, information compartida para frontend y otra información de configuración del sistema que facilita la interacción con los usuarios mediante el frontend.

## Características/features

### Versión 1

- **Soporte de Session:**
Se gestiona la información de la sesión de los users en el sistema.

- **Soporte de configuracion del entorno visual:**
Se gestiona la información de la configuración del entorno visual de los users en el sistema.

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

Para el presente desarrollo y en el order de ejecución se debe tener instalado y configurado los siguientes productos:

| Producto | Dirección | Rama |
| --- | --- | --- |
|utilidades | <https://git.XXXXXXXutilidades.git> | master |

## Dependencias externas

Las que se encuentran en el archivo pom.xml

## Parámetros de configuración del sistema

La parametrización del sistema se encuentra en la tabla `JST_SERVICIOS_VIRTUALES.PARAMETROS` y se puede consultar con el siguiente script:

```sql
SELECT *
FROM 
    JST_SERVICIOS_VIRTUALES.PARAMETRO
WHERE 
    INDICE  >= 600 AND INDICE < 650
OR 
    indice IN (200,201, 202)
ORDER BY 
    INDICE 
;
```

Que tiene la siguiente descripción de campos:

|Id.|Descripción|Text_A|Text_B|#_1|#_2|
|---|---|---|---|---|---|
| 200 | Dirección de encabezado para documentos | /mnt/documentos/logosCooperativa/membreteSuperior_2239x209.png | jpg pdf word | 3 | 0 |
| 201 | Dirección de pie para documentos | /mnt/documentos/logosCooperativa/membreteInferior_2239x209.png |  |  |  |
| 202 | Dirección de imagen cosede para documentos | /mnt/documentos/logosCooperativa/cosede_1028x466.png |  |  |  |
| 600 | Quiosco autoservicio habilita el otp de Quiosco de Autoservicio |  |  | 1 | 1 |
| 601 | Quiosco autoservicio largo del OTP |  |  | 6 | 0 |
| 602 | Quiosco autoservicio Firma electrónica | /mnt/documentos/pi16001-core/llave.p12 | Katyto1810. | 0 | 0 |
| 603 | Quiosco autoservicio fecha de caducidad de la firme electrónica | 2025-12-31 | yyyy-mm-dd | 10 | 0 |
| 604 | Quiosco autoservicio días consulta de solicitud crédito |  |  | 800 | 0 |
| 605 | Ubicación de archivos para sistema PI01001 | /mnt/documentos/ | .pdf | 0 | 0 |
| 606 | Quiosco autoservicio largo del Índice |  |  | 8 | 0 |
| 607 | Quiosco autoservicio validez de los documentos |  |  | 30 | 30 |
| 608 | Quiosco autoservicio presenta el mapa de sucursales |  |  | 0 | 0 |

>**NOTA:**
>
>Los log del producto se obtienen de manera estándar en la consola de la aplicación.

---
**@omargo33** Creado: 2025-01-22
