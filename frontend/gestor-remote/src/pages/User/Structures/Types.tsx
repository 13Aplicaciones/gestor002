/**
 * Interfaz para el objeto de respuesta de la llamada.
 */
interface IRowDataUser {
    uuid: string;
    nick: string;
    name: string;
    lastName: string;
    status: string;
    user: string;
    userApp: string;
    userDate: string;
}

/**
 * Funcion para crear un objeto de respuesta vacio.
 * 
 * @returns 
 */
const createIRowDataUser = (): IRowDataUser => {
    return {
        uuid: "",
        nick: "",
        name: "",
        lastName: "",
        status: "",
        user: "",
        userApp: "",
        userDate: "",
    };
}
export { createIRowDataUser };
export type { IRowDataUser };
