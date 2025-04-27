import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  BandPresentation,
  Direction,
  FooterForm,
  InputField,
  InputSelect,
  IParametersQuery
} from "ux-ui";
import * as yup from "yup";
import { listaQueryModule } from "./Structures/Presentations";

/**
 * Formulario de consulta de Modulees del sistema.
 *
 * @param onFind Función para buscar Modulees
 * @returns
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

  /**
   * Hook para el manejo de formularios.
   */
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      indexModule: "",
      name: "",
      status: "",
    },
  });

  /**
   * Función para enviar el formulario.
   *
   * @param data
   */
  const submitForm = (data: IParametersQuery) => {
    if (onFind) {
      onFind(data);
    }
  };

  /**
   * Función para limpiar el formulario y los datos de la consulta.
   *
   */
  const resetForm = () => {
    if (onFind) {
      onFind({});
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <InputField
        title={t("modules.GS-MD-001.fields.indexModule.title")}
        columns={BandPresentation.column_3}
        placeholder={t("modules.GS-MD-001.fields.indexModule.placeholder")}
        directionLabel={Direction.horizontal}
        register={register("indexModule")}
        messageError={errors.indexModule?.message}
      />
      <InputField
        title={t("modules.GS-MD-001.fields.name.title")}
        columns={BandPresentation.column_3}
        placeholder={t("modules.GS-MD-001.fields.name.placeholder")}
        directionLabel={Direction.horizontal}
        register={register("name")}
        messageError={errors.name?.message}
      />
      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <InputSelect
            title={t("modules.GS-MD-001.fields.status.title")}
            placeholder={t("modules.GS-MD-001.fields.status.placeholder")}
            messageError={errors.status?.message}
            columns={BandPresentation.column_6}
            directionLabel={Direction.horizontal}
            items={listaQueryModule()}
            {...field}
          />
        )}
      />

      <FooterForm
        directionLabel={Direction.horizontal}
        columns={BandPresentation.column_2}
      >
        <Button type="submit">{t("actions.search")}</Button>
        <Button type="button" variant="surface" onClick={() => resetForm()}>
          {t("actions.clean")}
        </Button>
      </FooterForm>
    </form>
  );
};

export { QueryFormModule };
