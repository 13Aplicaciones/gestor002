/* eslint-disable @typescript-eslint/no-explicit-any */

import { useTranslation } from "react-i18next";
import {
  BandPresentation,
  Direction,
  GenericQueryForm,
  InputField,
  InputHidden,
  IParametersQuery
} from "ux-ui";
import * as yup from "yup";

interface UserDefinedCodeHeaderQueryFormValues {
  uuidModule: string;
  name: string;
}

/**
 * Formulario de consulta de UserDefinedCodeHeaders del sistema.
 */
const QueryFormUserDefinedCodeHeader = ({
  onFind,
  initialRow,
}: {
  onFind: (data: IParametersQuery) => void;
  initialRow?: any;
}) => {
  const [t] = useTranslation("global_gestor");
  const schema = yup.object({
    uuidModule: yup.string().max(128, t("validation.max", { max: 128 })),
    name: yup.string().max(1024, t("validation.max", { max: 1024 })),
  });

  return (
    <GenericQueryForm<UserDefinedCodeHeaderQueryFormValues>
      validationSchema={schema}
      defaultValues={{
        uuidModule: initialRow?.uuidModule ?? "",
        name: "",
      }}
      onFind={onFind}
      buttonsDetails={false}
      renderFields={({ register, formState }) => (
        <>
          <InputHidden
            register={register("uuidModule")}
          />
          <InputField
            title={t("modules.GS-CD-001.fields.name.title")}
            columns={BandPresentation.column_4}
            placeholder={t("modules.GS-CD-001.fields.name.placeholder")}
            directionLabel={Direction.horizontal}
            register={register("name")}
            messageError={formState.errors.name?.message}
          />
        </>
      )}
    />
  );
};

export { QueryFormUserDefinedCodeHeader };
