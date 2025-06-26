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
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  AreaField,
  BandPresentation,
  Direction,
  FooterFormAction,
  IFormProps,
  InputField,
} from "ux-ui";
import { GenericCrudForm } from "ux-ui/src/components/form/GenericCrudForm";
import * as yup from "yup";
import { Menus, MODULE } from "../../utils/Constants";

/**
 * Formulario de edición de errores del sistema.
 * 
 * @param {IFormProps} props - Propiedades del formulario.
 */
const FormEditComboItem = ({ status, row, onBack }: IFormProps) => {
  const [t] = useTranslation("global_gestor");
  const [apiUrl, setApiUrl] = useState("");
  const [token, setToken] = useState<string | undefined>(undefined);

  /**
   * Esquema de validación de formulario
   */
  const schema = yup.object({
    name: yup
      .string()
      .required(t("validation.required"))
      .min(5, t("validation.min", { min: 5 }))
      .max(128, t("validation.max", { max: 128 })),
    value01: yup
      .string()
      .required(t("validation.required"))
      .min(5, t("validation.min", { min: 5 }))
      .max(128, t("validation.max", { max: 256 })),
    value02: yup.string().max(256, t("validation.max", { max: 256 })),
    userApp: yup.string(),
  });

  /**
   * Hook para el manejo de formularios
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: row?.name ?? "",
      value01: row?.value01 ?? "",
      value02: row?.value02 ?? "",
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

  /**
   * Genera la URL de la API para el CRUD de Combo Items.
   */
  useEffect(() => {
    if (!row) {
      setApiUrl("");
      return;
    }

    (async () => {
      try {
        const param: IParameter = await getParameter(MODULE, "200");
        const url = `${param.valueText01}${Menus.COMBO_ITEM_ENDPOINT}`;
        setApiUrl(url);
      } catch (err) {
        console.error("FormEditComboItem -> Error:", err);
        setApiUrl("");
      }
    })();
  }, [row]);

  return (
    <GenericCrudForm
      apiUrl={apiUrl}
      getToken={refreshToken}
      indexName="uuid"
      onBack={onBack}
      row={row}
      status={status}
      token={token}
      renderForm={({
        formStatus,
        loading,
        handleSubmit: submitData,
        showPopUpDelete,
      }) => (
        <form onSubmit={handleSubmit(submitData)}>
          <InputField
            columns={BandPresentation.column_3}
            directionLabel={Direction.horizontal}
            messageError={errors.name?.message}
            placeholder={t("modules.GS-CB-IT-001.fields.name.placeholder")}
            register={register("name")}
            title={t("modules.GS-CB-IT-001.fields.name.title")}
          />
          <AreaField
            columns={BandPresentation.column_2}
            directionLabel={Direction.horizontal}
            messageError={errors.value01?.message}
            placeholder={t("modules.GS-CB-IT-001.fields.value01.placeholder")}
            register={register("value01")}
            rows={3}
            title={t("modules.GS-CB-IT-001.fields.value01.title")}
          />
          <AreaField
            columns={BandPresentation.column_2}
            directionLabel={Direction.horizontal}
            messageError={errors.value02?.message}
            placeholder={t("modules.GS-CB-IT-001.fields.value02.placeholder")}
            register={register("value02")}
            rows={3}
            title={t("modules.GS-CB-IT-001.fields.value02.title")}
          />
          <FooterFormAction
            formStatus={formStatus}
            loading={loading}
            onBack={onBack}
            showPopUpDelete={showPopUpDelete}
          />
        </form>
      )}
    />
  );
};

export { FormEditComboItem };
