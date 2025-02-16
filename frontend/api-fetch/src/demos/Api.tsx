import { fetchData } from "../services/Api";
import { MethodREST, TypeBody } from "../APIConstants";

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
      console.log("response", JSON.stringify(response));
      return response;
    } else {
      console.log("response", response.response);
      console.log("response", response.response.access_token);
      return response;
    }
  }).catch(error => {
    throw new Error("Failed to fetch token: " + JSON.stringify(error));
    console.error("Error: " + error);
  });
}

export default runApi;
