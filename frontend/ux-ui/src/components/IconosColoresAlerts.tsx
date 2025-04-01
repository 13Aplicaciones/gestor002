import { Alerts } from "../ConstantsPresentation";
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
const alertIconSize = ({ alert, size }: { alert: Alerts, size: string }) => {
    switch (alert) {
        case Alerts.info:
            return <InfoCircledIcon height={size} width={size} />;
        case Alerts.warning:
            return <ExclamationTriangleIcon height={size} width={size} />;
        case Alerts.error:
            return <CrossCircledIcon height={size} width={size} />;
        case Alerts.success:
            return <CheckCircledIcon height={size} width={size} />;
        default:
            return <InfoCircledIcon height={size} width={size} />;
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
const alertColorBackground = ({ alert }: { alert?: Alerts }) => {
    switch (alert) {
        case Alerts.success:
            return "var(--grass-8)";
        case Alerts.info:
            return "var(--sky-8)";
        case Alerts.warning:
            return "var(--amber-9)";
        case Alerts.error:
            return "var(--red-9)";
        default:
            return "var(--sky-8)";
    }
}


/**
 * Funcion para seleccionar la enumeracion desde un string de status.
 * 
 * @param status 
 * @returns 
 */
const mapStatusToAlert = (status: string): Alerts => {
    switch (status) {
        case "info":
            return Alerts.info;
        case "warning":
            return Alerts.warning;
        case "success":
            return Alerts.success;
        case "error":
            return Alerts.error;
        default:
            throw new Error(`Unknown status: ${status}`);
    }
};

/**
 * Funcion para seleccionar el color del banner.
 * 
 * @param colorName Nombre del color.
 * 
 * @see https://coolors.co/gradient-maker/71786d-78756d-6f6d78?position=0,50,100&opacity=100,100,100&type=linear&rotation=270
 * @see https://www.banani.co/es/tool/color-wheel
 * 
 * @returns 
 */
const gradientColor = (colorName: string): string => {
    
    switch (colorName) {
        case "jade":
            return "linear-gradient(270deg, hsla(164, 64%, 62%, 1) 0%, hsla(164, 64%, 42%, 1) 50%, hsla(164, 64%, 22%, 1) 100%)";
        case "gray":
            return "linear-gradient(270deg, hsla(0, 0%, 50%, 1) 0%, hsla(0, 0%, 46%, 1) 50%, hsla(0, 0%, 43%, 1) 100%);";
        case "mauve":
            return "linear-gradient(270deg, hsla(98, 5%, 45%, 1) 0%, hsla(44, 5%, 45%, 1) 50%, hsla(251, 5%, 45%, 1) 100%)";
        case "slate":
            return "linear-gradient(270deg, hsla(69, 6%, 44%, 1) 0%, hsla(9, 6%, 44%, 1) 50%, hsla(219, 6%, 44%, 1) 100%)";
        case "sage":
            return "linear-gradient(270deg, hsla(9, 6%, 41%, 1) 0%, hsla(309, 6%, 41%, 1) 50%, hsla(157, 6%, 41%, 1) 100%)";
        case "olive":
            return "linear-gradient(270deg, hsla(318, 5%, 42%, 1) 0%, hsla(258, 5%, 42%, 1) 50%, hsla(108, 5%, 42%, 1) 100%)";
        case "sand":
            return "linear-gradient(270deg, hsla(255, 4%, 42%, 1) 0%, hsla(195, 4%, 42%, 1) 50%, hsla(47, 4%, 42%, 1) 100%)";
        case "tomato":
            return "linear-gradient(270deg, hsla(10, 77%, 74%, 1) 0%, hsla(10, 78%, 54%, 1) 50%, hsla(10, 78%, 34%, 1) 100%)";
        case "red":
            return "linear-gradient(270deg, hsla(358, 76%, 79%, 1) 0%, hsla(358, 75%, 59%, 1) 50%, hsla(358, 75%, 39%, 1) 100%)";
       
       
        case "ruby":
            return "linear-gradient(270deg, hsla(340, 80%, 62%, 1) 0%, hsla(340, 80%, 42%, 1) 50%, hsla(340, 80%, 22%, 1) 100%)";
        case "crimson":
            return "linear-gradient(270deg, hsla(348, 83%, 62%, 1) 0%, hsla(348, 83%, 42%, 1) 50%, hsla(348, 83%, 22%, 1) 100%)";
        case "pink":
            return "linear-gradient(270deg, hsla(330, 100%, 82%, 1) 0%, hsla(330, 100%, 62%, 1) 50%, hsla(330, 100%, 42%, 1) 100%)";
        case "plum":
            return "linear-gradient(270deg, hsla(300, 40%, 62%, 1) 0%, hsla(300, 40%, 42%, 1) 50%, hsla(300, 40%, 22%, 1) 100%)";
        case "purple":
            return "linear-gradient(270deg, hsla(280, 60%, 62%, 1) 0%, hsla(280, 60%, 42%, 1) 50%, hsla(280, 60%, 22%, 1) 100%)";
        case "violet":
            return "linear-gradient(270deg, hsla(250, 60%, 62%, 1) 0%, hsla(250, 60%, 42%, 1) 50%, hsla(250, 60%, 22%, 1) 100%)";
        case "iris":
            return "linear-gradient(270deg, hsla(240, 50%, 62%, 1) 0%, hsla(240, 50%, 42%, 1) 50%, hsla(240, 50%, 22%, 1) 100%)";
        case "indigo":
            return "linear-gradient(270deg, hsla(230, 60%, 62%, 1) 0%, hsla(230, 60%, 42%, 1) 50%, hsla(230, 60%, 22%, 1) 100%)";
        case "cyan":
            return "linear-gradient(270deg, hsla(190, 100%, 62%, 1) 0%, hsla(190, 100%, 42%, 1) 50%, hsla(190, 100%, 22%, 1) 100%)";
        case "teal":
            return "linear-gradient(270deg, hsla(170, 60%, 62%, 1) 0%, hsla(170, 60%, 42%, 1) 50%, hsla(170, 60%, 22%, 1) 100%)";
        case "green":
            return "linear-gradient(270deg, hsla(140, 70%, 62%, 1) 0%, hsla(140, 70%, 42%, 1) 50%, hsla(140, 70%, 22%, 1) 100%)";
        case "grass":
            return "linear-gradient(270deg, hsla(120, 70%, 62%, 1) 0%, hsla(120, 70%, 42%, 1) 50%, hsla(120, 70%, 22%, 1) 100%)";
        case "bronze":
            return "linear-gradient(270deg, hsla(30, 40%, 62%, 1) 0%, hsla(30, 40%, 42%, 1) 50%, hsla(30, 40%, 22%, 1) 100%)";
        case "gold":
            return "linear-gradient(270deg, hsla(50, 80%, 62%, 1) 0%, hsla(50, 80%, 42%, 1) 50%, hsla(50, 80%, 22%, 1) 100%)";
        case "brown":
            return "linear-gradient(270deg, hsla(20, 50%, 62%, 1) 0%, hsla(20, 50%, 42%, 1) 50%, hsla(20, 50%, 22%, 1) 100%)";
        case "orange":
            return "linear-gradient(270deg, hsla(30, 100%, 62%, 1) 0%, hsla(30, 100%, 42%, 1) 50%, hsla(30, 100%, 22%, 1) 100%)";
        case "amber":
            return "linear-gradient(270deg, hsla(45, 100%, 62%, 1) 0%, hsla(45, 100%, 42%, 1) 50%, hsla(45, 100%, 22%, 1) 100%)";
        case "yellow":
            return "linear-gradient(270deg, hsla(60, 100%, 62%, 1) 0%, hsla(60, 100%, 42%, 1) 50%, hsla(60, 100%, 22%, 1) 100%)";
        case "lime":
            return "linear-gradient(270deg, hsla(90, 80%, 62%, 1) 0%, hsla(90, 80%, 42%, 1) 50%, hsla(90, 80%, 22%, 1) 100%)";
        case "mint":
            return "linear-gradient(270deg, hsla(150, 60%, 62%, 1) 0%, hsla(150, 60%, 42%, 1) 50%, hsla(150, 60%, 22%, 1) 100%)";
        case "sky":
            return "linear-gradient(270deg, hsla(200, 100%, 62%, 1) 0%, hsla(200, 100%, 42%, 1) 50%, hsla(200, 100%, 22%, 1) 100%)";
        default:
            return "linear-gradient(270deg, hsla(200, 100%, 62%, 1) 0%, hsla(200, 100%, 42%, 1) 50%, hsla(200, 100%, 22%, 1) 100%)";
    }
}


export { alertIcon, alertIconSize, alertColor, alertColorBackground, alertVariant, gradientColor, mapStatusToAlert };