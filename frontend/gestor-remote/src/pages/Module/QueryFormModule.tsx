/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, Controller, FieldValues } from 'react-hook-form';

import { useTranslation } from "react-i18next";
import {
  BandPresentation,
  Direction,
  InputField,
  InputSelect,
  IParametersQuery,
  GenericQueryForm
} from "ux-ui";
import * as yup from "yup";
import { listaQueryModule } from "./Structures/Presentations";

interface ModuleQueryFormValues {
  indexModule: string;
  name: string;
  status: string;
}

/**
 * Formulario de consulta de Modules del sistema.
 */
const QueryFormModule = ({
  onFind,
}: {
  onFind: (data: IParametersQuery) => void;
}) => {
  const [t] = useTranslation("global_gestor");

  const schema = yup.object({
    indexModule: yup.string().max(128, t("validation.max", { max: 128 })),
    name: yup.string().max(1024, t("validation.max", { max: 1024 })),
    status: yup.string(),
  });

  return (
    <GenericQueryForm<ModuleQueryFormValues>
      validationSchema={schema}
      defaultValues={{
        indexModule: "",
        name: "",
        status: "",
      }}
      onFind={onFind}
      renderFields={({ register, control, formState }) => (
        <>
          <InputField
            title={t("modules.GS-MD-001.fields.indexModule.title")}
            columns={BandPresentation.column_3}
            placeholder={t("modules.GS-MD-001.fields.indexModule.placeholder")}
            directionLabel={Direction.horizontal}
            register={register("indexModule")}
            messageError={formState.errors.indexModule?.message}
          />
          <InputField
            title={t("modules.GS-MD-001.fields.name.title")}
            columns={BandPresentation.column_3}
            placeholder={t("modules.GS-MD-001.fields.name.placeholder")}
            directionLabel={Direction.horizontal}
            register={register("name")}
            messageError={formState.errors.name?.message}
          />
          <Controller
            name="status"
            control={control as unknown as Control<FieldValues, any>}
            render={({ field }) => (
              <InputSelect
                title={t("modules.GS-MD-001.fields.status.title")}
                placeholder={t("modules.GS-MD-001.fields.status.placeholder")}
                messageError={formState.errors.status?.message}
                columns={BandPresentation.column_6}
                directionLabel={Direction.horizontal}
                items={listaQueryModule()}
                {...field}
              />
            )}
          />
        </>
      )}
    />
  );
};

export { QueryFormModule };
