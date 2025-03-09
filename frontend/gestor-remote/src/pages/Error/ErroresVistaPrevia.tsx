import { Alerts } from "ux-ui";
import { Badge, DataList, Flex, Heading } from "@radix-ui/themes";
import { BannerInformation } from "ux-ui";
import { fetchData } from "api-fetch";
import { MethodREST, TypeBody } from "api-fetch";
import { useCallback, useEffect, useState } from "react";

/**
 * Interfaz para el objeto de respuesta de la llamada.
 */
interface IRowDataError {
  message: string;
  description: string;
  uuid: string;
  index: string;
  user: string;
  userDate: string;
  userApp: string;
}

/**
 * Funcion para crear un objeto de respuesta vacio.
 *
 * @returns
 */
const createIRowDataError = (): IRowDataError => {
  return {
    message: "",
    description: "description",
    uuid: "",
    index: "",
    user: "",
    userDate: "",
    userApp: "",
  };
};

const VistaPrevia = ({ indice }: { indice: string }) => {
  const [messageFormulario, setMessageForm] = useState("");
  const [row, setRow] = useState<IRowDataError | null>(null);

  const cargarVistaPrevia = useCallback(async () => {
    fetchData({
      url: "http://localhost:8090/gestor-ws/api/errors/indice=" + indice,
      methodRest: MethodREST.GET,
      typeBody: TypeBody.NONE,
      bodyParameter: null,
      token: "token",
    })
      .then((response) => {
        setRow(response.response);
      })
      .catch((error) => {
        setMessageForm("Error al consultar " + error);
        return null;
      });
  }, [indice]);

  useEffect(() => {
    cargarVistaPrevia();
  }, [cargarVistaPrevia]);

  return (
    <Flex direction="column" gap="3" maxWidth={{ md: "50vw", xl: "1400px" }}>
      <BannerInformation message={messageFormulario} alert={Alerts.error} />
      <Heading size="2">Información del registro</Heading>
      <DataList.Root>
        <DataList.Item>
          <DataList.Label minWidth="88px">Mensaje</DataList.Label>
          <DataList.Value>
            <span dangerouslySetInnerHTML={{ __html: row?.message || "" }} />
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">Mensaje</DataList.Label>
          <DataList.Value>
            <span
              dangerouslySetInnerHTML={{ __html: row?.description || "" }}
            />
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">UUID</DataList.Label>
          <DataList.Value>
            <Badge color="crimson" variant="soft" radius="full">
              {row?.uuid || ""}
            </Badge>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">Indice</DataList.Label>
          <DataList.Value>{row?.index || ""}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">Usuario</DataList.Label>
          <DataList.Value>{row?.user || ""}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">Fecha</DataList.Label>
          <DataList.Value>{row?.userDate || ""}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">Aplicativo</DataList.Label>
          <DataList.Value>{row?.userApp || ""}</DataList.Value>
        </DataList.Item>
      </DataList.Root>
    </Flex>
  );
};

export { VistaPrevia, createIRowDataError };
export type { IRowDataError };
