/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, Controller, FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  BandPresentation,
  Direction,
  GenericQueryForm,
  InputField,
  InputSelect,
  IParametersQuery,
} from "ux-ui";
import * as yup from "yup";
import { listQueryUser } from "./structures/Presentations";

interface UserQueryFormValues {
  nick: string;
  name: string;
  lastName: string;
  status: string;
}

/**
 * Formulario de consulta de informaciones del sistema.
 */
const QueryFormUser = ({
  onFind,
}: {
  onFind: (data: IParametersQuery) => void;
}) => {
  const [t] = useTranslation("global_gestor");

  const schema = yup.object({
    nick: yup.string().max(128, t("validation.max", { max: 128 })),
    name: yup.string().max(128, t("validation.max", { max: 128 })),
    lastName: yup.string().max(128, t("validation.max", { max: 128 })),
    status: yup.string(),
  });

  return (
    <GenericQueryForm<UserQueryFormValues>
      validationSchema={schema}
      defaultValues={{
        nick: "",
        name: "",
        lastName: "",
        status: "",
      }}
      onFind={onFind}
      renderFields={({ register, control, formState }) => (
        <>
          <InputField
            title={t("modules.GS-US-001.fields.nick.title")}
            columns={BandPresentation.column_3}
            placeholder={t("modules.GS-US-001.fields.nick.placeholder")}
            directionLabel={Direction.horizontal}
            register={register("nick")}
            messageError={formState.errors.nick?.message}
          />
          <InputField
            title={t("modules.GS-US-001.fields.name.title")}
            columns={BandPresentation.column_3}
            placeholder={t("modules.GS-US-001.fields.name.placeholder")}
            directionLabel={Direction.horizontal}
            register={register("name")}
            messageError={formState.errors.name?.message}
          />
          <InputField
            title={t("modules.GS-US-001.fields.lastName.title")}
            columns={BandPresentation.column_3}
            placeholder={t("modules.GS-US-001.fields.lastName.placeholder")}
            directionLabel={Direction.horizontal}
            register={register("lastName")}
            messageError={formState.errors.lastName?.message}
          />
          <Controller
            name="status"
            control={control as unknown as Control<FieldValues, any>}
            render={({ field }) => (
              <InputSelect
                title={t("modules.GS-US-001.fields.status.title")}
                placeholder={t("modules.GS-US-001.fields.status.placeholder")}
                messageError={formState.errors.status?.message}
                columns={BandPresentation.column_6}
                directionLabel={Direction.horizontal}
                items={listQueryUser()}
                {...field}
              />
            )}
          />
        </>
      )}
    />
  );
};

export { QueryFormUser };
