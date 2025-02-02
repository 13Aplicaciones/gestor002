import { Alertas } from "../ConstantesPresentacion";
import { cargarCredencial } from "../redux/Store";
import { fetchData } from "../api/Api";
import { MetodosREST, TipoBody } from "../ConstantesAPI";
import { toast } from "../componentes/toast/Toast";

/**
 * Funcion para ejecutar una api.
 * 
 * @author @omargo33
 * @returns 
 */
const ejecutarApi = () => {
    const data = {
      username: 'root',
      password: '12341234s',
      client_id: 'gestor002-client',
      //client_secret: 'NGrjAmonCxkiOlUJ1Wj1KgeS5mKRZfmG',
      grant_type: 'password'
    };


    fetchData(
      {
        url: "http://localhost:8080/realms/portal-realm/protocol/openid-connect/token",
        methodRest: MetodosREST.POST,
        tipoBody: TipoBody.FORM_URLENCODED,
        bodyParametro: data
      }
    ).then(response => {
        console.log("responseErrorJSON", response.responseErrorJSON);
        console.log("responseErrorText", response.responseErrorText);
        console.log("response", response.response);
        console.log("status", response.status);
        console.log("error", response.error);

        if (response.error) {
          toast({
            title: response.status.toString(),
            description: response.error,
            alerta: Alertas.warning
          });
          return;
        } else {
          cargarCredencial({ id: "tokenKeycloak", token: response.response });
          toast({
            title: "conectado",
            description: "super conecatad",
            alerta: Alertas.info
          });
        }
      }).catch(error => {
        console.error("Error: " + error);
      });
  }

export default ejecutarApi;
