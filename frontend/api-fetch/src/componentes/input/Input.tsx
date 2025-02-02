/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alertas, BandaPresentacion, Direccion } from "../../ConstantesPresentacion";
import { EnterIcon, EyeClosedIcon, EyeOpenIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Flex, Text } from "@radix-ui/themes";
import { MensajeField } from "./Mensajes";
import { MouseEventHandler, ReactNode, useState } from "react";
import { Root as TextField, Slot } from "@radix-ui/themes/dist/cjs/components/text-field.js";
import { TextArea } from "@radix-ui/themes";
import useCalcularPresentacion from "./Calculos";

/**
 * Componentes de input del sistema. 
 * 
 * 
 * @author @omargo33
 * @version 1.0
 */

/**
 * Se crea un componente de tipo función que recibe las propiedades titulo, placeHolder, mensajeError, register 
 * 
 * @param titulo Titulo del campo
 * @param placeHolder Placeholder del campo
 * @param mensajeError Mensaje de error
 * @param columnas Columnas de la presentación
 * @param direccionLabel Dirección de la presentación
 * @param register Registro del campo para el formulario (yup)
 *  
 * @returns 
 */
const InputField = ({ titulo, placeholder, mensajeError, columnas, direccionLabel, register }:
    { titulo?: string, placeholder?: string, mensajeError?: string, columnas?: BandaPresentacion, direccionLabel: Direccion | Direccion.horizontal, children?: ReactNode, register?: any }) => {

    const presentacion = useCalcularPresentacion(direccionLabel, columnas, '60vw');

    return (
        <Flex direction={presentacion.direccion} gap="3" style={{ alignItems: presentacion.alinear }} >
            <Flex width="calc(150px * var(--scaling))" style={{ justifyContent: presentacion.justificar }}>
                <Text size="2" as="div" weight="bold" truncate trim="normal">{titulo}</Text>
            </Flex>
            <Flex direction={"column"} >
                <TextField type='text'
                    size="2" style={{ marginBottom: '1vh', width: presentacion.ancho }}
                    placeholder={placeholder}
                    {...register}
                />
                <MensajeField mensaje={mensajeError} />
            </Flex>
        </Flex>
    )
};

/**
 * Funcion para crear un campo de fecha
 * 
 * @param titulo Titulo del campo
 * @param placeholder Placeholder del campo
 * @param mensajeError Mensaje de error
 * @param columnas Columnas de la presentación
 * @param direccionLabel Dirección de la presentación
 * @param register Registro del campo para el formulario (yup)
 *  
 * @returns 
 */
const InputFieldDate = ({ titulo, placeholder, mensajeError, columnas, direccionLabel, register }:
    { titulo?: string, placeholder?: string, mensajeError?: string, columnas?: BandaPresentacion, direccionLabel: Direccion | Direccion.horizontal, children?: ReactNode, register?: any }) => {

    const presentacion = useCalcularPresentacion(direccionLabel, columnas, '60vw');

    return (
        <Flex direction={presentacion.direccion} gap="3" style={{ alignItems: presentacion.alinear }} >
            <Flex width="calc(150px * var(--scaling))" style={{ justifyContent: presentacion.justificar }}>
                <Text size="2" as="div" weight="bold" truncate trim="normal">{titulo}</Text>
            </Flex>
            <Flex direction={"column"} >
                <TextField type='date'
                    size="2" style={{ marginBottom: '1vh' }}
                    placeholder={placeholder}
                    {...register}
                />
                <MensajeField mensaje={mensajeError} />
            </Flex>
        </Flex>
    )
};


/**
 * Se crea un componente de tipo función que recibe las propiedades titulo, placeHolder, mensajeError, register 
 * para un un campo de texto secreto
 * 
 * @param titulo Titulo del campo
 * @param placeHolder Placeholder del campo
 * @param mensajeError Mensaje de error
 * @param columnas Columnas de la presentación
 * @param direccionLabel Dirección de la presentación
 * @param register Registro del campo para el formulario (yup)
 *  
 * @returns 
 */
const InputSecretField = ({ titulo, placeholder, mensajeError, columnas, direccionLabel, register }:
    { titulo?: string, placeholder?: string, mensajeError?: string, columnas?: BandaPresentacion, direccionLabel: Direccion | Direccion.horizontal, children?: ReactNode, register?: any }) => {

    const [visible, setVisible] = useState(false);
    const presentacion = useCalcularPresentacion(direccionLabel, columnas, '60vw');
    const onClick = () => {
        setVisible(!visible);
    }

    return (
        <Flex direction={presentacion.direccion} gap="3" style={{ alignItems: presentacion.alinear }}>
            <Flex width="calc(150px * var(--scaling))" style={{ justifyContent: presentacion.justificar }}>
                <Text size="2" as="div" weight="bold" truncate trim="normal">{titulo}</Text>
            </Flex>
            <Flex direction={"column"} >
                <TextField type={visible ? 'text' : 'password'}
                    size="2" style={{ marginBottom: '1vh', width: presentacion.ancho }}
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
                <MensajeField mensaje={mensajeError} />
            </Flex>
        </Flex>
    )
};

