import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { BandPresentation, Direction } from "../../../ConstantsPresentation";
import { GenericQueryForm } from "../../form/GenericQueryForm";
import { IParametersQuery } from "../../table/TableSearchOrder";
import { InputField } from "../Input";

/**
 * Interfaz para los valores del formulario de consulta de ComboItemes.
 */
interface LovQueryFormValues {
  label: string;
  labelAlternative: string;
}

/**
 * Formulario de consulta de ComboItemes del sistema.
 */
const QueryFormLov = ({
  onFind,
  presentations = {
    labelAlternative: false,
  },
}: {
  onFind: (data: IParametersQuery) => void;
  presentations?: {
    labelAlternative?: boolean;
  };
}) => {
  const [t] = useTranslation("global_ux");

  const schema = yup.object({
    label: yup.string().max(128, t("validation.max", { max: 128 })),
    labelAlternative: yup
      .string()
      .max(1024, t("validation.max", { max: 1024 })),
  });

  return (
    <GenericQueryForm<LovQueryFormValues>
      validationSchema={schema}
      defaultValues={{
        label: "",
        labelAlternative: "",
      }}
      onFind={onFind}
      buttonsDetails={false}
      renderFields={({ register, formState }) => (
        <>
          <InputField
            title={t("lov.label")}
            columns={BandPresentation.column_5}
            placeholder={t("lov.labelPlaceholder")}
            directionLabel={Direction.horizontal}
            register={register("label")}
            messageError={formState.errors.label?.message}
            labelVisible={false}
          />
          {presentations.labelAlternative && (
            <InputField
              title={t("lov.alternative")}
              columns={BandPresentation.column_5}
              placeholder={t("lov.alternativePlaceholder")}
              directionLabel={Direction.horizontal}
              register={register("labelAlternative")}
              messageError={formState.errors.labelAlternative?.message}
              labelVisible={false}
            />
          )}
        </>
      )}
    />
  );
};

export { QueryFormLov };
