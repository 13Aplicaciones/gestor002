/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Flex,
  IconButton,
  Select,
  Slot,
  Text,
  TextArea,
  TextField,
  Tooltip,
} from "@radix-ui/themes";
import { MouseEventHandler, ReactNode, useState } from "react";
import {
  Alerts,
  BandPresentation,
  Direction,
  JustificationText,
} from "../../ConstantsPresentation";
import { IconComponent } from "../icon/IconDynamic";
import useCalculatePresentation, { IPresentation } from "./Calculations";
import { MessageField } from "./Menssages";

/**
 * Componentes de input del sistema.
 *
 *
 * @author @omargo33
 * @version 1.0
 */
/**
 * Componente para crear un campo de entrada oculto.
 *
 * @param register Registro del campo para el formulario (yup)
 * @returns
 */
const InputHidden = ({ register }: { register?: any }) => {
  return <input type="hidden" style={{ display: "none" }} {...register} />;
};

/**
 * Componente para crear un campo de entrada de texto.
 *
 * @param title Título del campo
 * @param placeholder Placeholder del campo
 * @param messageError Mensaje de error
 * @param columns Columnas de la presentación
 * @param directionLabel Dirección de la presentación
 * @param register Registro del campo para el formulario (yup)
 * @param children Componentes hijos
 * @param labelVisible Indica si el label es visible o no
 *
 * @returns
 */
const InputField = ({
  directionLabel,
  columns,
  messageError,
  placeholder,
  register,
  title,
  labelVisible = true,
}: {
  directionLabel: Direction | Direction.horizontal;
  children?: ReactNode;
  columns?: BandPresentation;
  messageError?: string;
  placeholder?: string;
  register?: any;
  title?: string;
  labelVisible?: boolean;
}) => {
  const presentation = useCalculatePresentation(
    directionLabel,
    columns,
    "60vw"
  );

  return (
    <Flex
      direction={presentation.direction}
      gap="3"
      style={{ alignItems: presentation.align }}
    >
      <Label
        title={title}
        labelVisible={labelVisible}
        presentation={presentation}
      />
      <Flex direction={"column"}>
        <TextField.Root
          type="text"
          size="2"
          style={{ marginBottom: "1vh", width: presentation.width }}
          placeholder={placeholder}
          {...register}
        />
        <MessageField message={messageError} />
      </Flex>
    </Flex>
  );
};

/**
 * Funcion para crear un field de fecha
 *
 * @param title Titulo del field
 * @param placeholder Placeholder del field
 * @param messageError Mensaje de error
 * @param columns Columnas de la presentación
 * @param directionLabel Dirección de la presentación
 * @param register Registro del field para el formulario (yup)
 * @param labelVisible Indica si el label es visible o no
 *
 * @returns
 */
const InputFieldDate = ({
  title,
  placeholder,
  messageError,
  columns,
  directionLabel,
  register,
  labelVisible = true,
}: {
  title?: string;
  placeholder?: string;
  messageError?: string;
  columns?: BandPresentation;
  directionLabel: Direction | Direction.horizontal;
  children?: ReactNode;
  register?: any;
  labelVisible?: boolean;
}) => {
  const presentation = useCalculatePresentation(
    directionLabel,
    columns,
    "60vw"
  );

  return (
    <Flex
      direction={presentation.direction}
      gap="3"
      style={{ alignItems: presentation.align }}
    >
      <Label
        title={title}
        labelVisible={labelVisible}
        presentation={presentation}
      />
      <Flex direction={"column"}>
        <TextField.Root
          type="date"
          size="2"
          style={{ marginBottom: "1vh" }}
          placeholder={placeholder}
          {...register}
        />
        <MessageField message={messageError} />
      </Flex>
    </Flex>
  );
};

