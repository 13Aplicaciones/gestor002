/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Funciones para trabajar con objetos JSON y URL.
 * 
 * @author @omargo33
 * @since 2025-01-10
 * 
 */

/**
 * Metodo para eliminar los fields vacios de un objeto JSON.
 * 
 * @param objeto Objeto JSON.  
 * @returns 
 */
const removeEmptyFields = (objeto: any) => {
    return Object.fromEntries(
        Object.entries(objeto)
            .filter(([_, v]) => v != null && v !== '')
    );
};

/**
 * Metodo para convertir un objeto JSON en parametros de URL.
 * 
 * @param objeto Objeto JSON a convertir en parametros de URL. 
 * 
 * @returns 
 */
const convertJsontToUrlParams = (objeto: any) => {
    return Object.keys(objeto)
                  .map(key => encodeURIComponent(key.trim()) + '=' + encodeURIComponent(objeto[key]).trim())
                  .join('&');
}


const convertArrayJsontToUrlParams = (objeto: any) => {
    return Object.keys(objeto)
                  .map(key => encodeURIComponent(objeto[key]).trim())
                  .join('&');
}

export { removeEmptyFields, convertJsontToUrlParams, convertArrayJsontToUrlParams };