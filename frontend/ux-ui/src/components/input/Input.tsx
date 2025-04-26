/* eslint-disable @typescript-eslint/no-explicit-any */
import { EnterIcon, EyeClosedIcon, EyeOpenIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Flex, Select, Slot, Text, TextArea, TextField } from "@radix-ui/themes";
import { MouseEventHandler, ReactNode, useState } from "react";
import { Alerts, BandPresentation, Direction, JustificationText } from "../../ConstantsPresentation";
import useCalculatePresentation from "./Calculations";
import { MessageField } from "./Menssages";
import { getIconComponent } from "../icon/IconDynamic";

/**
 * Componentes de input del sistema. 
 * 
 * 
 * @author @omargo33
 * @version 1.0
 */

/**
 * Se crea un componente de tipo función que recibe las propiedades title, placeHolder, messageError, register 
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
const InputField = ({ title, placeholder, messageError, columns, directionLabel, register }:
    { title?: string, placeholder?: string, messageError?: string, columns?: BandPresentation, directionLabel: Direction | Direction.horizontal, children?: ReactNode, register?: any }) => {

    const presentation = useCalculatePresentation(directionLabel, columns, '60vw');

    return (
        <Flex direction={presentation.direction} gap="3" style={{ alignItems: presentation.align }} >
            <Flex width="calc(150px * var(--scaling))" style={{ justifyContent: presentation.justify }}>
                <Text size="2" as="div" weight="bold" truncate trim="normal">{title}</Text>
            </Flex>
            <Flex direction={"column"} >
                <TextField.Root type='text'
                    size="2" style={{ marginBottom: '1vh', width: presentation.width }}
                    placeholder={placeholder}
                    {...register}
                />
                <MessageField message={messageError} />
            </Flex>
        </Flex>
    )
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
 *  
 * @returns 
 */