/**
 * Se crea un componente de tipo función que recibe las propiedades title, placeHolder, messageError, register
 * para un un field de texto secreto
 *
 * @param title Titulo del field
 * @param placeHolder Placeholder del field
 * @param messageError Mensaje de error
 * @param columns Columnas de la presentación
 * @param directionLabel Dirección de la presentación
 * @param register Registro del field para el formulario (yup)
 *
 * @returns
 */
const InputSecretField = ({
  title,
  placeholder,
  messageError,
  columns,
  directionLabel,
  register,
  labelVisible = true,
}: {
  title?: string;
  placeholder?: string;
  messageError?: string;
  columns?: BandPresentation;
  directionLabel: Direction | Direction.horizontal;
  children?: ReactNode;
  register?: any;
  labelVisible?: boolean;
}) => {
  const [visible, setVisible] = useState(false);
  const presentation = useCalculatePresentation(
    directionLabel,
    columns,
    "60vw"
  );
  const onClick = () => {
    setVisible(!visible);
  };

  return (
    <Flex
      direction={presentation.direction}
      gap="3"
      style={{ alignItems: presentation.align }}
    >
      <Label
        title={title}
        labelVisible={labelVisible}
        presentation={presentation}
      />

      <Flex direction={"column"}>
        <TextField.Root
          type={visible ? "text" : "password"}
          size="2"
          style={{ marginBottom: "1vh", width: presentation.width }}
          placeholder={placeholder}
          {...register}
        >
          <Slot />
          <Slot onClick={onClick}>
            <IconComponent
              iconName={visible ? "EyeOpenIcon" : "EyeClosedIcon"}
              width="16"
              height="16"
            />
          </Slot>
        </TextField.Root>
        <MessageField message={messageError} />
      </Flex>
    </Flex>
  );
};

/**
 * Se crea un componente de tipo función que recibe las propiedades title, placeHolder, messageError, register
 *
 * @param title Titulo del field
 * @param placeHolder Placeholder del field
 * @param messageError Mensaje de error
 * @param columns Columnas de la presentación
 * @param rows Filas del area de texto
 * @param directionLabel Dirección de la presentación
 * @param register Registro del field para el formulario (yup)
 *
 * @returns
 */
const AreaField = ({
  title,
  placeholder,
  messageError,
  columns,
  rows = 2,
  directionLabel,
  register,
  labelVisible = true,
}: {
  title?: string;
  placeholder?: string;
  messageError?: string;
  columns?: BandPresentation;
  rows?: number;
  directionLabel: Direction | Direction.horizontal;
  register?: any;
  labelVisible?: boolean;
}) => {
  const presentation = useCalculatePresentation(
    directionLabel,
    columns,
    "60vw"
  );

  return (
    <Flex
      direction={presentation.direction}
      gap="3"
      style={{ alignItems: presentation.align }}
    >
      <Label
        title={title}
        labelVisible={labelVisible}
        presentation={presentation}
      />
      <Flex direction={"column"}>
        <TextArea
          style={{ marginBottom: "1vh", width: presentation.width }}
          placeholder={placeholder}
          rows={rows}
          {...register}
        />
        <MessageField message={messageError} />
      </Flex>
    </Flex>
  );
};

/**
 * Metodo para crear un field de texto simple.
 *
 * @param placeholder Placeholder del field
 * @param columna Columnas de la presentación
 * @param messageError Mensaje de error
 * @param onClick Evento de click
 * @param register Registro del field para el formulario (yup)
 * @param children Componentes hijos
 *
 * @returns
 */
const InputSearchDynamic = ({
  placeholder,
  columna,
  messageError,
  onClick,
  register,
  children,
}: {
  placeholder?: string;
  columna?: BandPresentation;
  messageError?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  register?: any;
  children?: ReactNode;
}) => {
  const presentation = useCalculatePresentation(
    Direction.horizontal,
    columna,
    "30vw"
  );

  return (
    <Flex direction={"row"}>
      <TextField.Root
        size="3"
        style={{ width: presentation.width }}
        placeholder={placeholder}
        {...register}
      >
        <TextField.Slot side="right" onClick={onClick}>
          <IconComponent iconName="EnterIcon" width="16" height="16" />
        </TextField.Slot>
        <TextField.Slot side="left">
          <IconComponent
            iconName="MagnifyingGlassIcon"
            width="16"
            height="16"
          />
        </TextField.Slot>
      </TextField.Root>
      <MessageField message={messageError} />
      {children}
    </Flex>
  );
};

