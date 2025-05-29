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
  BandPresentation,
  Direction,
  FooterFormAction,
  IFormProps,
  InputField,
  InputSelect,
  PageCrud,
  StatusEdit,
} from "ux-ui";
import { GenericCrudForm } from "ux-ui/src/components/form/GenericCrudForm";
import * as yup from "yup";
import { Menus, MODULE } from "../../utils/Constants";
import { listaFormModule } from "./Structures/Presentations";
import { createIRowDataUserDefinedCodeHeader } from "./Details/UserDefinedCodeHeader/Structures/Types";
import { QueryUserDefinedCodeHeader } from "./Details/UserDefinedCodeHeader/QueryUserDefinedCodeHeader";
import { FormEditUserDefinedCodeHeader } from "./Details/UserDefinedCodeHeader/FormEditUserDefinedCodeHeader";
import { PreviewUser } from "../User/PreviewUser";
import { Box, Tabs, Text } from "@radix-ui/themes";

/**
 * Formulario de edición de Modules del sistema.
 */
const FormEditModule = ({ status, row, onBack }: IFormProps) => {
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
      indexModule: row?.indexModule ?? "",
      name: row?.name ?? "",
      context: row?.context ?? "",
      status: row?.status ?? "A",
      userApp: row?.userApp ?? "",
      orden: row?.orden ?? 1,
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
              title={t("modules.GS-MD-001.fields.indexModule.title")}
              columns={BandPresentation.column_3}
              placeholder={t(
                "modules.GS-MD-001.fields.indexModule.placeholder"
              )}
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
            <FooterFormAction
              loading={loading}
              onBack={onBack}
              showPopUpDelete={showPopUpDelete}
              formStatus={formStatus}
            />
          </form>
        )}
      />

      {status == StatusEdit.edit && (
        <Tabs.Root defaultValue="account">
          <Tabs.List>
            <Tabs.Trigger value="account">Account</Tabs.Trigger>
            <Tabs.Trigger value="documents">Documents</Tabs.Trigger>
            <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
          </Tabs.List>

          <Box pt="3">
            <Tabs.Content value="account">
              <PageCrud
                tranlation={Menus.USER_DEFINED_CODE_HEADER}
                createIRowDataCustom={createIRowDataUserDefinedCodeHeader}
                QueryPanel={QueryUserDefinedCodeHeader}
                PreviewPanel={PreviewUser}
                FormPanel={FormEditUserDefinedCodeHeader}
                initialRow={{ uuidModule: row.uuid }}
              />
            </Tabs.Content>

            <Tabs.Content value="documents">
              <Text size="2">Access and update your documents.</Text>
            </Tabs.Content>

            <Tabs.Content value="settings">
              <Text size="2">
                Edit your profile or update contact information.
              </Text>
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      )}
    </>
  );
};

export { FormEditModule };
