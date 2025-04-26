import { Flex } from "@radix-ui/themes";
import { fetchData, IFetchData, MethodREST, TypeBody } from "api-fetch";
import { getParameter, IParameter } from "orchestrator_remote/service/Parameter";
import { getToken, ITokenRoot, refreshToken } from "orchestrator_remote/service/Tokens";
import { ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alerts,
  BannerInformation,
  DialogDelete,
  FormState,
  InformationPanelRegistration,
  StatusEdit,
  useToastContext
} from "ux-ui";

export interface GenericCrudFormProps<T> {
  /** Estado inicial del formulario (crear, editar, ver) */
  status: StatusEdit;
  
  /** Datos de la fila que se está editando */
  row: T;
  
  /** Función que se llama al volver atrás */
  onAtras?: () => void;
  
  /** Endpoint específico del módulo (/modules, /errors, etc.) */
  endpoint: string;
  
  /** Código del módulo para obtener el parámetro URL base */
  moduleCode: string;
  
  /** Función para preparar los datos antes de enviarlos al servidor */
  prepareData?: (data: T) => any;
  
  /** Renderizado del formulario */
  renderForm: (props: {
    formStatus: StatusEdit;
    loading: boolean;
    handleSubmit: (data: any) => Promise<void>;
    showPopUpDelete: () => void;
  }) => ReactNode;
}

export function GenericCrudForm<T extends { uuid?: string }>({
  status,
  row,
  onAtras,
  endpoint,
  moduleCode,
  prepareData,
  renderForm
}: GenericCrudFormProps<T>) {
  const [dialogRefresh, setDialogRefresh] = useState(false);
  const [dialogStatus, setDialogStatus] = useState(false);
  const [formStatus, setFormStatus] = useState<StatusEdit>(status || StatusEdit.create);
  const [loading, setLoading] = useState(false);
  const [messageFormulario, setMessageForm] = useState("");
  const [parameterUrl, setParameterUrl] = useState<IParameter>({} as IParameter);
  const [t] = useTranslation("global_gestor");
  const [token, setToken] = useState<ITokenRoot>({} as ITokenRoot);
  const [uuid, setUuid] = useState(row?.uuid || "");
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
            url: parameterUrl?.valueText01,
            methodRest: MethodREST.POST,
            typeBody: TypeBody.JSON,
            bodyParameter: data,
            token: token.access_token,
            getToken: await refreshToken(),
          });
          
          if (!response.error) {
            setFormStatus(StatusEdit.edit);
          }
        }
        
        // Actualizar registro existente
        else if (formStatus === StatusEdit.edit) {
          response = await fetchData({
            url: parameterUrl?.valueText01 + "/" + uuid,
            methodRest: MethodREST.PUT,
            typeBody: TypeBody.JSON,
            bodyParameter: data,
            token: token.access_token,
            getToken: await refreshToken(),
          });
        }
        
        // Eliminar registro
        else if (formStatus === StatusEdit.block) {
          response = await fetchData({
            url: parameterUrl?.valueText01 + "/" + uuid,
            methodRest: MethodREST.DELETE,
            typeBody: TypeBody.NONE,
            bodyParameter: null,
            token: token.access_token,
            getToken: await refreshToken(),
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
      const respuesta = response;
      if (respuesta.response && respuesta.response.uuid) {
        setUuid(respuesta.response.uuid);
      }

      showToast(
        t("actions.saveSatisfactory", { status: respuesta.status.toString() }),
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
   * Inicializar el token y parámetros URL
   */
  useEffect(() => {
    const initializeStructure = async () => {
      const tokenTemp: ITokenRoot = await getToken();
      setToken(tokenTemp);

      const parameter: IParameter = await getParameter(moduleCode, "200");
      parameter.valueText01 = parameter.valueText01 + endpoint;
      setParameterUrl(parameter);
    };
    
    initializeStructure();
  }, [endpoint, moduleCode]);

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