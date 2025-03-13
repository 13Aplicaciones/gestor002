import { IParameters } from "ux-ui";

/**
 * Parametros de la consulta.
 */
const parametersQuery: IParameters = {
  size: 10,
  index: "",
  page: 0
};

/**
 * Interfaz para el objeto de respuesta de la llamada.
 */
interface IRowDataError {
  message: string;
  description: string;
  uuid: string;
  index: string;
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
    index: "",
    user: "",
    userDate: "",
    userApp: "",
  };
};


export { createIRowDataError, parametersQuery };
export type { IRowDataError };
