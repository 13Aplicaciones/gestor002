/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@radix-ui/themes";
import { ReactNode } from "react";
import {
  DeepPartial,
  DefaultValues,
  FieldValues,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ObjectSchema } from "yup";
import { IParametersQuery } from "../table/TableSearch";
import { FooterForm } from "./Form";
import { BandPresentation, Direction } from "../../ConstantsPresentation";

interface GenericQueryFormProps<TFormValues extends FieldValues> {
  /** Esquema de validación para el formulario */
  validationSchema: ObjectSchema<any>;

  /** Valores iniciales del formulario */
  defaultValues: DeepPartial<TFormValues>;

  /** Función que se llama cuando se realiza la búsqueda */
  onFind: (data: IParametersQuery) => void;

  /** Función para renderizar los campos del formulario */
  renderFields: (form: UseFormReturn<TFormValues>) => ReactNode;
}

/**
 * Componente genérico para formularios de búsqueda
 */
function GenericQueryForm<TFormValues extends FieldValues>({
  validationSchema,
  defaultValues,
  onFind,
  renderFields,
}: GenericQueryFormProps<TFormValues>) {
  const [t] = useTranslation("global_gestor");

  /**
   * Hook para el manejo de formularios.
   */
  const form = useForm<TFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues as DefaultValues<TFormValues>,
  });

  /**
   * Función para enviar el formulario.
   */
  const submitForm = (data: IParametersQuery) => {
    console.log("Data", JSON.stringify(data));
    if (onFind) {
      onFind(data);
    }
  };

  /**
   * Función para limpiar el formulario y los datos de la consulta.
   */
  const resetForm = () => {
    if (onFind) {
      onFind({});
    }
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(submitForm)}>
      {renderFields(form)}

      <FooterForm
        directionLabel={Direction.horizontal}
        columns={BandPresentation.column_2}
      >
        <Button type="submit">{t("actions.search")}</Button>
        <Button type="button" variant="surface" onClick={resetForm}>
          {t("actions.clean")}
        </Button>
      </FooterForm>
    </form>
  );
}

export type { GenericQueryFormProps };
export { GenericQueryForm };
