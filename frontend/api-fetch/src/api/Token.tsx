import { toast } from "../componentes/toast/Toast";
import { MetodosREST, TipoBody } from "../ConstantesAPI";
import { Alertas } from "../ConstantesPresentacion";
import { fetchData } from "./Api";

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
export interface ICredencialk {
    accessToken: string;
    expiresIn: number;
    refreshExpiresIn: number;
    refreshToken: string;
    tokenType: string;
    notBeforePolicy: number;
    sessionState: string;
    scope: string;
}

//TODO: Implementar el request token 
export const requestToken = async () => {
    /*const credencial: ICredencialk = {
        accessToken: '',
        expiresIn: 0,
        refreshExpiresIn: 0,
        refreshToken: '',
        tokenType: '',
        notBeforePolicy: 0,
        sessionState: '',
        scope: ''
    };*/

    const data = {
        username: 'root',
        password: '12341234s',
        client_id: 'gestor002-client',
        grant_type: 'password'
    };

    const miRespuesta = fetchData({
        url: "http://localhost:8080/realms/portal-realm/protocol/openid-connect/token",
        methodRest: MetodosREST.POST,
        tipoBody: TipoBody.FORM_URLENCODED,
        bodyParametro: data
    }).then(response => {

        if (response.status === 200) {
            /*credencial.accessToken = response.response.access_token;
            credencial.expiresIn = response.response.expires_in;
            credencial.refreshExpiresIn = response.response.refresh_expires_in;
            credencial.refreshToken = response.response.refresh_token;
            credencial.tokenType = response.response.token_type;
            credencial.notBeforePolicy = response.response.not_before_policy;
            credencial.sessionState = response.response.session_state;
            credencial.scope = response.response.scope;*/

            return response.response;
        }
    }
    ).catch(error => {
        toast({
            title: "Error",
            description: error,
            alerta: Alertas.error
        });
        console.error("Error: " + JSON.stringify(error));
    });


    return miRespuesta;
}