/* eslint-disable @typescript-eslint/no-explicit-any */
import i18n from "../i18n";

/**
 * Funciones para pasar a un "Padre" de frontend la internacionalización de la aplicación.
 * 
 * @author @omargo33
 * @since 2025-03-22
 *   const testIne18 = getTranslation("actions.errorFetch", { error: "hola" });
  const testIne18Int = getTranslationWithLangAndNS(
    "actions.errorFetch",
    "es",
    "global_api",
    { error: "hola" }
  );

 * 
 */

/**
 * Funcion para obtener el internacionalización de la aplicación como insumo para los mensajes de la aplicación.
 * 
 * @param key 
 * @param options 
 * @returns 
 */
function getTranslation(key: string, options?: any): string {
    const i = i18n;
    return i.t(key, options) as string;
}

/**
 * Funcion para obtener el internacionalización de la aplicación como insumo para los mensajes de la aplicación.
 * 
 * @param key 
 * @param lang 
 * @param ns 
 * @param options 
 * @returns 
 */
function getTranslationWithLangAndNS(key: string, lang: string, ns: string, options?: any): string {
    const i = i18n;    
    return  i.t(key, { ...options, lng: lang, ns }) as string;
}


export {getTranslation, getTranslationWithLangAndNS};