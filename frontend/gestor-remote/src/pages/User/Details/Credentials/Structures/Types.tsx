/**
 * Interfaz para el objeto de respuesta de la llamada.
 */
interface IRowDataCredential {
  email: string;
  socialNick: string;
  type: string;
  user: string;
  userApp: string;
  userDate: string;
}

/**
 * Funcion para crear un objeto de respuesta vacio.
 *
 * @returns
 */
const createIRowDataCredential = (): IRowDataCredential => {
  return {
    email: "",
    socialNick: "",
    type: "",
    user: "",
    userApp: "",
    userDate: "",
  };
};
export { createIRowDataCredential };
export type { IRowDataCredential };

