/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Alerts,
  AreaField,
  BandPresentation,
  BannerInformation,
  DialogDelete,
  Direction,
  FooterForm,
  FormState,
  InformationPanelRegistration,
  InputField,
  StatusEdit,
} from "ux-ui";
import { Button, Flex } from "@radix-ui/themes";
import { fetchData, IFetchData, MethodREST, TypeBody } from "api-fetch";
import {
  getParameter,
  IParameter,
} from "orchestrator_remote/service/Parameter";
import {
  getToken,
  ITokenRoot,
  refreshToken,
} from "orchestrator_remote/service/Tokens";
import { IRowDataError } from "./Types";
import { ToastDialog } from "ux-ui/src/components/dialog/DialogState";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

/**
 * Formulario de edición de errores del sistema.
 *
 * @author @omargo33
 *
 * @param status Estado del formulario
 * @param row Fila de datos a editar
 * @param onAtras Función para regresar a la vista anterior
 * @returns
 */
const FormEdit = ({
  status,
  row,
  onAtras,
}: {
  status: StatusEdit;
  row?: IRowDataError;
  onAtras?: () => void;
}) => {
  const [dialogRefresh, setDialogRefresh] = useState(false);
  const [dialogStatus, setDialogStatus] = useState(false);
  const [formStatus, setFormStatus] = useState<StatusEdit>(
    status || StatusEdit.create
  );
  const [loading, setLoading] = useState(false);
  const [messageFormulario, setMessageForm] = useState("");
  const [parameterUrl, setParameterUrl] = useState<IParameter>(
    {} as IParameter
  );
  const [t] = useTranslation("global_gestor");
  const [toast, setToast] = useState<{
    status: boolean;
    title: string;
    message: string;
    alert: Alerts;
  }>({
    status: false,
    title: "",
    message: "",
    alert: Alerts.success,
  });
  const [token, setToken] = useState<ITokenRoot>({} as ITokenRoot);
  const [uuid, setUuid] = useState(row ? row.uuid : "");

  /**
   * Esquema de validación de formulario
   *
   */
  const schema = yup.object({
    indexError: yup
      .string()
      .required(t("validation.required"))
      .min(5, t("validation.min", { min: 5 }))
      .max(128, t("validation.max", { max: 128 })),
    message: yup
      .string()
      .required(t("validation.required"))
      .max(1024, t("validation.max", { max: 1024 })),
    description: yup.string().max(4098, t("validation.max", { max: 4098 })),
    userApp: yup.string(),
  });

  /**
   * Función para registrar los datos del formulario
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      indexError: row?.indexError || "",
      message: row?.message || "",
      description: row?.description || "",
      userApp: row?.userApp || "",
    },
  });

  /**
   * Función para accionar el formulario
   *
   * @param data Datos del formulario
   */
  const accionar = async (data: any) => {
    setLoading(true);
    const nameApp = window.location.pathname.split("/").pop() + t("nameApp");
    data = { ...data, userApp: nameApp };

    setTimeout(async () => {
      if (formStatus === StatusEdit.create) {
        fetchData({
          url: parameterUrl?.valueText01,
          methodRest: MethodREST.POST,
          typeBody: TypeBody.JSON,
          bodyParameter: data,
          token: token.access_token,
          getToken: await refreshToken(),
        })
          .then((response) => {
            analizarAccionar(response);
            setFormStatus(StatusEdit.edit);
          })
          .catch((error) => {
            setMessageForm(t("actions.errorFetch", { error: error }));
            return null;
          });
      }
      if (formStatus === StatusEdit.edit) {
        fetchData({
          url: parameterUrl?.valueText01 + "/" + uuid,
          methodRest: MethodREST.PUT,
          typeBody: TypeBody.JSON,
          bodyParameter: data,
          token: token.access_token,
          getToken: await refreshToken(),
        })
          .then((response) => {
            analizarAccionar(response);
          })
          .catch((error) => {
            setMessageForm(t("actions.errorFetch", { error: error }));
            return null;
          });
      }
      if (formStatus === StatusEdit.block) {
        fetchData({
          url: parameterUrl?.valueText01 + "/" + uuid,
          methodRest: MethodREST.DELETE,
          typeBody: TypeBody.NONE,
          bodyParameter: null,
          token: token.access_token,
          getToken: await refreshToken(),
        })
          .then((response) => {
            analizarAccionar(response);
            setFormStatus(StatusEdit.find);
            setDialogStatus(false);
            if (onAtras) {
              onAtras();
            }
          })
          .catch((error) => {
            setMessageForm(t("actions.errorFetch", { error: error }));
            return null;
          });
      }
      setLoading(false);
    }, 333);
  };

  /**
   * Función para analizar las respuestrra de accionar
   *
   * @param response
   * @returns
   */
  const analizarAccionar = (response: IFetchData) => {
    if (response.error) {
      if (response.status === 400) {
        setToast({
          ...toast,
          status: true,
          title: response.error + " (" + response.status.toString() + ")",
          message: response.error,
          alert: Alerts.warning,
        });
      } else {
        setToast({
          ...toast,
          status: true,
          title: response.status.toString(),
          message: response.error,
          alert: Alerts.warning,
        });
      }
      return;
    } else {
      const respuesta = response;
      if (respuesta.response && respuesta.response.uuid) {
        setUuid(respuesta.response.uuid);
      }

      setToast({
        ...toast,
        status: true,
        title: t("actions.saveSatisfactory", { status: response.status }),
        message: t("actions.saveSatisfactoryDescription"),
        alert: Alerts.success,
      });
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
   * Funcion para inicializar el token
   *
   */
  useEffect(() => {
    const initializeStructure = async () => {
      const tokenTemp: ITokenRoot = await getToken();
      setToken(tokenTemp);

      const parameter: IParameter = await getParameter("GS_001_00", "200");
      setParameterUrl(parameter);
    };
    initializeStructure();
  }, []);

  /**
   * Funcion para inicializar el refrescador de dialogo
   */
  useEffect(() => {
    setDialogRefresh((prev) => !prev); // Forzar la actualización cuando cambie dialogStatus
  }, [dialogStatus]);

  const handleOnDelete = () => {
    setFormStatus(StatusEdit.edit);
    accionar(null);
  };

  /**
   * Función para cancelar el borrado
   */
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
      <ToastDialog
        {...toast}
        onClose={() => setToast({ ...toast, status: false })}
      />
      <BannerInformation message={messageFormulario} alert={Alerts.error} />
      <Flex direction="row" gap="3" align="center">
        <FormState statusEdit={formStatus} />
        <InformationPanelRegistration row={row} />
      </Flex>
      <form onSubmit={handleSubmit(accionar)}>
        <InputField
          title={t("modules.GS-ER-001.fields.indexError.title")}
          columns={BandPresentation.column_3}
          placeholder={t("modules.GS-ER-001.fields.indexError.placeholder")}
          directionLabel={Direction.horizontal}
          register={register("indexError")}
          messageError={errors.indexError?.message}
        />
        <AreaField
          title={t("modules.GS-ER-001.fields.message.title")}
          columns={BandPresentation.column_2}
          rows={3}
          placeholder={t("modules.GS-ER-001.fields.message.placeholder")}
          directionLabel={Direction.horizontal}
          register={register("message")}
          messageError={errors.message?.message}
        />
        <AreaField
          title={t("modules.GS-ER-001.fields.description.title")}
          columns={BandPresentation.column_1}
          rows={5}
          placeholder={t("modules.GS-ER-001.fields.description.placeholder")}
          directionLabel={Direction.horizontal}
          register={register("description")}
          messageError={errors.description?.message}
        />
        <FooterForm
          directionLabel={Direction.horizontal}
          columns={BandPresentation.column_2}
        >
          <Button type="submit" disabled={loading}>
            {t("actions.save")}
          </Button>
          <Button
            type="button"
            form="none" // Evita que el botón esté asociado al formulario
            variant="surface"
            disabled={formStatus === StatusEdit.create}
            onClick={() => {
              showPopUpDelete();
            }}
          >
            {t("actions.delete")}
          </Button>
        </FooterForm>
      </form>
    </>
  );
};

export default FormEdit;
