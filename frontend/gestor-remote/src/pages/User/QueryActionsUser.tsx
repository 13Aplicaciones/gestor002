import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Button, DropdownMenu } from "@radix-ui/themes";
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
import {
  getToken,
  ITokenRoot,
  refreshToken,
} from "orchestrator_remote/service/Tokens";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alerts, useToastContext } from "ux-ui";
import { Menus, MODULE } from "../../utils/Constants";
import { IRowDataUser } from "./Structures/Types";

/**
 * QueryMeny de la tabla de Modulos.
 *
 * @param row - Datos del usuario
 * @param onEditRow - Función para editar la fila
 *
 * @returns
 */
const QueryActionsUser = ({
  row,
  onEditRow,
}: {
  row: IRowDataUser;
  onEditRow: (row: IRowDataUser) => void;
}) => {
  const [apiUrl, setApiUrl] = useState<string>("");
  const [t] = useTranslation("global_gestor");
  const [token, setToken] = useState<string>();
  const { showToast } = useToastContext();

  /**
   * Inicializar token y parámetros de URL
   */
  useEffect(() => {
    getToken()
      .then((t: ITokenRoot) => setToken(t.access_token))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!row) {
      setApiUrl("");
      return;
    }

    (async () => {
      try {
        const param: IParameter = await getParameter(MODULE, "200");
        const url = `${param.valueText01}${Menus.USER_ENDPOINT}/status/${row.uuid}`;
        setApiUrl(url);
      } catch (err) {
        console.error("Error generando API URL:", err);
        setApiUrl("");
      }
    })();
  }, [row]);

  /**
   * Función para cambiar el estado del usuario
   *
   * @param status - Nuevo estado del usuario
   * @param apiUrl - URL de la API para cambiar el estado
   * @param token - Token de autenticación
   * @param row - Datos del usuario
   */
  const changeStatus = async ({
    status,
    apiUrl,
    token,
    row,
  }: {
    status: string;
    apiUrl: string;
    token: string;
    row: IRowDataUser;
  }) => {
    // Cambiar el estado del usuario
    row.status = status;

    const response = await fetchData({
      url: apiUrl,
      methodRest: MethodREST.PATCH,
      typeBody: TypeBody.JSON,
      bodyParameter: row,
      token: token,
      getToken: refreshToken,
    });

    analizarAccionar(response);
  };

  /**
   * Función para analizar las respuestas de accionar
   *
   * @param response - Respuesta de la API
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
      return;
    } else {
      const answer = response;
      showToast(
        t("actions.saveSatisfactory", { status: answer.status.toString() }),
        t("actions.saveSatisfactoryDescription"),
        Alerts.success
      );
    }
  };

  /**
   * Función para activar el usuario
   */
  const handleActivar = () => {
    changeStatus({ status: "A", apiUrl, token: token ?? "", row });
    
  };

  /**
   * Función para desactivar el usuario
   */
  const handleDesactivar = () => {
    changeStatus({ status: "I", apiUrl, token: token ?? "", row });
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button size="1" variant="ghost">
          <DotsVerticalIcon width="16" height="16" />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item
          onClick={() => {
            if (onEditRow) {
              onEditRow(row);
            }
          }}
        >
          {t("actions.edit")}
        </DropdownMenu.Item>
        {row.status == "A" && (
          <DropdownMenu.Item onClick={handleDesactivar}>
            {t("actions.inactive")}
          </DropdownMenu.Item>
        )}
        {row.status == "I" && (
          <DropdownMenu.Item onClick={handleActivar}>
            {t("actions.active")}
          </DropdownMenu.Item>
        )}        
        <DropdownMenu.Separator />
        <DropdownMenu.Item>Sincronizar</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default QueryActionsUser;
