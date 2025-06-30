/* eslint-disable @typescript-eslint/no-unused-vars */
import { MethodREST, TypeBody } from "../APIConstants";
import { convertJsontToUrlParams, removeEmptyFields } from "../utils/ToolsJSON";
import { IFetchData } from "./Api";

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
 * @param typeBody Tipo de body o parametros que se envian
 * @param bodyParameter Body o Parametros que se envian
 * @param token Token de autenticación
 * @returns 
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const generateRequestBody = (methodRest: MethodREST, typeBody: TypeBody, bodyParameter?: any, token?: string) => {
   let bodyTemp = null;

   switch (typeBody) {
      case TypeBody.NONE:
         bodyTemp = null;
         break;
      case TypeBody.JSON:
         bodyTemp = JSON.stringify(bodyParameter);
         break;
      case TypeBody.FORM_URLENCODED:
         bodyTemp = Object.keys(bodyParameter)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(bodyParameter[key]))
            .join('&');
         break;
      case TypeBody.FORM_DATA:
         bodyTemp = "data";
         break;
      case TypeBody.MULTIPART:
         bodyTemp = "multipart/form-data";
         break;
      default:
         bodyTemp = null;
         break;
   }

   if (bodyTemp === null) {
      return {
         method: methodRest,
         headers: generateHeader(typeBody, token)
      };
   }

   return {
      method: methodRest,
      headers: generateHeader(typeBody, token),
      body: bodyTemp
   };
}
/**
 * Metodo para generar los headers de la llamada para form url encoded.
 * 
 * @param typeBody Tipo de body o parametros que se envian
 * @param token Token de autenticación
 * 
 * @returns 
 */
const generateHeader = (typeBody: TypeBody,token?: string) => {
   if (token === undefined || token === null || token === "") {
      switch (typeBody) {
         case TypeBody.NONE:
            return {
               Accept: "*/*"
            };
         case TypeBody.JSON:
            return {
               Accept: "application/json",
               "Content-Type": "application/json; charset=utf-8"
            };
         case TypeBody.FORM_URLENCODED:
            return {
               Accept: "application/json",
               "Content-Type": "application/x-www-form-urlencoded"
            };
         case TypeBody.FORM_DATA:
            return {
               Accept: "application/json",
               "Content-Type": "multipart/form-data"
            };
         case TypeBody.MULTIPART:
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
      switch (typeBody) {
         case TypeBody.NONE:
            return {
               Accept: "*/*",
               Authorization: `Bearer ${token}`
            };
         case TypeBody.JSON:
            return {
               Accept: "*/*",
               "Content-Type": "application/json; charset=utf-8",
               Authorization: `Bearer ${token}`
            };
         case TypeBody.FORM_URLENCODED:
            return {
               Accept: "*/*",
               "Content-Type": "application/x-www-form-urlencoded",
               Authorization: `Bearer ${token}`
            };
         case TypeBody.FORM_DATA:
            return {
               Accept: "*/*",
               "Content-Type": "multipart/form-data",
               Authorization: `Bearer ${token}`
            };
         case TypeBody.MULTIPART:
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
 * @param typeBody
 * @param bodyParameter
 *  
 * @returns 
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const generateParametersUrl = (typeBody: TypeBody, bodyParameter: any) => {
   if (typeBody !== TypeBody.URL_PARAMS) {
      return "";
   }
   if (bodyParameter === null || bodyParameter === undefined) {
      return "";
   }
   const cleanedData = removeEmptyFields(bodyParameter);
   const parametrosURL = convertJsontToUrlParams(cleanedData);

   return "?" + parametrosURL;
}

  /**
   * Función para formatear el mensaje JSON
   *
   * @param response
   * @returns
   */
  const formatMessageJson = (response: IFetchData) => {
   try {
     const parsedMessage = response.responseErrorJSON;
     const title = parsedMessage.message
       ? "<strong>" + parsedMessage.message + "</strong>"
       : "";

     delete parsedMessage.details;
     delete parsedMessage.timestamp;
     delete parsedMessage.message;

     if (Object.keys(parsedMessage).length > 0) {
       const all =
         `<br>${title}</br></br>` +
         Object.entries(parsedMessage)
           .map(([key, value]) => {
             const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
             return `<strong>${capitalizedKey}</strong>: ${value} </br>`;
           })
           .join(" ");
       return all;
     } else {
       return title;
     }
   } catch (error) {
     return response.responseErrorText || "";
   }
 };


export { generateRequestBody, generateParametersUrl, formatMessageJson };