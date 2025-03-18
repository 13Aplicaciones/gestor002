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
 * Enumeración para la presentación de las bandas
 *
 * @returns
 */
const enum BandPresentation {
  column_1 = 1 / 2,
  column_2 = 1 / 3,
  column_3 = 1 / 4,
  column_4 = 1 / 5,
  column_5 = 1 / 6,
  column_6 = 1 / 7,
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
  decimal2 = "##.##", // Formato de decimal con dos decimales
  hour = "hour", // Formato de hora
  none = "none", // Sin formato
  //TODO: Agregar mas formats de texto.
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
}

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
  BandPresentation,
  Direction,
  FormatMaskISO,
  TextFormat,
  JustificationText,
  SortColumn,
  StatusEdit,
};
