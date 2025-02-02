/**
 * Enumerado de alertas que se pueden mostrar en la aplicación.
 *
 * @returns 
 */
const enum Alertas {
    info = "info",
    warning = "warning",
    error = "error",
    success = "success",
}

/**
 * Enumeración para la presentación de las bandas
 * 
 * @returns 
  */
const enum BandaPresentacion {
    columna_1 = 1/2,
    columna_2 = 1/3,
    columna_3 = 1/4,
    columna_4 = 1/5,
    columna_5 = 1/6,
    columna_6 = 1/7,
}

/**
 * Enumeración para la presentación de las bandas
 * 
 * @returns 
 */
const enum Direccion{
    vertical = "column",
    horizontal = "row"
}

/**
 * Se usa para dar formato a los textos en tablas y datalist.
 * 
 * @returns
 */
const enum FormatoTexto{
    none = "none",
    decimal2 = "##.##",
    date = "date",
    //TODO: Agregar mas formatos de texto.
}

/**
 * Se usa para dar formato a los textos en tablas y datalist.
 * 
 * @returns
 */
const enum JustificacionTexto{
    center = "center",
    start = "start",
    end = "end",
}

/**
 * Enumeración para la presentación para la presentación de las columnas de las tablas.
 * 
 * @returns 
*/
const enum OrdenarColumna{
    ascendente = "asc",
    descendente = "desc",
    neutro = "none",
}

/**
 * Enumeración para el estado de edición de los formularios.
 * 
 * @returns
 */
const enum EstadoEdicion{
    crear = "crear",
    editar = "editar",
    ver = "ver",
    bloquear = "bloquear",
    buscar = "buscar",
}

export {Alertas, BandaPresentacion, Direccion, FormatoTexto, JustificacionTexto, OrdenarColumna, EstadoEdicion};