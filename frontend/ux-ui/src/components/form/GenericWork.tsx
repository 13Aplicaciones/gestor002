/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Flex } from "@radix-ui/themes";
import { fetchData, IFetchData, MethodREST, TypeBody } from "api-fetch";
import { ReactElement, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alerts,
  BandPresentation,
  Direction,
} from "../../ConstantsPresentation";
import { BannerInformation, InformationPanelRegistration } from "../callout/Information";
import { DataListConfigurable, DataListSkeleton } from "../dataList/DataList";
import { FooterForm } from "./Form";

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
interface GenericWorkProps<T> {
  /** Endpoint para la API (ej: "/modules", "/errors") */
  apiUrl: string;

  /** Función para crear un objeto vacío del tipo de datos */
  createEmptyData: () => T;

  /** Presentación de datos para el componente DataListConfigurable */
  getPresentationData: () => any;

  /** Función que se llama al volver atrás */
  onBack: () => void;

  /** Fila de datos a previsualizar */
  row: any;

  /** Función para obtener el token de autenticación (opcional) */
  token?: string;

  /** Función para obtener el token de autenticación (opcional) */
  getToken?: () => Promise<string>;
  
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
 * @param onBack Función que se llama al volver atrás
 * @param row Fila de datos a previsualizar
 * @param entityName Nombre personalizado para los mensajes de error (opcional)
 *
 * @returns
 */
function GenericWork<T extends { uuid?: string }>(
  props: Readonly<GenericWorkProps<T>>
): ReactElement {
  const {
    apiUrl,
    createEmptyData,
    token,
    getToken,
    getPresentationData,
    onBack,
    row,
    entityName = "Entity",
  } = props;
  const [alertForm, setAlertForm] = useState<Alerts>(Alerts.warning);
  const [loading, setLoading] = useState(false);
  const [messageForm, setMessageForm] = useState<string>("");
  const [rowFound, setRowFound] = useState<T | null>(createEmptyData());
  const [t] = useTranslation("global_ux");

  /**
   * Cargar la vista previa del registro
   */
  useEffect(() => {
    const loadWork = (apiUrl: string) => {
      setLoading(true);
      setTimeout(async () => {
        await runApi(apiUrl);
        setLoading(false);
      }, 333);
    };

    loadWork(apiUrl);
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
        setMessageForm(response?.statusDescription ?? "");
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
    <>
      <Flex direction="row" align="start" gapX="4">
        <InformationPanelRegistration row={row} />
      </Flex>
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
        <FooterForm
          directionLabel={Direction.horizontal}
          columns={BandPresentation.column_1}
        >
          <Button variant="solid" onClick={() => onBack?.()}>
            {t("actions.cancel")}
          </Button>
        </FooterForm>
      </Flex>
    </>
  );
}

export { GenericWork };
export type { GenericWorkProps };
