/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex } from "@radix-ui/themes";
import { fetchData, IFetchData, MethodREST, TypeBody } from "api-fetch";
import { getParameter, IParameter } from "orchestrator_remote/service/Parameter";
import { getToken, ITokenRoot, refreshToken } from "orchestrator_remote/service/Tokens";
import { ReactElement, useEffect, useState } from "react";
import { Alerts, BannerInformation, DataListConfigurable, DataListSkeleton } from "ux-ui";
import { MODULE } from "../../utils/Constants";

export interface GenericPreviewProps<T> {
  /** Fila de datos a visualizar */
  rowId: string;
  
  /** Endpoint específico del módulo (/modules, /errors, etc.) */
  endpoint: string;
  
  /** Función para crear un objeto vacío del tipo de datos */
  createEmptyData: () => T;
  
  /** Presentación de datos para el componente DataListConfigurable */
  getPresentationData: () => any;
  
  /** Nombre personalizado para los mensajes de error (opcional) */
  entityName?: string;
}

/**
 * Componente genérico para previsualizar datos de cualquier entidad
 */
export function GenericPreview<T extends { uuid?: string }>({
  rowId,
  endpoint,
  createEmptyData,
  getPresentationData,
  entityName = "Entity"
}: GenericPreviewProps<T>): ReactElement {
  const [alertForm, setAlertForm] = useState<Alerts>(Alerts.warning);
  const [loading, setLoading] = useState(false);
  const [messageForm, setMessageForm] = useState<string>("");
  const [rowFound, setRowFound] = useState<T | null>(createEmptyData());

  /**
   * Cargar la vista previa del registro
   */
  useEffect(() => {
    const loadPreview = (rowIndex: string) => {
      setLoading(true);
      setTimeout(async () => {
        await runApi(rowIndex);
        setLoading(false);
      }, 333);
    };

    loadPreview(rowId);
  }, [rowId]);

  /**
   * Ejecutar la API para obtener los datos
   */
  const runApi = async (rowIndex: string): Promise<void> => {
    const tokenTemp: ITokenRoot = await getToken();
    const parameterTemp: IParameter = await getParameter(MODULE, "200");
    const url = parameterTemp.valueText01 + endpoint + "/" + rowIndex;

    try {
      const response: IFetchData = await fetchData({
        url: url,
        methodRest: MethodREST.GET,
        typeBody: TypeBody.NONE,
        bodyParameter: null,
        token: tokenTemp.access_token,
        getToken() {
          return refreshToken();
        },
      });

      if (response.error) {
        setMessageForm(response?.statusDescription || "");
        setAlertForm(Alerts.info);
        return;
      }
      
      setRowFound(response.response);
    } catch (error) {
      setMessageForm(`${entityName} message: ${error}`);
      setAlertForm(Alerts.error);
    }
  };

  return (
    <Flex direction="column" gap="3" maxWidth={{ md: "50vw", xl: "1400px" }}>
      {(messageForm && (
        <BannerInformation message={messageForm} alert={alertForm} />
      )) || (
        loading ? (
          <DataListSkeleton column={5} />
        ) : (
          <DataListConfigurable
            presentationDataList={getPresentationData()}
            data={rowFound}
          />
        )
      )}
    </Flex>
  );
}