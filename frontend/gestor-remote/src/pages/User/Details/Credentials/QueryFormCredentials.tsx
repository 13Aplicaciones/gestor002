/* eslint-disable @typescript-eslint/no-explicit-any */
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
  uuidUser: string;
}

/**
 * Formulario de consulta de informaciones del sistema.
 */
const QueryFormCredentials = ({
  onFind,
  initialRow,
}: {
  onFind: (data: IParametersQuery) => void;
  initialRow?: any;
}) => {
  const [t] = useTranslation("global_gestor");
  const schema = yup.object({
    uuidUser: yup.string().required(t("validation.required")),
  });

  return (
    <GenericQueryForm<CredentialsQueryFormValues>
      disableSubmit={true}
      validationSchema={schema}
      defaultValues={{
        uuidUser: initialRow?.uuidUser ?? "",
      }}
      onFind={onFind}
      renderFields={({ register, formState }) => (
        <InputField
          title={t("modules.GS-US-001.fields.uuid.title")}
          columns={BandPresentation.column_3}
          placeholder={t("modules.GS-US-001.fields.uuid.placeholder")}
          directionLabel={Direction.horizontal}
          register={register("uuidUser")}
          messageError={formState.errors.uuidUser?.message}
        />
      )}
    />
  );
};

export { QueryFormCredentials };
