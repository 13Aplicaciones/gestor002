/**
 * Interface para el objeto de datos de Lov (List of Value).
 */
interface IRowDataLov {
  index: string;
  label: string;
  labelAlternative: string;
  description: string;
  value: number;
  doubleValue: number;
  status: string;
  orden: string;
}

/**
 * Función para crear un objeto de datos de Lov vacío.
 *
 * @param index - Identificador único de la fila.
 * @param label - Etiqueta principal de la fila.
 * @param labelAlternative - Etiqueta alternativa de la fila.
 * @param description - Descripción de la fila.
 * @param value - Valor numérico asociado a la fila.
 * @param doubleValue - Valor decimal asociado a la fila.
 * @param status - Estado de la fila (por ejemplo, "A" para activo).
 * @param orden - Orden de la fila (por ejemplo, "1", "2", etc.).
 * @returns
 */
const createIRowDataLov = (): IRowDataLov => {
  return {
    index: "",
    label: "",
    labelAlternative: "",
    description: "",
    value: 0,
    doubleValue: 0.0,
    status: "A", 
    orden: "",
  };
};

export { createIRowDataLov };
export type { IRowDataLov };
