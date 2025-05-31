/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Flex, IconButton } from "@radix-ui/themes";
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
import { IconComponent } from "../icon/IconDynamic";
import { IParametersQuery } from "../table/TableSearchOrder";
import { FooterForm } from "./Form";
import { useMediaQuery } from "react-responsive";

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

  /** Deshabilitar la presentacion para la busqueda automatica */
  disableSubmit?: boolean;

  buttonsDetails?: boolean;
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
  disableSubmit,
  buttonsDetails = true,
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

  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });

  return disableSubmit ? null : (
    <form onSubmit={form.handleSubmit(submitForm)}>
      {buttonsDetails ? (
        <>
          {renderFields(form)}
          <FooterForm
            directionLabel={Direction.horizontal}
            columns={BandPresentation.column_2}
          >
            <Button type="submit">{t("actions.search")}</Button>
            <IconButton variant="surface" onClick={resetForm}>
              <IconComponent iconName="ResetIcon" width="16" height="16" />
            </IconButton>
          </FooterForm>
        </>
      ) : (
        <Flex direction={isPortrait ? "column" : "row"} gap="2">
          {renderFields(form)}
          <Flex gap="2">
            <IconButton type="submit">
              <IconComponent
                iconName="MagnifyingGlassIcon"
                width="16"
                height="16"
              />
            </IconButton>
            <IconButton variant="surface" onClick={resetForm}>
              <IconComponent iconName="ResetIcon" width="16" height="16" />
            </IconButton>
          </Flex>
        </Flex>
      )}
    </form>
  );
}

export { GenericQueryForm };
export type { GenericQueryFormProps };
