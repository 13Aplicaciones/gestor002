/* eslint-disable @typescript-eslint/no-explicit-any */
import { addDataToIndexedDB, createFetchData, deleteDataById, fetchData, getDataFromIndexedDB, MethodREST, TypeBody } from "api-fetch";
import { STORE } from "../Constants";
import { getToken, ITokenRoot, refreshToken } from "./Tokens";

/**
 * Definicion de los tipos de dato que se van a manejar los codigos definidos por el usuario.
 */
export interface IUserDefinedCode {
    Array: [
        {
            group: string;
            codes: Array<{
                group: string;
                codeText: string;
                codeNumber: number;
                name: string;
                description: string;
                order: number;
                status: string;
            }>;
        }
    ];
}

/**
 * Funcion para obtener los codigos definidos por el usuario de los modulos.
 * 
 * Toma la url del orquestador y realiza la consulta de los codigos definidos por el usuario por index de modulos.
 * 
 * @param indexModule Index del módulo
 * @returns 
 */
const getUserDefinedCodes = async (indexModule: string) => {

    const iRootData = await getDataFromIndexedDB(
        STORE,
        STORE.ddl.userDefinedCode.name,
        indexModule
    );

    if (iRootData) {
        return iRootData;
    }

    const url =
        import.meta.env.VITE_ORQUESTADOR_URL +
        "structure/udc/module=" +
        indexModule;

    let iFetchData = createFetchData();
    const token: ITokenRoot = await getToken();
    if (token) {
        iFetchData = await fetchData({
            url: url,
            methodRest: MethodREST.GET,
            typeBody: TypeBody.NONE,
            bodyParameter: null,
            token: token.access_token,
            getToken: async () => {
                return await refreshToken();
            },
        });
        if (!iFetchData.error) {
            console.log('iFetchData', iFetchData);
            await addDataToIndexedDB(
                STORE,
                STORE.ddl.userDefinedCode.name,
                indexModule,
                iFetchData.response
            );
            console.log('iFetchData Module', iFetchData);
            return iFetchData.response;


        }
    }
    return iFetchData;
};

/**
 * Funcion para obtener los codigos definidos por el usuario por grupo.
 * 
 * @param indexModule 
 * @param group 
 * @returns 
 */
const getUserDefinedCodeByGroup = async (indexModule: string, group: string) => {
    const iRootData = await getUserDefinedCodes(indexModule);

    if (iRootData) {
        try {
            const data = iRootData.filter((item: any) => item.group === group);
            if (data.length > 0) {
                return data[0].codes;
            }
            console.warn('No codes found for the specified group.');
        } catch (error) {
            console.error('Error al filtrar los codigos:', error);
        }
    }
    console.warn('No se encontraron datos de codigos definidos por el usuario.');
    return [];
}

/**
 * Funcion para refrescar los codigos definidos por el usuario.
 * 
 * @param indexModule 
 * @returns 
 */
const refreshUserDefinedCode = async (indexModule: string) => {
    await deleteDataById(STORE, STORE.ddl.userDefinedCode.name, indexModule).then(async () => {
        return await getUserDefinedCodes(indexModule);
    });

    return null;
}

export { getUserDefinedCodes, getUserDefinedCodeByGroup, refreshUserDefinedCode };
