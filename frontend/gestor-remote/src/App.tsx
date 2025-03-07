/* eslint-disable @typescript-eslint/no-explicit-any */
import { addToken } from "orchestrator_remote/service/Tokens";
import { Button, Flex } from "@radix-ui/themes";
import { fetchData, MethodREST, TypeBody } from "api-fetch";
import { I18nextProvider } from "react-i18next";
import { Origin, OriginProps } from "./pages/Origin";
import { ToastContextProvider } from "ux-ui";
import { useState } from "react";
import i18next from "i18next";

/**
 * Funcion principal de la aplicacion en developer
 *
 * @param param0
 * @returns
 */
const App = ({ structure }: { structure?: OriginProps }) => {
  const [structureTest, setStructureTest] = useState<OriginProps | undefined>();

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
          console.error("Error: " + response);
        } else {
          await addToken({ token: response.response });
        }
      })
      .catch((error) => {
        throw new Error("Failed to fetch token: " + JSON.stringify(error));
        console.error("Error: " + error);
      });
  };

  const heandleToken = (panelName: string) => {
    runApi();
    setStructureTest({
      refreshToken: structureTest?.refreshToken
        ? structureTest.refreshToken + 1
        : 1,
      element: panelName,
      id: 1,
      name: panelName,
    });
  };

  return (
    <I18nextProvider i18n={i18next}>
      <ToastContextProvider>
        <Flex direction="row" align={"center"} gap="2">
          <Button size="3" onClick={() => heandleToken("Error")}>
            Error
          </Button>
          <Button size="3" onClick={() => heandleToken("Information")}>
            Information
          </Button>
          <Button size="3" onClick={() => heandleToken("Module")}>
            Module
          </Button>
          <Button size="3" onClick={() => heandleToken("User")}>
            User
          </Button>
        </Flex>
        <Origin structure={structureTest} />
      </ToastContextProvider>
    </I18nextProvider>
  );
};

export default App;
