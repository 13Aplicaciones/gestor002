import { useTranslation } from "react-i18next";
import {
  BandPresentation,
  Direction,
  GenericQueryForm,
  InputField,
  IParametersQuery
} from "ux-ui";
import * as yup from "yup";

interface ComboItemQueryFormValues {
  indexComboItem: string;
  message: string;
}

/**
 * Formulario de consulta de ComboItemes del sistema.
 */
const QueryFormComboItem = ({
  onFind,
}: {
  onFind: (data: IParametersQuery) => void;
}) => {
  const [t] = useTranslation("global_gestor");

  const schema = yup.object({
    indexComboItem: yup.string().max(128, t("validation.max", { max: 128 })),
    message: yup.string().max(1024, t("validation.max", { max: 1024 })),
  });

  return (
    <GenericQueryForm<ComboItemQueryFormValues>
      validationSchema={schema}
      defaultValues={{
        indexComboItem: "",
        message: "",
      }}
      onFind={onFind}
      renderFields={({ register, formState }) => (
        <>
          <InputField
            title={t("modules.GS-CB-IT-001.fields.indexComboItem.title")}
            columns={BandPresentation.column_3}
            placeholder={t("modules.GS-CB-IT-001.fields.indexComboItem.placeholder")}
            directionLabel={Direction.horizontal}
            register={register("indexComboItem")}
            messageError={formState.errors.indexComboItem?.message}
          />
          <InputField
            title={t("modules.GS-CB-IT-001.fields.message.title")}
            columns={BandPresentation.column_3}
            placeholder={t("modules.GS-CB-IT-001.fields.message.placeholder")}
            directionLabel={Direction.horizontal}
            register={register("message")}
            messageError={formState.errors.message?.message}
          />
        </>
      )}
    />
  );
};

export { QueryFormComboItem };