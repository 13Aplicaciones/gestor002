import { useTranslation } from "react-i18next";
import {
  BandPresentation,
  Direction,
  GenericQueryForm,
  InputField,
  IParametersQuery,
} from "ux-ui";
import * as yup from "yup";

interface CredentialsQueryFormValues {
  socialNick: string;
}

/**
 * Formulario de consulta de informaciones del sistema.
 */
const QueryFormCredentials = ({
  onFind,
}: {
  onFind: (data: IParametersQuery) => void;
}) => {
  const [t] = useTranslation("global_gestor");

  const schema = yup.object({
    nick: yup
      .string()
      .required(t("modules.GS-UC-001.fields.socialNick.required")),
  });

  return (
    <GenericQueryForm<CredentialsQueryFormValues>
      validationSchema={schema}
      defaultValues={{
        socialNick: "",
      }}
      onFind={onFind}
      renderFields={({ register, formState }) => (
        <>
          <InputField
            title={t("modules.GS-UC-001.fields.socialNick.title")}
            columns={BandPresentation.column_3}
            placeholder={t("modules.GS-US-001.fields.nick.placeholder")}
            directionLabel={Direction.horizontal}
            register={register("socialNick")}
            messageError={formState.errors.socialNick?.message}
          />
        </>
      )}
    />
  );
};

export { QueryFormCredentials };
