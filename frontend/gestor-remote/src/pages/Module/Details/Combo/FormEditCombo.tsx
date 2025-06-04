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
  BandPresentation,
  Direction,
  FooterFormAction,
  IFormProps,
  InputField,
} from "ux-ui";
import { GenericCrudForm } from "ux-ui/src/components/form/GenericCrudForm";
import * as yup from "yup";
import { Menus, MODULE } from "../../../../utils/Constants";

const FormEditCombo = ({ status, row, onBack }: IFormProps) => {
  const [t] = useTranslation("global_gestor");
  const [apiUrl, setApiUrl] = useState("");
  const [token, setToken] = useState<string | undefined>(undefined);

  const schema = yup.object({
    indexCombo: yup
      .string()
      .max(32, t("validation.maxLength", { max: 32 }))
      .required(t("validation.required")),
    name: yup
      .string()
      .max(128, t("validation.maxLength", { max: 128 }))
      .required(t("validation.required")),

    uuidModule: yup.string().required(t("validation.required")),
    userApp: yup.string(),
    status: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      indexCombo: row?.indexCombo ?? "",
      name: row?.name ?? "",
      uuidModule: row?.uuidModule ?? "",
      userApp: row?.userApp ?? "",
      status: row?.status ?? "A",
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
        const url = `${param.valueText01}${Menus.COMBO_ENDPOINT}`;
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
            title={t("modules.GS-CB-001.fields.uuidModule.title")}
            columns={BandPresentation.column_3}
            placeholder={t("modules.GS-CB-001.fields.uuidModule.placeholder")}
            directionLabel={Direction.horizontal}
            register={register("uuidModule")}
            messageError={errors.uuidModule?.message}
          />
          <InputField
            title={t("modules.GS-CB-001.fields.indexCombo.title")}
            columns={BandPresentation.column_3}
            placeholder={t("modules.GS-CB-001.fields.indexCombo.placeholder")}
            directionLabel={Direction.horizontal}
            register={register("indexCombo")}
            messageError={errors.indexCombo?.message}
          />
          <InputField
            title={t("modules.GS-CB-001.fields.name.title")}
            columns={BandPresentation.column_3}
            placeholder={t("modules.GS-CB-001.fields.name.placeholder")}
            directionLabel={Direction.horizontal}
            register={register("name")}
            messageError={errors.name?.message}
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

export { FormEditCombo };
