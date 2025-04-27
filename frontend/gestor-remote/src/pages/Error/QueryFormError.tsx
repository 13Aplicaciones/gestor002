import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  BandPresentation,
  Direction,
  FooterForm,
  InputField,
  IParametersQuery
} from "ux-ui";
import * as yup from "yup";

/**
 * Formulario de consulta de errores del sistema.
 *
 * @param onFind Función para buscar errores
 * @returns
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

  /**
   * Hook para el manejo de formularios.
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      indexError: "",
      message: "",
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
        title={t("modules.GS-ER-001.fields.indexError.title")}
        columns={BandPresentation.column_3}
        placeholder={t("modules.GS-ER-001.fields.indexError.placeholder")}
        directionLabel={Direction.horizontal}
        register={register("indexError")}
        messageError={errors.indexError?.message}
      />
      <InputField
        title={t("modules.GS-ER-001.fields.message.title")}
        columns={BandPresentation.column_3}
        placeholder={t("modules.GS-ER-001.fields.message.placeholder")}
        directionLabel={Direction.horizontal}
        register={register("message")}
        messageError={errors.message?.message}
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

export { QueryFormError };