/**
 * Se crea un componente de tipo función que recibe las propiedades titulo, placeHolder, mensajeError, register 
 * 
 * @param titulo Titulo del campo
 * @param placeHolder Placeholder del campo
 * @param mensajeError Mensaje de error
 * @param columnas Columnas de la presentación
 * @param direccionLabel Dirección de la presentación
 * @param register Registro del campo para el formulario (yup)
 * 
 * @returns 
 */
const AreaField = ({ titulo, placeholder, mensajeError, columnas, rows, direccionLabel, register }:
    { titulo?: string, placeholder?: string, mensajeError?: string, columnas?: BandaPresentacion,  rows?:number | 2,  direccionLabel: Direccion | Direccion.horizontal, register?: any }) => {
    const presentacion = useCalcularPresentacion(direccionLabel, columnas, '60vw');

    return (
        <Flex direction={presentacion.direccion} gap="3" style={{ alignItems: presentacion.alinear }}>
            <Flex width="calc(150px * var(--scaling))" style={{ justifyContent: presentacion.justificar }}>
                <Text size="2" as="div" weight="bold" truncate trim="normal">{titulo}</Text>
            </Flex>
            <Flex direction={"column"} >
                <TextArea style={{ marginBottom: '1vh', width: presentacion.ancho }}
                    placeholder={placeholder}
                    rows={rows}
                    {...register}
                />
                <MensajeField mensaje={mensajeError} />
            </Flex>
        </Flex>
    )
};

/**
 * Metodo para crear un campo de texto simple.
 * 
 * @param placeholder Placeholder del campo
 * @param columna Columnas de la presentación
 * @param mensajeError Mensaje de error
 * @param onClick Evento de click
 * @param register Registro del campo para el formulario (yup)
 * @param children Componentes hijos
 *  
 * @returns 
 */
const InputBusquedaDinamica = ({ placeholder, columna, mensajeError, onClick, register, children }:
    {
        placeholder?: string;
        columna?: BandaPresentacion;
        mensajeError?: string;
        onClick?: MouseEventHandler<HTMLDivElement>;
        register?: any;
        children?: ReactNode
    }) => {
    const presentacion = useCalcularPresentacion(Direccion.horizontal, columna, '30vw');

    return (
        <Flex direction={"row"} >
            <TextField size="3" style={{ width: presentacion.ancho }} placeholder={placeholder}
                {...register}>
                <Slot onClick={onClick}>
                    <EnterIcon style={{ cursor: 'pointer' }} />
                </Slot>
                <Slot>
                    <MagnifyingGlassIcon />
                </Slot>
            </TextField>
            <MensajeField mensaje={mensajeError} />
            {children}
        </Flex>
    )
}

/**
 * Metodo para crear un campo de texto simple.
 * 
 * @param plasholder Placeholder del campo
 * @param columna Columnas de la presentación
 * @param mensajeError Mensaje de error
 * @param onClick Evento de click
 * @param direccionLabel Dirección de la presentación
 * @param register Registro del campo para el formulario (yup)
 * @param children Componentes hijos
 * @param size Tamaño del campo
 *  
 * @returns 
 */
const InputSubmit = ({ placeholder, columna, mensajeError, onClick, direccionLabel, register, children, size }:
    {
        placeholder?: string;
        columna?: BandaPresentacion;
        mensajeError?: string;
        onClick?: MouseEventHandler<HTMLDivElement>;
        direccionLabel: Direccion;
        register?: any;
        children?: ReactNode,
        size?: string | "3"
    }) => {
    const presentacion = useCalcularPresentacion(direccionLabel, columna, '30vw');

    return (
        <Flex direction={presentacion.direccion} gap={size} style={{ alignItems: presentacion.alinear }}>
            <TextField size={size} style={{ width: presentacion.ancho }} placeholder={placeholder}
                {...register}>
                <Slot onClick={onClick}>
                    <EnterIcon style={{ cursor: 'pointer' }} />
                </Slot>
            </TextField>
            <MensajeField mensaje={mensajeError} alerta={Alertas.error} />
            {children}
        </Flex>
    )
}

export { InputBusquedaDinamica, InputField, InputSecretField, AreaField, InputFieldDate, InputSubmit };
