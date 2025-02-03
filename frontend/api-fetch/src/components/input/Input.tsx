/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alerts, BandaPresentacion, Direccion } from "../../ConstantesPresentacion";
import { EnterIcon, EyeClosedIcon, EyeOpenIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Flex, Text } from "@radix-ui/themes";
import { MessageField } from "./Menssages";
import { MouseEventHandler, ReactNode, useState } from "react";
import { Root as TextField, Slot } from "@radix-ui/themes/dist/cjs/components/text-field.js";
import { TextArea } from "@radix-ui/themes";
import useCalculatePresentation from "./Calculations";

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
    { title?: string, placeholder?: string, messageError?: string, columns?: BandaPresentacion, directionLabel: Direccion | Direccion.horizontal, children?: ReactNode, register?: any }) => {

    const presentation = useCalculatePresentation(directionLabel, columns, '60vw');

    return (
        <Flex direction={presentation.direction} gap="3" style={{ alignItems: presentation.align }} >
            <Flex width="calc(150px * var(--scaling))" style={{ justifyContent: presentation.justify }}>
                <Text size="2" as="div" weight="bold" truncate trim="normal">{title}</Text>
            </Flex>
            <Flex direction={"column"} >
                <TextField type='text'
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
    { title?: string, placeholder?: string, messageError?: string, columns?: BandaPresentacion, directionLabel: Direccion | Direccion.horizontal, children?: ReactNode, register?: any }) => {

    const presentation = useCalculatePresentation(directionLabel, columns, '60vw');

    return (
        <Flex direction={presentation.direction} gap="3" style={{ alignItems: presentation.align }} >
            <Flex width="calc(150px * var(--scaling))" style={{ justifyContent: presentation.justify }}>
                <Text size="2" as="div" weight="bold" truncate trim="normal">{title}</Text>
            </Flex>
            <Flex direction={"column"} >
                <TextField type='date'
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
    { title?: string, placeholder?: string, messageError?: string, columns?: BandaPresentacion, directionLabel: Direccion | Direccion.horizontal, children?: ReactNode, register?: any }) => {

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
                <TextField type={visible ? 'text' : 'password'}
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
                </TextField>
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
    { title?: string, placeholder?: string, messageError?: string, columns?: BandaPresentacion,  rows?:number | 2,  directionLabel: Direccion | Direccion.horizontal, register?: any }) => {
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
        columna?: BandaPresentacion;
        messageError?: string;
        onClick?: MouseEventHandler<HTMLDivElement>;
        register?: any;
        children?: ReactNode
    }) => {
    const presentation = useCalculatePresentation(Direccion.horizontal, columna, '30vw');

    return (
        <Flex direction={"row"} >
            <TextField size="3" style={{ width: presentation.width }} placeholder={placeholder}
                {...register}>
                <Slot onClick={onClick}>
                    <EnterIcon style={{ cursor: 'pointer' }} />
                </Slot>
                <Slot>
                    <MagnifyingGlassIcon />
                </Slot>
            </TextField>
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
const InputSubmit = ({ placeholder, columna, messageError, onClick, directionLabel, register, children, size }:
    {
        placeholder?: string;
        columna?: BandaPresentacion;
        messageError?: string;
        onClick?: MouseEventHandler<HTMLDivElement>;
        directionLabel: Direccion;
        register?: any;
        children?: ReactNode,
        size?: string | "3"
    }) => {
    const presentation = useCalculatePresentation(directionLabel, columna, '30vw');

    return (
        <Flex direction={presentation.direction} gap={size} style={{ alignItems: presentation.align }}>
            <TextField size={size} style={{ width: presentation.width }} placeholder={placeholder}
                {...register}>
                <Slot onClick={onClick}>
                    <EnterIcon style={{ cursor: 'pointer' }} />
                </Slot>
            </TextField>
            <MessageField message={messageError} alert={Alerts.error} />
            {children}
        </Flex>
    )
}

export { InputSearchDynamic, InputField, InputSecretField, AreaField, InputFieldDate, InputSubmit };
