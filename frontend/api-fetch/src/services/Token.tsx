import { fetchData } from "./Api";
import { MethodREST, TypeBody } from "../APIConstants";

/**
 * Funciones de manejo de Token para el API Rest.
 * 
 * @autor @omargo33
 * @since 2025-01-20
 * 
 */

/**
 * Interfaz para el objeto de respuesta de la llamada.
 */
export interface ICredencialKeycloak {
    accessToken: string;
    expiresIn: number;
    refreshExpiresIn: number;
    refreshToken: string;
    tokenType: string;
    notBeforePolicy: number;
    sessionState: string;
    scope: string;
}

/**
 * Función para obtener el token de acceso.
 * 
 * @urlRefresh URL para obtener el token de refresco.
 * @tokenRefresh Token de refresco.
 * @returns 
 */
export const fetchRequestToken = async ({ urlRefresh, tokenRefresh }: { urlRefresh: string, tokenRefresh: string }) => {

    const credencial: ICredencialKeycloak = {
        accessToken: '',
        expiresIn: 0,
        refreshExpiresIn: 0,
        refreshToken: '',
        tokenType: '',
        notBeforePolicy: 0,
        sessionState: '',
        scope: ''
    };

    const responseToken = fetchData({
        url: urlRefresh + tokenRefresh,
        methodRest: MethodREST.GET,
        typeBody: TypeBody.NONE,
    }).then(response => {

        if (response.status === 200) {
            credencial.accessToken = response.response.access_token;
            credencial.expiresIn = response.response.expires_in;
            credencial.refreshExpiresIn = response.response.refresh_expires_in;
            credencial.refreshToken = response.response.refresh_token;
            credencial.tokenType = response.response.token_type;
            credencial.notBeforePolicy = response.response.not_before_policy;
            credencial.sessionState = response.response.session_state;
            credencial.scope = response.response.scope;
            return credencial;
        }
    }
    ).catch(error => {
        console.error("Error: " + JSON.stringify(error));
        throw new Error("Failed to fetch token: " + JSON.stringify(error));
    });

    return responseToken;
}