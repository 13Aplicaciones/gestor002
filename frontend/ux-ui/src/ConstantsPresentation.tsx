/**
 * Enumerado de alerts que se pueden mostrar en la aplicación.
 *
 * @returns 
 */
const enum Alerts {
    error = "error",
    info = "info",
    success = "success",
    warning = "warning",
}

/**
 * Enumeración para la presentación de las bandas
 * 
 * @returns 
  */
const enum BandPresentation {
    column_1 = 1/2,
    column_2 = 1/3,
    column_3 = 1/4,
    column_4 = 1/5,
    column_5 = 1/6,
    column_6 = 1/7,
}

/**
 * Enumeración para la presentación de las bandas
 * 
 * @returns 
 */
const enum Direction{
    vertical = "column",
    horizontal = "row"
}

/**
 * Se usa para dar format a los textos en tablas y datalist.
 * 
 * @returns
 */
const enum TextFormat{
    date = "date",
    decimal2 = "##.##",
    action = "action",
    none = "none",
    //TODO: Agregar mas formats de texto.
}

/**
 * Se usa para dar format a los textos en tablas y datalist.
 * 
 * @returns
 */
const enum JustificationText{
    center = "center",
    start = "start",
    end = "end",
}

/**
 * Enumeración para la presentación para la presentación de las columns de las tablas.
 * 
 * @returns 
*/
const enum SortColumn{
    asc = "asc",
    desc = "desc",
    neutral = "none",
}

/**
 * Enumeración para el estado de edición de los formularios.
 * 
 * @returns
 */
const enum StatusEdit{
    create = "create",
    edit = "edit",
    see = "see",
    block = "block",
    find = "find",
}

export {Alerts, BandPresentation, Direction, TextFormat, JustificationText, SortColumn, StatusEdit};