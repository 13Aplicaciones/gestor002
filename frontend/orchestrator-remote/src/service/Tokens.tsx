import { addDataToIndexedDB, createFetchData, fetchData, getDataFromIndexedDB, MethodREST, TypeBody, } from "api-fetch";
import { STORE } from "../Constants";

/**
 * Definicion de los tipos de dato que se van a manejar en el user Store
 */
export type ITokenRoot = {
    user: string;
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
    idToken: string;
    email: string;
    name: string;
};

/**
 * Función para agregar un token a la base de datos.
 * 
 * @param token Token a agregar
 * @param idToken Identificador del token 
 * @returns 
 */
const addToken = async ({ token }: { token: ITokenRoot }) => {
    await addDataToIndexedDB(STORE.db.token.name, STORE.db.token.id, token);
    return token;
}

/**
 * Función para obtener un token de la base de datos.
 * 
 * @param idToken Identificador del token
 * @returns 
 */
const getToken = async () => {
    const token: ITokenRoot = await getDataFromIndexedDB(STORE.db.token.name, STORE.db.token.id);
    return token;
}

/**
 * Función para refrescar un token.
 * 
 * @returns 
 */
const refreshToken = async () => {
    const token: ITokenRoot = await getToken();
    const url = import.meta.env.VITE_ORQUESTADOR_URL + 'login/refreshToken/' + token.refreshToken;

    let iFetchData = createFetchData();
    iFetchData = await fetchData({
        url: url,
        methodRest: MethodREST.GET,
        typeBody: TypeBody.NONE,
        bodyParameter: null,
    });

    if (!iFetchData.error) {
        await addToken({ token: iFetchData.response });
    }

    return token.accessToken;
}

export { addToken, getToken, refreshToken };
