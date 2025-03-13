import { addDataToIndexedDB, createFetchData, deleteDataById, getDataFromIndexedDB } from "api-fetch";
import { fetchData } from "api-fetch";
import { getToken, ITokenRoot, refreshToken } from "./Tokens";
import { MethodREST, TypeBody } from 'api-fetch'
import { STORE } from "../Constants";

/**
 * Función para obtener la estructura de los módulos.
 * 
 * Toma la url del orquestador y realiza la consulta de los módulos.
 * 
 * @param token Token de autenticación
 * @returns 
 */
const getStructure = async () => {
  const iRootData = await getDataFromIndexedDB(STORE, STORE.ddl.structure.name);

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
      token: token.access_token,
      getToken: async () => {
        return await refreshToken();
      }
    });
    if (!iFetchData.error) {
      await addDataToIndexedDB(STORE, STORE.ddl.structure.name, iFetchData.response);
      return iFetchData.response;
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
    if (data) {
      return data.modules[0];
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
const refreshStructure = async () => {
  await deleteDataById(STORE, STORE.ddl.structure.name).then(async () => {
    return await getStructure();
  });

  return null;
}

/**
 * Función para seleccionar un módulo.
 * 
 * @param index index del modulo seleccionado
 */
const setSelectModule = async (index: string) => {
  const structure = await getStructure();
  if (structure) {
    const module = structure.modules[index];
    if (module) {
      await addDataToIndexedDB(STORE, STORE.ddl.moduleSelect.name, module);
      await setSelectMenu("0");
    }
  }
}

/**
 * Función para obtener el módulo seleccionado.
 * 
 * @returns 
 */
const getSelectModule = async () => {
  const module = await getDataFromIndexedDB(STORE, STORE.ddl.moduleSelect.name);
  return module;
}

/**
 * Función para seleccionar un menú.
 * 
 * @param index index del menu que se usa sobre el modulo seleccionado
 */
const setSelectMenu = async (index: string) => {
  const module = await getDataFromIndexedDB(STORE, STORE.ddl.moduleSelect.name);
  if (module) {
    const menuSelect = module.menus[index];
    if (menuSelect) {
      await addDataToIndexedDB(STORE, STORE.ddl.menuSelect.name, menuSelect);
    }
  }
}

/**
 * Función para obtener el menú seleccionado.
 * 
 * @returns 
 */
const getSelectMenu = async () => {
  const menu = await getDataFromIndexedDB(STORE, STORE.ddl.menuSelect.name);
  return menu;
}

export { getStructure, getFirtsModule, refreshStructure, setSelectModule, getSelectModule, setSelectMenu, getSelectMenu };