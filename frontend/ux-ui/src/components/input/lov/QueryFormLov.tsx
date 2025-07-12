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
const QueryFormSimpleLov = ({
  onFind,
}: {
  onFind: (data: IParametersQuery) => void;
}) => {
  const [t] = useTranslation("global_ux");

  /**
   * Esquema de validación para el formulario de consulta de ComboItemes.
   * Utiliza Yup para definir las reglas de validación.
   */
  const schema = yup.object({
    label: yup.string().max(128, t("validation.max", { max: 128 })),
  });

  return (
    <GenericQueryForm<LovQueryFormValues>
      validationSchema={schema}
      defaultValues={{
        label: "",
      }}
      onFind={onFind}
      buttonsDetails={false}
      renderFields={({ register, formState }) => (
        <InputField
          title={t("lov.label")}
          columns={BandPresentation.column_5}
          placeholder={t("lov.labelPlaceholder")}
          directionLabel={Direction.horizontal}
          register={register("label")}
          messageError={formState.errors.label?.message}
          labelVisible={false}
        />
      )}
    />
  );
};

/**
 * Formulario de consulta de ComboItemes del sistema.
 */
const QueryFormFullLov = ({
  onFind,
}: {
  onFind: (data: IParametersQuery) => void;
}) => {
  const [t] = useTranslation("global_ux");

  /**
   * Esquema de validación para el formulario de consulta de ComboItemes.
   * Utiliza Yup para definir las reglas de validación.
   */
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
          <InputField
            title={t("lov.alternative")}
            columns={BandPresentation.column_5}
            placeholder={t("lov.alternativePlaceholder")}
            directionLabel={Direction.horizontal}
            register={register("labelAlternative")}
            messageError={formState.errors.labelAlternative?.message}
            labelVisible={false}
          />
        </>
      )}
    />
  );
};

export { QueryFormSimpleLov, QueryFormFullLov };
