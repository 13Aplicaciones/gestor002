/**
 * Interfaz para el objeto de respuesta de la llamada.
 */
interface IRowDataModule {
    context: string;
    indexModule: string;
    name: string;
    orden: number;
    status: string;
    user: string;
    userApp: string;
    userDate: string;
    uuid: string;
}

/**
 * Funcion para crear un objeto de respuesta vacio.
 *
 * @returns
 */
const createIRowDataModule = (): IRowDataModule => {
    return {
        context: "",
        indexModule: "",
        name: "",
        orden: 0,
        status: "",
        user: "",
        userApp: "",
        userDate: "",
        uuid: "",
    };
};

export { createIRowDataModule };
export type { IRowDataModule };
