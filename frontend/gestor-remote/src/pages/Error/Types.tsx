/**
 * Interfaz para el objeto de respuesta de la llamada.
 */
interface IRowDataError {
  message: string;
  description: string;
  uuid: string;
  indexError: string;
  user: string;
  userDate: string;
  userApp: string;
}

/**
 * Funcion para crear un objeto de respuesta vacio.
 *
 * @returns
 */
const createIRowDataError = (): IRowDataError => {
  return {
    message: "",
    description: "description",
    uuid: "",
    indexError: "",
    user: "",
    userDate: "",
    userApp: "",
  };
};


export { createIRowDataError };
export type { IRowDataError };
