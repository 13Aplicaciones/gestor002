/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslation } from "react-i18next";
import {
  BandPresentation,
  Direction,
  GenericQueryForm,
  InputField,
  InputHidden,
  IParametersQuery,
} from "ux-ui";
import * as yup from "yup";

interface ComboQueryFormValues {
  uuidModule: string;
  name: string;
}

/**
 * Formulario de consulta para el combo
 *
 * Este formulario permite filtrar los combos por módulo y nombre.
 * 
 * @param onFind Función que se ejecuta al enviar el formulario con los datos de búsqueda.
 * @param initialRow Objeto que contiene los valores iniciales del formulario, como el UUID del módulo.
 */
const QueryFormCombo = ({
  onFind,
  initialRow,
}: {
  onFind: (data: IParametersQuery) => void;
  initialRow?: any;
}) => {
  const [t] = useTranslation("global_gestor");
  const schema = yup.object({
    uuidModule: yup.string().required(t("validation.required")),
    name: yup.string(),
  });

  return (
    <GenericQueryForm<ComboQueryFormValues>
      disableSubmit={false}
      buttonsDetails={false}
      validationSchema={schema}
      defaultValues={{
        uuidModule: initialRow?.uuidModule ?? "",
        name: "",
      }}
      onFind={onFind}
      renderFields={({ register, formState }) => (
        <>
          <InputHidden
            register={register("uuidModule")}
          />
          <InputField
            title={t("modules.GS-CB-001.fields.name.title")}
            columns={BandPresentation.column_3}
            placeholder={t("modules.GS-CB-001.fields.name.placeholder")}
            directionLabel={Direction.horizontal}
            register={register("name")}
            messageError={formState.errors.name?.message}
          />
        </>
      )}
    />
  );
};

export { QueryFormCombo };
