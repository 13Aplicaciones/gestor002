import { DropdownMenu, IconButton } from "@radix-ui/themes";
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
import { Alerts, IconComponent, useToastContext } from "ux-ui";
import { Menus, MODULE } from "../../utils/Constants";
import { IRowDataComboItem } from "./structures/Types";

/**
 * QueryMeny de la tabla de Modulos.
 *
 * @param row - Datos del usuario
 * @param onEditRow - Función para editar la fila
 *
 * @returns
 */
const QueryActionsComboItem = ({
  row,
  onEditRow,
  onRefresh,
}: {
  row: IRowDataComboItem;
  onEditRow: (row: IRowDataComboItem) => void;
  onRefresh: () => void;
}) => {
  const [apiUrlStatus, setApiUrlStatus] = useState<string>("");
  const [apiUrlOrder, setApiUrlOrder] = useState<string>("");
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
      setApiUrlStatus("");
      return;
    }

    (async () => {
      try {
        const param: IParameter = await getParameter(MODULE, "200");
        const url = `${param.valueText01}${Menus.COMBO_ITEM_ENDPOINT}/status/${row.uuid}`;
        const urlOrder = `${param.valueText01}${Menus.COMBO_ITEM_ENDPOINT}/process/changeOrder/`;
        setApiUrlStatus(url);
        setApiUrlOrder(urlOrder);
      } catch (err) {
        console.error("Error generando API URL -> Error:", err);
        setApiUrlStatus("");
      }
    })();
  }, [row]);

  /**
   * Función para cambiar el estado del usuario
   *
   * @param status - Nuevo estado del usuario
   * @param apiUrlStatus - URL de la API para cambiar el estado
   * @param token - Token de autenticación
   * @param row - Datos del usuario
   */
  const changeStatus = async ({
    status,
    apiUrlStatus,
    token,
    row,
  }: {
    status: string;
    apiUrlStatus: string;
    token: string;
    row: IRowDataComboItem;
  }) => {
    // Cambiar el estado del usuario
    row.status = status;

    const response = await fetchData({
      url: apiUrlStatus,
      methodRest: MethodREST.PATCH,
      typeBody: TypeBody.JSON,
      bodyParameter: row,
      token: token,
      getToken: refreshToken,
    });

    analizarAccionar(response);
  };

  /**
   * Función para cambiar el orden de los items
   * @accion - Acción a realizar (FIRST, UP, DOWN, LAST)
   * @apiUrlOrder - URL de la API para cambiar el orden
   * @token - Token de autenticación
   * @param row - Datos del item
   */
  const changeOrder = async ({
    action,
    apiUrlOrder,
    token,
    row,
  }: {
    action: string;
    apiUrlOrder: string;
    token: string;
    row: IRowDataComboItem;
  }) => {
    const response = await fetchData({
      url: apiUrlOrder + `uuid=${row.uuid}&action=${action}`,
      methodRest: MethodREST.GET,
      typeBody: TypeBody.NONE,
      token: token,
      getToken: refreshToken,
    });

    analizarAccionar(response);
    if (onRefresh) {
      onRefresh();
    }
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
    changeStatus({ status: "A", apiUrlStatus, token: token ?? "", row });
  };

  /**
   * Función para desactivar el usuario
   */
  const handleDesactivar = () => {
    changeStatus({ status: "I", apiUrlStatus, token: token ?? "", row });
  };

  /**
   * Función para mover el item al inicio
   */
  const handleMoveFirst = () => {
    changeOrder({ action: "FIRST", apiUrlOrder, token: token ?? "", row });
  };

  /**
   * Función para mover el item hacia arriba
   */
  const handleMoveUp = () => {
    changeOrder({ action: "UP", apiUrlOrder, token: token ?? "", row });
  };

  /**
   * Función para mover el item hacia abajo
   */
  const handleMoveDown = () => {
    changeOrder({ action: "DOWN", apiUrlOrder, token: token ?? "", row });
  };

  /**
   * Función para mover el item al final
   */
  const handleMoveLast = () => {
    changeOrder({ action: "LAST", apiUrlOrder, token: token ?? "", row });
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton size="1" variant="ghost">
          <IconComponent iconName="DotsVerticalIcon" width="16" height="16" />
        </IconButton>
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
        <DropdownMenu.Separator />
        {(row.status == "A" && (
          <DropdownMenu.Item onClick={handleDesactivar}>
            {t("actions.inactive")}
          </DropdownMenu.Item>
        )) || (
          <DropdownMenu.Item onClick={handleActivar}>
            {t("actions.active")}
          </DropdownMenu.Item>
        )}
        <DropdownMenu.Separator />
        <DropdownMenu.Item onClick={handleMoveFirst}>
          <IconComponent iconName="DoubleArrowUpIcon" width="16" height="16" />
          {t("actions.moverInicio")}
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={handleMoveUp}>
          <IconComponent iconName="ChevronUpIcon" width="16" height="16" />
          {t("actions.moverArriba")}
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={handleMoveDown}>
          <IconComponent iconName="ChevronDownIcon" width="16" height="16" />
          {t("actions.moverAbajo")}
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={handleMoveLast}>
          <IconComponent
            iconName="DoubleArrowDownIcon"
            width="16"
            height="16"
          />
          {t("actions.moverFinal")}
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default QueryActionsComboItem;
