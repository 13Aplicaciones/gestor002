import { yupResolver } from "@hookform/resolvers/yup";
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
  AreaField,
  BandPresentation,
  Direction,
  FooterFormAction,
  IFormProps,
  InputField,
  InputSelect,
} from "ux-ui";
import { GenericCrudForm } from "ux-ui/src/components/form/GenericCrudForm";
import * as yup from "yup";
import { Menus, MODULE } from "../../utils/Constants";
import { listaFormTypeMenu } from "./structures/Presentations";

/**
 * Formulario de edición de errores del sistema.
 */
const FormEditMenu = ({ status, row, onBack }: IFormProps) => {
  const [t] = useTranslation("global_gestor");
  const [apiUrl, setApiUrl] = useState("");
  const [token, setToken] = useState<string | undefined>(undefined);

  /**
   * Esquema de validación de formulario
   */
  const schema = yup.object({
    uuidModule: yup.string().required(t("validation.required")),
    indexMenu: yup
      .string()
      .required(t("validation.required"))
      .min(5, t("validation.min", { min: 5 }))
      .max(32, t("validation.max", { max: 32 })),
    name: yup
      .string()
      .required(t("validation.required"))
      .min(5, t("validation.min", { min: 5 }))
      .max(128, t("validation.max", { max: 128 })),
    type: yup.string().required(t("validation.required")),
    taskFlow: yup
      .string()
      .required(t("validation.required"))
      .min(5, t("validation.min", { min: 5 }))
      .max(256, t("validation.max", { max: 256 })),
    userApp: yup.string(),
  });

  /**
   * Hook para el manejo de formularios
   */
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      uuidModule: row?.uuidModule ?? "",
      indexMenu: row?.indexMenu ?? "",
      name: row?.name ?? "",
      type: row?.type ?? "",
      taskFlow: row?.taskFlow ?? "",
      userApp: row?.userApp ?? "",
    },
  });

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
        const url = `${param.valueText01}${Menus.MENU_ENDPOINT}`;
        setApiUrl(url);
      } catch (err) {
        console.error("Error generando API URL -> Error:", err);
        setApiUrl("");
      }
    })();
  }, [row]);

  return (
    <GenericCrudForm
      status={status}
      row={row}
      indexName="uuid"
      onBack={onBack}
      apiUrl={apiUrl}
      token={token}
      getToken={refreshToken}
      renderForm={({
        formStatus,
        loading,
        handleSubmit: submitData,
        showPopUpDelete,
      }) => (
        <form onSubmit={handleSubmit(submitData)}>
          <InputField
            title={t("modules.GS-MN-001.fields.uuidModule.title")}
            columns={BandPresentation.column_3}
            placeholder={t("modules.GS-MN-001.fields.uuidModule.placeholder")}
            directionLabel={Direction.horizontal}
            register={register("uuidModule")}
            messageError={errors.uuidModule?.message}
          />
          <InputField
            title={t("modules.GS-MN-001.fields.indexMenu.title")}
            columns={BandPresentation.column_3}
            placeholder={t("modules.GS-MN-001.fields.indexMenu.placeholder")}
            directionLabel={Direction.horizontal}
            register={register("indexMenu")}
            messageError={errors.indexMenu?.message}
          />
          <InputField
            title={t("modules.GS-MN-001.fields.name.title")}
            columns={BandPresentation.column_3}
            placeholder={t("modules.GS-MN-001.fields.name.placeholder")}
            directionLabel={Direction.horizontal}
            register={register("name")}
            messageError={errors.name?.message}
          />
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <InputSelect
                title={t("modules.GS-MN-001.fields.type.title")}
                placeholder={t("modules.GS-MN-001.fields.type.placeholder")}
                messageError={errors.type?.message}
                columns={BandPresentation.column_6}
                directionLabel={Direction.horizontal}
                items={listaFormTypeMenu()}
                {...field}
              />
            )}
          />
          <AreaField
            title={t("modules.GS-MN-001.fields.taskFlow.title")}
            columns={BandPresentation.column_2}
            rows={3}
            placeholder={t("modules.GS-MN-001.fields.taskFlow.placeholder")}
            directionLabel={Direction.horizontal}
            register={register("taskFlow")}
            messageError={errors.taskFlow?.message}
          />
          <FooterFormAction
            loading={loading}
            onBack={onBack}
            showPopUpDelete={showPopUpDelete}
            formStatus={formStatus}
          />
        </form>
      )}
    />
  );
};

export { FormEditMenu };
