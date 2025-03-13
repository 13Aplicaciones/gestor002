import { createFetchData, fetchData, MethodREST, TypeBody } from "api-fetch";
import { getToken, ITokenRoot, refreshToken } from "./Tokens";

/**
 * Función para obtener la estadistica basica de un card.
 * 
 * Toma la url del orquestador y realiza la consulta de los módulos.
 * 
 * @param token Token de autenticación
 * @returns 
 */
const getStatic = async (index:string) => {
    const url = import.meta.env.VITE_ORQUESTADOR_URL + 'structure/menu/static=' + index;
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
        return iFetchData.response;
      }
    }
    return iFetchData;
  }

  export { getStatic }
  