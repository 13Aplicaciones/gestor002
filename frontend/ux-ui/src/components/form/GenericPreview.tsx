/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex } from "@radix-ui/themes";
import { fetchData, IFetchData, MethodREST, TypeBody } from "api-fetch";
import { ReactElement, useEffect, useState } from "react";
import { Alerts } from "../../ConstantsPresentation";
import { BannerInformation } from "../callout/Information";
import { DataListConfigurable, DataListSkeleton } from "../dataList/DataList";


/**
 * Funciones de presentación de pie en los formularios y estos son resize.
 * 
 * @autor @omargo33
 * @since 2025-05-03
 */

/**
 * Funciones de presentación de pie en los formularios y estos son resize.
 * 
 *  @template T Tipo de datos del formulario
 *  
 */
interface GenericPreviewProps<T> {
  /** Endpoint para la API (ej: "/modules", "/errors") */
  apiUrl: string;

  /** Función para crear un objeto vacío del tipo de datos */
  createEmptyData: () => T;

  /** Presentación de datos para el componente DataListConfigurable */
  getPresentationData: () => any;

  /** Función para obtener el token de autenticación (opcional) */
  token?: string;

  /** Función para obtener el token de autenticación (opcional) */
  getToken?: (() => Promise<string>) | undefined;

  /** Nombre personalizado para los mensajes de error (opcional) */
  entityName?: string;
}

/**
 * Componente genérico para previsualizar datos de cualquier entidad
 * 
 * @param apiUrl URL de la API para obtener los datos
 * @param createEmptyData Función para crear un objeto vacío del tipo de datos
 * @param token Token de autenticación (opcional)
 * @param getToken Función para obtener el token de autenticación (opcional)
 * @param getPresentationData Función para obtener la presentación de datos
 * @param entityName Nombre personalizado para los mensajes de error (opcional)
 * 
 * @returns 
 */
function GenericPreview<T extends { uuid?: string }>({
  apiUrl,
  createEmptyData,
  token,
  getToken,
  getPresentationData,
  entityName = "Entity",
}: GenericPreviewProps<T>): ReactElement {
  const [alertForm, setAlertForm] = useState<Alerts>(Alerts.warning);
  const [loading, setLoading] = useState(false);
  const [messageForm, setMessageForm] = useState<string>("");
  const [rowFound, setRowFound] = useState<T | null>(createEmptyData());

  /**
   * Cargar la vista previa del registro
   */
  useEffect(() => {
    const loadPreview = (apiUrl: string) => {
      setLoading(true);
      setTimeout(async () => {
        await runApi(apiUrl);
        setLoading(false);
      }, 333);
    };

    loadPreview(apiUrl);
  }, [apiUrl]);

  /**
   * Ejecutar la API para obtener los datos
   */
  const runApi = async (urlApi: string): Promise<void> => {
    try {
      const response: IFetchData = await fetchData({
        url: urlApi,
        methodRest: MethodREST.GET,
        typeBody: TypeBody.URL_PARAMS,
        bodyParameter: null,
        token: token,
        getToken: getToken,
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
      )) ||
        (loading ? (
          <DataListSkeleton column={5} />
        ) : (
          <DataListConfigurable
            presentationDataList={getPresentationData()}
            data={rowFound}
          />
        ))}
    </Flex>
  );
}

export { GenericPreview };
export type { GenericPreviewProps };

