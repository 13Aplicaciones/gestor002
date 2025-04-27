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
 * Formulario de consulta de informaciones del sistema.
 *
 * @param onFind Función para buscar informaciones
 * @returns
 */
const QueryFormInformation = ({
  onFind,
}: {
  onFind: (data: IParametersQuery) => void;
}) => {
  const [t] = useTranslation("global_gestor");

  const schema = yup.object({
    name: yup.string().max(128, t("validation.max", { max: 128 })),
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
      name: "",
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
        title={t("modules.GS-IN-001.fields.name.title")}
        columns={BandPresentation.column_3}
        placeholder={t("modules.GS-IN-001.fields.name.placeholder")}
        directionLabel={Direction.horizontal}
        register={register("name")}
        messageError={errors.name?.message}
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

export { QueryFormInformation };
