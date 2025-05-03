import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  AreaField,
  BandPresentation,
  Direction,
  FooterForm,
  IFormProps,
  InputField,
  StatusEdit,
} from "ux-ui";
import * as yup from "yup";
import { Menus, MODULE } from "../../utils/Constants";
import { GenericCrudForm } from "ux-ui/src/components/form/GenericCrudForm";
import { useEffect, useState } from "react";
import { getToken, ITokenRoot } from "orchestrator_remote/service/Tokens";
import {
  getParameter,
  IParameter,
} from "orchestrator_remote/service/Parameter";

/**
 * Formulario de edición de errores del sistema.
 */
const FormEditError = ({ status, row, onAtras }: IFormProps) => {
  const [t] = useTranslation("global_gestor");
  const [apiUrl, setApiUrl] = useState("");
  const [token, setToken] = useState<string | undefined>(undefined);

  /**
   * Esquema de validación de formulario
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
   * Hook para el manejo de formularios
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
        const url = `${param.valueText01}${Menus.ERROR_ENDPOINT}`;
        setApiUrl(url);
      } catch (err) {
        console.error("Error generando API URL:", err);
        setApiUrl("");
      }
    })();
  }, [row]);

  return (
    <>
      {!apiUrl || !token ? (
        <></>
      ) : (
        <GenericCrudForm
          status={status}
          row={row}
          onAtras={onAtras}
          indexName="uuid"
          apiUrl={apiUrl}
          token={token}
          getToken={getToken}
          renderForm={({
            formStatus,
            loading,
            handleSubmit: submitData,
            showPopUpDelete,
          }) => (
            <form onSubmit={handleSubmit(submitData)}>
              <InputField
                title={t("modules.GS-ER-001.fields.indexError.title")}
                columns={BandPresentation.column_3}
                placeholder={t(
                  "modules.GS-ER-001.fields.indexError.placeholder"
                )}
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
                placeholder={t(
                  "modules.GS-ER-001.fields.description.placeholder"
                )}
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
      )}
    </>
  );
};

export { FormEditError };
