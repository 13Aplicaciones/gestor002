/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from "@hookform/resolvers/yup";
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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Alerts,
  AreaField,
  BandPresentation,
  BannerInformation,
  DataListConfigurable,
  DataListSkeleton,
  DialogDelete,
  Direction,
  FooterForm,
  FormState,
  IFormProps,
  InformationPanelRegistration,
  InputField,
  IPresentationDataList,
  JustificationText,
  StatusEdit,
  TextFormat,
  useToastContext,
} from "ux-ui";
import * as yup from "yup";
import { Menus, MODULE } from "../../utils/Constants";
import { createIRowDataError, IRowDataError } from "./Types";

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
const FormEditError = ({
  status,
  row,
  onAtras,
}: IFormProps) => {

  const [dialogRefresh, setDialogRefresh] = useState(false);
  const [dialogStatus, setDialogStatus] = useState(false);
  const [formStatus, setFormStatus] = useState<StatusEdit>(status || StatusEdit.create);
  const [loading, setLoading] = useState(false);
  const [messageFormulario, setMessageForm] = useState("");
  const [parameterUrl, setParameterUrl] = useState<IParameter>({} as IParameter);
  const [t] = useTranslation("global_gestor");
  const [token, setToken] = useState<ITokenRoot>({} as ITokenRoot);
  const [uuid, setUuid] = useState(row ? row.uuid : "");
  const { showToast } = useToastContext();

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
  const actuate = async (data: any) => {
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
        showToast(
          response.error + " (" + response.status.toString() + ")",
          response.error,
          Alerts.warning,
        );
      } else {
        showToast(
          response.status.toString(),
          response.error,
          Alerts.warning,
        );
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
   * Funcion para inicializar el token
   *
   */
  useEffect(() => {
    const initializeStructure = async () => {
      const tokenTemp: ITokenRoot = await getToken();
      setToken(tokenTemp);

      const parameter: IParameter = await getParameter(MODULE, "200");
      parameter.valueText01 = parameter.valueText01 + Menus.ERROR_ENDPOINT;
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
    actuate(null);
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
      <BannerInformation message={messageFormulario} alert={Alerts.error} />
      <Flex direction="row" gap="3" align="center">
        <FormState statusEdit={formStatus} />
        <InformationPanelRegistration row={row} />
      </Flex>
      <form onSubmit={handleSubmit(actuate)}>
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

/**
 * Función para tener una vista previa de los errores del sistema.
 * 
 * @param row Fila de datos a editar 
 * @returns 
 */
const PreviewError = ({ row }: { row?: IRowDataError }) => {
  const [alertForm, setAlertForm] = useState<Alerts>(Alerts.warning);
  const [loading, setLoading] = useState(false);
  const [messageForm, setMessageForm] = useState<string>("");
  const [rowFound, setRowFound] = useState<IRowDataError | null>(createIRowDataError());
  const [t] = useTranslation("global_gestor");

  /**
   * Cargar la vista previa del registro.
   */
  useEffect(() => {
    const loadPreview = (row: any) => {
      setLoading(true);
      setTimeout(async () => {
        await runApi(row.uuid || "");
        setLoading(false);
      }, 333);
    };

    loadPreview(row);
  }, [row]);

  /**
   * Método para ejecutar la API y obtener los datos del error.
   * 
   * @param indexError 
   */
  const runApi = async (indexError: string) => {
    const tokenTemp: ITokenRoot = await getToken();
    const parameterTemp: IParameter = await getParameter(MODULE, "200");
    parameterTemp.valueText01 = parameterTemp.valueText01 + Menus.ERROR_ENDPOINT;

    fetchData({
      url: parameterTemp?.valueText01 + "/" + indexError,
      methodRest: MethodREST.GET,
      typeBody: TypeBody.NONE,
      bodyParameter: null,
      token: tokenTemp.access_token,
      getToken() {
        return refreshToken();
      },
    })
      .then((response) => {
        if (response.error) {
          setMessageForm(response?.statusDescription || "");
          setAlertForm(Alerts.info);
          return null;
        }
        setRowFound(response.response);
      })
      .catch((error) => {
        setMessageForm("Error message: " + error);
        setAlertForm(Alerts.error);
        return null;
      });
  };

  /**
   * Presentación de los items de la tabla.
   */
  const presentationData: IPresentationDataList = {
    banding: true,
    headers: true,
    skeletonWidth: "90vw",
    items: [
      {
        name: "uuid",
        title: t("modules.GS-ER-001.fields.uuid.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },

      {
        name: "indexError",
        title: t("modules.GS-ER-001.fields.indexError.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
      {
        name: "message",
        title: t("modules.GS-ER-001.fields.message.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
      {
        name: "description",
        title: t("modules.GS-ER-001.fields.description.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
      {
        name: "user",
        title: t("modules.GS-ER-001.fields.user.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
      {
        name: "userDate",
        title: t("modules.GS-ER-001.fields.userDate.title"),
        justification: JustificationText.start,
        format: TextFormat.dateSocialNetworkDinamic,
      },
      {
        name: "userApp",
        title: t("modules.GS-ER-001.fields.userApp.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
    ],
  };

  return (
    <Flex direction="column" gap="3" maxWidth={{ md: "50vw", xl: "1400px" }}>
      {(messageForm && (
        <BannerInformation message={messageForm} alert={alertForm} />
      )) || (
          loading ? (
            <DataListSkeleton column={5} />
          ) : (
            <>
              <DataListConfigurable
                presentationDataList={presentationData}
                data={rowFound}
              />
            </>
          )
        )}
    </Flex>
  );
};

export { FormEditError, PreviewError };

