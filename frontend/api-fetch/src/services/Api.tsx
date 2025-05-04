/* eslint-disable @typescript-eslint/no-explicit-any */
import { MethodREST, TypeBody } from "../APIConstants";
import globalApiFetchEs from "../locales/es/global-api-fetch.json";
import { generateParametersUrl, generateRequestBody } from "./CommonAPI";

/**
 * Funciones consultas a API Rest.
 *
 * @autor @omargo33
 * @since 2025-01-20
 *
 */

/**
 * Interfaz para el objeto de iFetchData de la llamada.
 */
export interface IFetchData {
  responseErrorJSON: any;
  responseErrorText: string | null;
  response: any;
  status: number;
  error: string | null;
  statusDescription?: string | null;
}

/**
 * Función para instanciar un objeto IFetchData.
 *
 * @returns devuelve un objeto IFetchData inicializado
 */
export const createFetchData = (): IFetchData => {
  return {
    responseErrorJSON: null,
    responseErrorText: null,
    response: null,
    status: 200,
    error: null,
    statusDescription: null,
  };
};

/**
 * Funcion para consumir un REST API.
 *
 * Con pre-configuración de token y función personalizada para obtener un nuevo token.
 *
 * @param url Dirección del servicio
 * @param methodRest Metodo de consumo
 * @param typeBody Tipo de body o parametros que se envian
 * @param bodyParameter Body o Parametros que se envian
 * @param token Token de autenticación
 * @param customFunction Función personalizada para obtener un nuevo token
 * @returns devuelve un objeto con la iFetchData del servicio
 */
export const fetchData = async ({
  url,
  methodRest,
  typeBody,
  bodyParameter,
  token,
  getToken,
}: {
  url: string;
  methodRest: MethodREST;
  typeBody: TypeBody;
  bodyParameter?: any;
  token?: string;
  getToken?: (() => Promise<string>) | undefined;
}) => {
  if (!token) {
    return await fetchDataConfigurated({
      url,
      methodRest,
      typeBody,
      bodyParameter,
    });
  } else {
    const iFetchData: IFetchData = await fetchDataConfigurated({
      url,
      methodRest,
      typeBody,
      bodyParameter,
      token,
    });

    if (iFetchData.status === 401 && getToken) {
      const newToken: string = await getToken();
      return await fetchDataConfigurated({
        url,
        methodRest,
        typeBody,
        bodyParameter,
        token: newToken,
      });
    }

    return iFetchData;
  }
};

/**
 * Funcion para consumir un REST API.
 *
 * Este elemento esta basado en el uso de fetch para consumir un servicio REST.
 *
 * Tiene dinamico el metodo de consumo, el tipo de body, si se requiere token y el token.
 *
 * @param url Dirección del servicio
 * @param methodRest Metodo de consumo
 * @param typeBody Tipo de body o parametros que se envian
 * @param bodyParameter Body o Parametros que se envian
 * @param token Token de autenticación
 * @returns devuelve un objeto con la iFetchData del servicio
 */
const fetchDataConfigurated = async ({
  url,
  methodRest,
  typeBody,
  bodyParameter,
  token,
}: {
  url: string;
  methodRest: MethodREST;
  typeBody: TypeBody;
  bodyParameter?: any;
  token?: string;
}) => {
  const iFetchData = createFetchData();
  url = url + generateParametersUrl(typeBody, bodyParameter);
  const requestInit = generateRequestBody(
    methodRest,
    typeBody,
    bodyParameter,
    token
  ) as RequestInit;

  try {
    const responseFetch = await fetch(url, requestInit);
    if (responseFetch.ok) {
      if (responseFetch.status === 204) {
        iFetchData.response = null;
      } else {
        iFetchData.response = await responseFetch.json();
      }

      iFetchData.status = responseFetch.status;
    } else {
      const contentType = responseFetch.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        iFetchData.responseErrorJSON = await responseFetch.json();
      } else {
        iFetchData.responseErrorText = await responseFetch.text();
      }
      iFetchData.status = responseFetch.status;
      iFetchData.error =
        globalApiFetchEs.httpStatus[
          responseFetch.status.toString() as keyof typeof globalApiFetchEs.httpStatus
        ];
    }
  } catch (e) {
    iFetchData.status = 500;
    iFetchData.error = e instanceof Error ? e.message : String(e);
    console.error(
      "fetchDataConfigurated -> error: ",
      e,
      JSON.stringify(iFetchData)
    );
  }

  iFetchData.statusDescription =
    globalApiFetchEs.httpStatusResolve[
      iFetchData.status.toString() as keyof typeof globalApiFetchEs.httpStatus
    ];
  return iFetchData;
};