/**
 * Metodo para crear un field de texto simple.
 *
 * @param type Tipo del field (por defecto "text")
 * @param placeholder Placeholder del field
 * @param columna Columnas de la presentación
 * @param messageError Mensaje de error
 * @param onClick Evento de click
 * @param directionLabel Dirección de la presentación
 * @param register Registro del field para el formulario (yup)
 * @param children Componentes hijos
 * @param size Tamaño del field
 *
 * @returns
 */
const InputSubmit = ({
  type,
  placeholder,
  columna,
  messageError,
  onClick,
  directionLabel,
  register,
  children,
  size = "3",
}: {
  type?: string;
  placeholder?: string;
  columna?: BandPresentation;
  messageError?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  directionLabel: Direction;
  register?: any;
  children?: ReactNode;
  size?: string;
}) => {
  const presentation = useCalculatePresentation(
    directionLabel,
    columna,
    "30vw"
  );

  return (
    <Flex
      direction={presentation.direction}
      gap={size}
      style={{ alignItems: presentation.align }}
    >
      <TextField.Root
        type={type}
        size={size}
        style={{ width: presentation.width }}
        placeholder={placeholder}
        {...register}
      >
        <TextField.Slot onClick={onClick}>
          <IconComponent iconName="EnterIcon" width="16" height="16" />
        </TextField.Slot>
      </TextField.Root>
      <MessageField message={messageError} alert={Alerts.error} />
      {children}
    </Flex>
  );
};

/**
 * Interfaz para la presentacion de la tabla.
 */
interface IPresentationInputSelect {
  items: Array<{
    order: number;
    separator?: boolean;
    justification?: JustificationText;
    codeText?: string;
    codeNumber?: number;
    name?: string;
    description?: string;
    disabled?: boolean;
    width?: string;
    color?: string;
    iconName?: string;
    onAction?: { onAction: (row: any) => void };
    component?: (row: any, children: ReactNode) => ReactNode;
  }>;
}

/**
 * Componente para crear un campo de selección.
 *
 * @param title Título del campo
 * @param placeholder Placeholder del campo
 * @param messageError Mensaje de error
 * @param columns Columnas de la presentación
 * @param directionLabel Dirección de la presentación
 * @param items Elementos del campo de selección
 * @param value Valor seleccionado
 * @param onChange Función para manejar el cambio de valor
 *
 * @returns
 */
const InputSelect = ({
  title,
  placeholder,
  messageError,
  columns,
  directionLabel,
  items,
  value,
  labelVisible,
  onChange,
}: {
  title?: string;
  placeholder?: string;
  messageError?: string;
  columns?: BandPresentation;
  directionLabel?: Direction | Direction.horizontal;
  items: IPresentationInputSelect;
  value: any;
  labelVisible?: boolean;
  onChange?: (newValue: any) => void;
}) => {
  const presentation = useCalculatePresentation(
    directionLabel ?? Direction.horizontal,
    columns,
    "60vw"
  );
  items.items.sort((a, b) => a.order - b.order);

  /**
   * Función para manejar el cambio de valor.
   *
   * @param newValue
   */
  const handleValueChange = (newValue: string) => {
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <Flex
      direction={presentation.direction}
      gap="3"
      style={{ alignItems: presentation.align }}
    >
      <Label
        title={title}
        labelVisible={labelVisible}
        presentation={presentation}
      />
      <Flex
        direction={"column"}
        style={{ marginBottom: "1vh", width: presentation.width }}
      >
        <Select.Root onValueChange={handleValueChange} value={value ?? ""}>
          <Select.Trigger placeholder={placeholder} />
          <Select.Content>
            {items.items.map((item) =>
              item.separator ? (
                <Select.Separator key={item.order} />
              ) : (
                <Select.Item
                  disabled={item.disabled || false}
                  key={item.order}
                  value={item.codeText ?? ""}
                  style={{ color: item.color ?? "inherit" }}
                >
                  {item.iconName ? (
                    <Flex justify="center" align="center" gap="2">
                      <IconComponent
                        iconName={item.iconName || ""}
                        width="18"
                        height="18"
                      />
                      {item.name}
                    </Flex>
                  ) : (
                    item.name
                  )}
                </Select.Item>
              )
            )}
          </Select.Content>
        </Select.Root>
        <MessageField message={messageError} />
      </Flex>
    </Flex>
  );
};

