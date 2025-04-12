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
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Alerts,
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
  useToastContext
} from "ux-ui";
import * as yup from "yup";
import { Menus } from "../../utils/Constants";
import { createIRowDataModule, IRowDataModule } from "./Types";
import { InputSelect, IPresentationInputSelect } from "../../components/Select";

/**
 * Formulario de edición de Modulees del sistema.
 *
 * @author @omargo33
 *
 * @param status Estado del formulario
 * @param row Fila de datos a editar
 * @param onAtras Función para regresar a la vista anterior
 * @returns
 */
const FormEditModule = ({
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
    indexModule: yup
      .string()
      .required(t("validation.required"))
      .min(5, t("validation.min", { min: 5 }))
      .max(128, t("validation.max", { max: 32 })),
    name: yup
      .string()
      .required(t("validation.required"))
      .max(128, t("validation.max", { max: 128 })),
    context: yup
      .string()
      .required(t("validation.required"))
      .max(128, t("validation.max", { max: 128 })),
    status: yup
      .string()
      .required(t("validation.required"))
      .max(8, t("validation.max", { max: 8 })),
    userApp: yup
      .string(),
    orden: yup
      .number()
      .typeError(t("validation.typeNumber"))
      .min(0, t("validation.min", { min: 0 }))
      .max(9999, t("validation.max", { max: 9999 })),
  });

  /**
   * Función para registrar los datos del formulario
   */
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      indexModule: row?.indexModule || "",
      name: row?.name || "",
      context: row?.context || "",
      status: row?.status || "A",
      userApp: row?.userApp || "",
      orden: row?.orden || 1, // Hidden field
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
          .catch((Module) => {
            setMessageForm(t("actions.ModuleFetch", { Module: Module }));
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
          .catch((Module) => {
            setMessageForm(t("actions.ModuleFetch", { Module: Module }));
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
          .catch((Module) => {
            setMessageForm(t("actions.ModuleFetch", { Module: Module }));
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

      const parameter: IParameter = await getParameter(Menus.MODULE, "200");
      parameter.valueText01 = parameter.valueText01 + Menus.MODULE_ENDPOINT;
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

  // TODO:
// poner en un useEffect para no repetir
// sacar desde el orquestador
  const items: IPresentationInputSelect = {
    items: [
      {
        order: 0,
        justification: JustificationText.end,
        value: "A",
        title: "Activo",
        width: "100%",
      },
      {
        order: 1,
        justification: JustificationText.start,
        value: "I",
        title: "Inactivo",
        width: "100%",
      }
    ]
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
          title={t("modules.GS-MD-001.fields.indexModule.title")}
          columns={BandPresentation.column_3}
          placeholder={t("modules.GS-MD-001.fields.indexModule.placeholder")}
          directionLabel={Direction.horizontal}
          register={register("indexModule")}
          messageError={errors.indexModule?.message}
        />
        <InputField
          title={t("modules.GS-MD-001.fields.name.title")}
          columns={BandPresentation.column_2}
          placeholder={t("modules.GS-MD-001.fields.name.placeholder")}
          directionLabel={Direction.horizontal}
          register={register("name")}
          messageError={errors.name?.message}
        />
        <InputField
          title={t("modules.GS-MD-001.fields.context.title")}
          columns={BandPresentation.column_1}
          placeholder={t("modules.GS-MD-001.fields.context.placeholder")}
          directionLabel={Direction.horizontal}
          register={register("context")}
          messageError={errors.context?.message}
        />
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <InputSelect
              title={t("modules.GS-MD-001.fields.status.title")}
              placeholder={t("modules.GS-MD-001.fields.status.placeholder")}
              messageError={errors.status?.message}
              columns={BandPresentation.column_6}
              directionLabel={Direction.horizontal}
              items={items}
              {...field}
            />
          )}
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
 * Función para tener una vista previa de los Modulees del sistema.
 * 
 * @param row Fila de datos a editar 
 * @returns 
 */
const PreviewModule = ({ row }: { row?: IRowDataModule }) => {
  const [alertForm, setAlertForm] = useState<Alerts>(Alerts.warning);
  const [messageForm, setMessageForm] = useState<string>("");
  const [rowFound, setRowFound] = useState<IRowDataModule | null>(createIRowDataModule());
  const [t] = useTranslation("global_gestor");

  /**
   * Cargar la vista previa del registro.
   */
  useEffect(() => {
    const cargarVistaPrevia = async (indexModule: string) => {
      const tokenTemp: ITokenRoot = await getToken();
      const parameterTemp: IParameter = await getParameter(Menus.MODULE, "200");
      parameterTemp.valueText01 = parameterTemp.valueText01 + Menus.MODULE_ENDPOINT;

      fetchData({
        url: parameterTemp?.valueText01 + "/index=" + indexModule,
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
        .catch((Module) => {
          setMessageForm("Module message: " + Module);
          setAlertForm(Alerts.error);
          return null;
        });
    };

    if (row?.indexModule) {
      cargarVistaPrevia(row.indexModule);
    }
  }, [row]);


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
        title: t("modules.GS-MD-001.fields.uuid.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },

      {
        name: "indexModule",
        title: t("modules.GS-MD-001.fields.indexModule.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
      {
        name: "message",
        title: t("modules.GS-MD-001.fields.message.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
      {
        name: "description",
        title: t("modules.GS-MD-001.fields.description.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
      {
        name: "user",
        title: t("modules.GS-MD-001.fields.user.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
      {
        name: "userDate",
        title: t("modules.GS-MD-001.fields.userDate.title"),
        justification: JustificationText.start,
        format: TextFormat.dateSocialNetworkDinamic,
      },
      {
        name: "userApp",
        title: t("modules.GS-MD-001.fields.userApp.title"),
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
          <DataListConfigurable
            presentationDataList={presentationData}
            data={rowFound}
          />
        )}
      <DataListSkeleton column={5} />

    </Flex>
  );
};

export { FormEditModule, PreviewModule };

