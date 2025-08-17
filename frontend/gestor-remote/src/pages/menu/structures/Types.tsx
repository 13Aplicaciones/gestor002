/**
 * Interfaz para el objeto de respuesta de la llamada.
 */
interface IRowDataMenu {
  userDate: string;
  userApp: string;
  user: string;
  uuid: string;
  uuidModule: string;
  type: string;
  indexMenu: string;
  name: string;
  taskFlow: string;
  status: string;
  order: number;
}

/**
 * Funcion para crear un objeto de respuesta vacio.
 *
 * @returns
 */
const createIRowDataMenu = (): IRowDataMenu => {
  return {
    userDate: "",
    userApp: "",
    user: "",
    uuid: "",
    uuidModule: "",
    type: "",
    indexMenu: "",
    name: "",
    taskFlow: "",
    status: "",
    order: 0,
  };
};
export { createIRowDataMenu };
export type { IRowDataMenu };
