/**
 * Interfaz para el objeto de respuesta de la llamada.
 */
interface IRowDataUserDefinedCodeHeader {
  userDate: string;
  userApp: string;
  user: string;
  group: string;
  codeText: string;
  codeNumber: number;
  name: string;
  description: string;
  order: number;
  status: string;
  uuid: string;
}

/**
 * Funcion para crear un objeto de respuesta vacio.
 *
 * @returns
 */
const createIRowDataUserDefinedCodeHeader =
  (): IRowDataUserDefinedCodeHeader => {
    return {
      userDate: "",
      userApp: "",
      user: "",
      group: "",
      codeText: "",
      codeNumber: 0,
      name: "",
      description: "",
      order: 0,
      status: "",
      uuid: "",
    };
  };

export { createIRowDataUserDefinedCodeHeader };
export type { IRowDataUserDefinedCodeHeader };