/**
 * Se crea un componente de tipo función que recibe las propiedades title, placeHolder, messageError, register
 * Y hace busquedas LOV (List of Values)
 *
 * @param title Titulo del field
 * @param placeHolder Placeholder del field
 * @param messageError Mensaje de error
 * @param columns Columnas de la presentación
 * @param directionLabel Dirección de la presentación
 * @param register Registro del field para el formulario (yup)
 *
 *
 * @returns
 */
const InputFieldLov = ({
  title,
  placeholder,
  messageError,
  columns,
  directionLabel,
  register,
  labelVisible = true,
  onFind,
}: {
  title?: string;
  placeholder?: string;
  messageError?: string;
  columns?: BandPresentation;
  directionLabel: Direction | Direction.horizontal;
  children?: ReactNode;
  register?: any;
  labelVisible?: boolean;
  onFind: () => void;
}) => {
  const presentation = useCalculatePresentation(
    directionLabel,
    columns,
    "60vw"
  );

  return (
    <Flex
      direction={presentation.direction}
      gap="3"
      style={{ alignItems: presentation.align }}
    >
      <Label
        title={title}
        labelVisible={labelVisible}
        presentation={presentation}
      />
      <Flex direction={"column"}>
        <Flex direction={"row"} gap="2" width={presentation.width}>
          <TextField.Root
            type="text"
            size="2"
            disabled={true}
            style={{ marginBottom: "1vh", width: "100%" }}
            placeholder={placeholder}
            {...register}
          />

          <IconButton variant="surface" size="2" form="none" onClick={onFind}>
            <IconComponent
              iconName="ListBulletIcon"
              width="16"
              height="16"
            />
          </IconButton>
        </Flex>
        <MessageField message={messageError} />
      </Flex>
    </Flex>
  );
};

/**
 * Componente para mostrar una etiqueta (label) con un título.
 *
 * @param title Título de la etiqueta
 * @param labelVisible Indica si la etiqueta es visible o no
 * @param presentation Presentación del label, que incluye alineación y justificación
 * @returns
 */
const Label = ({
  title,
  labelVisible = true,
  presentation,
}: {
  title?: string;
  labelVisible?: boolean;
  presentation: IPresentation;
}) => {
  if (!title || !labelVisible) {
    return null;
  }

  return (
    <Flex
      width="calc(150px * var(--scaling))"
      style={{ justifyContent: presentation.justify }}
    >
      {title.length > 20 ? (
        <Tooltip content={title} side="bottom">
          <Text size="2" as="div" weight="bold" truncate trim="normal">
            {title}
          </Text>
        </Tooltip>
      ) : (
        <Text size="2" as="div" weight="bold" trim="normal">
          {title}
        </Text>
      )}
    </Flex>
  );
};

export {
  AreaField,
  InputField,
  InputFieldDate,
  InputFieldLov,
  InputHidden,
  InputSearchDynamic,
  InputSecretField,
  InputSelect,
  InputSubmit,
};
export type { IPresentationInputSelect };
