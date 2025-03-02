import { addDataToIndexedDB, createFetchData, deleteDataById, getDataFromIndexedDB } from "api-fetch";
import { fetchData } from "api-fetch";
import { MethodREST, TypeBody } from 'api-fetch'
import { STORE } from "../Constants";
import { getToken, ITokenRoot, refreshToken } from "./Tokens";

/**
 * Función para obtener la estructura de los módulos.
 * 
 * Toma la url del orquestador y realiza la consulta de los módulos.
 * 
 * @param token Token de autenticación
 * @returns 
 */
const getStructure = async () => {
  const iRootData = await getDataFromIndexedDB(STORE.db.structure.name, STORE.db.structure.id);

  if (iRootData) {
    return iRootData;
  }

  const url = import.meta.env.VITE_ORQUESTADOR_URL + 'structure/modules';
  let iFetchData = createFetchData();
  const token: ITokenRoot = await getToken();

  if (token) {
    iFetchData = await fetchData({
      url: url,
      methodRest: MethodREST.GET,
      typeBody: TypeBody.NONE,
      bodyParameter: null,
      token: token.accessToken,
      getToken: async () => {
        return await refreshToken();
      }
    });
    if (!iFetchData.error) {
      await addDataToIndexedDB(STORE.db.structure.name, STORE.db.structure.id, iFetchData);
    }
  }
  return iFetchData;
}

/**
 * Función para obtener el primer módulo de la estructura.
 * 
 * @param token Token de autenticación
 * @returns
 */
const getFirtsModule = async () => {
  const iRootData = await getStructure().then((data) => {
    if (data.response) {
      return data.response.modules[0];
    }
  });

  return iRootData;
}

/**
 * Función para refrescar la estructura.
 * 
 * @param token Token de autenticación
 * @returns
 */
const refresh = async () => {
  await deleteDataById(STORE.db.structure.name, STORE.db.structure.id).then(async () => {
    return await getStructure();
  });

  return null;
}

export { getStructure, getFirtsModule, refresh };