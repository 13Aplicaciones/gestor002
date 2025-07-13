/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Flex, IconButton } from "@radix-ui/themes";
import { ReactNode, useEffect } from "react";
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

  /** Indica si se deben mostrar los botones de detalles */
  buttonsDetails?: boolean;

  /**
   * Función para exponer el objeto workForm al padre.
   * 
   * @param api 
   * @returns 
   */
  getFormApi?: (api: UseFormReturn<TFormValues>) => void;
}

/**
 * Componente genérico para formularios de búsqueda
 *
 * @param validationSchema Esquema de validación para el formulario
 * @param defaultValues Valores iniciales del formulario
 * @param onFind Función que se llama cuando se realiza la búsqueda
 * @param renderFields Función para renderizar los campos del formulario
 * @param disableSubmit Deshabilita la presentación para la búsqueda automática
 * @param buttonsDetails Indica si se deben mostrar los botones de detalles
 * @param getFormApi Función para exponer el objeto workForm al padre
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
  getFormApi,
}: Readonly<GenericQueryFormProps<TFormValues>>) {
  const [t] = useTranslation("global_gestor");

  /**
   * Hook para el manejo de formularios.
   */
  const workForm = useForm<TFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues as DefaultValues<TFormValues>,
  });

  /**
   * Expone el objeto workForm al padre para uso de atributos programaticamente
   */
  useEffect(() => {
    if (getFormApi) {
      getFormApi(workForm);
    }
  }, [getFormApi, workForm]);

  /**
   * Función para enviar el formulario.
   *
   * @param data Datos del formulario a enviar
   */
  const submitForm = (data: TFormValues) => {
    if (onFind) {
      onFind(data as IParametersQuery);
    }
  };

  /**
   * Función para limpiar el formulario y los datos de la consulta.
   */
  const resetForm = () => {
    if (onFind) {
      onFind({});
    }
    workForm.reset();
  };

  /**
   * Hook para detectar cambios en el tamaño de la pantalla.
   * Utiliza una consulta de medios para determinar si la orientación es vertical.
   */
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });

  // No renderizar nada si está deshabilitado
  if (disableSubmit) {
    return null;
  }

  return (
    <form onSubmit={workForm.handleSubmit(submitForm)} noValidate>
      {buttonsDetails ? (
        <>
          {renderFields(workForm)}
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
          {renderFields(workForm)}
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
