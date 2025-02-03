import { Alerts } from "../ConstantesPresentacion";
import { CheckCircledIcon, CrossCircledIcon, ExclamationTriangleIcon, InfoCircledIcon } from "@radix-ui/react-icons";


/**
 * Componete para presentar los iconos y colores adecudados.
 * 
 * @author @omargo33
 * @since 2025-02-01
 */

/**
 * Iconos de alerts.
 * 
 * @param alert Alerta a mostrar.
 *  
 * @returns 
 */
const alertIcon = ({ alert }: { alert: Alerts }) => {
   return alertIconSize({ alert, size: "16" });
};

/**
 * Iconos de alerts con tamaño.
 * 
 * @param alert Alerta a mostrar.
 * @param size Tamaño del icono.
 * 
 * @returns 
 */
const alertIconSize = ({ alert, size  }: { alert: Alerts, size: string }) => {
    switch (alert) {
        case Alerts.info:
            return <InfoCircledIcon height={size} width={size}/>;
        case Alerts.warning:
            return <ExclamationTriangleIcon height={size} width={size} />;
        case Alerts.error:
            return <CrossCircledIcon height={size} width={size}/>;
        case Alerts.success:
            return <CheckCircledIcon height={size} width={size}/>;
        default:
            return <InfoCircledIcon height={size} width={size}/>;
    }
};

/**
 * Alerta variant.
 * 
 * @param alert Alerta a mostrar.
 * @returns 
 */
const alertVariant = ({ alert }: { alert: Alerts }) => {
    switch (alert) {
        case Alerts.info:
            return "outline";        
        case Alerts.success:
            return "surface";  
        default:
            return "soft";
    }
}

/**
 * Alerta color.
 * 
 * @param alert Alerta a mostrar. 
 * @returns 
 */
const alertColor = ({ alert }: { alert?: Alerts }) => {

    if (alert === undefined) {
        return "blue";
    }

    switch (alert) {
        case Alerts.info:
            return "blue";
        case Alerts.warning:
            return "orange";
        case Alerts.error:
            return "red";        
        case Alerts.success:
            return "green";
        default:
            return "blue";
    }
}

/**
 * Funcion para seleccionar el color del message.
 * 
 * @param alert Alerta a mostrar.
 * 
 * @returns 
 */
const alertColorBackground = (alert: Alerts | undefined) => {
    switch (alert) {
        case Alerts.success:
            return "var(--green-9)";
        case Alerts.info:
            return "var(--blue-7)";
        case Alerts.warning:
            return "var(--orange-9)";
        case Alerts.error:
            return "var(--red-9)";
        default:
            return "var(--blue-11)";
    }
}

export { alertIcon, alertIconSize, alertColor, alertColorBackground, alertVariant };