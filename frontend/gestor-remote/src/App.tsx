import { addToken } from "orchestrator_remote/service/Tokens";
import { Button, Flex } from "@radix-ui/themes";
import { fetchData, MethodREST, TypeBody } from "api-fetch";
import { Origin } from "./pages/Origin";
import { useEffect, useState } from "react";

import { Menus } from "./utils/Constants";

/**
 * Funcion principal de la aplicacion en developer
 *
 * @param param0
 * @returns
 */
const App = () => {
  const [name, setName] = useState(Menus.USER);

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
    <>
      <Origin name={name} />
      <Flex direction="row" align={"center"} gap="1" px="1" py="2">
        <Button onClick={() => heandleToken(Menus.USER)}>User</Button>
        <Button onClick={() => heandleToken(Menus.INFORMATION)}>
          Information
        </Button>
        <Button onClick={() => heandleToken(Menus.MODULE)}>Module</Button>
        <Button onClick={() => heandleToken(Menus.ERROR)}>Error</Button>
      </Flex>
    </>
  );
};

export default App;
