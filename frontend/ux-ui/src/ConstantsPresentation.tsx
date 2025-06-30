/**
 * Enumerado de alerts que se pueden mostrar en la aplicación.
 *
 * @returns
 */
const enum Alerts {
  error = "error", // Error
  info = "info", // Información
  success = "success", // Éxito
  warning = "warning", // Advertencia
}

/**
 * Enumeración para el tamaño de los diálogos.
 */
const enum DialogSize {
  small = 0.45, // Tamaño pequeño
  medium = 0.50, // Tamaño mediano
  large = 0.60, // Tamaño grande
  full = 0.80, // Tamaño completo
}

/**
 * Enumeración para la presentación de las bandas
 *
 * @returns
 */
const enum BandPresentation {
  column_0 = 0.75,     // 3/4
  column_1 = 0.5,      // 1/2
  column_2 = 0.33333,  // 1/3
  column_3 = 0.25,     // 1/4
  column_4 = 0.2,      // 1/5
  column_5 = 0.16667,  // 1/6
  column_6 = 0.14286,  // 1/7
}

/**
 * Enumeración para la presentación de las bandas
 *
 * @returns
 */
const enum Direction {
  vertical = "column",
  horizontal = "row",
}

/**
 * Se usa para dar format a los textos en tablas y datalist.
 *
 * @returns
 */
const enum TextFormat {
  action = "action", // Formato de acción
  date = "date", // Formato de fecha
  dateHour = "dateHour", // Formato de fecha y hora
  dateHourZone = "dateHourZone", // Formato de fecha y hora con zona horaria
  dateHourZoneMiliseconds = "dateHourZoneMiliseconds", // Formato de fecha y hora con zona horaria y milisegundos
  dateSocialNetwork = "dateSocialNetwork", // Formato de fecha para redes sociales
  dateSocialNetworkDinamic = "dateSocialNetworkDinamic", // Formato de fecha para redes sociales dinámico
  decimal2 = "##.##", // Formato de decimal con dos decimales
  hour = "hour", // Formato de hora
  none = "none", // Sin formato
  paragraph2 = "paragraph2", // Formato de párrafo dos lineas
  paragraph4 = "paragraph4", // Formato de párrafo cuatro lineas
  paragraph6 = "paragraph6", // Formato de párrafo seis lineas
}

/**
 * Se usa para dar format a los textos en tablas y datalist.
 *
 * @returns
 */
const enum JustificationText {
  center = "center", // Centrado
  start = "start", // Inicio
  end = "end", // Fin
}

/**
 * Enumeración para la presentación de las tablas.
 *
 * @returns
 */
const enum MenuTableRefresh {
  refresh = "refresh",
  refreshTimmer = "refreshTimmer",
  refreshFull = "refreshFull",
  none = "none",
}

/**
 * Enumeración para la presentación para la presentación de las columns de las tablas.
 *
 * @returns
 */
const enum SortColumn {
  asc = "asc", // Orden ascendente
  desc = "desc", // Orden descendente
  neutral = "none", // Sin orden
}

/**
 * Enumeración para el estado de edición de los formularios.
 *
 * @returns
 */
const enum StatusEdit {
  block = "block", // Bloquear un registro para poder borrar
  create = "create", // Crear un nuevo registro
  edit = "edit", // Editar un registro
  find = "find", // Buscar un registro
  see = "see", // Ver un registro
  detail = "detail", // Ver un registro en detalle
}

/**
 * Enumeración para los formatos de fecha y hora en ISO 8601.
 * 
 * @returns
 */
const enum FormatMaskISO {
  dateHourZone = "yyyy-MM-dd HH:mm:ssXXX", // Formato de fecha y hora con zona horaria
  dateHourZoneMiliseconds = "yyyy-MM-dd HH:mm:ss.SSSXXX", // Formato de fecha y hora con zona horaria y milisegundos
  date = "yyyy-MM-dd", // Formato de fecha
  dateHour = "yyyy-MM-dd HH:mm:ss", // Formato de fecha y hora
  hour = "HH:mm:ss", // Formato de hora
  hourMiliseconds = "HH:mm:ss.SSS", // Formato de hora con milisegundos
}

export {
  Alerts,
  DialogSize,
  BandPresentation,
  Direction,
  FormatMaskISO,
  TextFormat,
  JustificationText,
  SortColumn,
  StatusEdit,
  MenuTableRefresh,
};
