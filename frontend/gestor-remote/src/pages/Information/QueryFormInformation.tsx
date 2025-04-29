import { useTranslation } from "react-i18next";
import {
  BandPresentation,
  Direction,
  GenericQueryForm,
  InputField,
  IParametersQuery
} from "ux-ui";
import * as yup from "yup";

interface InformationQueryFormValues {
  name: string;
}

/**
 * Formulario de consulta de informaciones del sistema.
 */
const QueryFormInformation = ({
  onFind,
}: {
  onFind: (data: IParametersQuery) => void;
}) => {
  const [t] = useTranslation("global_gestor");

  const schema = yup.object({
    name: yup.string().max(128, t("validation.max", { max: 128 })),
  });

  return (
    <GenericQueryForm<InformationQueryFormValues>
      validationSchema={schema}
      defaultValues={{
        name: "",
      }}
      onFind={onFind}
      renderFields={({ register, formState }) => (
        <>
          <InputField
            title={t("modules.GS-IN-001.fields.name.title")}
            columns={BandPresentation.column_3}
            placeholder={t("modules.GS-IN-001.fields.name.placeholder")}
            directionLabel={Direction.horizontal}
            register={register("name")}
            messageError={formState.errors.name?.message}
          />
        </>
      )}
    />
  );
};

export { QueryFormInformation };
