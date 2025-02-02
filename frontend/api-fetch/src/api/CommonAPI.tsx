import { MetodosREST, TipoBody } from "../ConstantesAPI";
import { convertJsontToUrlParams, removeEmptyFields } from "../tools/ToolsJSON";

/**
 * Funciones comunes para las consultas a API Rest.
 * 
 * @autor @omargo33
 * @since 2025-01-20
 * 
 */

/**
 * Funcion para generar el body de la llamada.
 * 
 * @param methodRest Metodo de consumo 
 * @param tipoBody Tipo de body o parametros que se envian
 * @param bodyParametro Body o Parametros que se envian
 * @param token Token de autenticación
 * @returns 
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const generarRequestBody = (methodRest: MetodosREST, tipoBody: TipoBody, bodyParametro?: any, token?: string) => {
   let bodyTemp = null;

   switch (tipoBody) {
      case TipoBody.NONE:
         bodyTemp = null;
         break;
      case TipoBody.JSON:
         bodyTemp = JSON.stringify(bodyParametro);
         break;
      case TipoBody.FORM_URLENCODED:
         bodyTemp = Object.keys(bodyParametro)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(bodyParametro[key]))
            .join('&');
         break;
      case TipoBody.FORM_DATA:
         //TODO: Implementar
         bodyTemp = "data";
         break;
      case TipoBody.MULTIPART:
         //TODO: Implementar
         bodyTemp = "multipart/form-data";
         break;
      default:
         bodyTemp = null;
         break;
   }

   if (bodyTemp === null) {
      return {
         method: methodRest,
         headers: generarHeader(tipoBody, token)
      };
   }

   return {
      method: methodRest,
      headers: generarHeader(tipoBody, token),
      body: bodyTemp
   };
}
/**
 * Metodo para generar los headers de la llamada para form url encoded.
 * 
 * @param tipoBody Tipo de body o parametros que se envian
 * @param token Token de autenticación
 * 
 * @returns 
 */
const generarHeader = (tipoBody: TipoBody,token?: string) => {
   if (token === undefined || token === null || token === "") {
      switch (tipoBody) {
         case TipoBody.NONE:
            return {
               Accept: "*/*"
            };
         case TipoBody.JSON:
            return {
               Accept: "application/json",
               "Content-Type": "application/json; charset=utf-8"
            };
         case TipoBody.FORM_URLENCODED:
            return {
               Accept: "application/json",
               "Content-Type": "application/x-www-form-urlencoded"
            };
         case TipoBody.FORM_DATA:
            return {
               Accept: "application/json",
               "Content-Type": "multipart/form-data"
            };
         case TipoBody.MULTIPART:
            return {
               Accept: "application/json",
               "Content-Type": "multipart/form-data"
            };
         default:
            return {
               Accept: "application/json",
               "Content-Type": "application/json; charset=utf-8"
            };
      }
   } else {
      switch (tipoBody) {
         case TipoBody.NONE:
            return {
               Accept: "*/*",
               Authorization: `Bearer ${token}`
            };
         case TipoBody.JSON:
            return {
               Accept: "*/*",
               "Content-Type": "application/json; charset=utf-8",
               Authorization: `Bearer ${token}`
            };
         case TipoBody.FORM_URLENCODED:
            return {
               Accept: "*/*",
               "Content-Type": "application/x-www-form-urlencoded",
               Authorization: `Bearer ${token}`
            };
         case TipoBody.FORM_DATA:
            return {
               Accept: "*/*",
               "Content-Type": "multipart/form-data",
               Authorization: `Bearer ${token}`
            };
         case TipoBody.MULTIPART:
            return {
               Accept: "*/*",
               "Content-Type": "multipart/form-data",
               Authorization: `Bearer ${token}`
            };
         default:
            return {
               Accept: "*/*",
               Authorization: `Bearer ${token}`
            };
      }
   }
}

/**
 * Funcion para generar los parametros de la URL.
 * 
 * @param tipoBody
 * @param bodyParametro
 *  
 * @returns 
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const generarParametrosUrl = (tipoBody: TipoBody, bodyParametro: any) => {
   if (tipoBody !== TipoBody.URL_PARAMS) {
      return "";
   }
   if (bodyParametro === null || bodyParametro === undefined) {
      return "";
   }
   const cleanedData = removeEmptyFields(bodyParametro);
   const parametrosURL = convertJsontToUrlParams(cleanedData);
   return "?" + parametrosURL;
}
export { generarRequestBody, generarParametrosUrl };