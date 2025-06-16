import { useTranslation } from "react-i18next";
import {
  BandPresentation,
  Direction,
  GenericQueryForm,
  InputField,
  IParametersQuery
} from "ux-ui";
import * as yup from "yup";

interface ErrorQueryFormValues {
  indexError: string;
  message: string;
}

/**
 * Formulario de consulta de errores del sistema.
 */
const QueryFormError = ({
  onFind,
}: {
  onFind: (data: IParametersQuery) => void;
}) => {
  const [t] = useTranslation("global_gestor");

  const schema = yup.object({
    indexError: yup.string().max(128, t("validation.max", { max: 128 })),
    message: yup.string().max(1024, t("validation.max", { max: 1024 })),
  });

  return (
    <GenericQueryForm<ErrorQueryFormValues>
      validationSchema={schema}
      defaultValues={{
        indexError: "",
        message: "",
      }}
      onFind={onFind}
      renderFields={({ register, formState }) => (
        <>
          <InputField
            title={t("modules.GS-ER-001.fields.indexError.title")}
            columns={BandPresentation.column_3}
            placeholder={t("modules.GS-ER-001.fields.indexError.placeholder")}
            directionLabel={Direction.horizontal}
            register={register("indexError")}
            messageError={formState.errors.indexError?.message}
          />
          <InputField
            title={t("modules.GS-ER-001.fields.message.title")}
            columns={BandPresentation.column_3}
            placeholder={t("modules.GS-ER-001.fields.message.placeholder")}
            directionLabel={Direction.horizontal}
            register={register("message")}
            messageError={formState.errors.message?.message}
          />
        </>
      )}
    />
  );
};

export { QueryFormError };