import {
  addDataToIndexedDB,
  createFetchData,
  deleteDataById,
  fetchData,
  getDataFromIndexedDB,
  MethodREST, TypeBody,
} from "api-fetch";
import { STORE } from "../Constants";
import { getToken, ITokenRoot, refreshToken } from "./Tokens";

/**
 * Definicion de los tipos de dato que se van a manejar los parametros.
 */
export interface IParameter {
  indexParameter: string;
  encryt: boolean;
  valueText01: string;
  valueText02: string;
  valueNumber01: number;
  valueNumber02: number;
}

/**
 * Función para obtener los parametros de los módulos.
 *
 * Toma la url del orchestrator y realiza la consulta de los parametros por index de módulos.
 *
 * @param indexModule Index del módulo
 * @returns
 */
const getParameters = async (indexModule: string) => {
  const iRootData = await getDataFromIndexedDB(
    STORE,
    STORE.ddl.parameters.name,
    indexModule
  );

  if (iRootData) {
    return iRootData;
  }

  const url =
    import.meta.env.VITE_ORCHESTRATOR_URL +
    "structure/parameter/module=" +
    indexModule;
  let iFetchData = createFetchData();
  const token: ITokenRoot = await getToken();

  if (token) {
    iFetchData = await fetchData({
      url: url,
      methodRest: MethodREST.GET,
      typeBody: TypeBody.NONE,
      bodyParameter: null,
      token: token.access_token,
      getToken: async () => {
        return await refreshToken();
      },
    });
    if (!iFetchData.error) {
      await addDataToIndexedDB(
        STORE,
        STORE.ddl.parameters.name, 
        indexModule,
        iFetchData.response
      );
      return iFetchData.response;
    }
  }
  return iFetchData;
};

/**
 * Función para obtener un parametro por modulo.
 *
 * @param indexModule Index del módulo
 * @param indexParameter Index del parametro
 * @returns
 */
const getParameter = async (indexModule: string, indexParameter: string) => {
  let rootData = {};
  await getParameters(indexModule).then((data) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].indexParameter == indexParameter) {
        rootData = data[i];
      }
    }
  });

  return rootData;
};

/**
 * Función para refrescar la estructura.
 *
 * @param token Token de autenticación
 * @returns
 */
const refreshParameters = async (indexModule: string) => {
  await deleteDataById(STORE, STORE.ddl.parameters.name, indexModule).then(async () => {
    return await getParameters(indexModule);
  });

  return null;
};

export { getParameter, getParameters, refreshParameters };
