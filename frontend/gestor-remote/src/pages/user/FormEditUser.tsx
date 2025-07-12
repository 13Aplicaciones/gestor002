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
  PageCrud,
  StatusEdit,
} from "ux-ui";
import { GenericCrudForm } from "ux-ui/src/components/form/GenericCrudForm";
import * as yup from "yup";
import { Menus, MODULE } from "../../utils/Constants";
import { QueryCredentials } from "./details/credentials/QueryCredentials";
import { createIRowDataCredential } from "./details/credentials/structures/Types";

import { FormEditCredentials } from "./details/credentials/FormEditCredentials";
import { Box, Tabs } from "@radix-ui/themes";
import { WorkUser } from "./WorkUser";

/**
 * Formulario de edición de errores del sistema.
 */
const FormEditUser = ({ status, row, onBack }: IFormProps) => {
  const [t] = useTranslation("global_gestor");
  const [apiUrl, setApiUrl] = useState("");
  const [token, setToken] = useState<string | undefined>(undefined);

  /**
   * Esquema de validación de formulario
   */
  const schema = yup.object({
    nick: yup
      .string()
      .required(t("validation.required"))
      .min(3, t("validation.min", { min: 3 }))
      .max(128, t("validation.max", { max: 128 })),
    name: yup
      .string()
      .required(t("validation.required"))
      .min(5, t("validation.min", { min: 5 }))
      .max(128, t("validation.max", { max: 128 })),
    lastName: yup
      .string()
      .required(t("validation.required"))
      .min(5, t("validation.min", { min: 5 }))
      .max(128, t("validation.max", { max: 256 })),
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
      nick: row?.nick ?? "",
      name: row?.name ?? "",
      lastName: row?.lastName ?? "",
      userApp: row?.userApp ?? "",
      status: row?.status ?? "C",
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
        console.error("Error generando API URL -> Error:", err);
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
              title={t("modules.GS-US-001.fields.nick.title")}
              columns={BandPresentation.column_3}
              placeholder={t("modules.GS-US-001.fields.nick.placeholder")}
              directionLabel={Direction.horizontal}
              register={register("nick")}
              messageError={errors.nick?.message}
            />
            <InputField
              title={t("modules.GS-US-001.fields.name.title")}
              columns={BandPresentation.column_3}
              placeholder={t("modules.GS-US-001.fields.name.placeholder")}
              directionLabel={Direction.horizontal}
              register={register("name")}
              messageError={errors.name?.message}
            />
            <InputField
              title={t("modules.GS-US-001.fields.lastName.title")}
              columns={BandPresentation.column_3}
              placeholder={t("modules.GS-US-001.fields.lastName.placeholder")}
              directionLabel={Direction.horizontal}
              register={register("lastName")}
              messageError={errors.lastName?.message}
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
        <Tabs.Root defaultValue="credentials">
          <Tabs.List size="2">
            <Tabs.Trigger value="credentials">Credenciales</Tabs.Trigger>
            <Tabs.Trigger value="documents">Documents</Tabs.Trigger>
            <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
          </Tabs.List>

          <Box pt="3">
            <Tabs.Content value="credentials">
              <PageCrud
                tranlation={Menus.CREDENTIALS}
                createIRowDataCustom={createIRowDataCredential}
                QueryPanel={QueryCredentials}
                WorkPanel={WorkUser}
                FormPanel={FormEditCredentials}
                initialRow={{ uuidUser: row.uuid }}
              />
            </Tabs.Content>
            <Tabs.Content value="documents">
              {/* Aquí puedes agregar el contenido para la pestaña de documentos */}
            </Tabs.Content>
            <Tabs.Content value="settings">
              {/* Aquí puedes agregar el contenido para la pestaña de configuraciones */}
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      )}
    </>
  );
};

export { FormEditUser };
