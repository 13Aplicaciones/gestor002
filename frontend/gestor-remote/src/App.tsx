/* eslint-disable @typescript-eslint/no-explicit-any */
import { addToken } from "orchestrator_remote/service/Tokens";
import { fetchData, MethodREST, TypeBody } from "api-fetch";
import { I18nextProvider } from "react-i18next";
import { ToastContextProvider } from "ux-ui";
import i18next from "i18next";
import Origin from "./pages/Origin";

/**
 * Funcion principal de la aplicacion en developer
 *
 * @param param0
 * @returns
 */
const App = ({ structure = { element: "Error" } }: { structure?: any }) => {
  
  /**
   * Funcion para ejecutar una api.
   *
   * @returns
   */
  const runApi = async (): Promise<void> => {
    const data = {
      username: "root",
      password: "12341234s",
      client_id: "portal-client",
      //client_secret: 'NGrjAmonCxkiOlUJ1Wj1KgeS5mKRZfmG',
      grant_type: "password",
    };

    fetchData({
      url: "http://localhost:8080/realms/portal-realm/protocol/openid-connect/token",
      methodRest: MethodREST.POST,
      typeBody: TypeBody.FORM_URLENCODED,
      bodyParameter: data,
    })
      .then(async (response) => {
        if (response.error) {          
          console.error("Error: " + response );    
        } else {          
          await addToken({ token: response.response });
        }
      })
      .catch((error) => {
        throw new Error("Failed to fetch token: " + JSON.stringify(error));
        console.error("Error: " + error);
      });
  };



  const heandleToken = () => {    
    runApi();
    if (structure.refreshToken) {
      structure.refreshToken = structure.refreshToken + 1;
    } else {
      structure.refreshToken = 1;
    }

    console.log("structure ", JSON.stringify(structure));
  };

  return (
    <I18nextProvider i18n={i18next}>
      <ToastContextProvider>
        <button onClick={heandleToken}>Token</button>
        <Origin structure={structure} />
      </ToastContextProvider>
    </I18nextProvider>
  );
};

export default App;
