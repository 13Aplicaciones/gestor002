/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex } from "@radix-ui/themes";
import { fetchData, IFetchData, MethodREST, TypeBody } from "api-fetch";
import { ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alerts, StatusEdit } from "../../ConstantsPresentation";
import { BannerInformation, InformationPanelRegistration } from "../callout/Information";
import { DialogDelete } from "../crud/DialogDelete";
import { useToastContext } from "../toast/useToastContext";
import { FormState } from "./Form";

/**
 * Funciones de presentación de pie en los formularios y estos son resize.
 * 
 * @autor @omargo33
 * @since 2025-05-03
 * 
 */

/**
 * Interfaz para las propiedades del formulario CRUD genérico.
 * 
 * @template T Tipo de datos del formulario
 * 
 */
interface GenericCrudFormProps<T> {
  /** Estado inicial del formulario (crear, editar, ver) */
  status: StatusEdit;

  /** Datos de la fila que se está editando */
  row: T & Record<string, any>;

  /** Nombre del índice para identificar el registro */
  indexName: string;

  /** Función que se llama al volver atrás */
  onAtras?: () => void;

  /** Endpoint para la API (ej: "/modules", "/errors") */
  apiUrl: string;

  /** Token de autenticación (opcional) */
  token?: string;

  /** Función para obtener el token de autenticación (opcional) */
  getToken?: (() => Promise<string>) | undefined;

  /** Función para preparar los datos antes de enviarlos al servidor */
  prepareData?: (data: T) => any;

  /** Renderizado del formulario */
  renderForm: (props: {
    /** Estado del formulario (crear, editar, ver) */
    formStatus: StatusEdit;

    /** Datos de la fila que se está editando */
    loading: boolean;
    
    /** Función para manejar el envío del formulario */
    handleSubmit: (data: any) => Promise<void>;

    /** Función para mostrar el pop-up de eliminación */
    showPopUpDelete: () => void;
  }) => ReactNode;
}

/**
 * Funcion para el comportamiento de los formularios CRUD.
 * 
 * @param status Estado inicial del formulario (crear, editar, ver)
 * @param row Datos de la fila que se está editando
 * @param indexName Nombre del índice para identificar el registro
 * @param onAtras Función que se llama al volver atrás
 * @param apiUrl Endpoint para la API (ej: "/modules", "/errors")
 * @param token Token de autenticación (opcional)
 * @param getToken Función para obtener el token de autenticación (opcional)
 * @param prepareData Función para preparar los datos antes de enviarlos al servidor
 * @param renderForm Renderizado del formulario
 * 
 * @returns 
 */
function GenericCrudForm<T>({
  status,
  row,
  indexName,
  onAtras,
  apiUrl,
  token,
  getToken,
  prepareData,
  renderForm,
}: GenericCrudFormProps<T>) {
  const [dialogRefresh, setDialogRefresh] = useState(false);
  const [dialogStatus, setDialogStatus] = useState(false);
  const [formStatus, setFormStatus] = useState<StatusEdit>(status || StatusEdit.create);
  const [index, setIndex] = useState<string>((row[indexName] as string) || "");
  const [loading, setLoading] = useState(false);
  const [messageFormulario, setMessageForm] = useState("");
  const [t] = useTranslation("global_gestor");
  const { showToast } = useToastContext();

  /**
   * Función para accionar el formulario
   */
  const actuate = async (data: any) => {
    setLoading(true);
    const nameApp = window.location.pathname.split("/").pop() + t("nameApp");

    // Preparar los datos si se proporciona una función personalizada
    if (prepareData) {
      data = prepareData(data);
    } else {
      data = { ...data, userApp: nameApp };
    }

    try {
      setTimeout(async () => {
        let response: IFetchData | null = null;

        // Crear nuevo registro
        if (formStatus === StatusEdit.create) {
          response = await fetchData({
            url: apiUrl,
            methodRest: MethodREST.POST,
            typeBody: TypeBody.JSON,
            bodyParameter: data,
            token: token,
            getToken: getToken,
          });

          if (!response.error) {
            setFormStatus(StatusEdit.edit);
          }
        }

        // Actualizar registro existente
        else if (formStatus === StatusEdit.edit) {
          response = await fetchData({
            url: apiUrl + "/" + index,
            methodRest: MethodREST.PUT,
            typeBody: TypeBody.JSON,
            bodyParameter: data,
            token: token,
            getToken: getToken,
          });
        }

        // Eliminar registro
        else if (formStatus === StatusEdit.block) {
          response = await fetchData({
            url: apiUrl + "/" + index,
            methodRest: MethodREST.DELETE,
            typeBody: TypeBody.NONE,
            bodyParameter: null,
            token: token,
            getToken: getToken,
          });

          if (!response.error) {
            setFormStatus(StatusEdit.find);
            setDialogStatus(false);
            if (onAtras) {
              onAtras();
            }
          }
        }

        if (response) {
          analizarAccionar(response);
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
          response.error,
          Alerts.warning
        );
      } else {
        showToast(response.status.toString(), response.error, Alerts.warning);
      }
      return;
    } else {
      const answer = response;
      if (answer.response && answer.response[indexName]) {
        setIndex(answer.response[indexName]);
      }

      showToast(
        t("actions.saveSatisfactory", { status: answer.status.toString() }),
        t("actions.saveSatisfactoryDescription"),
        Alerts.success
      );
    }
  };

  /**
   * Función para mostrar el popUp de borrar
   */
  const showPopUpDelete = () => {
    setFormStatus(StatusEdit.block);
    setDialogStatus(true);
  };

  /**
   * Actualizar el refrescador de diálogo
   */
  useEffect(() => {
    setDialogRefresh((prev) => !prev);
  }, [dialogStatus]);

  const handleOnDelete = () => {
    setFormStatus(StatusEdit.edit);
    actuate(null);
  };

  const handleOnCancelDelete = () => {
    setFormStatus(StatusEdit.edit);
    setDialogStatus(false);
  };

  return (
    <>
      <DialogDelete
        dialogRefresh={dialogRefresh}
        dialogStatus={dialogStatus}
        loadingOnDelete={loading}
        onDelete={handleOnDelete}
        onCancel={handleOnCancelDelete}
      />
      <BannerInformation message={messageFormulario} alert={Alerts.error} />
      <Flex direction="row" gap="3" align="center">
        <FormState statusEdit={formStatus} />
        <InformationPanelRegistration row={row} />
      </Flex>

      {renderForm({
        formStatus,
        loading,
        handleSubmit: actuate,
        showPopUpDelete,
      })}
    </>
  );
}

export { GenericCrudForm };
export type { GenericCrudFormProps };

