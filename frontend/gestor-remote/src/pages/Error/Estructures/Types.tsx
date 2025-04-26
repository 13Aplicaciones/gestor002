/**
 * Interfaz para el objeto de respuesta de la llamada.
 */
interface IRowDataError {
  description: string;
  indexError: string;
  message: string;
  user: string;
  userApp: string;
  userDate: string;
  uuid: string;
}

/**
 * Funcion para crear un objeto de respuesta vacio.
 *
 * @returns
 */
const createIRowDataError = (): IRowDataError => {
  return {
    description: "",
    indexError: "",
    message: "",
    user: "",
    userApp: "",
    userDate: "",
    uuid: "",
  };
};

export { createIRowDataError };
export type { IRowDataError };
