import { addToken } from "orchestrator_remote/service/Tokens";
import { Button, Flex } from "@radix-ui/themes";
import { fetchData, MethodREST, TypeBody } from "api-fetch";
import { I18nextProvider } from "react-i18next";
import { Origin } from "./pages/Origin";
import { ToastContextProvider } from "ux-ui";
import { useEffect, useState } from "react";
import i18next from "./i18n";

/**
 * Funcion principal de la aplicacion en developer
 *
 * @param param0
 * @returns
 */
const App = () => {
  const [name, setName] = useState("error");

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
          console.error("runApi -> Error:", response.error);
        } else {
          await addToken({ token: response.response });
        }
      })
      .catch((error) => {
        console.error("fetchData -> Error:", error);
        throw new Error("Failed to fetch token: " + JSON.stringify(error));
      });
  };

  /**
   * Funcion para ejecutar la api de token al cargar la pagina.
   */
  useEffect(() => {
    runApi();
  }, []);

  /**
   * Funcion para manejar el token y refrescar el panel.
   *
   * @param panelName
   */
  const heandleToken = (panelName: string) => {
    runApi();
    setName(panelName);
  };

  return (
    <I18nextProvider i18n={i18next}>
      <ToastContextProvider>
        <Flex direction="row" align={"center"} gap="1" px="1" py="2">
          <Button size="3" onClick={() => heandleToken("GS-ER-001")}>
            Error
          </Button>
          <Button size="3" onClick={() => heandleToken("GS-IN-001")}>
            Information
          </Button>
          <Button size="3" onClick={() => heandleToken("GS-MD-001")}>
            Module
          </Button>
          <Button size="3" onClick={() => heandleToken("GS-US-001")}>
            User
          </Button>
        </Flex>
        <Origin name={name} />
      </ToastContextProvider>
    </I18nextProvider>
  );
};

export default App;
