import { Alertas } from "../ConstantesPresentacion";
import { CheckCircledIcon, CrossCircledIcon, ExclamationTriangleIcon, InfoCircledIcon } from "@radix-ui/react-icons";


/**
 * Componete para presentar los iconos y colores adecudados.
 * 
 * @author @omargo33
 * @since 2025-02-01
 */

/**
 * Iconos de alertas.
 * 
 * @param alerta Alerta a mostrar.
 *  
 * @returns 
 */
const alertaIcono = ({ alerta }: { alerta: Alertas }) => {
   return alertaIconoSize({ alerta, size: "16" });
};

/**
 * Iconos de alertas con tamaño.
 * 
 * @param alerta Alerta a mostrar.
 * @param size Tamaño del icono.
 * 
 * @returns 
 */
const alertaIconoSize = ({ alerta, size  }: { alerta: Alertas, size: string }) => {
    switch (alerta) {
        case Alertas.info:
            return <InfoCircledIcon height={size} width={size}/>;
        case Alertas.warning:
            return <ExclamationTriangleIcon height={size} width={size} />;
        case Alertas.error:
            return <CrossCircledIcon height={size} width={size}/>;
        case Alertas.success:
            return <CheckCircledIcon height={size} width={size}/>;
        default:
            return <InfoCircledIcon height={size} width={size}/>;
    }
};

/**
 * Alerta variant.
 * 
 * @param alerta Alerta a mostrar.
 * @returns 
 */
const alertaVariant = ({ alerta }: { alerta: Alertas }) => {
    switch (alerta) {
        case Alertas.info:
            return "outline";        
        case Alertas.success:
            return "surface";  
        default:
            return "soft";
    }
}

/**
 * Alerta color.
 * 
 * @param alerta Alerta a mostrar. 
 * @returns 
 */
const alertaColor = ({ alerta }: { alerta?: Alertas }) => {

    if (alerta === undefined) {
        return "blue";
    }

    switch (alerta) {
        case Alertas.info:
            return "blue";
        case Alertas.warning:
            return "orange";
        case Alertas.error:
            return "red";        
        case Alertas.success:
            return "green";
        default:
            return "blue";
    }
}

/**
 * Funcion para seleccionar el color del mensaje.
 * 
 * @param alerta Alerta a mostrar.
 * 
 * @returns 
 */
const alertaColorFondo = (alerta: Alertas | undefined) => {
    switch (alerta) {
        case Alertas.success:
            return "var(--green-9)";
        case Alertas.info:
            return "var(--blue-7)";
        case Alertas.warning:
            return "var(--orange-9)";
        case Alertas.error:
            return "var(--red-9)";
        default:
            return "var(--blue-11)";
    }
}

export { alertaIcono, alertaIconoSize, alertaColor, alertaColorFondo, alertaVariant };