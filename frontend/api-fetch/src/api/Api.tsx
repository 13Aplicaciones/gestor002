/* eslint-disable @typescript-eslint/no-explicit-any */
import { generateParametersUrl, generateRequestBody } from "./CommonAPI";
import { MethodREST, TypeBody } from "../APIConstants";
import i18next from "i18next";

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
}

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
export const fetchData = async (
  { url, methodRest, typeBody, bodyParameter, token }:
    { url: string, methodRest: MethodREST, typeBody: TypeBody, bodyParameter?: any, token?: string }
) => {
  const iFetchData: IFetchData = {
    responseErrorJSON: null,
    responseErrorText: null,
    response: null,
    status: 200,
    error: null
  };

  url = url + generateParametersUrl(typeBody, bodyParameter);
  const requestInit = generateRequestBody(methodRest, typeBody, bodyParameter, token) as RequestInit;

  try {

    const responseFetch = await fetch(url, requestInit);
    if ( responseFetch.ok) {
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
      iFetchData.error = i18next.t('httpStatus.' + responseFetch.status, { ns: 'global' });
    }
  } catch (e) {
    iFetchData.error = e instanceof Error ? e.message : String(e);
    iFetchData.status = 500;
  }
  return iFetchData;
}

