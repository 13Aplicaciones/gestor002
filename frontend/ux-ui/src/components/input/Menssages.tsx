import { alertColor, alertIcon } from "../IconosColoresAlerts";
import { Alerts } from "../../ConstantsPresentation";
import { Icon, Root, Text } from "@radix-ui/themes/dist/esm/components/callout.js";

/**
 * Funciones de presentation de los messages de los input fiel personalizados.
 * 
 * @autor @omargo33
 * @since 2025-01-20
 * 
 */

/**
 * Mensaje de error para los atributos
 * 
 * @param message Mensaje a mostrar
 * @param alert Tipo de alert
 *  
 * @returns 
 */
const MessageField = (
    { message, alert }: 
    {message: string | undefined, alert?: Alerts | Alerts.error,}
) => {
    if (message === undefined) {
        return null;
    }

    return (
        <Text size="1" mb="3" ml='2' weight="bold" color={alertColor({alert})}>
            <span dangerouslySetInnerHTML={{ __html: message }} />
        </Text>
    );
}


/**
 * Mensaje de error para el formulario completo o informacion relacionada.
 * 
 * @param message Mensaje a mostrar
 * @param alert Tipo de alert
 * 
 * @returns 
 */
const MessageForm = (
    { message, alert }: 
    { message: string, alert: Alerts}
) => {
    if (message === undefined || message === "") {
        return null;
    }
    return (
        <Root size="1" color={alertColor({alert})}>
            <Icon>
                {alertIcon({alert})}
            </Icon>
            <Text>
                <span dangerouslySetInnerHTML={{ __html: message }} /></Text>
        </Root>
    );
}

export { MessageField, MessageForm };