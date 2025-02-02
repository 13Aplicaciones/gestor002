import { alertaColor, alertaIcono } from "../IconosColoresAlertas";
import { Alertas } from "../../ConstantesPresentacion";
import { Icon, Root, Text } from "@radix-ui/themes/dist/esm/components/callout.js";

/**
 * Funciones de presentacion de los mensajes de los input fiel personalizados.
 * 
 * @autor @omargo33
 * @since 2025-01-20
 * 
 */

/**
 * Mensaje de error para los atributos
 * 
 * @param mensaje Mensaje a mostrar
 * @param alerta Tipo de alerta
 *  
 * @returns 
 */
const MensajeField = (
    { mensaje, alerta }: 
    {mensaje: string | undefined, alerta?: Alertas | Alertas.error,}
) => {
    if (mensaje === undefined) {
        return null;
    }

    return (
        <Text size="1" mb="3" ml='2' weight="bold" color={alertaColor({alerta})}>
            <span dangerouslySetInnerHTML={{ __html: mensaje }} />
        </Text>
    );
}


/**
 * Mensaje de error para el formulario completo o informacion relacionada.
 * 
 * @param mensaje Mensaje a mostrar
 * @param alerta Tipo de alerta
 * 
 * @returns 
 */
const MensajeFormulario = (
    { mensaje, alerta }: 
    { mensaje: string, alerta: Alertas}
) => {
    if (mensaje === undefined || mensaje === "") {
        return null;
    }
    return (
        <Root size="1" color={alertaColor({alerta})}>
            <Icon>
                {alertaIcono({alerta})}
            </Icon>
            <Text>
                <span dangerouslySetInnerHTML={{ __html: mensaje }} /></Text>
        </Root>
    );
}

export { MensajeField, MensajeFormulario };