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

interface UserDefinedCodeHeaderQueryFormValues {
  uuidModule: string;
  group: string;
  name: string;
  description: string;
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
    group: yup.string().max(128, t("validation.max", { max: 128 })),
    name: yup.string().max(1024, t("validation.max", { max: 1024 })),
    description: yup.string().max(1024, t("validation.max", { max: 1024 })),
  });

  return (
    <GenericQueryForm<UserDefinedCodeHeaderQueryFormValues>
      validationSchema={schema}
      defaultValues={{
        uuidModule: initialRow?.uuidModule ?? "",
        group: "",
        name: "",
        description: "",
      }}
      onFind={onFind}
      renderFields={({ register, formState }) => (
        <>
          <InputField
            title={t("modules.GS-UD-001.fields.uuidModule.title")}
            columns={BandPresentation.column_3}
            placeholder={t("modules.GS-UD-001.fields.uuidModule.placeholder")}
            directionLabel={Direction.horizontal}
            register={register("uuidModule")}
            messageError={formState.errors.uuidModule?.message}
          />
          <InputField
            title={t("modules.GS-UD-001.fields.group.title")}
            columns={BandPresentation.column_3}
            placeholder={t("modules.GS-UD-001.fields.group.placeholder")}
            directionLabel={Direction.horizontal}
            register={register("group")}
            messageError={formState.errors.group?.message}
          />
          <InputField
            title={t("modules.GS-UD-001.fields.name.title")}
            columns={BandPresentation.column_3}
            placeholder={t("modules.GS-UD-001.fields.name.placeholder")}
            directionLabel={Direction.horizontal}
            register={register("name")}
            messageError={formState.errors.name?.message}
          />
          <InputField
            title={t("modules.GS-UD-001.fields.description.title")}
            columns={BandPresentation.column_3}
            placeholder={t("modules.GS-UD-001.fields.description.placeholder")}
            directionLabel={Direction.horizontal}
            register={register("description")}
            messageError={formState.errors.description?.message}
          />
        </>
      )}
    />
  );
};

export { QueryFormUserDefinedCodeHeader };
