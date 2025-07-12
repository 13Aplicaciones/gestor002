import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import {
  fetchData,
  formatMessageJson,
  IFetchData,
  MethodREST,
  TypeBody,
} from "api-fetch";
import {
  getParameter,
  IParameter,
} from "orchestrator_remote/service/Parameter";
import { getToken, ITokenRoot } from "orchestrator_remote/service/Tokens";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alerts, BannerInformation, BoxTheme, useToastContext } from "ux-ui";
import { Menus, MODULE } from "../../../../utils/Constants";
import { IRowDataModule } from "../../structures/Types";

/**
 * Componente para cambiar el estado de un módulo.
 *
 * @param row - Datos de la fila del módulo
 * @returns
 */
const ChangeStatus = ({ row }: { row?: IRowDataModule }) => {
  const [apiUrl, setApiUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageForm, setMessageForm] = useState("");
  const [rowData, setRowData] = useState<IRowDataModule | undefined>(row);
  const [t] = useTranslation("global_gestor");
  const [token, setToken] = useState<string | undefined>(undefined);
  const { showToast } = useToastContext();

  /**
   * Inicializar token y parámetros de URL
   */
  useEffect(() => {
    getToken()
      .then((t: ITokenRoot) => setToken(t.access_token))
      .catch(console.error);
  }, []);

  /**
   * Generar la URL de la API para accionar el módulo.
   */
  useEffect(() => {
    if (!row) {
      setApiUrl("");
      return;
    }

    (async () => {
      try {
        const param: IParameter = await getParameter(MODULE, "200");
        const url = `${param.valueText01}${Menus.MODULE_ENDPOINT}/${row.uuid}`;
        setApiUrl(url);
      } catch (err) {
        console.error("Error generando API URL -> Error:", err);
        setApiUrl("");
      }
    })();
  }, [row]);

  /**
   * Función para accionar el formulario
   */
  const actuate = async (status: string) => {
    setLoading(true);
    const nameApp = window.location.pathname.split("/").pop() + t("nameApp");

    // cambia los datos de la fila con el nuevo estado
    const rowTemp = row
      ? {
          ...row,
          status: status,
          userApp: nameApp,
          context: row.context || "", // Provide default empty string for context if undefined
        }
      : undefined;

    try {
      setTimeout(async () => {
        let response: IFetchData | null = null;
        response = await fetchData({
          url: apiUrl,
          methodRest: MethodREST.PUT,
          typeBody: TypeBody.JSON,
          bodyParameter: rowTemp,
          token: token,
          getToken: getToken,
        });

        if (response) {
          if (analizarAccionar(response)) {
            setRowData(rowTemp);
          }
        }

        setLoading(false);
      }, 333);
    } catch (error) {
      setMessageForm(t("actions.errorFetch", { error }));
      setLoading(false);
    }
  };

  /**
   * Función para analizar las respuestas de accionar
   */
  const analizarAccionar = (response: IFetchData) => {
    if (response.error) {
      if (response.status === 400) {
        showToast(
          response.error + " (" + response.status.toString() + ")",
          formatMessageJson(response) || "",
          Alerts.warning
        );
      } else {
        showToast(response.status.toString(), response.error, Alerts.warning);
      }
    } else {
      const answer = response;
      showToast(
        t("actions.saveSatisfactory", { status: answer.status.toString() }),
        t("actions.saveSatisfactoryDescription"),
        Alerts.success
      );
      return true;
    }
    return false;
  };

  /**
   * Maneja el cambio de estado del módulo.
   *
   * @param status
   */
  const handleChangeStatus = (status: string) => {
    if (row) {
      actuate(status);
    }
  };

  return (
    <>
      <BannerInformation message={messageForm} alert={Alerts.error} />
      <BoxTheme look="none">
        <Heading size="3">{t("modules.GS-MD-001.work.status.title")}</Heading>
        {rowData?.status === "A" ? (
          <Flex direction="row" gap="3" align="center">
            <Button
              loading={loading}
              variant="solid"
              onClick={() => handleChangeStatus("I")}
            >
              {t("modules.GS-MD-001.work.status.inactive")}
            </Button>
            <Text>
              {t("modules.GS-MD-001.work.status.inactiveDescription")}
            </Text>
          </Flex>
        ) : (
          <Flex direction="row" gap="3" align="center">
            <Button loading={loading} variant="solid" onClick={() => handleChangeStatus("A")}>
              {t("modules.GS-MD-001.work.status.active")}
            </Button>
            <Text>{t("modules.GS-MD-001.work.status.activeDescription")}</Text>
          </Flex>
        )}
        <Text>{t("modules.GS-MD-001.work.status.description")}</Text>
      </BoxTheme>
    </>
  );
};

export { ChangeStatus };
