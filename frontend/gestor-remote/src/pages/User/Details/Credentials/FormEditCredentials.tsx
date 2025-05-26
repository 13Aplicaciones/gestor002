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

/**
 * Formulario de edición de errores del sistema.
 */
const FormEditCredentials = ({ status, row, onBack }: IFormProps) => {
  const [t] = useTranslation("global_gestor");
  const [apiUrl, setApiUrl] = useState("");
  const [token, setToken] = useState<string | undefined>(undefined);

  /**
   * Esquema de validación de formulario
   * 
   * {
  "userApp": "AppEjemplo",
  "status": "C",
  "uuidUser": "123e4567-e89b-12d3-a456-426614174000",
  "email": "omargo33@gmail.com"
}
   * 
   */
  const schema = yup.object({
    email: yup
      .string()
      .required(t("validation.required"))
      .email(t("validation.email")),
    uuidUser: yup
      .string()
      .required(t("validation.required")),
    userApp: yup.string(),
    status: yup.string(),
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
      email: row?.email ?? "",
      uuidUser: row?.uuidUser ?? "",
      userApp: row?.userApp ?? "",
      status: row?.status ?? "E",
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
        const url = `${param.valueText01}${Menus.USER_ENDPOINT}`;
        setApiUrl(url);
      } catch (err) {
        console.error("Error generando API URL:", err);
        setApiUrl("");
      }
    })();
  }, [row]);

  return (
    <>
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
              title={t("modules.GS-UC-001.fields.email.title")}
              columns={BandPresentation.column_3}
              placeholder={t("modules.GS-UC-001.fields.email.placeholder")}
              directionLabel={Direction.horizontal}
              register={register("email")}
              messageError={errors.email?.message}
            />
            <InputField
              title={t("modules.GS-UC-001.fields.uuid.title")}
              columns={BandPresentation.column_3}
              placeholder={t("modules.GS-UC-001.fields.uuid.placeholder")}
              directionLabel={Direction.horizontal}
              register={register("uuidUser")}
              messageError={errors.uuidUser?.message}
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
    </>
  );
};

export { FormEditCredentials };
