/**
 * Interfaz para el objeto de respuesta de la llamada.
 */
interface IRowDataInformation {
    uuid: string;
    name: string;
    value01: string;
    value02: string;
    user: string;
    userApp: string;
    userDate: string;
}

/**
 * Funcion para crear un objeto de respuesta vacio.
 * 
 * @returns 
 */
const createIRowDataInformation = (): IRowDataInformation => {
    return {
        uuid: "",
        name: "",
        value01: "",
        value02: "",
        user: "",
        userApp: "",
        userDate: "",
    };
}
export { createIRowDataInformation };
export type { IRowDataInformation };

