/* eslint-disable @typescript-eslint/no-explicit-any */
import { generarParametrosUrl, generarRequestBody } from "./CommonAPI";
import { MetodosREST, TipoBody } from "../ConstantesAPI";
import i18next from "i18next";

/**
 * Funciones consultas a API Rest.
 * 
 * @autor @omargo33
 * @since 2025-01-20
 * 
 */

/**
 * Interfaz para el objeto de respuesta de la llamada.
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
 * @param tipoBody Tipo de body o parametros que se envian 
 * @param bodyParametro Body o Parametros que se envian
 * @param token Token de autenticación
 * @returns devuelve un objeto con la respuesta del servicio
 */
export const fetchData = async (
  { url, methodRest, tipoBody, bodyParametro, token }:
    { url: string, methodRest: MetodosREST, tipoBody: TipoBody, bodyParametro?: any, token?: string }
) => {
  const respuesta: IFetchData = {
    responseErrorJSON: null,
    responseErrorText: null,
    response: null,
    status: 200,
    error: null
  };

  url = url + generarParametrosUrl(tipoBody, bodyParametro);
  const requestInit = generarRequestBody(methodRest, tipoBody, bodyParametro, token) as RequestInit;

  try {

    const respuestaFetch = await fetch(url, requestInit);
    if ( respuestaFetch.ok) {
      if (respuestaFetch.status === 204) {
        respuesta.response = null;
      } else {
        respuesta.response = await respuestaFetch.json();
      }

      respuesta.status = respuestaFetch.status;
    } else {
      const contentType = respuestaFetch.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        respuesta.responseErrorJSON = await respuestaFetch.json();
      } else {
        respuesta.responseErrorText = await respuestaFetch.text();
      }
      respuesta.status = respuestaFetch.status;
      respuesta.error = i18next.t('httpStatus.' + respuestaFetch.status, { ns: 'global' });
    }
  } catch (e) {
    respuesta.error = e instanceof Error ? e.message : String(e);
    respuesta.status = 500;
  }
  return respuesta;
}

