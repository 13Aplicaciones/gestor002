import { createFetchData, IFetchData } from "api-fetch/src/services/Api";
import { fetchData } from "api-fetch";
import { MethodREST, TypeBody } from "api-fetch/src/APIConstants";

/**
 * Función para obtener la estructura de los módulos.
 * 
 * Toma la url del orquestador y realiza la consulta de los módulos.
 * 
 * @param token Token de autenticación
 * @returns 
 */
const getStructure = async (
  { token }: 
  { token: string }
) => {
  const url = import.meta.env.VITE_ORQUESTADOR_URL + 'structure/modules';
  let iFetchData = createFetchData();

  iFetchData = await fetchData({
        url: url,
        methodRest: MethodREST.GET,
        typeBody: TypeBody.NONE,
        bodyParameter: null,
        token: token
      }).then(response => {
        return response as IFetchData;
      }).catch(error => {
        iFetchData.error = error;
        return iFetchData;
      });

  return iFetchData;
}

export { getStructure };
