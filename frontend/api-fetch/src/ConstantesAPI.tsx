/**
 * Enumerado de metodos REST que se pueden utilizar.
 */
const enum MethodREST {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
}

/**
 * Enumerado de tipos de body que se pueden utilizar.
 */
const enum TypeBody {
    NONE = "none",
    JSON = "raw",
    FORM_URLENCODED = "x-www-form-urlencoded",
    FORM_DATA = "form-data",
    MULTIPART = "multipart/form-data",
    URL_PARAMS = "url-params",
}

export { TypeBody, MethodREST };