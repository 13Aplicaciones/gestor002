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
import { BandPresentation, Direction } from "../../ConstantsPresentation";
import { IParametersQuery } from "../table/TableSearchOrder";
import { FooterForm } from "./Form";

/**
 * Funciones de query de presentación de formularios y estos son resize.
 *
 * @autor @omargo33
 * @since 2025-05-03
 */

/**
 * Interfaz para las propiedades del formulario de búsqueda genérico.
 *
 * @template TFormValues Tipo de datos del formulario
 */
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
 *
 * @param validationSchema Esquema de validación para el formulario
 * @param defaultValues Valores iniciales del formulario
 * @param onFind Función que se llama cuando se realiza la búsqueda
 * @param renderFields Función para renderizar los campos del formulario
 *
 * @returns
 */
function GenericQueryForm<TFormValues extends FieldValues>({
  validationSchema,
  defaultValues,
  onFind,
  renderFields,
}: Readonly<GenericQueryFormProps<TFormValues>>) {
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

export { GenericQueryForm };
export type { GenericQueryFormProps };

