import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  BandPresentation,
  Direction,
  FooterForm,
  IFormProps,
  InputField,
  InputSelect,
  StatusEdit,
} from "ux-ui";
import * as yup from "yup";
import { Menus, MODULE } from "../../utils/Constants";
import { listaFormModule } from "./Structures/Presentations";
import { GenericCrudForm } from "ux-ui/src/components/form/GenericCrudForm";
import { useEffect, useState } from "react";
import { getToken, ITokenRoot } from "orchestrator_remote/service/Tokens";
import { getParameter, IParameter } from "orchestrator_remote/service/Parameter";

/**
 * Formulario de edición de Modules del sistema.
 */
const FormEditModule = ({ status, row, onAtras }: IFormProps) => {
  const [t] = useTranslation("global_gestor");
    const [apiUrl, setApiUrl] = useState("");
    const [token, setToken] = useState<string | undefined>(undefined);
  

  /**
   * Esquema de validación de formulario
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
    userApp: yup.string(),
    orden: yup
      .number()
      .typeError(t("validation.typeNumber"))
      .min(0, t("validation.min", { min: 0 }))
      .max(9999, t("validation.max", { max: 9999 })),
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
      indexModule: row?.indexModule || "",
      name: row?.name || "",
      context: row?.context || "",
      status: row?.status || "A",
      userApp: row?.userApp || "",
      orden: row?.orden || 1,
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
          const url = `${param.valueText01}${Menus.MODULE_ENDPOINT}`;
          setApiUrl(url);
        } catch (err) {
          console.error("Error generando API URL:", err);
          setApiUrl("");
        }
      })();
    }, [row]);

  return (
    <GenericCrudForm
      status={status}
      row={row}
      indexName="uuid"
      onAtras={onAtras}
      apiUrl={apiUrl}
      token={token}
      getToken={getToken}      
      renderForm={({ formStatus, loading, handleSubmit: submitData, showPopUpDelete }) => (
        <form onSubmit={handleSubmit(submitData)}>
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
                items={listaFormModule()}
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
              form="none"
              variant="surface"
              disabled={formStatus === StatusEdit.create}
              onClick={showPopUpDelete}
            >
              {t("actions.delete")}
            </Button>
          </FooterForm>
        </form>
      )}
    />
  );
};

export { FormEditModule };