const InputFieldDate = ({ title, placeholder, messageError, columns, directionLabel, register }:
    { title?: string, placeholder?: string, messageError?: string, columns?: BandPresentation, directionLabel: Direction | Direction.horizontal, children?: ReactNode, register?: any }) => {

    const presentation = useCalculatePresentation(directionLabel, columns, '60vw');

    return (
        <Flex direction={presentation.direction} gap="3" style={{ alignItems: presentation.align }} >
            <Flex width="calc(150px * var(--scaling))" style={{ justifyContent: presentation.justify }}>
                <Text size="2" as="div" weight="bold" truncate trim="normal">{title}</Text>
            </Flex>
            <Flex direction={"column"} >
                <TextField.Root type='date'
                    size="2" style={{ marginBottom: '1vh' }}
                    placeholder={placeholder}
                    {...register}
                />
                <MessageField message={messageError} />
            </Flex>
        </Flex>
    )
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
const InputSecretField = ({ title, placeholder, messageError, columns, directionLabel, register }:
    { title?: string, placeholder?: string, messageError?: string, columns?: BandPresentation, directionLabel: Direction | Direction.horizontal, children?: ReactNode, register?: any }) => {

    const [visible, setVisible] = useState(false);
    const presentation = useCalculatePresentation(directionLabel, columns, '60vw');
    const onClick = () => {
        setVisible(!visible);
    }

    return (
        <Flex direction={presentation.direction} gap="3" style={{ alignItems: presentation.align }}>
            <Flex width="calc(150px * var(--scaling))" style={{ justifyContent: presentation.justify }}>
                <Text size="2" as="div" weight="bold" truncate trim="normal">{title}</Text>
            </Flex>
            <Flex direction={"column"} >
                <TextField.Root type={visible ? 'text' : 'password'}
                    size="2" style={{ marginBottom: '1vh', width: presentation.width }}
                    placeholder={placeholder}
                    {...register}
                >
                    <Slot />
                    <Slot onClick={onClick} >
                        {
                            visible ?
                                <EyeOpenIcon style={{ cursor: 'pointer' }} /> : <EyeClosedIcon style={{ cursor: 'pointer' }} />
                        }
                    </Slot>
                </TextField.Root>
                <MessageField message={messageError} />
            </Flex>
        </Flex>
    )
};

/**
 * Se crea un componente de tipo función que recibe las propiedades title, placeHolder, messageError, register 
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
const AreaField = ({ title, placeholder, messageError, columns, rows, directionLabel, register }:
    { title?: string, placeholder?: string, messageError?: string, columns?: BandPresentation, rows?: number | 2, directionLabel: Direction | Direction.horizontal, register?: any }) => {
    const presentation = useCalculatePresentation(directionLabel, columns, '60vw');

    return (
        <Flex direction={presentation.direction} gap="3" style={{ alignItems: presentation.align }}>
            <Flex width="calc(150px * var(--scaling))" style={{ justifyContent: presentation.justify }}>
                <Text size="2" as="div" weight="bold" truncate trim="normal">{title}</Text>
            </Flex>
            <Flex direction={"column"} >
                <TextArea style={{ marginBottom: '1vh', width: presentation.width }}
                    placeholder={placeholder}
                    rows={rows}
                    {...register}
                />
                <MessageField message={messageError} />
            </Flex>
        </Flex>
    )
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
const InputSearchDynamic = ({ placeholder, columna, messageError, onClick, register, children }:
    {
        placeholder?: string;
        columna?: BandPresentation;
        messageError?: string;
        onClick?: MouseEventHandler<HTMLDivElement>;
        register?: any;
        children?: ReactNode
    }) => {
    const presentation = useCalculatePresentation(Direction.horizontal, columna, '30vw');

    return (
        <Flex direction={"row"} >
            <TextField.Root size="3" style={{ width: presentation.width }} placeholder={placeholder}
                {...register}>
                <TextField.Slot side="right" onClick={onClick}>
                    <EnterIcon style={{ cursor: 'pointer' }} />
                </TextField.Slot>
                <TextField.Slot side="left">
                    <MagnifyingGlassIcon />
                </TextField.Slot>
            </TextField.Root>
            <MessageField message={messageError} />
            {children}
        </Flex>
    )
}

/**
 * Metodo para crear un field de texto simple.
 * 
 * @param plasholder Placeholder del field
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
const InputSubmit = ({type, placeholder, columna, messageError, onClick, directionLabel, register, children, size }:
    {
        type?: string;
        placeholder?: string;
        columna?: BandPresentation;
        messageError?: string;
        onClick?: MouseEventHandler<HTMLDivElement>;
        directionLabel: Direction;
        register?: any;
        children?: ReactNode,
        size?: string | "3"
    }) => {
    const presentation = useCalculatePresentation(directionLabel, columna, '30vw');

    return (
        <Flex direction={presentation.direction} gap={size} style={{ alignItems: presentation.align }}>
            <TextField.Root 
            type={type}
            size={size} style={{ width: presentation.width }} placeholder={placeholder}
                {...register}>
                <TextField.Slot onClick={onClick}>
                    <EnterIcon style={{ cursor: 'pointer' }} />
                </TextField.Slot>
            </TextField.Root>
            <MessageField message={messageError} alert={Alerts.error} />
            {children}
        </Flex>
    )
}


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
        disabled?: boolean | undefined;
        width?: string;
        color?: string;
        iconName?: string;
        onAction?: { onAction: (row: any) => void };
        component?: (row: any, children: ReactNode) => ReactNode;
    }>;
}

const InputSelect = ({
    title,
    placeholder,
    messageError,
    columns,
    directionLabel,
    items,
    value,
    onChange,
}: {
    title?: string;
    placeholder?: string;
    messageError?: string;
    columns?: BandPresentation;
    directionLabel?: Direction | Direction.horizontal;
    items: IPresentationInputSelect;
    value: any;
    onChange?: (newValue: any) => void;
}) => {

    const presentation = useCalculatePresentation(directionLabel || Direction.horizontal, columns, '60vw');
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
        <Flex direction={presentation.direction} gap="3" style={{ alignItems: presentation.align }} >
            <Flex width="calc(150px * var(--scaling))" style={{ justifyContent: presentation.justify }}>
                <Text size="2" as="div" weight="bold" truncate trim="normal">{title}</Text>
            </Flex>
            <Flex direction={"column"} style={{ marginBottom: '1vh', width: presentation.width }} >
                <Select.Root onValueChange={handleValueChange} value={value || ""} >
                    <Select.Trigger placeholder={placeholder} />
                    <Select.Content >
                        {items.items.map((item) => (
                            item.separator ? (
                                <Select.Separator key={item.order} />
                            ) : (
                                <>
                                    <Select.Item
                                        disabled={item.disabled || false}
                                        key={item.order}
                                        value={item.codeText || ""}
                                        style={{ color: item.color || 'inherit' }}
                                    >
                                        {item.iconName ? (
                                            <Flex justify="center" align="center" gap="2" >
                                                {getIconComponent(item.iconName || "", "18", "18")}
                                                {item.name}
                                            </Flex>) : item.name}
                                    </Select.Item>
                                </>
                            )
                        ))}
                    </Select.Content>
                </Select.Root>
                <MessageField message={messageError} />
            </Flex>
        </Flex>
    )
};

export { AreaField, InputField, InputSelect, InputFieldDate, InputSearchDynamic, InputSecretField, InputSubmit };
export type { IPresentationInputSelect };
