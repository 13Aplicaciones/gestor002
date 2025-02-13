import { Alerts } from "../ConstantsPresentation";
import { cargarCredencial } from "../redux/Store";
import { fetchData } from "../api/Api";
import { MethodREST, TypeBody } from "../APIConstants";
import { toast } from "../components/toast/Toast";

/**
 * Funcion para ejecutar una api.
 * 
 * @author @omargo33
 * @returns 
 */
const runApi = () => {
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
        methodRest: MethodREST.POST,
        typeBody: TypeBody.FORM_URLENCODED,
        bodyParameter: data
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
            alert: Alerts.warning
          });
          return;
        } else {
          cargarCredencial({ id: "tokenKeycloak", token: response.response });
          toast({
            title: "conectado",
            description: "super conecatad",
            alert: Alerts.info
          });
        }
      }).catch(error => {
        console.error("Error: " + error);
      });
  }

export default runApi;
