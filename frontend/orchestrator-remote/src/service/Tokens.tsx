import { addDataToIndexedDB, createFetchData, fetchData, getDataFromIndexedDB, MethodREST, TypeBody, } from "api-fetch";
import { STORE } from "../Constants";

/**
 * Definicion de los tipos de dato que se van a manejar en el user Store
 */
export type ITokenRoot = {
    user: string;
    access_token: string;
    refresh_token: string;
    expires_at: number;
    id_token: string;
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
    await addDataToIndexedDB(STORE, STORE.ddl.token.name, '', token);
    return token;
}

/**
 * Función para obtener un token de la base de datos.
 * 
 * @param idToken Identificador del token
 * @returns 
 */
const getToken = async () => {
    const token: ITokenRoot = await getDataFromIndexedDB(STORE, STORE.ddl.token.name);
    return token;
}

/**
 * Función para refrescar un token.
 * 
 * @returns 
 */
const refreshToken = async () => {
    const token: ITokenRoot = await getToken();
    const url = import.meta.env.VITE_ORCHESTRATOR_URL + 'login/refreshToken/' + token.refresh_token;

    let iFetchData = createFetchData();
    iFetchData = await fetchData({
        url: url,
        methodRest: MethodREST.GET,
        typeBody: TypeBody.NONE,
        bodyParameter: null,
    });

    if (!iFetchData.error) {
        await addToken({ token: iFetchData.response });
    } else {
        console.error("refreshToken -> Error:", JSON.stringify(iFetchData.error));
    }

    return token.access_token;
}

export { addToken, getToken, refreshToken };
